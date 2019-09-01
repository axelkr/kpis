/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as Immutable from 'immutable';
import LoadObject from './LoadObject';

/**
 * LoadObjectMap is a structure that mimics Immutable.Map where the values are
 * LoadObjects. It has a few features that make working with LoadObjects easier.
 *
 *   - `get()` always returns a value, if the value is not found in the
 *     underlying map an empty load object is returned, and...
 *   - all keys that are requested in the same frame that do not exist in the
 *     underlying map will be passed to the `loadAll()` function given to the
 *     constructor of the map. This allows them to then be "loaded".
 *
 * There is some important timing issues to be aware of regarding `loadAll()`.
 *
 *   - `loadAll()` is called in the frame AFTER calls to `get()` that has a
 *     cache miss.
 *   - `loadAll()` must SYNCHRONOUSLY change all of the given keys to a state
 *     in the cache such that they will no longer be considered a cache miss.
 *     Generally this means setting them to loading. Dispatching an action is
 *     synchronous and generally what should be done in `loadAll()`.
 */
class LoadObjectMap<K, V> {
  private _data: Immutable.Map<K, LoadObject<V>>;
  private _loadAll: (key: Set<K>) => void;
  private _shouldLoad: (lo: LoadObject<V>) => boolean;

  // Mutable state on this map so we don't accidently load something many times.
  private _preventLoadsForThisFrame: Set<K>;
  private _clearPreventLoadsForThisFrame: any;

  constructor(
    loadAll: (keys: Set<K>) => void,
    shouldLoad?: (lo: LoadObject<V>) => boolean,
  ) {
    this._data = Immutable.Map();
    this._loadAll = loadAll;
    this._shouldLoad = shouldLoad || ( (lo) => lo.isEmpty());
    this._preventLoadsForThisFrame = new Set();
    this._clearPreventLoadsForThisFrame = null;
  }

  // Some trickery so that we always return a load object, and call the provided
  // load function when appropriate.
  public get(key: K): LoadObject<V> {
    const lo : LoadObject<V> = this._data.has(key)
      ? this._data.get(key)
      : LoadObject.empty();
    if (!this._preventLoadsForThisFrame.has(key) && this._shouldLoad(lo)) {
      // This must be done asynchronously to avoid nested dispatches.
      this._preventLoadsForThisFrame.add(key);
      if (!this._clearPreventLoadsForThisFrame) {
        this._clearPreventLoadsForThisFrame = setTimeout(
          () => {
            this._loadAll(this._preventLoadsForThisFrame);
            this._preventLoadsForThisFrame = new Set();
            this._clearPreventLoadsForThisFrame = null;
          },
          0,
        );
      }
    }
    return lo;
  }

  // Modified, as well as getValues
  public getKeys(): K[] {
    const keys : any = this._data.keys();
    return Array.from(keys);
  }

  public getValues(): Array<LoadObject<V>> {
    const values : any = this._data.values();
    return Array.from(values);
  }

  public every(fn: (lo: LoadObject<V>, key: K) => boolean): boolean {
    return this._data.every(fn);
  }

  public some(fn: (lo: LoadObject<V>, key: K) => boolean): boolean {
    return this._data.some(fn);
  }

  public forEach(fn: (lo: LoadObject<V>, key: K) => any): void {
    this._data.forEach(fn);
  }

  public get size(): number {
    return this._data.size;
  }

  ////////// A selection of mutation functions found on Immutable.Map //////////

  public delete(key: K): LoadObjectMap<K, V> {
    return this._mutate(() => this._data.delete(key));
  }

  public set(key: K, lo: LoadObject<V>): LoadObjectMap<K, V> {
    return this._mutate(() => this._data.set(key, lo));
  }

  // Modified, was before:
  // public merge(map: Iterable<[K, LoadObject<V>]>): LoadObjectMap<K, V> {
  public merge(map: any): LoadObjectMap<K, V> {
    return this._mutate(() => this._data.merge(map));
  }

  /*public filter(fn: (lo: LoadObject<V>, key: K) => boolean): LoadObjectMap<K, V> {
    return this._mutate(() => this._data.filter(fn));
  }*/

  public update(key: K,fn: (lo: LoadObject<V>) => LoadObject<V>) : LoadObjectMap<K, V> {
    return this._mutate(() => this._data.update(key, fn));
  }

  private _mutate(fn: () => Immutable.Map<K, LoadObject<V>>): LoadObjectMap<K, V> {
    const nextData = fn();
    if (nextData === this._data) {
      return this;
    }
    const nextThis = new LoadObjectMap(this._loadAll, this._shouldLoad);
    nextThis._data = nextData;
    return nextThis;
  }
}

export default LoadObjectMap;
