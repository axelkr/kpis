// @flow

import App from './App';
import {Container} from 'flux/utils';

function getStores() {
  return [
  ];
}

type AppContainerState = {
}

function getState():AppContainerState {
  var state = {    
  };

  return state;
}

export default Container.createFunctional(App, getStores, getState);
