import * as React from 'react';
import * as d3 from 'd3';
import KPI from '../records/KPI';
import LoadObject from '../../utils/LoadObject';

import '../../App.css';
import './CumulativeNumberPerYear.css';

interface ICumulativeNumberPerYearProps {
  KPI: LoadObject<KPI>;
}

export default class CumulativeNumberPerYear extends React.Component<ICumulativeNumberPerYearProps,{}> {
  constructor(props:ICumulativeNumberPerYearProps) {
    super(props);
  }

  public render() {
    if (!this.props.KPI.hasValue()) {
      return null;
    }
    const aKPI = this.props.KPI.getValueEnforcing();
    let currentValue:string|number;
    if (this.hasCumulativeValue(aKPI.measurements)) {
      const cumulativeValue : number = this.cumulativeValueThisYear(aKPI.measurements);
      currentValue = Math.round(100*cumulativeValue)/100;
    } else {
      currentValue = "-";
    }

    return (
      <div>{currentValue} (goal {aKPI.goal.target})</div>
    );
  }

  private hasCumulativeValue(measurements:any) {
    return measurements.length > 0;
  }

  private cumulativeValueThisYear(measurements:any) : number {
    let sumOfValuesThisYear = 0;
    const parseTime = d3.timeParse("%d.%m.%y");
    const currentYear = new Date().getFullYear();

    measurements.forEach( (element:any) => {
      const yearOfMeasurement = parseTime(element.date).getFullYear();
      if (yearOfMeasurement === currentYear) {
        sumOfValuesThisYear = sumOfValuesThisYear + parseFloat(element.value);
      }
    });
    return sumOfValuesThisYear;
  }
}
