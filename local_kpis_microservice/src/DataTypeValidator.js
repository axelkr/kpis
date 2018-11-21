// @flow
'use strict';

class DataTypeValidator {
  isFloat(aValue:any) {
    return Number.isFinite(aValue);
  }
}

module.exports = DataTypeValidator;