// @flow
'use strict';

class CumulativeNumberOverYearValidator {
  constructor() {
  }

  isValid(aKPI:{type:string,goal:any,measurements:any}) {
    return type === 'cumulative_number_over_year';
  }
}

module.exports = new CumulativeNumberOverYearValidator();