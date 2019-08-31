import ContinuousWithDeadlineValidator from './ContinuousWithDeadlineValidator';
import ISingleKPI from './ISingleKPI';

function minimalKPI(_id: any, name: any, type: any, goal: any, measurements: any) {
  const tags: string[] = [];
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

function randomContinuousWithDeadlineKPI(): ISingleKPI {
  const goal = { target: 0, targetDate: '2011-08-08' };

  const measurements = [
    { date: "2013-02-08", value: 3 },
    { date: "2013-04-08", value: 2 },
    { date: "2013-02-18", value: 1 }
  ];

  return minimalKPI(123, 'name', 'continuous_with_deadline', goal, measurements);
}

describe('Validation of KPIs of type continuous_with_deadline', () => {
  test('isValid: accepts type "continuous_with_deadline" KPI', () => {
    const aKPI = randomContinuousWithDeadlineKPI();
    const aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });

  test('isValid: accepts empty list of measurements', () => {
    const aKPI = randomContinuousWithDeadlineKPI();
    aKPI.measurements = [];
    const aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });

  test('isValid: accepts list of measurement with value and date', () => {
    const aKPI = randomContinuousWithDeadlineKPI();
    aKPI.measurements = [{ date: "2013-04-08", value: 2 }];
    const aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });

  test.each([{ value: 2 }, { date: "2013-04-08" }])('isValid: rejects measurement without value or date', (incompleteMeasurement) => {
    const aKPI = randomContinuousWithDeadlineKPI();

    aKPI.measurements = [incompleteMeasurement];
    const aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test.each([{ date: "2013-04-08", value: "2" }, { date: 2013, value: 2 }])('isValid: rejects measurement with incorrect types for value or date', (wrongTypeOfMeasurement) => {
    const aKPI = randomContinuousWithDeadlineKPI();

    aKPI.measurements = [wrongTypeOfMeasurement];
    const aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test.each([2, undefined, [], 'aString'])('isValid: rejects list of measurement with non-object types', (invalidObject) => {
    const aKPI = randomContinuousWithDeadlineKPI();

    aKPI.measurements = [invalidObject];
    const aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test.each(['target', 'targetDate'])('isValid: rejects KPI if field goal does not contain field %s', (expectedField) => {
    const aKPI = randomContinuousWithDeadlineKPI();

    delete aKPI.goal[expectedField];
    const aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test('isValid: accepts KPI if goal.target is a number', () => {
    const aKPI = randomContinuousWithDeadlineKPI();

    aKPI.goal.target = 42;
    const aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });

  test.each([{}, undefined, [], 'aString'])('isValid: rejects KPI if goal.target is not a number', (objectNotANumber) => {
    const aKPI = randomContinuousWithDeadlineKPI();

    aKPI.goal.target = objectNotANumber;
    const aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test('isValid: accepts KPI if goal.targetDate is a date', () => {
    const aKPI = randomContinuousWithDeadlineKPI();

    aKPI.goal.targetDate = '2011-11-08';
    const aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });

  test('isValidMeasurement: accepts measurement with value and date', () => {
    const aMeasurement = { date: "2013-04-08", value: 2 };
    const aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValidMeasurement(aMeasurement)).toBeTruthy();
  });

  test.each([2, undefined, [], 'aString'])('isValidMeasurement: rejects measurement with non-object types', (invalidObject) => {
    const aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValidMeasurement(invalidObject)).not.toBeTruthy();
  });

  test.each([{ value: 2 }, { date: "2013-04-08" }])('isValidMeasurement: rejects measurement without value or date', (incompleteMeasurement) => {
    const aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValidMeasurement(incompleteMeasurement)).not.toBeTruthy();
  });

  test.each([{ date: "2013-04-08", value: "2" }, { date: 2013, value: 2 }])('isValid: rejects measurement with incorrect types for value or date', (wrongTypeOfMeasurement) => {
    const aContinuousWithDeadlineValidator = new ContinuousWithDeadlineValidator();
    expect(aContinuousWithDeadlineValidator.isValidMeasurement(wrongTypeOfMeasurement)).not.toBeTruthy();
  });
});
