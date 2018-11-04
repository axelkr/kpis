// @flow
'use strict';

import React from 'react';
import * as d3 from 'd3';

import type KPI from '../records/KPI';
import type LoadObject from '../../utils/LoadObject';

import '../../App.css';
import './CumulativeNumberPerYear.css';

type KPIDetailsCumulativeNumberPerYearDetailsProps = {
  KPI: LoadObject<KPI>
};

type KPIDetailsCumulativeNumberPerYearDetailsState = {
};

class KPIDetailsCumulativeNumberPerYearDetails extends React.Component<KPIDetailsCumulativeNumberPerYearDetailsProps,KPIDetailsCumulativeNumberPerYearDetailsState> {
  constructor(props:KPIDetailsCumulativeNumberPerYearDetailsProps){
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

    var goalThisYear = KPI.goal.target;

    var svg = d3.select("svg"),
        margin = {top: 20, right: 80, bottom: 30, left: 50},
        width = svg.attr("width") - margin.left - margin.right,
        height = svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseTime = d3.timeParse("%d.%m.%y");

    var x = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        z = d3.scaleOrdinal(d3.schemeCategory10);

    var line = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.total); });

    var amountsPerDayPerYear = [];

    KPI.measurements.forEach((anIncome) => {
        var aDate = parseTime(anIncome.date);
        var anAmount = parseFloat(anIncome.value);
        var id = aDate.getFullYear().toString();
        
        var values = new Array(366);

        var index = amountsPerDayPerYear.length;
        for(var i=0;i<amountsPerDayPerYear.length;++i) {
          if (amountsPerDayPerYear[i].id === id) {
              index = i;
              values = amountsPerDayPerYear[i].values;
          }
        }

        if ( index == amountsPerDayPerYear.length ) {
              for (var j=0;j<366;++j){
              values[j] = {};
              values[j].date = convertIndexToALeapYearDate(j);
              values[j].total = 0;
          }
        }

        var asDay = convertDayMonthToIndex(aDate.getDate(),aDate.getMonth());
        for (var day = asDay;day < 366;++day) {
          values[day].total = anAmount + values[day].total;
        }

        amountsPerDayPerYear[index] = {};
        amountsPerDayPerYear[index].id = id;
        amountsPerDayPerYear[index].values = values;
    });

    var indexGoalThisYear = amountsPerDayPerYear.length;
    var goalValues = new Array(366);
    for (var i=0;i<366;++i){
      goalValues[i] = {};
      goalValues[i].date = convertIndexToALeapYearDate(i);
      goalValues[i].total = goalThisYear;
    }
    
      amountsPerDayPerYear[indexGoalThisYear] = {};
      amountsPerDayPerYear[indexGoalThisYear].id = "Goal";
      amountsPerDayPerYear[indexGoalThisYear].values = goalValues;


    x.domain([convertIndexToALeapYearDate(0), convertIndexToALeapYearDate(365)]);


    y.domain([
      d3.min(amountsPerDayPerYear, function(c) { return d3.min(c.values, function(d) { return d.total; }); }),
      d3.max(amountsPerDayPerYear, function(c) { return d3.max(c.values, function(d) { return d.total; }); })
    ]);

    z.domain(amountsPerDayPerYear.map(function(c) { return c.id; }));

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .text("€");

    var amountPerSingleYear = g.selectAll(".amountPerSingleYear")
      .data(amountsPerDayPerYear)
      .enter().append("g")
        .attr("class", "amountPerSingleYear");

    amountPerSingleYear.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return z(d.id); });

    amountPerSingleYear.append("text")
        .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.total) + ")"; })
        .attr("x", 3)
        .attr("dy", "0.35em")
        .style("font", "10px sans-serif")
        .text(function(d) { return d.id + " " + Math.round(d.value.total)+"€"; });
  }  
}


function convertDayMonthToIndex(day,month) {
    var daysInMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
    var result = day;
    for (var previousMonth=0;previousMonth<month;++previousMonth) {
        result = result + daysInMonth[previousMonth];
    }
    return result-1;
}

function convertIndexToALeapYearDate(index) {
    var daysInMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
    var day = index+1;
    var month =0;
    while(day>daysInMonth[month]) {
        day = day - daysInMonth[month];
        month = 1+month;
    }
    var leapYearDate = new Date(2016,month,day,8);
    return leapYearDate;
}

export default KPIDetailsCumulativeNumberPerYearDetails;