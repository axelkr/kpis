// @flow
'use strict';

import React from 'react';
import * as d3 from 'd3';

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
    var currentValue = this.latestValue(this.props.KPI.measurements);
    return (
      <div>{currentValue}(goal {this.props.KPI.goal.target})</div>
    )
  }

  latestValue(measurements) {
    if (measurements.length == 0) {
      return "-";
    }
    
    var parseTime = d3.timeParse("%Y-%m-%d");
    var latestValue = measurements[0].value;
    var latestDate  = parseTime(measurements[0].date);
    
    measurements.forEach(function(element) {
      var dateElement = parseTime(element.date);
      if (dateElement > latestDate) {
        latestDate = dateElement;
        latestValue = element.value;
      }
    })
    return parseFloat(latestValue);
  }
}

export default SingleNumberWithoutDeadline;
  