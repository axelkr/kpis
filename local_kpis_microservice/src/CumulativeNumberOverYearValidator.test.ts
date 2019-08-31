import CumulativeNumberOverYearValidator from './CumulativeNumberOverYearValidator';
import ISingleKPI from './ISingleKPI';

function minimalKPI(_id:any,name:any,type:any,goal:any,measurements:any) {
  const tags : string[] = [];
  return {
    _id,
    name,
    type,
    goal,
    measurements,
    description: '',
    tags
  };
}

function randomCumulativeNumberOverYearKPI() : ISingleKPI {
  const goal = {target : 0};

  const measurements = [
    {date : "15.10.18" , value : 13.4},
    {date : "13.10.18" , value : 1.24},
    {date : "04.10.18" , value : 2.17}
  ];

  return minimalKPI(123,'name','cumulative_number_over_year',goal,measurements);
}

describe('Validation of KPIs of type cumulative_number_over_year', () => {
  test('isValid: accepts type "cumulative_number_over_year" KPI', () => {
    const aKPI = randomCumulativeNumberOverYearKPI();
    const aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).toBeTruthy();
  });

  test('isValid: accepts empty list of measurements', () => {
    const aKPI = randomCumulativeNumberOverYearKPI();
    aKPI.measurements = [];
    const aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).toBeTruthy();
  });

  test('isValid: accepts list of measurement with value and date', () => {
    const aKPI = randomCumulativeNumberOverYearKPI();
    aKPI.measurements = [{date : "15.10.18" , value : 2}];
    const aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).toBeTruthy();
  });

  test.each([{value : 2},{date : "15.10.18"}])('isValid: rejects measurement without value or date', (incompleteMeasurement) => {
    const aKPI = randomCumulativeNumberOverYearKPI();

    aKPI.measurements = [incompleteMeasurement];
    const aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test.each([{date : "15.10.18" , value : "2"},{date : 2013, value : 2}])('isValid: rejects measurement with incorrect types for value or date', (wrongTypeOfMeasurement) => {
    const aKPI = randomCumulativeNumberOverYearKPI();

    aKPI.measurements = [wrongTypeOfMeasurement];
    const aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test.each([2,undefined,[],'aString'])('isValid: rejects list of measurement with non-object types', (invalidObject) => {
    const aKPI = randomCumulativeNumberOverYearKPI();

    aKPI.measurements = [invalidObject];
    const aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test('isValid: rejects KPI if field goal does not contain a field target', () => {
    const aKPI = randomCumulativeNumberOverYearKPI();

    delete aKPI.goal.target;
    const aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test('isValid: accepts KPI if goal.target is a number', () => {
    const aKPI = randomCumulativeNumberOverYearKPI();

    aKPI.goal.target = 42;
    const aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).toBeTruthy();
  });

  test.each([{},undefined,[],'aString'])('isValid: rejects KPI if goal.target is not a number', (objectNotANumber) => {
    const aKPI = randomCumulativeNumberOverYearKPI();

    aKPI.goal.target = objectNotANumber;
    const aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test('isValidMeasurement: accepts measurement with value and date', () => {
    const aMeasurement = {date : "15.10.18" , value : 2};
    const aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValidMeasurement(aMeasurement)).toBeTruthy();
  });

  test.each([2,undefined,[],'aString'])('isValidMeasurement: rejects measurement with non-object types', (invalidObject) => {
    const aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValidMeasurement(invalidObject)).not.toBeTruthy();
  });

  test.each([{value : 2},{date : "15.10.18"}])('isValidMeasurement: rejects measurement without value or date', (incompleteMeasurement) => {
    const aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValidMeasurement(incompleteMeasurement)).not.toBeTruthy();
  });

  test.each([{date : "15.10.18" , value : "2"},{date : 2013, value : 2}])('isValid: rejects measurement with incorrect types for value or date', (wrongTypeOfMeasurement) => {
    const aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValidMeasurement(wrongTypeOfMeasurement)).not.toBeTruthy();
  });
});
