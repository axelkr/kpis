export default class DataTypeValidator {
  public isFloat(aValue:any) {
    return Number.isFinite(aValue);
  }

  public isDate(aValue:any) {
    return (typeof aValue === 'string' || aValue instanceof String);
  }
}
