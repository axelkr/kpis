// @flow

import App from './App';
import {Container} from 'flux/utils';
import KPIListStore from './kpis/stores/KPIListStore';
import KPIStore from './kpis/stores/KPIStore';

function getStores() {
  return [
    KPIListStore,
    KPIStore
  ];
}

/*type AppContainerState = {
  ids:any,
  kpis:any,
}*/

function getState(){ //:AppContainerState {
  const KPIs = KPIStore.getState();
  const ids = KPIListStore.getState();

  var state = {
    ids: ids,
    KPIs: KPIs
  };
  
  return state;
}

export default Container.createFunctional(App, getStores, getState);
