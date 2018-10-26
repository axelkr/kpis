// @flow
'use strict';

import type {KPIAction} from '../KPIAction';

import Immutable from 'immutable';
import LoadObject from '../../utils/LoadObject';
import LoadObjectState from '../../utils/LoadObjectState';
import {ReduceStore} from 'flux/utils';
import KPIDataManager from '../data_managers/KPIDataManager';
import AppDispatcher from '../../AppDispatcher';

type State = LoadObjectState<Immutable.List<string>>;

class KPIListStore extends ReduceStore<KPIAction, State> {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState(): State {
    return new LoadObjectState(() => AppDispatcher.dispatch({
      type: 'ids/start-load',
    }));
  }

  reduce(state: State, action: KPIAction): State {
    switch (action.type) {

      ///// Loading /////

      case 'ids/start-load':
        KPIDataManager.loadIDs();
        return state.setLoadObject(LoadObject.loading());

      case 'ids/loaded':
        return state.setLoadObject(LoadObject.withValue(
          Immutable.List(action.ids.map(x => x.id))
        ));

      case 'ids/load-error':
        return state.setLoadObject(LoadObject.withError(action.error));

      default:
        return state;
    }
  }
}

export default new KPIListStore();
