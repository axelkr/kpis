// @flow
'use strict';

import React from 'react';
import * as d3 from 'd3';
import moment from 'moment';

import type KPI from '../records/KPI';
import type LoadObject from '../../utils/LoadObject';

import '../../App.css';

type SingleNumberWithoutDeadlinePropsDetailsProps = {
  KPI: LoadObject<KPI>
};

type SingleNumberWithoutDeadlinePropsDetailsState = {
};

class SingleNumberWithoutDeadlinePropsDetails extends React.Component<SingleNumberWithoutDeadlinePropsDetailsProps,SingleNumberWithoutDeadlinePropsDetailsState> {
  constructor(props:SingleNumberWithoutDeadlinePropsDetailsProps){
    super(props);
    this.createChart = this.createChart.bind(this)
  }

  componentDidMount() {
    this.createChart()
  }

  componentDidUpdate() {
    this.createChart()
  }

  render(){
    if (!this.props.KPI.hasValue()) {
      return null;
    }
    var KPI = this.props.KPI.getValueEnforcing();
    return (
      <svg ref={node => this.node = node}
        width={960} height={500}> 
      </svg>
    )
  }

  createChart() {
    if (!this.props.KPI.hasValue()) {
      return;
    }
    var KPI = this.props.KPI.getValueEnforcing();

    var svg = d3.select("svg"),
        margin = {top: 20, right: 80, bottom: 30, left: 50},
        width = svg.attr("width") - margin.left - margin.right,
        height = svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseTime = d3.timeParse("%Y-%m-%d");

    var x = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height, 0]);

    var line = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); });
    
    var valueOverDate = [];
    KPI.measurements.forEach(x=>{
      valueOverDate.push({
        'date' : parseTime(x.date),
        'value' : parseFloat(x.value)
      });
    })
    valueOverDate.sort((x,y)=> x.date.getTime() - y.date.getTime());

    y.domain([
      valueOverDate.map(x=>x.value).reduce((accum,currentValue)=> Math.min(accum,currentValue),KPI.goal.target),
      valueOverDate.map(x=>x.value).reduce((accum,currentValue)=> Math.max(accum,currentValue),KPI.goal.target)
    ]);

    x.domain([
      valueOverDate.map(x=>x.date).reduce((accum,currentValue)=> (accum < currentValue ? accum : currentValue)),
      valueOverDate.map(x=>x.date).reduce((accum,currentValue)=> (accum > currentValue ? accum : currentValue))
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
      .attr("d", function(d) { return line(d) })
      .style("stroke","red");

    const goalLine = [
      {
        date: valueOverDate.map(x=>x.date).reduce((accum,currentValue)=> (accum < currentValue ? accum : currentValue)),
        value: KPI.goal.target
      },
      {
        date: valueOverDate.map(x=>x.date).reduce((accum,currentValue)=> (accum > currentValue ? accum : currentValue)),
        value: KPI.goal.target
      }
    ]
    g.append("g")
      .datum(goalLine)
      .append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d) })
      .style("stroke","red")
      .style("stroke-dasharray","5,5");
  }  
}

export default SingleNumberWithoutDeadlinePropsDetails;
  