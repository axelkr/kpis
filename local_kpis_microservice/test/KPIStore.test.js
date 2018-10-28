const KPIStore = require('../src/KPIStore');

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

function randomCumulativeNumberOverYearKPI() {
  const goal = {"target" : 0};

  const measurements = [
    {"date" : "15.10.18" , "value" : 13.40},
    {"date" : "15.10.18" , "value" : 19.24},
    {"date" : "04.10.18" , "value" : 12.17}
  ];

  return minimalKPI(123,'name','cumulative_number_over_year',goal,measurements);
}

test('read: accepts empty list of KPIs', () => {
  var kpis = {kpis:[]};
  var kpiStore = new KPIStore();

  kpiStore.read(kpis);
  expect(kpiStore.availableKPIs().length).toBe(0);
});

test('read: accepts valid continous_without_deadline KPI', () => {
  var kpis = {kpis:[randomContinuousWithoutDeadlineKPI()]};
  var kpiStore = new KPIStore();

  kpiStore.read(kpis);
  expect(kpiStore.availableKPIs().length).toBe(1);
});

test('read: accepts valid cumulative_number_over_year KPI', () => {
  var kpis = {kpis:[randomCumulativeNumberOverYearKPI()]};
  var kpiStore = new KPIStore();

  kpiStore.read(kpis);
  expect(kpiStore.availableKPIs().length).toBe(1);
});

test('read: adds optional field description as empty string', () => {
  const aKPI = randomCumulativeNumberOverYearKPI();
  if (aKPI.hasOwnProperty('description')) {
    delete aKPI.description;
  }
  var kpis = {kpis:[aKPI]};
  
  var kpiStore = new KPIStore();
  kpiStore.read(kpis);

  var storedKPI = kpiStore.getKPI(aKPI._id);

  expect(storedKPI.hasOwnProperty('description')).toBeTruthy();
  expect(storedKPI.description).toBeDefined();
  expect(storedKPI.description).toEqual('');
});

test('read: adds optional field tags as empty string', () => {
  const aKPI = randomCumulativeNumberOverYearKPI();
  if (aKPI.hasOwnProperty('tags')) {
    delete aKPI.tags;
  }
  var kpis = {kpis:[aKPI]};
  
  var kpiStore = new KPIStore();
  kpiStore.read(kpis);

  var storedKPI = kpiStore.getKPI(aKPI._id);

  expect(storedKPI.hasOwnProperty('tags')).toBeTruthy();
  expect(storedKPI.tags).toBeDefined();
  expect(storedKPI.tags).toEqual([]);
});

test('read: ignores KPI where _id is not a number', () => {
  const aKPI = randomCumulativeNumberOverYearKPI();
  var kpiStore = new KPIStore();

  delete aKPI._id;
  kpiStore.read({kpis:[aKPI]});
  expect(kpiStore.availableKPIs().length).toBe(0);

  aKPI._id = undefined;
  kpiStore.read({kpis:[aKPI]});
  expect(kpiStore.availableKPIs().length).toBe(0);

  aKPI._id = 'aString';
  kpiStore.read({kpis:[aKPI]});
  expect(kpiStore.availableKPIs().length).toBe(0);

  aKPI._id = [];
  kpiStore.read({kpis:[aKPI]});
  expect(kpiStore.availableKPIs().length).toBe(0);
});

test('read: ignores KPI where _id is not a positive number', () => {
  const aKPI = randomCumulativeNumberOverYearKPI();
  var kpiStore = new KPIStore();

  aKPI._id = -2;
  kpiStore.read({kpis:[aKPI]});
  expect(kpiStore.availableKPIs().length).toBe(0);
});


test('read: ignores KPI where name is not a string', () => {
  const aKPI = randomCumulativeNumberOverYearKPI();
  var kpiStore = new KPIStore();

  delete aKPI.name;
  kpiStore.read({kpis:[aKPI]});
  expect(kpiStore.availableKPIs().length).toBe(0);

  aKPI.name = undefined;
  kpiStore.read({kpis:[aKPI]});
  expect(kpiStore.availableKPIs().length).toBe(0);

  aKPI.name = 42;
  kpiStore.read({kpis:[aKPI]});
  expect(kpiStore.availableKPIs().length).toBe(0);

  aKPI.name = [];
  kpiStore.read({kpis:[aKPI]});
  expect(kpiStore.availableKPIs().length).toBe(0);
});