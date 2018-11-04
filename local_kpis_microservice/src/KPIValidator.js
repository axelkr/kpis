// @flow
'use strict';

import type SingleKPI from './SingleKPI';

class KPIValidator {
  _validatorForType : string;
  
  constructor(validatorForType:string) {
    this._validatorForType = validatorForType;
  }

  isApplicableFor(aKPI:SingleKPI) {
    return aKPI.type === this._validatorForType;
  }

  isValid(aKPI:SingleKPI) { // eslint-disable-line no-unused-vars
    return true;
  }

  isValidMeasurement(aMeasurement:any) { // eslint-disable-line no-unused-vars
    return true;
  }
}

module.exports = KPIValidator;