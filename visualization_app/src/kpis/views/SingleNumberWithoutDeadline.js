// @flow
'use strict';

import React from 'react';

import type KPI from '../records/KPI';

import '../../App.css';

type SingleNumberWithoutDeadlineProps = {
  KPI: KPI
};

type SingleNumberWithoutDeadlineState = {
};

class SingleNumberWithoutDeadline extends React.Component<SingleNumberWithoutDeadlineProps,SingleNumberWithoutDeadlineState> {
  constructor(props:SingleNumberWithoutDeadlineProps){
    super(props);
  }

  render(){
    return (<label>TBD</label>)
  }
}

export default SingleNumberWithoutDeadline;