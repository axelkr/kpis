import { existsSync, readFileSync, watch } from 'fs';
import {isAbsolute as isAbsolutePath, join as joinPaths, normalize as normalizePath} from 'path';

import KPIStore from './KPIStore';

export default class KPIFileWatcher {
  private _setOnUpdate: KPIStore[];
  private _timeOfLastUpdate: Date;
  private _fileToWatch: string;

  constructor(kpiFile: string) {
    this._setOnUpdate = [];
    this._timeOfLastUpdate = new Date();
    if (!isAbsolutePath(kpiFile)) {
      kpiFile = joinPaths(__dirname, "..", kpiFile);
    }
    this._fileToWatch = normalizePath(kpiFile);
  }

  public callSetOnUpdate(aKPIStore: KPIStore) {
    this._setOnUpdate.push(aKPIStore);
  }

  public lastUpdateOn() {
    return this._timeOfLastUpdate;
  }

  public updated() {
    if (!existsSync(this._fileToWatch)) {
      return;
    }
    const rawContent = readFileSync(this._fileToWatch,'utf8');
    const writeOngoing = (rawContent.length === 0);
    if (writeOngoing) {
      return;
    }
    let asJSON: any;
    try {
      asJSON = JSON.parse(rawContent);
    } catch (e) {
      return;
    }

    this._setOnUpdate.forEach((element) => {
      try {
        element.read(asJSON);
      } catch (e) {
        return;
      }
    });
    this._timeOfLastUpdate = new Date();
  }

  public startWatching() {
    if (existsSync(this._fileToWatch)) {
      watch(this._fileToWatch, { persistent: false }, () => {
        this.updated();
      });
    }
  }
}
