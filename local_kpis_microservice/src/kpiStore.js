// @flow
'use strict';

type SingleKPI = {
  _id:string;
  type:string;
  }; 

function constructKPI() {
  const kpis = {};
  kpis._kpis = [];

  kpis.read = function(rawJSONofKPIs:{kpis:[SingleKPI]}) {
    kpis._kpis = rawJSONofKPIs.kpis; 
  }

  kpis.availableKPIs  = function() {
    var kpiNames = [];
    kpis._kpis.forEach(function(element) {
      var aKPI = {
        "_id" : element._id,
        "type" : element.type
      };
      kpiNames.push(aKPI);
    });
    return kpiNames;
  }

  kpis.getKPI = function(id:string) {
    var kpi = {};
    kpis._kpis.forEach(function(element) {
      if (element._id == id ) {
        kpi = element;
      }
    });
    return kpi;
  }
  
  return kpis;
}


module.exports = constructKPI;