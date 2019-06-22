// @flow
'use strict';

import React from 'react';
import moment from 'moment';
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

    return (
      <LineChart
        width={960}
        height={500}
        data={goalData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      > 
        <YAxis domain={['auto', 'auto']} ticks={[goalData[0].target]} stroke="#fff" axisLine={false}/>
        <Line type="monotone" dataKey="value" stroke="#ff0000" strokeWidth="2" dot={false} isAnimationActive={false}/>
        <Line type="monotone" dataKey="target" stroke="#ff0000" strokeWidth="2" strokeDasharray="5 5" dot={false} isAnimationActive={false}/>
      </LineChart>
    );
  }

  readValueData() {
    const dateTimeFormat = 'DD.MM.YYYY';
    if (!this.props.KPI.hasValue()) {
      return [];
    }
    var KPI = this.props.KPI.getValueEnforcing();
    var valueOverDate = [];
    var targetValue = parseFloat(KPI.goal.target);
    KPI.measurements.forEach(x=>{
      valueOverDate.push({
        'date' : moment(x.date,dateTimeFormat),
        'value' : parseFloat(x.value),
        'target' : targetValue
      });
    })
    valueOverDate.sort((x,y)=> x.date - y.date);

    var targetDate = moment(KPI.goal.targetDate,dateTimeFormat);
    while(valueOverDate[valueOverDate.length -1].date < targetDate) {
      const nextDay = moment(valueOverDate[valueOverDate.length -1].date).add(1,'days');      
      var extendedValue = {
        'date' : nextDay,
        'target': targetValue
      }
      valueOverDate.push(extendedValue);
    }
    return valueOverDate;
  }
}

export default SingleNumberWithDeadlinePropsDetails;
