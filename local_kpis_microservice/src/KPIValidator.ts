import ISingleKPI from './ISingleKPI';
import IKPIValidator from './IKPIValidator';

export default class KPIValidator implements IKPIValidator {
  private _validatorForType : string;
  
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
