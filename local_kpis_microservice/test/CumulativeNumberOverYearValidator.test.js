const CumulativeNumberOverYearValidator = require('../src/CumulativeNumberOverYearValidator');

function minimalKPI(_id,name,type,goal,measurements) {
  return {
    '_id' : _id,
    'name' : name,
    'type' : type,
    'goal' : goal,
    'measurements' : measurements
  }
}

function randomCumulativeNumberOverYearKPI() {
  const goal = {"target" : 0};

  const measurements = [
    {"date" : "15.10.18" , "value" : 13.4},
    {"date" : "13.10.18" , "value" : 1.24},
    {"date" : "04.10.18" , "value" : 2.17}
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
    aKPI.measurements = [{"date" : "15.10.18" , "value" : 2}];
    var aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).toBeTruthy();
  });

  test.each([{"value" : 2},{"date" : "15.10.18"}])('isValid: rejects measurement without value or date', (incompleteMeasurement) => {
    var aKPI = randomCumulativeNumberOverYearKPI();
  
    aKPI.measurements = [incompleteMeasurement];
    var aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test.each([{"date" : "15.10.18" , "value" : "2"},{"date" : 2013, "value" : 2}])('isValid: rejects measurement with incorrect types for value or date', (wrongTypeOfMeasurement) => {
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
});
