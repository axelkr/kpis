import {KPIAction} from '../KPIAction';
import * as Immutable from 'immutable';
import LoadObject from '../../utils/LoadObject';
import LoadObjectState from '../../utils/LoadObjectState';
import {ReduceStore} from 'flux/utils';
import KPIDataManager from '../data_managers/KPIDataManager';
import AppDispatcher from '../../AppDispatcher';

type State = LoadObjectState<Immutable.List<{_id:string,type:string}>>;

class KPIListStore extends ReduceStore<State,KPIAction> {
  constructor() {
    super(AppDispatcher);
  }

  public getInitialState(): State {
    return new LoadObjectState(() => AppDispatcher.dispatch({
      type: 'ids/start-load',
    }));
  }

  public reduce(state: State, action: KPIAction): State {
    switch (action.type) {

      ///// Loading /////

      case 'ids/start-load':
        KPIDataManager.loadIDs();
        return state.setLoadObject(LoadObject.loading());

      case 'ids/loaded':
        const listed :any = Immutable.List(action.ids);
        return state.setLoadObject(LoadObject.withValue(listed));

      case 'ids/load-error':
        return state.setLoadObject(LoadObject.withError(action.error));

      default:
        return state;
    }
  }
}

export default new KPIListStore();
