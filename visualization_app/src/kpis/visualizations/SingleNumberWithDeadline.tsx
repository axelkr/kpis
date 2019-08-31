import * as React from 'react';
import * as Moment from 'moment';

import KPI from '../records/KPI';
import LoadObject from '../../utils/LoadObject';

import '../../App.css';

interface ISingleNumberWithDeadlineProps {
  KPI: LoadObject<KPI>;
}

export default class SingleNumberWithDeadline extends React.Component<ISingleNumberWithDeadlineProps,{}> {
  constructor(props:ISingleNumberWithDeadlineProps) {
    super(props);
  }

  public render() {
    if (!this.props.KPI.hasValue()) {
      return null;
    }
    const aKPI = this.props.KPI.getValueEnforcing();

    const currentValue = this.latestValue(aKPI.measurements);
    return (
      <div>{currentValue} (goal {aKPI.goal.target} by {aKPI.goal.targetDate})</div>
    );
  }

  private latestValue(measurements:any) {
    if (measurements.length === 0) {
      return "-";
    }

    const dateTimeFormat = 'DD.MM.YYYY';
    let latestValue = measurements[0].value;
    let latestDate  = Moment(measurements[0].date,dateTimeFormat);

    measurements.forEach( (element:any) => {
      const dateElement = Moment(element.date,dateTimeFormat);
      if (dateElement > latestDate) {
        latestDate = dateElement;
        latestValue = element.value;
      }
    });
    return parseFloat(latestValue);
  }
}
