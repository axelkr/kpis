// @flow
'use strict';

class CumulativeNumberOverYearValidator {
  constructor() {
  }

  isValid(aKPI:{type:string,goal:any,measurements:any}) {
    if (aKPI.type !== 'cumulative_number_over_year') {
      return false;
    }

    if (!aKPI.goal.hasOwnProperty('target')||!Number.isFinite(aKPI.goal.target)) {
      return false;
    }

    return true;
  }
}

module.exports = CumulativeNumberOverYearValidator;