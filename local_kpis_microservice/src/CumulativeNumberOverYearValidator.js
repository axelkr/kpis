// @flow
'use strict';

const KPIValidator = require('./KPIValidator');
import type SingleKPI from './SingleKPI';

class CumulativeNumberOverYearValidator extends KPIValidator {
  constructor() {
    super();
  }

  isValid(aKPI:SingleKPI) {
    if (aKPI.type !== 'cumulative_number_over_year') {
      return false;
    }

    if (!aKPI.goal.hasOwnProperty('target')||!Number.isFinite(aKPI.goal.target)) {
      return false;
    }
    
    if (!aKPI.measurements.every(isValidMeasurement)){
      return false;
    }

    return true;
  }
}


function isValidMeasurement(aMeasurement) {
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

module.exports = CumulativeNumberOverYearValidator;