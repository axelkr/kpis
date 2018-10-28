// @flow
'use strict';

class SingleKPI {
  _id:number;
  type:string;
  description:string;
  goal:any;
  measurements:any;
  tags:Array<string>
}; 

module.exports = SingleKPI;