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

interface IAppContainerState {
  ids:any;
  KPIs:any;
}

function getState():IAppContainerState {
  const KPIs = KPIStore.getState();
  const ids = KPIListStore.getState();

  return {
    ids,
    KPIs
  };
}

export default Container.createFunctional(App, getStores, getState);
