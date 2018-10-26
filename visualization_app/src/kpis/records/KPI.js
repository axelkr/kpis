// @flow
'use strict';

import Immutable from 'immutable';

declare class KPI {
  _id: string;
  name: string;

  constructor(data: {
    _id: string;
    name: string;
  }): void;

  set(key: '_id', value: string): KPI;
  set(key: 'name', value: string): KPI;
}

// $FlowExpectedError: Intentional rebinding for flow.
const KPI = Immutable.Record({
  _id: '',
  name: '',
});

export default KPI;