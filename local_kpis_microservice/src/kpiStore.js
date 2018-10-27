// @flow
'use strict';

type SingleKPI = {
  _id:string;
  type:string;
  }; 

class KPIStore {
  constructor() {
    this._kpis = [];
  }

  read(rawJSONofKPIs:{kpis:[SingleKPI]}) {
    this._kpis = rawJSONofKPIs.kpis; 
  }

  availableKPIs() {
    var kpiNames = [];
    this._kpis.forEach(function(element) {
      var aKPI = {
        "_id" : element._id,
        "type" : element.type
      };
      kpiNames.push(aKPI);
    });
    return kpiNames;
  }

  getKPI(id:string) {
    var kpi = {};
    this._kpis.forEach(function(element) {
      if (element._id == id ) {
        kpi = element;
      }
    });
    return kpi;
  }
}


module.exports = KPIStore;