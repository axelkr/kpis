import { KPIAction } from '../KPIAction';
import * as Immutable from 'immutable';
import LoadObject from '../../utils/LoadObject';
import LoadObjectState from '../../utils/LoadObjectState';
import KPIDataManager from '../data_managers/KPIDataManager';

const initialState = {
  kpiLists : new LoadObjectState(() => {return;})
};

export default function kpiLists(state = initialState, action: KPIAction) {
  if (typeof (state) === 'undefined') {
    return initialState;
  }
  if (typeof (action) === 'undefined') {
    return state;
  }

  switch (action.type) {
    case 'ids/start-load':
      KPIDataManager.loadIDs();
      return {
        kpiLists: state.kpiLists.setLoadObject(LoadObject.loading())
      };

    case 'ids/loaded':
      const listed :any = Immutable.List(action.ids);
      return {
        kpiLists: state.kpiLists.setLoadObject(LoadObject.withValue(listed))
      };

    case 'ids/load-error':
      return {
        kpiLists: state.kpiLists.setLoadObject(LoadObject.withError(action.error))
      };

    default:
      return state;
  }
}
