const constructKPIStorage = require('../src/kpis');

describe("Testing kpiSpec", function() {

  it("read: accepts empty list of KPIs", function() {
    var kpis = {kpis:[]};
    var kpiStorage = constructKPIStorage();

    kpiStorage.read(kpis);
    expect(kpiStorage.availableKPIs().length).toBe(0);
  });
});

