// @flow
'use strict';

import React from 'react';
import * as d3 from 'd3';

import type KPI from '../records/KPI';
import type LoadObject from '../../utils/LoadObject';

import '../../App.css';

type SingleNumberWithoutDeadlineProps = {
  KPI: LoadObject<KPI>
};

type SingleNumberWithoutDeadlineState = {
};

class SingleNumberWithoutDeadline extends React.Component<SingleNumberWithoutDeadlineProps,SingleNumberWithoutDeadlineState> {
  constructor(props:SingleNumberWithoutDeadlineProps){
    super(props);
  }

  render(){
    if (!this.props.KPI.hasValue()) {
      return null;
    }
    var KPI = this.props.KPI.getValueEnforcing();

    var currentValue = this.latestValue(KPI.measurements);
    return (
      <div>{currentValue}(goal {KPI.goal.target})</div>
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
  