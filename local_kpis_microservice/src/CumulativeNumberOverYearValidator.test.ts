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

function randomCumulativeNumberOverYearKPI() : ISingleKPI{
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
    var aKPI = randomCumulativeNumberOverYearKPI();
    var aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).toBeTruthy();
  });

  test('isValid: accepts empty list of measurements', () => {
    var aKPI = randomCumulativeNumberOverYearKPI();
    aKPI.measurements = [];
    var aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).toBeTruthy();
  });

  test('isValid: accepts list of measurement with value and date', () => {
    var aKPI = randomCumulativeNumberOverYearKPI();
    aKPI.measurements = [{date : "15.10.18" , value : 2}];
    var aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).toBeTruthy();
  });

  test.each([{value : 2},{date : "15.10.18"}])('isValid: rejects measurement without value or date', (incompleteMeasurement) => {
    var aKPI = randomCumulativeNumberOverYearKPI();
  
    aKPI.measurements = [incompleteMeasurement];
    var aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test.each([{date : "15.10.18" , value : "2"},{date : 2013, value : 2}])('isValid: rejects measurement with incorrect types for value or date', (wrongTypeOfMeasurement) => {
    var aKPI = randomCumulativeNumberOverYearKPI();
  
    aKPI.measurements = [wrongTypeOfMeasurement];
    var aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).not.toBeTruthy();
  });


  test.each([2,undefined,[],'aString'])('isValid: rejects list of measurement with non-object types', (invalidObject) => {
    var aKPI = randomCumulativeNumberOverYearKPI();

    aKPI.measurements = [invalidObject];
    var aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test('isValid: rejects KPI if field goal does not contain a field target', () => {
    var aKPI = randomCumulativeNumberOverYearKPI();

    delete aKPI.goal.target;
    var aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test('isValid: accepts KPI if goal.target is a number', () => {
    var aKPI = randomCumulativeNumberOverYearKPI();

    aKPI.goal.target = 42;
    var aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).toBeTruthy();
  });

  test.each([{},undefined,[],'aString'])('isValid: rejects KPI if goal.target is not a number', (objectNotANumber) => {
    var aKPI = randomCumulativeNumberOverYearKPI();

    aKPI.goal.target = objectNotANumber;
    var aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test('isValidMeasurement: accepts measurement with value and date', () => {
    var aMeasurement = {date : "15.10.18" , value : 2};
    var aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValidMeasurement(aMeasurement)).toBeTruthy();
  });

  test.each([2,undefined,[],'aString'])('isValidMeasurement: rejects measurement with non-object types', (invalidObject) => {
    var aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValidMeasurement(invalidObject)).not.toBeTruthy();
  });

  test.each([{value : 2},{date : "15.10.18"}])('isValidMeasurement: rejects measurement without value or date', (incompleteMeasurement) => {
    var aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValidMeasurement(incompleteMeasurement)).not.toBeTruthy();
  });

  test.each([{date : "15.10.18" , value : "2"},{date : 2013, value : 2}])('isValid: rejects measurement with incorrect types for value or date', (wrongTypeOfMeasurement) => {
    var aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValidMeasurement(wrongTypeOfMeasurement)).not.toBeTruthy();
  });
});

