// @flow
'use strict';

const express = require('express');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_NOT_FOUND = 404;

type SingleKPI = {
  _id:string;
  type:string;
  }; 

type KPIStorage = {
  availableKPIs : () => Array<SingleKPI>;
  getKPI: (string) => SingleKPI;
}

function constructRouter(kpiStorage:KPIStorage,lastUpdateOn:()=>Date) {
  const router = express.Router();
  router._kpiStorage = kpiStorage;
  router._getLastUpdateOn = lastUpdateOn;

  router.get('/lastUpdateOn', (req, res) => {
    var lastUpdate = router._getLastUpdateOn();
    res.status(HTTP_STATUS_OK).send(lastUpdate);  
  });
  
  router.get('/kpi', (req, res) => {
    var kpiNames = router._kpiStorage.availableKPIs();
    res.status(HTTP_STATUS_OK).send(kpiNames);  
  });
  
  router.get('/kpi/:id', (req, res) => {
    var kpi = router._kpiStorage.getKPI(req.params.id);
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