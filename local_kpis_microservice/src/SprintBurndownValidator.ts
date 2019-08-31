import KPIValidator from './KPIValidator';
import ISingleKPI from './ISingleKPI';

export default class SprintBurndownValidator extends KPIValidator {
  constructor() {
    super('sprint_burndown');
  }

  public isValid(aKPI:ISingleKPI) {
    if (!this.isApplicableFor(aKPI)) {
      return false;
    }

    return true;
  }

  public isValidMeasurement(aMeasurement:any) {
    return true;
  }
}
