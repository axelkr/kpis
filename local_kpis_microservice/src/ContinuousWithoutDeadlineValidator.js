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

    return true;
  }
}

module.exports = ContinuousWithoutDeadlineValidator;