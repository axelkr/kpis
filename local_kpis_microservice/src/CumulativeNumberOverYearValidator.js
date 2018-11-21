// @flow
'use strict';

const DataTypeValidator = require('./DataTypeValidator');
const KPIValidator = require('./KPIValidator');
import type SingleKPI from './SingleKPI';

class CumulativeNumberOverYearValidator extends KPIValidator {
  constructor() {
    super('cumulative_number_over_year');
  }

  isValid(aKPI:SingleKPI) {
    const dataTypeValidator = new DataTypeValidator();
    if (!this.isApplicableFor(aKPI)) {
      return false;
    }

    if (!aKPI.goal.hasOwnProperty('target')||!dataTypeValidator.isFloat(aKPI.goal.target)) {
      return false;
    }
    
    if (!aKPI.measurements.every(this.isValidMeasurement)){
      return false;
    }

    return true;
  }

  isValidMeasurement(aMeasurement:any) {
    const dataTypeValidator = new DataTypeValidator();
    if (aMeasurement === null || typeof aMeasurement !== 'object' || aMeasurement === undefined) {
      return false;
    }

    if (!aMeasurement.hasOwnProperty('value')||!dataTypeValidator.isFloat(aMeasurement.value)) {
      return false;
    }

    if (!aMeasurement.hasOwnProperty('date')||!(typeof aMeasurement.date === 'string' || aMeasurement.date instanceof String)) {
      return false;
    }

    return true;
  }
}

module.exports = CumulativeNumberOverYearValidator;