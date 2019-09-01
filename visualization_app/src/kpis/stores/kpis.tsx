import {KPIAction} from '../KPIAction';
import LoadObject from '../../utils/LoadObject';
import LoadObjectMap from '../../utils/LoadObjectMap';
import KPIDataManager from '../data_managers/KPIDataManager';

const initialState = {
    kpis : new LoadObjectMap( () => {return;})
};

export default function kpis(state = initialState, action: KPIAction) {
  if (typeof (state) === 'undefined') {
    return initialState;
  }
  if (typeof (action) === 'undefined') {
    return state;
  }

  switch (action.type) {
    case 'KPI/start-load':
        KPIDataManager.loadKPIs(action.ids);
        return {
            kpis : state.kpis.merge(action.ids.map( (id) => [id, LoadObject.loading()]))
        };

      case 'KPI/loaded':
        return {
            kpis : state.kpis.merge([[action.KPI.id,LoadObject.withValue(action.KPI)]])
        };

      case 'KPI/load-error':
        return {
            kpis : state.kpis.merge([[action.id,LoadObject.withError(action.error)]])
        };

    default:
      return state;
  }
}
