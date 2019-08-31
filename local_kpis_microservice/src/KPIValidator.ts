import ISingleKPI from './ISingleKPI';
import IKPIValidator from './IKPIValidator';

export default class KPIValidator implements IKPIValidator {
  private _validatorForType : string;

  constructor(validatorForType:string) {
    this._validatorForType = validatorForType;
  }

  public isApplicableFor(aKPI:ISingleKPI) {
    return aKPI.type === this._validatorForType;
  }

  public isValid(aKPI:ISingleKPI) {
    return true;
  }

  public isValidMeasurement(aMeasurement:any) {
    return true;
  }
}
