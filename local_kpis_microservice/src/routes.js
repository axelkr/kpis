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
  router.kpis = JSON.parse(rawJSON).kpis;

  router.get('/kpi', (req, res) => {
    var kpiNames = [];
    router.kpis.forEach(function(element) {
      var aKPI = {
        "id" : element.id,
        "name" : element.name
      };
      kpiNames.push(aKPI);
    });
    res.status(HTTP_STATUS_OK).send(kpiNames);  
  });
  
  router.get('/kpi/:id', (req, res) => {
    var kpi = [];
    const id = req.params.id;
    router.kpis.forEach(function(element) {
      if (element.id == id ) {
        kpi = element;
      }
    });
    res.status(HTTP_STATUS_OK).send(kpi);  
  });

  return router;
}

module.exports = constructRouter;