import { createStore,combineReducers} from 'redux';

import kpis from './kpis/stores/kpis';
import kpiLists from './kpis/stores/kpiLists';

function createAppStore() {
  const reducers:any = {kpis,kpiLists};
  const rootReducer:any = combineReducers(reducers);
  return createStore(rootReducer);
}

export default createAppStore();
