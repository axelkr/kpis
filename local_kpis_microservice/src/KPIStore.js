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
    if (!aKPI.hasOwnProperty('_id')||!Number.isInteger(aKPI._id) || aKPI._id < 0) {
      return false;
    }
    
    if (!propertyExistsAndIsString(aKPI,'name')) {
      return false;
    }

    if (!propertyExistsAndIsString(aKPI,'type')) {
      return false;
    }

    if (!aKPI.hasOwnProperty('goal') || aKPI.goal === null || typeof aKPI.goal !== 'object') {
      return false;
    }

    if (!aKPI.hasOwnProperty('measurements') || aKPI.measurements === null || typeof aKPI.measurements !== 'object') {
      return false;
    }

    if (aKPI.hasOwnProperty('description') && !propertyExistsAndIsString(aKPI,'description')) {
      return false;
    }

    if (!['continuous_without_deadline','cumulative_number_over_year'].includes(aKPI.type)) {
      return false;
    }

    if (aKPI.hasOwnProperty('tags') && !Array.isArray(aKPI.tags)) {
      return false;
    }

    if (aKPI.hasOwnProperty('tags') && ! aKPI.tags.every(isString)) {
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
  return anObject.hasOwnProperty(aProperty) && isString(anObject[aProperty]);
}

function isString(aValue) {
   return (typeof aValue === 'string' || aValue instanceof String);
}

module.exports = KPIStore;