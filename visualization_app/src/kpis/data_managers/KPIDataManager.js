// @flow
'use strict';

import KPI from '../records/KPI';
import ServerAPI from '../../ServerAPI';
import AppDispatcher from '../../AppDispatcher';

const KPIDataManager = {
  loadIDs() {
    ServerAPI
      .get('/kpi')
      .then(ids => {
        AppDispatcher.dispatch({
          type: 'ids/loaded',
          ids,
        });
      })
      .catch(error => {
        AppDispatcher.dispatch({
          type: 'ids/load-error',
          error: error,
        });
      });
  },

  loadKPIs(ids){//}: Array<string>) {
    ids.forEach(function(element) {
      ServerAPI
      .get('/kpi/'+element)
      .then(rawKPI => {
        console.log(rawKPI);
        console.log(new KPI(rawKPI));
        AppDispatcher.dispatch({
          type: 'KPI/loaded',
          KPI: new KPI(rawKPI),
        });
      })
      .catch(error => {
        AppDispatcher.dispatch({
          type: 'KPI/load-error',
          id:element,
          error:error,
        });
      });
    })
    
  },
};

export default KPIDataManager;
