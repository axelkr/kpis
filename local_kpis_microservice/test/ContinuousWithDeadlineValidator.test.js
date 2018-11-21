const ContinuousWithDeadlineValidator = require('../src/ContinuousWithDeadlineValidator');

function minimalKPI(_id,name,type,goal,measurements) {
  return {
    '_id' : _id,
    'name' : name,
    'type' : type,
    'goal' : goal,
    'measurements' : measurements
  }
}

function randomContinuousWithDeadlineKPI() {
  const goal = {"target" : 0,'targetDate':'2011-08-08'};

  const measurements = [
    {"date" : "2013-02-08" , "value" : 3},
    {"date" : "2013-04-08" , "value" : 2},
    {"date" : "2013-02-18" , "value" : 1}
  ];

  return minimalKPI(123,'name','continuous_with_deadline',goal,measurements);
}

describe('Validation of KPIs of type continuous_with_deadline', () => {
  test('isValid: accepts type "continuous_with_deadline" KPI', () => {
    var aKPI = randomContinuousWithDeadlineKPI();
    var aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });

  test('isValid: accepts empty list of measurements', () => {
    var aKPI = randomContinuousWithDeadlineKPI();
    aKPI.measurements = [];
    var aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });

  test('isValid: accepts list of measurement with value and date', () => {
    var aKPI = randomContinuousWithDeadlineKPI();
    aKPI.measurements = [{"date" : "2013-04-08" , "value" : 2}];
    var aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });

  test.each([{"value" : 2},{"date" : "2013-04-08"}])('isValid: rejects measurement without value or date', (incompleteMeasurement) => {
    var aKPI = randomContinuousWithDeadlineKPI();
  
    aKPI.measurements = [incompleteMeasurement];
    var aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test.each([{"date" : "2013-04-08" , "value" : "2"},{"date" : 2013, "value" : 2}])('isValid: rejects measurement with incorrect types for value or date', (wrongTypeOfMeasurement) => {
    var aKPI = randomContinuousWithDeadlineKPI();
  
    aKPI.measurements = [wrongTypeOfMeasurement];
    var aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });


  test.each([2,undefined,[],'aString'])('isValid: rejects list of measurement with non-object types', (invalidObject) => {
    var aKPI = randomContinuousWithDeadlineKPI();

    aKPI.measurements = [invalidObject];
    var aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test.each(['target','targetDate'])('isValid: rejects KPI if field goal does not contain field %s', (expectedField) => {
    var aKPI = randomContinuousWithDeadlineKPI();

    delete aKPI.goal[expectedField];
    var aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });

 test('isValid: accepts KPI if goal.target is a number', () => {
    var aKPI = randomContinuousWithDeadlineKPI();

    aKPI.goal.target = 42;
    var aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });

  test.each([{},undefined,[],'aString'])('isValid: rejects KPI if goal.target is not a number', (objectNotANumber) => {
    var aKPI = randomContinuousWithDeadlineKPI();

    aKPI.goal.target = objectNotANumber;
    var aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test('isValid: accepts KPI if goal.targetDate is a date', () => {
    var aKPI = randomContinuousWithDeadlineKPI();

    aKPI.goal.targetDate = '2011-11-08';
    var aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });

  test('isValidMeasurement: accepts measurement with value and date', () => {
    var aMeasurement = {"date" : "2013-04-08" , "value" : 2};
    var aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValidMeasurement(aMeasurement)).toBeTruthy();
  });

  test.each([2,undefined,[],'aString'])('isValidMeasurement: rejects measurement with non-object types', (invalidObject) => {
    var aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValidMeasurement(invalidObject)).not.toBeTruthy();
  });

  test.each([{"value" : 2},{"date" : "2013-04-08"}])('isValidMeasurement: rejects measurement without value or date', (incompleteMeasurement) => {
    var aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValidMeasurement(incompleteMeasurement)).not.toBeTruthy();
  });

  test.each([{"date" : "2013-04-08" , "value" : "2"},{"date" : 2013, "value" : 2}])('isValid: rejects measurement with incorrect types for value or date', (wrongTypeOfMeasurement) => {
    var aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValidMeasurement(wrongTypeOfMeasurement)).not.toBeTruthy();
  });
});
