import DataTypeValidator from './DataTypeValidator';
import KPIValidator from './KPIValidator';
import ISingleKPI from './ISingleKPI';

export default class SprintBurndownValidator extends KPIValidator {
  constructor() {
    super('sprint_burndown');
  }

  isValid(aKPI:ISingleKPI) {
    if (!this.isApplicableFor(aKPI)) {
      return false;
    }

    return true;
  }

  isValidMeasurement(aMeasurement:any) {
    return true;
  }
}
