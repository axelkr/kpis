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
  test('isValid: accepts type "continuous_without_deadline KPI"', () => {
    var aKPI = randomContinuousWithoutDeadlineKPI();
    var aContinuousWithoutDeadlineValidator = new ContinuousWithoutDeadlineValidator();
    expect(aContinuousWithoutDeadlineValidator.isValid(aKPI)).toBeTruthy();
  });
});
