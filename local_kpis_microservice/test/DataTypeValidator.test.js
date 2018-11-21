const DataTypeValidator = require('../src/DataTypeValidator');

describe('Validation of data types', () => {
  test('isFloat: accepts a number', () => {
    var aDataTypeValidator = new DataTypeValidator();
    expect(aDataTypeValidator.isFloat(42)).toBeTruthy();
  });

  test.each([{},undefined,[],'aString'])('isFloat: rejects if value is not a number', (objectNotANumber) => {
    var aDataTypeValidator = new DataTypeValidator();
    expect(aDataTypeValidator.isFloat(objectNotANumber)).not.toBeTruthy();
  });
});
