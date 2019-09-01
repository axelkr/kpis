import * as React from 'react';
import * as d3 from 'd3';

import KPI from '../records/KPI';
import LoadObject from '../../utils/LoadObject';

import '../../App.css';

interface ISingleNumberWithoutDeadlinePropsDetailsProps {
  KPI: LoadObject<KPI>;
}

export default class SingleNumberWithoutDeadlinePropsDetails extends React.Component<ISingleNumberWithoutDeadlinePropsDetailsProps, {}> {
  private node:any;

  constructor(props: ISingleNumberWithoutDeadlinePropsDetailsProps) {
    super(props);
    this.createChart = this.createChart.bind(this);
  }

  public componentDidMount() {
    this.createChart();
  }

  public componentDidUpdate() {
    this.createChart();
  }

  public render() {
    if (!this.props.KPI.hasValue()) {
      return null;
    }
    return (
      <svg ref={(node) => this.node = node}
        width={960} height={500}>
      </svg>
    );
  }

  public createChart() {
    if (!this.props.KPI.hasValue()) {
      return;
    }
    const aKPI = this.props.KPI.getValueEnforcing();

    const svg = d3.select("svg");
    const margin = { top: 20, right: 80, bottom: 30, left: 50 };
    const aWidth : any = svg.attr("width");
    const aHeight : any = svg.attr("height");
    const width = aWidth - margin.left - margin.right;
    const height = aHeight - margin.top - margin.bottom;
    const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const parseTime = d3.timeParse("%Y-%m-%d");

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const line = d3.line()
      .x( (d:any) => x(d.date))
      .y( (d:any) => y(d.value));

    const valueOverDate : any[] = [];
    aKPI.measurements.forEach( (x1:any) => {
      valueOverDate.push({
        date: parseTime(x1.date),
        value: parseFloat(x1.value)
      });
    });
    valueOverDate.sort((x2, y2) => x2.date.getTime() - y2.date.getTime());

    y.domain([
      valueOverDate.map((x3) => x3.value).reduce((accum, currentValue) => Math.min(accum, currentValue), aKPI.goal.target),
      valueOverDate.map((x4) => x4.value).reduce((accum, currentValue) => Math.max(accum, currentValue), aKPI.goal.target)
    ]);

    x.domain([
      valueOverDate.map((x5) => x5.date).reduce((accum, currentValue) => (accum < currentValue ? accum : currentValue)),
      valueOverDate.map((x6) => x6.date).reduce((accum, currentValue) => (accum > currentValue ? accum : currentValue))
    ]);

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y));

    g.append("g")
      .datum(valueOverDate)
      .append("path")
      .attr("class", "line")
      .attr("d", (d:any) => line(d))
      .style("stroke", "red");

    const goalLine = [
      {
        date: valueOverDate.map( (x7) => x7.date).reduce((accum, currentValue) => (accum < currentValue ? accum : currentValue)),
        value: aKPI.goal.target
      },
      {
        date: valueOverDate.map( (x8) => x8.date).reduce((accum, currentValue) => (accum > currentValue ? accum : currentValue)),
        value: aKPI.goal.target
      }
    ];
    g.append("g")
      .datum(goalLine)
      .append("path")
      .attr("class", "line")
      .attr("d", (d:any) => line(d))
      .style("stroke", "red")
      .style("stroke-dasharray", "5,5");
  }
}
