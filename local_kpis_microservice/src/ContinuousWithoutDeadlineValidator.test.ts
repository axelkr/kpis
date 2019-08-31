import ContinuousWithoutDeadlineValidator from './ContinuousWithoutDeadlineValidator';

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

function randomContinuousWithoutDeadlineKPI() {
  const goal = { target: 0 };

  const measurements = [
    { date: "2013-02-08", value: 3 },
    { date: "2013-04-08", value: 2 },
    { date: "2013-02-18", value: 1 }
  ];

  return minimalKPI(123, 'name', 'continuous_without_deadline', goal, measurements);
}

describe('Validation of KPIs of type continuous_without_deadline', () => {
  test('isValid: accepts type "continuous_without_deadline" KPI', () => {
    const aKPI = randomContinuousWithoutDeadlineKPI();
    const aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });

  test('isValid: accepts empty list of measurements', () => {
    const aKPI = randomContinuousWithoutDeadlineKPI();
    aKPI.measurements = [];
    const aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });

  test('isValid: accepts list of measurement with value and date', () => {
    const aKPI = randomContinuousWithoutDeadlineKPI();
    aKPI.measurements = [{ date: "2013-04-08", value: 2 }];
    const aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });

  test.each([{ value: 2 }, { date: "2013-04-08" }])('isValid: rejects measurement without value or date', (incompleteMeasurement) => {
    const aKPI = randomContinuousWithoutDeadlineKPI();

    aKPI.measurements = [incompleteMeasurement];
    const aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test.each([{ date: "2013-04-08", value: "2" }, { date: 2013, value: 2 }])('isValid: rejects measurement with incorrect types for value or date', (wrongTypeOfMeasurement) => {
    const aKPI = randomContinuousWithoutDeadlineKPI();

    aKPI.measurements = [wrongTypeOfMeasurement];
    const aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test.each([2, undefined, [], 'aString'])('isValid: rejects list of measurement with non-object types', (invalidObject) => {
    const aKPI = randomContinuousWithoutDeadlineKPI();

    aKPI.measurements = [invalidObject];
    const aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test('isValid: rejects KPI if field goal does not contain a field target', () => {
    const aKPI = randomContinuousWithoutDeadlineKPI();

    delete aKPI.goal.target;
    const aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test('isValid: accepts KPI if goal.target is a number', () => {
    const aKPI = randomContinuousWithoutDeadlineKPI();

    aKPI.goal.target = 42;
    const aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });

  test.each([{}, undefined, [], 'aString'])('isValid: rejects KPI if goal.target is not a number', (objectNotANumber) => {
    const aKPI = randomContinuousWithoutDeadlineKPI();

    aKPI.goal.target = objectNotANumber;
    const aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).not.toBeTruthy();
  });

  test('isValidMeasurement: accepts measurement with value and date', () => {
    const aMeasurement = { date: "2013-04-08", value: 2 };
    const aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValidMeasurement(aMeasurement)).toBeTruthy();
  });

  test.each([2, undefined, [], 'aString'])('isValidMeasurement: rejects measurement with non-object types', (invalidObject) => {
    const aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValidMeasurement(invalidObject)).not.toBeTruthy();
  });

  test.each([{ value: 2 }, { date: "2013-04-08" }])('isValidMeasurement: rejects measurement without value or date', (incompleteMeasurement) => {
    const aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValidMeasurement(incompleteMeasurement)).not.toBeTruthy();
  });

  test.each([{ date: "2013-04-08", value: "2" }, { date: 2013, value: 2 }])('isValid: rejects measurement with incorrect types for value or date', (wrongTypeOfMeasurement) => {
    const aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValidMeasurement(wrongTypeOfMeasurement)).not.toBeTruthy();
  });
});
