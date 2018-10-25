// @flow
'use strict';

const fs = require('fs');


function constructKPI() {
  const kpis = {};
  kpis._kpis = [];

  kpis.readFileSync = function(localKpiFile) {
    var rawJSON = fs.readFileSync(localKpiFile, 'utf8');
    kpis._kpis = JSON.parse(rawJSON).kpis; 
  }

  kpis.availableKPIs = function() {
    var kpiNames = [];
    kpis._kpis.forEach(function(element) {
      var aKPI = {
        "id" : element.id,
        "name" : element.name
      };
      kpiNames.push(aKPI);
    });
    return kpiNames;
  }

  kpis.getKPI = function(id) {
    var kpi = {};
    kpis._kpis.forEach(function(element) {
      if (element.id == id ) {
        kpi = element;
      }
    });
    return kpi;
  }
  
  return kpis;
}


module.exports = constructKPI();