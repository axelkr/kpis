// @flow
'use strict';

import React from 'react';
import * as d3 from 'd3';

import type KPI from '../records/KPI';

import '../../App.css';
import './CumulativeNumberPerYear.css';

type CumulativeNumberPerYearProps = {
  KPI: KPI
};

type CumulativeNumberPerYearState = {
};

class CumulativeNumberPerYear extends React.Component<CumulativeNumberPerYearProps,CumulativeNumberPerYearState> {
  constructor(props:CumulativeNumberPerYearProps){
    super(props);
  }

  render(){
    var currentValue = this.cumulativeValueThisYear(this.props.KPI.measurements);
    return (
      <div>{currentValue} (goal {this.props.KPI.goal.target})</div>
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