const ContinuousWithoutDeadlineValidator = require('../src/ContinuousWithoutDeadlineValidator');

function minimalKPI(_id,name,type,goal,measurements) {
  return {
    '_id' : _id,
    'name' : name,
    'type' : type,
    'goal' : goal,
    'measurements' : measurements
  }
}

function randomContinuousWithoutDeadlineKPI() {
  const goal = {"target" : 0};

  const measurements = [
    {"date" : "2013-02-08" , "value" : 3},
    {"date" : "2013-04-08" , "value" : 2},
    {"date" : "2013-02-18" , "value" : 1}
  ];

  return minimalKPI(123,'name','continuous_without_deadline',goal,measurements);
}

describe('Validation of KPIs of type continuous_without_deadline', () => {
  test('isValid: accepts type "continuous_without_deadline" KPI', () => {
    var aKPI = randomContinuousWithoutDeadlineKPI();
    var aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });

  test('isValid: accepts empty list of measurements', () => {
    var aKPI = randomContinuousWithoutDeadlineKPI();
    aKPI.measurements = [];
    var aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });

  test('isValid: accepts list of measurement with value and date', () => {
    var aKPI = randomContinuousWithoutDeadlineKPI();
    aKPI.measurements = [{"date" : "2013-04-08" , "value" : 2}];
    var aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });

  test.each([{"value" : 2},{"date" : "2013-04-08"}])('isValid: rejects measurement without value or date', (incompleteMeasurement) => {
    var aKPI = randomContinuousWithoutDeadlineKPI();
  
    aKPI.measurements = [incompleteMeasurement];
    var aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test.each([{"date" : "2013-04-08" , "value" : "2"},{"date" : 2013, "value" : 2}])('isValid: rejects measurement with incorrect types for value or date', (wrongTypeOfMeasurement) => {
    var aKPI = randomContinuousWithoutDeadlineKPI();
  
    aKPI.measurements = [wrongTypeOfMeasurement];
    var aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });


  test.each([2,undefined,[],'aString'])('isValid: rejects list of measurement with non-object types', (invalidObject) => {
    var aKPI = randomContinuousWithoutDeadlineKPI();

    aKPI.measurements = [invalidObject];
    var aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test('isValid: rejects KPI if field goal does not contain a field target', () => {
    var aKPI = randomContinuousWithoutDeadlineKPI();

    delete aKPI.goal.target;
    var aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });

 test('isValid: accepts KPI if goal.target is a number', () => {
    var aKPI = randomContinuousWithoutDeadlineKPI();

    aKPI.goal.target = 42;
    var aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });

  test.each([{},undefined,[],'aString'])('isValid: rejects KPI if goal.target is not a number', (objectNotANumber) => {
    var aKPI = randomContinuousWithoutDeadlineKPI();

    aKPI.goal.target = objectNotANumber;
    var aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test('isValidMeasurement: accepts measurement with value and date', () => {
    var aMeasurement = {"date" : "2013-04-08" , "value" : 2};
    var aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValidMeasurement(aMeasurement)).toBeTruthy();
  });

  test.each([2,undefined,[],'aString'])('isValidMeasurement: rejects measurement with non-object types', (invalidObject) => {
    var aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValidMeasurement(invalidObject)).not.toBeTruthy();
  });

  test.each([{"value" : 2},{"date" : "2013-04-08"}])('isValidMeasurement: rejects measurement without value or date', (incompleteMeasurement) => {
    var aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValidMeasurement(incompleteMeasurement)).not.toBeTruthy();
  });

  test.each([{"date" : "2013-04-08" , "value" : "2"},{"date" : 2013, "value" : 2}])('isValid: rejects measurement with incorrect types for value or date', (wrongTypeOfMeasurement) => {
    var aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValidMeasurement(wrongTypeOfMeasurement)).not.toBeTruthy();
  });
});
