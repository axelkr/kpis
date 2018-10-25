// @flow
'use strict';

const express = require('express');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_NOT_FOUND = 404;

function constructRouter(kpis) {
  const router = express.Router();
  router._kpis = kpis;

  router.get('/kpi', (req, res) => {
    var kpiNames = router._kpis.availableKPIs();
    res.status(HTTP_STATUS_OK).send(kpiNames);  
  });
  
  router.get('/kpi/:id', (req, res) => {
    var kpi = router._kpis.getKPI(req.params.id);
    const kpiFound = kpi.hasOwnProperty('id');
    if (kpiFound) {
      res.status(HTTP_STATUS_OK).send(kpi);  
    } else {
      res.sendStatus(HTTP_STATUS_NOT_FOUND);
    }
  });

  return router;
}

module.exports = constructRouter;