// @flow
'use strict';

import type SingleKPI from './SingleKPI';

class KPIValidator {
  _validatorForType : boolean;
  
  constructor(validatorForType) {
    this._validatorForType = validatorForType;
  }

  isApplicableFor(aKPI:SingleKPI) {
    return aKPI.type === this._validatorForType;
  }

  isValid(aKPI:SingleKPI) {
    return true;
  }

  isValidMeasurement(aMeasurement:any) {
    return true;
  }
}

module.exports = KPIValidator;