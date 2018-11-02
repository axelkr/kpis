// @flow
'use strict';

const KPIValidator = require('./KPIValidator');
import type SingleKPI from './SingleKPI';

class CumulativeNumberOverYearValidator extends KPIValidator {
  constructor() {
    super('cumulative_number_over_year');
  }

  isValid(aKPI:SingleKPI) {
    if (!this.isApplicableFor(aKPI)) {
      return false;
    }

    if (!aKPI.goal.hasOwnProperty('target')||!Number.isFinite(aKPI.goal.target)) {
      return false;
    }
    
    if (!aKPI.measurements.every(this.isValidMeasurement)){
      return false;
    }

    return true;
  }

  isValidMeasurement(aMeasurement:any) {
    if (aMeasurement === null || typeof aMeasurement !== 'object' || aMeasurement === undefined) {
      return false;
    }

    if (!aMeasurement.hasOwnProperty('value')||!Number.isFinite(aMeasurement.value)) {
      return false;
    }

    if (!aMeasurement.hasOwnProperty('date')||!(typeof aMeasurement.date === 'string' || aMeasurement.date instanceof String)) {
      return false;
    }

    return true;
  }
}

module.exports = CumulativeNumberOverYearValidator;