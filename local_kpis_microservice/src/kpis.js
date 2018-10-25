// @flow
'use strict';

function constructKPI() {
  const kpis = {};
  kpis._kpis = [];

  kpis.read = function(rawJSONofKPIs) {
    kpis._kpis = rawJSONofKPIs.kpis; 
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