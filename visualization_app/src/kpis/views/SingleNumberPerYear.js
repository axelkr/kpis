// @flow
'use strict';

import React from 'react';

import type KPI from '../records/KPI';

import '../../App.css';

type SingleNumberPerYearProps = {
  KPI: KPI
};

type SingleNumberPerYearState = {
};

class SingleNumberPerYear extends React.Component<SingleNumberPerYearProps,SingleNumberPerYearState> {
  constructor(props:SingleNumberPerYearProps){
    super(props);
  }

  render(){
    return (<label>{this.props.KPI.name}</label>)
  }
}

export default SingleNumberPerYear;