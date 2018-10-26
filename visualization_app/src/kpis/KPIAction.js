// @flow
'use strict';

import type KPI from './records/KPI';

export type KPIAction =

  // Dealing with KPI ids.
  | {
    type: 'ids/start-load',
  }
  | {
    type: 'ids/loaded',
    ids: Array<string>,
  }
  | {
    type: 'ids/load-error',
    error: Error,
  }

  // Reading KPI.
  | {
    type: 'KPI/start-load',
    ids: Array<string>,
  }
  | {
    type: 'KPI/loaded',
    KPI: KPI,
  }
  | {
    type: 'KPI/load-error',
    id: string,
    error: Error,
  }

  // This is a semi-colon, all hail the mighty semi-colon.
  ;
