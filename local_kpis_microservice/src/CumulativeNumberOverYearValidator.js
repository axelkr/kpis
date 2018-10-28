// @flow
'use strict';

class CumulativeNumberOverYearValidator {
  constructor() {
  }

  isValid(aKPI:{type:string,goal:any,measurements:any}) {
    return aKPI.type === 'cumulative_number_over_year';
  }
}

module.exports = CumulativeNumberOverYearValidator;