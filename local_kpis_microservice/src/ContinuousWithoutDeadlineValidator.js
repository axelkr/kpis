// @flow
'use strict';

class ContinuousWithoutDeadlineValidator {
  constructor() {
  }

  isValid(aKPI:{type:string,goal:any,measurements:any}) {
    return aKPI.type === 'continuous_without_deadline';
  }
}

module.exports = ContinuousWithoutDeadlineValidator;