import DataTypeValidator from './DataTypeValidator';

describe('Validation of data types', () => {
  test('isFloat: accepts a number', () => {
    const aDataTypeValidator = new DataTypeValidator();
    expect(aDataTypeValidator.isFloat(42)).toBeTruthy();
  });

  test.each([{},undefined,[],'aString'])('isFloat: rejects if value is not a number', (objectNotANumber) => {
    const aDataTypeValidator = new DataTypeValidator();
    expect(aDataTypeValidator.isFloat(objectNotANumber)).not.toBeTruthy();
  });

  test('isDate: accepts a date', () => {
    const aDataTypeValidator = new DataTypeValidator();
    expect(aDataTypeValidator.isDate("2018-02-18")).toBeTruthy();
    expect(aDataTypeValidator.isDate("18.02.2018")).toBeTruthy();
    expect(aDataTypeValidator.isDate("18.02.18")).toBeTruthy();
  });

  test.each([{},undefined,[],42])('isDate: rejects if value is not a date', (objectNotADate) => {
    const aDataTypeValidator = new DataTypeValidator();
    expect(aDataTypeValidator.isDate(objectNotADate)).not.toBeTruthy();
  });
});
