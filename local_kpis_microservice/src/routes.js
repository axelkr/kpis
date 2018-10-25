// @flow
'use strict';

const express = require('express');

const kpis = require('./kpis');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_NOT_FOUND = 404;

function constructRouter(localKpiFile) {
  const router = express.Router();
  router._kpis = kpis;
  router._kpis.readFileSync(localKpiFile);

  router.get('/kpi', (req, res) => {
    var kpiNames = router._kpis.availableKPIs();
    res.status(HTTP_STATUS_OK).send(kpiNames);  
  });
  
  router.get('/kpi/:id', (req, res) => {
    var kpi = router._kpis.getKPI(req.params.id);
    res.status(HTTP_STATUS_OK).send(kpi);  
  });

  return router;
}

module.exports = constructRouter;