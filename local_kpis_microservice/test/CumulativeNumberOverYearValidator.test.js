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
    {"date" : "15.10.18" , "value" : 13.40},
    {"date" : "15.10.18" , "value" : 19.24},
    {"date" : "04.10.18" , "value" : 12.17}
  ];

  return minimalKPI(123,'name','cumulative_number_over_year',goal,measurements);
}

describe('Validation of KPIs of type cumulative_number_over_year', () => {
  test('isValid: accepts type "cumulative_number_over_year" KPI', () => {
    var aKPI = randomCumulativeNumberOverYearKPI();
    var aCumulativeNumberOverYearValidator = new CumulativeNumberOverYearValidator();
    expect(aCumulativeNumberOverYearValidator.isValid(aKPI)).toBeTruthy();
  });
});

