//import type {KPIAction} from '../KPIAction';

import LoadObject from '../../utils/LoadObject';
import LoadObjectMap from '../../utils/LoadObjectMap';
import {ReduceStore} from 'flux/utils';
import KPIDataManager from '../data_managers/KPIDataManager';
import AppDispatcher from '../../AppDispatcher';
//import KPI from '../records/KPI';


//type State = LoadObjectMap<string, KPI>;

class KPIStore extends ReduceStore{//<KPIAction, State> {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState(){//}: State {
    return new LoadObjectMap(keys => AppDispatcher.dispatch({
      type: 'KPI/start-load',
      ids: Array.from(keys),
    }));
  }

  reduce(state,action){//}: State, action: KPIAction): State {
    switch (action.type) {

      ///// Loading /////

      case 'KPI/start-load':
        KPIDataManager.loadKPIs(action.ids);
        return state.merge(action.ids.map(id => [id, LoadObject.loading()]));

      case 'KPI/loaded':
        return state.merge([[action.KPI._id,LoadObject.withValue(action.KPI)]]);

      case 'KPI/load-error':
        return state.merge([[action.id,LoadObject.withError(action.error)]]);

      default:
        return state;
    }
  }
}

export default new KPIStore();
