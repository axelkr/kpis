import ISingleKPI from './ISingleKPI';

export default class KPIValidator {
  _validatorForType : string;
  
  constructor(validatorForType:string) {
    this._validatorForType = validatorForType;
  }

  isApplicableFor(aKPI:ISingleKPI) {
    return aKPI.type === this._validatorForType;
  }

  isValid(aKPI:ISingleKPI) {
    return true;
  }

  isValidMeasurement(aMeasurement:any) {
    return true;
  }
}
