import IKPIValidator from './IKPIValidator';
import ISingleKPI from './ISingleKPI';

export default class KPIStore {
  private _kpis : Array<ISingleKPI>;
  private _kpiValidators : Array<IKPIValidator>;
  
  constructor(validators: Array<IKPIValidator>) {
    this._kpis = [];
    if (validators === undefined) {
      this._kpiValidators = [];
    } else {
      this._kpiValidators = validators;
    }
  }

  getAllKPIs() {
    return this._kpis;
  }

  read(rawJSONofKPIs:{kpis:Array<ISingleKPI>}) {
    var updatedKPIs :any = [];
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
    let kpiNames:any = [];
    this._kpis.forEach(function(element) {
      var aKPI = {
        "_id" : element._id,
        "type" : element.type
      };
      kpiNames.push(aKPI);
    });
    return kpiNames;
  }

  getKPI(id:number): ISingleKPI {
    var kpi = null;
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

  addMeasurement(id:number,aMeasurement:any) {
    if (!this.isValidMeasurement(id,aMeasurement)) {
      return false;
    }
    this._kpis = this._kpis.map(function(element) {
      if (element._id === id  ) {
        element.measurements.push(aMeasurement);
      }
      return element;
    });
  }

  isValidMeasurement(id:number,aMeasurement:any) {
    if (!this.idExists(id)) {
      return false;
    }
    var aKPI = this.getKPI(id);
    if (aKPI === null || aKPI === undefined) {
      return false;
    }
    return this._kpiValidators.some(x=> x.isApplicableFor(aKPI) && x.isValidMeasurement(aMeasurement));
  }

  _isValidKPI(aKPI:ISingleKPI) {
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

  _addDefaultsForOptionalFields(aKPI:ISingleKPI) : ISingleKPI {
    if(!aKPI.hasOwnProperty('description')) {
      aKPI.description = '';
    }
    if(!aKPI.hasOwnProperty('tags')) {
      aKPI.tags = [];
    }
    return aKPI;
  }

  _containsDuplicateIdentifers(kpis:Array<ISingleKPI>) : boolean {
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

function isString(aValue:any) {
   return (typeof aValue === 'string' || aValue instanceof String);
}
