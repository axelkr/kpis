// @flow
'use strict';

const express = require('express');

import type KPIStore from './KPIStore';

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_NOT_FOUND = 404;

function constructRouter(kpiStore:KPIStore,lastUpdateOn:()=>Date) {
  const router = express.Router();
  router._kpiStore = kpiStore;
  router._getLastUpdateOn = lastUpdateOn;

  router.get('/lastUpdateOn', (req, res) => {
    var lastUpdate = router._getLastUpdateOn();
    res.status(HTTP_STATUS_OK).send(lastUpdate);  
  });
  
  router.get('/kpi', (req, res) => {
    var kpiNames = router._kpiStore.availableKPIs();
    res.status(HTTP_STATUS_OK).send(kpiNames);  
  });
  
  router.post('/kpi/:id/measurements/', (req, res) => {
    var id = undefined;
    try {
      id = Number.parseInt(req.params.id);
    } catch(e) {
      res.sendStatus(HTTP_STATUS_NOT_FOUND);
      return;
    }
    console.log(req.query);

    res.sendStatus(HTTP_STATUS_OK);
  });

  router.get('/kpi/:id', (req, res) => {
    var id = undefined;
    try {
      id = Number.parseInt(req.params.id);
    } catch(e) {
      res.sendStatus(HTTP_STATUS_NOT_FOUND);
      return;
    }
    var kpi = router._kpiStore.getKPI(id);
    const kpiFound = kpi.hasOwnProperty('_id');
    if (kpiFound) {
      res.status(HTTP_STATUS_OK).send(kpi);  
    } else {
      res.sendStatus(HTTP_STATUS_NOT_FOUND);
    }
  });

  return router;
}

module.exports = constructRouter;