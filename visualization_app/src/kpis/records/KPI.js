// @flow
'use strict';

import Immutable from 'immutable';

class KPI {
  _id;
  name;
  description;
  type;
  tags;
  goal;
  measurements;
}
/*
declare class KPI {
  _id: string;
  name: string;
  description:string;
  type:string;
  tags:Array<string>;
  goal:any;
  measurements:any;

  constructor(data: {
    _id: string;
    name: string;
    description:string;
    type:string;
    tags:Array<string>;
    goal:any;
    measurements:any;
  }): void;

  set(key: '_id', value: string): KPI;
  set(key: 'name', value: string): KPI;
  set(key: 'description', value: string): KPI;
  set(key: 'type', value: string): KPI;
  set(key: 'tags', value: Array<string>): KPI;
  set(key: 'goal', value: any): KPI;
  set(key: 'measurements', value: any): KPI;
}
*/

export default KPI;