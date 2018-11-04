// @flow
'use strict';

import React from 'react';
import * as d3 from 'd3';

import type KPI from '../records/KPI';
import type LoadObject from '../../utils/LoadObject';

import '../../App.css';
import './CumulativeNumberPerYear.css';

type CumulativeNumberPerYearProps = {
  KPI: LoadObject<KPI>
};

type CumulativeNumberPerYearState = {
};

class CumulativeNumberPerYear extends React.Component<CumulativeNumberPerYearProps,CumulativeNumberPerYearState> {
  constructor(props:CumulativeNumberPerYearProps){
    super(props);
  }

  render(){
    if (!this.props.KPI.hasValue()) {
      return null;
    }
    var KPI = this.props.KPI.getValueEnforcing();
    var currentValue = this.cumulativeValueThisYear(KPI.measurements);
    currentValue = Math.round(100*currentValue)/100;
    return (
      <div>{currentValue} (goal {KPI.goal.target})</div>
    )
  }

  cumulativeValueThisYear(measurements) {
    if (measurements.length == 0) {
      return "-";
    }
    
    var sumOfValuesThisYear = 0;
    var parseTime = d3.timeParse("%d.%m.%y");
    const currentYear = new Date().getFullYear();
    
    measurements.forEach(function(element) {
      var yearOfMeasurement = parseTime(element.date).getFullYear();
      if (yearOfMeasurement == currentYear) {
        sumOfValuesThisYear = sumOfValuesThisYear + parseFloat(element.value);
      }
    })
    return sumOfValuesThisYear;
  }
}

export default CumulativeNumberPerYear;