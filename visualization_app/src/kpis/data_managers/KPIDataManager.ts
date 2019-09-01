import KPI from '../records/KPI';
import ServerAPI from '../../ServerAPI';
import AppDispatcher from '../../AppDispatcher';

const KPIDataManager = {
  loadIDs() {
    ServerAPI
      .get('/kpi')
      .then((ids) => {
        AppDispatcher.dispatch({
          type: 'ids/loaded',
          ids,
        });
      })
      .catch((error) => {
        AppDispatcher.dispatch({
          type: 'ids/load-error',
          error,
        });
      });
  },

  loadKPIs(ids: string[]) {
    ids.forEach((element) => {
      ServerAPI
      .get('/kpi/'+element)
      .then((rawKPI) => {
        AppDispatcher.dispatch({
          type: 'KPI/loaded',
          KPI: new KPI(rawKPI),
        });
      })
      .catch((error) => {
        AppDispatcher.dispatch({
          type: 'KPI/load-error',
          id:element,
          error,
        });
      });
    });

  },
};

export default KPIDataManager;
