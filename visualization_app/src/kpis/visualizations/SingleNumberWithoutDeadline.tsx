import * as React from 'react';
import * as Moment from 'moment';

import KPI from '../records/KPI';
import LoadObject from '../../utils/LoadObject';

import '../../App.css';

interface ISingleNumberWithoutDeadlineProps {
  KPI: LoadObject<KPI>;
}

export default class SingleNumberWithoutDeadline extends React.Component<ISingleNumberWithoutDeadlineProps,{}> {
  constructor(props:ISingleNumberWithoutDeadlineProps) {
    super(props);
  }

  public render() {
    if (!this.props.KPI.hasValue()) {
      return null;
    }
    const aKPI = this.props.KPI.getValueEnforcing();

    const currentValue : string | number = this.latestValue(aKPI.measurements);
    return (
      <div>{currentValue} (goal {aKPI.goal.target})</div>
    );
  }

  public latestValue(measurements:any) {
    if (measurements.length === 0) {
      return "-";
    }

    let latestValue = measurements[0].value;
    let latestDate  = Moment(measurements[0].date);

    measurements.forEach( (element:any) => {
      const dateElement = Moment(element.date);
      if (dateElement > latestDate) {
        latestDate = dateElement;
        latestValue = element.value;
      }
    });
    return parseFloat(latestValue);
  }
}
