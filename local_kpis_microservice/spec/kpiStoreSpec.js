const KPIStore = require('../src/KPIStore');

describe("Testing KPIStore", function() {

  it("read: accepts empty list of KPIs", function() {
    var kpis = {kpis:[]};
    var kpiStore = new KPIStore();

    kpiStore.read(kpis);
    expect(kpiStore.availableKPIs().length).toBe(0);
  });
});
