import IKPIValidator from './IKPIValidator';
import ISingleKPI from './ISingleKPI';

export default class KPIStore {
  private _kpis : ISingleKPI[];
  private _kpiValidators : IKPIValidator[];

  constructor(validators: IKPIValidator[]) {
    this._kpis = [];
    if (validators === undefined) {
      this._kpiValidators = [];
    } else {
      this._kpiValidators = validators;
    }
  }

  public getAllKPIs() {
    return this._kpis;
  }

  public read(rawJSONofKPIs:{kpis:ISingleKPI[]}) {
    const updatedKPIs :any = [];
    const self = this;
    rawJSONofKPIs.kpis.forEach((aKPI) => {
      if (!self._isValidKPI(aKPI)) {
        return;
      }
      aKPI = self._addDefaultsForOptionalFields(aKPI);
      updatedKPIs.push(aKPI);
    });

    if (this._containsDuplicateIdentifers(updatedKPIs)) {
     throw new Error("duplicate identifiers");
    }
    this._kpis = updatedKPIs;
  }

  public availableKPIs() {
    const kpiNames:any = [];
    this._kpis.forEach( (element) => {
      const aKPI = {
        _id : element._id,
        type : element.type
      };
      kpiNames.push(aKPI);
    });
    return kpiNames;
  }

  public getKPI(id:number): ISingleKPI {
    let kpi = null;
    this._kpis.forEach((element) => {
      if (element._id === id ) {
        kpi = element;
      }
    });
    return kpi;
  }

  public idExists(id:number) {
    return this._kpis.some( (x) => x._id === id);
  }

  public addMeasurement(id:number,aMeasurement:any) {
    if (!this.isValidMeasurement(id,aMeasurement)) {
      return false;
    }
    this._kpis = this._kpis.map((element) => {
      if (element._id === id  ) {
        element.measurements.push(aMeasurement);
      }
      return element;
    });
  }

  public isValidMeasurement(id:number,aMeasurement:any) {
    if (!this.idExists(id)) {
      return false;
    }
    const aKPI = this.getKPI(id);
    if (aKPI === null || aKPI === undefined) {
      return false;
    }
    return this._kpiValidators.some((x)=> x.isApplicableFor(aKPI) && x.isValidMeasurement(aMeasurement));
  }

  private _isValidKPI(aKPI:ISingleKPI) {
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

    if (!this._kpiValidators.some((x)=>x.isValid(aKPI))) {
      return false;
    }

    return true;
  }

  private _addDefaultsForOptionalFields(aKPI:ISingleKPI) : ISingleKPI {
    if(!aKPI.hasOwnProperty('description')) {
      aKPI.description = '';
    }
    if(!aKPI.hasOwnProperty('tags')) {
      aKPI.tags = [];
    }
    return aKPI;
  }

  private _containsDuplicateIdentifers(kpis:ISingleKPI[]) : boolean {
    const knownIds = kpis.map((x:ISingleKPI) => x._id);
    const duplicateFound = knownIds.some((anId) => {
       return knownIds.filter((x)=> x === anId).length !== 1;
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
