import DataTypeValidator from './DataTypeValidator';
import KPIValidator from './KPIValidator';
import ISingleKPI from './ISingleKPI';

export default class ContinuousWithDeadlineValidator extends KPIValidator {
  constructor() {
    super('continuous_with_deadline');
  }

  public isValid(aKPI:ISingleKPI) {
    const dataTypeValidator = new DataTypeValidator();
    if (!this.isApplicableFor(aKPI)) {
      return false;
    }

    if (!aKPI.goal.hasOwnProperty('target')||!dataTypeValidator.isFloat(aKPI.goal.target)) {
      return false;
    }

    if (!aKPI.goal.hasOwnProperty('targetDate')||!dataTypeValidator.isDate(aKPI.goal.targetDate)) {
      return false;
    }

    if (!aKPI.measurements.every(this.isValidMeasurement)) {
      return false;
    }

    return true;
  }

  public isValidMeasurement(aMeasurement:any) {
    const dataTypeValidator = new DataTypeValidator();
    if (aMeasurement === null || typeof aMeasurement !== 'object' || aMeasurement === undefined) {
      return false;
    }

    if (!aMeasurement.hasOwnProperty('value')|| !dataTypeValidator.isFloat(aMeasurement.value)) {
      return false;
    }

    if (!aMeasurement.hasOwnProperty('date')||!dataTypeValidator.isDate(aMeasurement.date)) {
      return false;
    }

    return true;
  }
}
