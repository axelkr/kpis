// @flow
'use strict';

const express = require('express');
const fs = require('fs');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_NOT_FOUND = 404;

function constructRouter(localKpiFile) {
  const router = express.Router();
  router.kpis = [];

  var rawJSON = fs.readFileSync(localKpiFile, 'utf8');
  // TODO: remove any KPI which does not have required fields, i.e. name, id
  router.kpis = JSON.parse(rawJSON).kpis;

  router.get('/kpis', (req, res) => {
    var kpiNames = [];
    router.kpis.forEach(function(element) {
      kpiNames.push(element.name);
    });
    res.status(HTTP_STATUS_OK).send(kpiNames);  
  });
    
  return router;
}

module.exports = constructRouter;