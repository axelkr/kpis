import * as React from 'react';
import * as Moment from 'moment';
import {
  LineChart, Line, YAxis
} from 'recharts';

import KPI from '../records/KPI';
import LoadObject from '../../utils/LoadObject';

import '../../App.css';

interface ISingleNumberWithDeadlinePropsDetailsProps {
  KPI: LoadObject<KPI>;
}

export default class SingleNumberWithDeadlinePropsDetails extends React.Component<ISingleNumberWithDeadlinePropsDetailsProps,{}> {
  public render() {
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

  private readValueData() {
    const dateTimeFormat = 'DD.MM.YYYY';
    if (!this.props.KPI.hasValue()) {
      return [];
    }
    const aKPI = this.props.KPI.getValueEnforcing();
    const valueOverDate : any[] = [];
    const targetValue = parseFloat(aKPI.goal.target);
    aKPI.measurements.forEach((x:any)=> {
      valueOverDate.push({
        date : Moment(x.date,dateTimeFormat),
        value : parseFloat(x.value),
        target : targetValue
      });
    });
    valueOverDate.sort((x,y)=> x.date - y.date);

    const targetDate = Moment(aKPI.goal.targetDate,dateTimeFormat);
    while(valueOverDate[valueOverDate.length -1].date < targetDate) {
      const nextDay = Moment(valueOverDate[valueOverDate.length -1].date).add(1,'days');
      const extendedValue = {
        date : nextDay,
        target: targetValue
      };
      valueOverDate.push(extendedValue);
    }
    return valueOverDate;
  }
}
