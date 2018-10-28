// @flow
'use strict';

class ContinuousWithoutDeadlineValidator {
  constructor() {
  }

  isValid(aKPI:{type:string,goal:any,measurements:any}) {
    if (aKPI.type !== 'continuous_without_deadline') {
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

module.exports = ContinuousWithoutDeadlineValidator;