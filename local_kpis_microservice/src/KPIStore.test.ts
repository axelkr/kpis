import KPIStore from './KPIStore';
import IKPIValidator from './IKPIValidator';

class MockValidator implements IKPIValidator {
  public isValid(aKPI:{type:string,goal:any,measurements:any}) {
    return aKPI.type === 'mockKPI';
  }

  public isValidMeasurement(aMeasurement:any) {
    return true;
  }

  public isApplicableFor(aMeasurement:any) {
    return true;
  }
}

const aValidator = new MockValidator();

function minimalKPI(_id:any,name:any,type:any,goal:any,measurements:any) {
  const tags : string[] = [];
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

function randomKPI() {
  return minimalKPI(123,'name','mockKPI',{},[]);
}

describe('Behaviour common to all types of KPIs', () => {
  test('read: accepts empty list of KPIs', () => {
    const kpis : any= {kpis:[]};
    const kpiStore = new KPIStore([aValidator]);

    kpiStore.read(kpis);
    expect(kpiStore.availableKPIs().length).toBe(0);
  });

  test('read: adds optional field description as empty string', () => {
    const aKPI = randomKPI();
    if (aKPI.hasOwnProperty('description')) {
      delete aKPI.description;
    }
    const kpis = {kpis:[aKPI]};

    const kpiStore = new KPIStore([aValidator]);
    kpiStore.read(kpis);

    const storedKPI = kpiStore.getKPI(aKPI._id);

    expect(storedKPI.hasOwnProperty('description')).toBeTruthy();
    expect(storedKPI.description).toBeDefined();
    expect(storedKPI.description).toEqual('');
  });

  test('read: adds optional field tags as empty string', () => {
    const aKPI = randomKPI();
    if (aKPI.hasOwnProperty('tags')) {
      delete aKPI.tags;
    }
    const kpis = {kpis:[aKPI]};

    const kpiStore = new KPIStore([aValidator]);
    kpiStore.read(kpis);

    const storedKPI = kpiStore.getKPI(aKPI._id);

    expect(storedKPI.hasOwnProperty('tags')).toBeTruthy();
    expect(storedKPI.tags).toBeDefined();
    expect(storedKPI.tags).toEqual([]);
  });

  test.each(['_id','name','type','measurements','goal'])('read: ignores KPI without mandatory field %s', (field) => {
    const aKPI : any = randomKPI();
    const kpiStore = new KPIStore([aValidator]);

    delete aKPI[field];
    kpiStore.read({kpis:[aKPI]});
    expect(kpiStore.availableKPIs().length).toBe(0);
  });

  test('read: ignores KPI where _id is not a positive number', () => {
    const aKPI = randomKPI();
    const kpiStore = new KPIStore([aValidator]);

    aKPI._id = undefined;
    kpiStore.read({kpis:[aKPI]});
    expect(kpiStore.availableKPIs().length).toBe(0);

    aKPI._id = 'aString';
    kpiStore.read({kpis:[aKPI]});
    expect(kpiStore.availableKPIs().length).toBe(0);

    aKPI._id = [];
    kpiStore.read({kpis:[aKPI]});
    expect(kpiStore.availableKPIs().length).toBe(0);

    aKPI._id = -2;
    kpiStore.read({kpis:[aKPI]});
    expect(kpiStore.availableKPIs().length).toBe(0);
  });

  test.each(['name','type','description'])('read: ignores KPI where %s is not a string', (field) => {
    const aKPI : any = randomKPI();
    const kpiStore = new KPIStore([aValidator]);

    aKPI[field] = undefined;
    kpiStore.read({kpis:[aKPI]});
    expect(kpiStore.availableKPIs().length).toBe(0);

    aKPI[field] = 42;
    kpiStore.read({kpis:[aKPI]});
    expect(kpiStore.availableKPIs().length).toBe(0);

    aKPI[field] = [];
    kpiStore.read({kpis:[aKPI]});
    expect(kpiStore.availableKPIs().length).toBe(0);
  });

  test('read: ignores KPI where type is not a know type description', () => {
    const aKPI = randomKPI();
    const kpiStore = new KPIStore([aValidator]);

    aKPI.type = 'someRandomString';
    kpiStore.read({kpis:[aKPI]});
    expect(kpiStore.availableKPIs().length).toBe(0);
  });

  test('read: ignores KPI where tags is not an array of string', () => {
    const aKPI : any = randomKPI();
    const kpiStore = new KPIStore([aValidator]);

    aKPI.tags = undefined;
    kpiStore.read({kpis:[aKPI]});
    expect(kpiStore.availableKPIs().length).toBe(0);

    aKPI.tags = 42;
    kpiStore.read({kpis:[aKPI]});
    expect(kpiStore.availableKPIs().length).toBe(0);

    aKPI.tags = 'aRandomString';
    kpiStore.read({kpis:[aKPI]});
    expect(kpiStore.availableKPIs().length).toBe(0);

    aKPI.tags = ['aString',42];
    kpiStore.read({kpis:[aKPI]});
    expect(kpiStore.availableKPIs().length).toBe(0);
  });

  test('read: rejects KPIs with identical _id', () => {
    const aKPI = randomKPI();
    const anotherKPI = randomKPI();
    aKPI._id = 42;
    anotherKPI._id = 42;

    const kpiStore = new KPIStore([aValidator]);

    function readDuplicateKPIs() {
      kpiStore.read({kpis:[aKPI,anotherKPI]});
    }

    expect(readDuplicateKPIs).toThrow();
  });

  test('idExists: rejects unknown id', () => {
    const aKPI = randomKPI();
    aKPI._id = 42;

    const kpiStore = new KPIStore([aValidator]);
    kpiStore.read({kpis:[aKPI]});

    expect(kpiStore.idExists(5)).not.toBeTruthy();
  });

  test('idExists: accepts known id', () => {
    const aKPI = randomKPI();
    aKPI._id = 42;

    const kpiStore = new KPIStore([aValidator]);
    kpiStore.read({kpis:[aKPI]});

    expect(kpiStore.idExists(aKPI._id)).toBeTruthy();
  });
});
