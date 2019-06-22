// @flow
'use strict';

import React from 'react';
import moment from 'moment';

import type KPI from '../records/KPI';
import type LoadObject from '../../utils/LoadObject';

import '../../App.css';

type SingleNumberWithDeadlineProps = {
  KPI: LoadObject<KPI>
};

type SingleNumberWithDeadlineState = {
};

class SingleNumberWithDeadline extends React.Component<SingleNumberWithDeadlineProps,SingleNumberWithDeadlineState> {
  constructor(props:SingleNumberWithDeadlineProps){
    super(props);
  }

  render(){
    if (!this.props.KPI.hasValue()) {
      return null;
    }
    var KPI = this.props.KPI.getValueEnforcing();

    var currentValue = this.latestValue(KPI.measurements);
    return (
      <div>{currentValue} (goal {KPI.goal.target} by {KPI.goal.targetDate})</div>
    )
  }

  latestValue(measurements) {
    if (measurements.length == 0) {
      return "-";
    }
    
    const dateTimeFormat = 'DD.MM.YYYY';
    var latestValue = measurements[0].value;
    var latestDate  = moment(measurements[0].date,dateTimeFormat);
    
    measurements.forEach(function(element) {
      var dateElement = moment(element.date,dateTimeFormat);
      if (dateElement > latestDate) {
        latestDate = dateElement;
        latestValue = element.value;
      }
    })
    return parseFloat(latestValue);
  }
}

export default SingleNumberWithDeadline;
  