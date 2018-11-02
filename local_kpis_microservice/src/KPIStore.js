// @flow
'use strict';

import type KPIValidator from './KPIValidator';
import type SingleKPI from './SingleKPI';

class KPIStore {
  _kpis : Array<SingleKPI>;
  _kpiValidators : Array<KPIValidator>;
  
  constructor(validators: Array<KPIValidator>) {
    this._kpis = [];
    if (validators === undefined) {
      this._kpiValidators = [];
    } else {
      this._kpiValidators = validators;
    }
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

    if (this._containsDuplicateIdentifers(updatedKPIs)) {
     throw "duplicate identifiers";
    }
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

  getKPI(id:number) {
    var kpi = {};
    this._kpis.forEach(function(element) {
      if (element._id === id ) {
        kpi = element;
      }
    });
    return kpi;
  }

  idExists(id:number) {
    return this._kpis.some( x => x._id == id);
  }

  addMeasurement(id:number,aMeasurement:mixed) {
    console.log(aMeasurement);
  }

  isValidMeasurement(id:number,aMeasurement:mixed) {
    if (!this.idExists(id)) {
      return false;
    }
    var aKPI = this.getKPI(id);
    return this._kpiValidators.some(x=> x.isApplicableFor(aKPI) && x.isValidMeasurement(aMeasurement));
  }

  _isValidKPI(aKPI:SingleKPI) {
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

    if (!aKPI.hasOwnProperty('measurements') || !Array.isArray(aKPI.measurements)) {
      return false;
    }

    if (aKPI.hasOwnProperty('description') && !propertyExistsAndIsString(aKPI,'description')) {
      return false;
    }

    if (aKPI.hasOwnProperty('tags') && !Array.isArray(aKPI.tags)) {
      return false;
    }

    if (aKPI.hasOwnProperty('tags') && ! aKPI.tags.every(isString)) {
      return false;
    }

    if (!this._kpiValidators.some(x=>x.isValid(aKPI))) {
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

  _containsDuplicateIdentifers(kpis:Array<SingleKPI>) : boolean {
    var knownIds = kpis.map(x => x._id);
    var duplicateFound = knownIds.some(function(anId){
       return knownIds.filter(x=> x === anId).length !== 1;
    });
    return duplicateFound;
  }
}

function propertyExistsAndIsString(anObject:any,aProperty:string) {
  return anObject.hasOwnProperty(aProperty) && isString(anObject[aProperty]);
}

function isString(aValue:mixed) {
   return (typeof aValue === 'string' || aValue instanceof String);
}

module.exports = KPIStore;