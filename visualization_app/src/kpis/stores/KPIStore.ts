import {KPIAction} from '../KPIAction';

import LoadObject from '../../utils/LoadObject';
import LoadObjectMap from '../../utils/LoadObjectMap';
import {ReduceStore} from 'flux/utils';
import KPIDataManager from '../data_managers/KPIDataManager';
import AppDispatcher from '../../AppDispatcher';
import KPI from '../records/KPI';

type State = LoadObjectMap<string, KPI>;

class KPIStore extends ReduceStore<State,KPIAction> {
  constructor() {
    super(AppDispatcher);
  }

  public getInitialState(): State {
    return new LoadObjectMap( (keys) => AppDispatcher.dispatch({
      type: 'KPI/start-load',
      ids: Array.from(keys),
    }));
  }

  public reduce(state: State, action: KPIAction): State {
    switch (action.type) {

      ///// Loading /////

      case 'KPI/start-load':
        KPIDataManager.loadKPIs(action.ids);
        return state.merge(action.ids.map( (id) => [id, LoadObject.loading()]));

      case 'KPI/loaded':
        return state.merge([[action.KPI.id,LoadObject.withValue(action.KPI)]]);

      case 'KPI/load-error':
        return state.merge([[action.id,LoadObject.withError(action.error)]]);

      default:
        return state;
    }
  }
}

export default new KPIStore();
