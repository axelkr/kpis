const KPIStore = require('../src/KPIStore');

test('read: accepts empty list of KPIs', () => {
  var kpis = {kpis:[]};
  var kpiStore = new KPIStore();

  kpiStore.read(kpis);
  expect(kpiStore.availableKPIs().length).toBe(0);
});
