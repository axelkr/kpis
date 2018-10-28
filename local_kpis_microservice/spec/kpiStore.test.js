const KPIStore = require('../src/KPIStore');

function minimalKPI(_id,name,type) {
  return {
    '_id' : _id,
    'name' : name,
    'type' : type
  }
}


test('read: accepts empty list of KPIs', () => {
  var kpis = {kpis:[]};
  var kpiStore = new KPIStore();

  kpiStore.read(kpis);
  expect(kpiStore.availableKPIs().length).toBe(0);
});
