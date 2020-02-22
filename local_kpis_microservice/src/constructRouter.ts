import * as express from 'express';

import KPIStore from './KPIStore';

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_NOT_FOUND = 404;

export default function constructRouter(kpiStore:KPIStore,lastUpdateOn:()=>Date,onKPIsUpdated:()=>void ) {
  const router :any = express.Router();
  router._kpiStore = kpiStore;
  router._getLastUpdateOn = lastUpdateOn;
  router._onKPIsUpdated = onKPIsUpdated;

  router.get('/lastUpdateOn', (req:any, res:any) => {
    const lastUpdate = router._getLastUpdateOn();
    res.status(HTTP_STATUS_OK).send(lastUpdate);
  });

  router.get('/kpi', (req:any, res:any) => {
    const kpiNames = router._kpiStore.availableKPIs();
    res.status(HTTP_STATUS_OK).send(kpiNames);
  });

  router.post('/kpi/:id/measurements/', (req:any, res:any) => {
    let id;
    try {
      id = Number.parseInt(req.params.id);
    } catch(e) {
      res.sendStatus(HTTP_STATUS_NOT_FOUND);
      return;
    }
    if (router._kpiStore.idExists(id) && router._kpiStore.isValidMeasurement(id,req.body)) {
      router._kpiStore.addMeasurement(id,req.body);
      router._onKPIsUpdated();
      res.sendStatus(HTTP_STATUS_OK);
    } else {
      res.sendStatus(HTTP_STATUS_BAD_REQUEST);
    }
  });

  router.get('/kpi/:id', (req:any, res:any) => {
    let id;
    try {
      id = Number.parseInt(req.params.id);
    } catch(e) {
      res.sendStatus(HTTP_STATUS_NOT_FOUND);
      return;
    }
    const kpi = router._kpiStore.getKPI(id);
    const kpiFound = kpi.hasOwnProperty('_id');
    if (kpiFound) {
      res.status(HTTP_STATUS_OK).send(kpi);
    } else {
      res.sendStatus(HTTP_STATUS_NOT_FOUND);
    }
  });

  return router;
}
