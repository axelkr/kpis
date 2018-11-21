// @flow
'use strict';

class DataTypeValidator {
  isFloat(aValue:any) {
    return Number.isFinite(aValue);
  }

  isDate(aValue:any) {
    return (typeof aValue === 'string' || aValue instanceof String);
  }
}

module.exports = DataTypeValidator;