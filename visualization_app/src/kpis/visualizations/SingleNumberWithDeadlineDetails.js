// @flow
'use strict';

import React from 'react';
import * as d3 from 'd3';
import {
  LineChart, Line, YAxis
} from 'recharts';

import type KPI from '../records/KPI';
import type LoadObject from '../../utils/LoadObject';

import '../../App.css';

type SingleNumberWithDeadlinePropsDetailsProps = {
  KPI: LoadObject<KPI>
};

type SingleNumberWithDeadlinePropsDetailsState = {
};

class SingleNumberWithDeadlinePropsDetails extends React.Component<SingleNumberWithDeadlinePropsDetailsProps,SingleNumberWithDeadlinePropsDetailsState> {
  render(){
    if (!this.props.KPI.hasValue()) {
      return null;
    }
    const goalData = this.readValueData();

    var KPI = this.props.KPI.getValueEnforcing();
    var targetValue = parseFloat(KPI.goal.target);

    return (
      <LineChart
        width={960}
        height={500}
        data={goalData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      > <YAxis domain={['auto', 'auto']} ticks={[targetValue]} stroke="#fff" axisLine={false}/>
        <Line type="monotone" dataKey="value" stroke="#ff0000" strokeWidth="2" dot={false} isAnimationActive={false}/>
        <Line type="monotone" dataKey="target" stroke="#ff0000" strokeWidth="2" strokeDasharray="5 5" dot={false} isAnimationActive={false}/>
      </LineChart>
    );
  }

  readValueData() {
    if (!this.props.KPI.hasValue()) {
      return [];
    }
    var KPI = this.props.KPI.getValueEnforcing();
    var parseTime = d3.timeParse("%Y-%m-%d");
    var valueOverDate = [];
    var targetValue = parseFloat(KPI.goal.target);
    KPI.measurements.forEach(x=>{
      valueOverDate.push({
        'date' : parseTime(x.date),
        'value' : parseFloat(x.value),
        'target' : targetValue
      });
    })
    valueOverDate.sort((x,y)=> x.date.getTime() - y.date.getTime());

    var targetDate = parseTime(KPI.goal.targetDate);
    if(valueOverDate[valueOverDate.length -1].date < targetDate) {
      var extendedValue = {
        'date' : targetDate,
        'target': targetValue
      }
      valueOverDate.push(extendedValue);
    }
    return valueOverDate;
  }
}

export default SingleNumberWithDeadlinePropsDetails;
