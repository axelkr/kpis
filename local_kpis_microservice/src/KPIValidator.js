// @flow
'use strict';

import type SingleKPI from './SingleKPI';

class KPIValidator {
  constructor() {
  }

  isValid(aKPI:SingleKPI) {
    return true;
  }

  isValidMeasurement(aMeasurement:any) {
    return true;
  }
}

module.exports = KPIValidator;