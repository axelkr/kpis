import KPI from '../records/KPI';
import ServerAPI from '../../ServerAPI';
import appStore from '../../appStore';

const KPIDataManager = {
  loadIDs() {
    ServerAPI
      .get('/kpi')
      .then((ids:any[]) => {
        appStore.dispatch({
          type: 'ids/loaded',
          ids,
        });
        appStore.dispatch({
          type: 'KPI/start-load',
          ids: ids.map( (x)=> x._id),
        });
      })
      .catch((error) => {
        appStore.dispatch({
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
        appStore.dispatch({
          type: 'KPI/loaded',
          KPI: new KPI(rawKPI),
        });
      })
      .catch((error) => {
        appStore.dispatch({
          type: 'KPI/load-error',
          id:element,
          error,
        });
      });
    });

  },
};

export default KPIDataManager;
