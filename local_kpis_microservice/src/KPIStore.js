// @flow
'use strict';

type SingleKPI = {
  _id:string;
  type:string;
  }; 

class KPIStore {
  _kpis : Array<SingleKPI>;
  
  constructor() {
    this._kpis = [];
  }

  read(rawJSONofKPIs:{kpis:Array<SingleKPI>}) {
    var updatedKPIs = [];
    var self = this;
    rawJSONofKPIs.kpis.forEach(function(aKPI){
      if (!self._isValidKPI(aKPI)){
        return;
      }
      aKPI = self._addDefaultsForOptionalFields(aKPI);
      updatedKPIs.push(aKPI);
    })
    this._kpis = updatedKPIs; 
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

  _isValidKPI(aKPI:{}) {
    if(!aKPI.hasOwnProperty('_id')||!Number.isInteger(aKPI._id) || aKPI._id < 0) {
      return false;
    }
    
    if(!propertyExistsAndIsString(aKPI,'name')) {
      return false;
    }

    return true;
  }

  _addDefaultsForOptionalFields(aKPI:SingleKPI) : SingleKPI {
    if(!aKPI.hasOwnProperty('description')) {
      aKPI.description = '';
    }
    if(!aKPI.hasOwnProperty('tags')) {
      aKPI.tags = [];
    }
    return aKPI;
  }
}

function propertyExistsAndIsString(anObject:{},aProperty:string) {
  return anObject.hasOwnProperty(aProperty) && (typeof anObject[aProperty] === 'string' || anObject[aProperty] instanceof String);
}

module.exports = KPIStore;