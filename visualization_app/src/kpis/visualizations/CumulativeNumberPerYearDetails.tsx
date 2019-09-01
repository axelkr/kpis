import * as React from 'react';
import * as d3 from 'd3';

import {
  LineChart, Line, YAxis
} from 'recharts';

import KPI from '../records/KPI';
import LoadObject from '../../utils/LoadObject';

import '../../App.css';
import './CumulativeNumberPerYear.css';

interface IKPIDetailsCumulativeNumberPerYearDetailsProps {
  KPI: LoadObject<KPI>;
}

class KPIDetailsCumulativeNumberPerYearDetails extends React.Component<IKPIDetailsCumulativeNumberPerYearDetailsProps, {}> {
   public render() {
    if (!this.props.KPI.hasValue()) {
      return null;
    }
    const aKPI = this.props.KPI.getValueEnforcing();
    // tslint:disable-next-line: prefer-const
    let [previousPeriods, amountsPerDayPerYear] = extractAmountPerDayPerYear(aKPI.measurements);
    const currentPeriod = previousPeriods.pop();

    const maxNumberpreviousPeriods = 3;
    if (previousPeriods.length > maxNumberpreviousPeriods) {
      previousPeriods = previousPeriods.slice(-maxNumberpreviousPeriods);
    }

    amountsPerDayPerYear.map((value) => {
      value.goal = aKPI.goal.target;
      return value;
    });

    const linesOfpreviousPeriods = previousPeriods.map((aPeriod) =>
      <Line key={aPeriod} type="monotone" dataKey={aPeriod} stroke="#880000" strokeWidth="1" dot={false} opacity={toOpacity(aPeriod, currentPeriod)} isAnimationActive={false} />
    );

    return (
      <LineChart
        width={960}
        height={500}
        data={amountsPerDayPerYear}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <YAxis domain={['auto', 'auto']} ticks={[aKPI.goal.target]} stroke="#fff" axisLine={false} />
        <Line key="goal" type="monotone" dataKey="goal" stroke="#ff0000" strokeWidth="2" strokeDasharray="5 5" dot={false} isAnimationActive={false} />
        <Line key={currentPeriod} type="monotone" dataKey={currentPeriod} stroke="#ff0000" strokeWidth="2" dot={false} isAnimationActive={false} />
        {linesOfpreviousPeriods}
      </LineChart>
    );
  }
}

function toOpacity(aPeriod:number, currentPeriod:number) {
  switch (currentPeriod - aPeriod) {
    case 1:
      return 1.0;
    case 2:
      return 0.5;
    case 3:
      return 0.25;
    default:
      return 0.1;
  }
}

function extractAmountPerDayPerYear(measurements:any) {
  const amountsPerDayPerYear :any[]= [];
  const parseTime = d3.timeParse("%d.%m.%y");
  measurements.forEach((anIncome:any) => {
    const aDate = parseTime(anIncome.date);
    const anAmount = parseFloat(anIncome.value);
    const id = aDate.getFullYear().toString();

    let values = new Array(366);

    let index = amountsPerDayPerYear.length;
    for (let i = 0; i < amountsPerDayPerYear.length; ++i) {
      if (amountsPerDayPerYear[i].id === id) {
        index = i;
        values = amountsPerDayPerYear[i].values;
      }
    }

    if (index === amountsPerDayPerYear.length) {
      for (let j = 0; j < 366; ++j) {
        values[j] = {};
        values[j].date = convertIndexToALeapYearDate(j);
        values[j].total = 0;
      }
    }

    const asDay = convertDayMonthToIndex(aDate.getDate(), aDate.getMonth());
    for (let day = asDay; day < 366; ++day) {
      values[day].total = anAmount + values[day].total;
    }

    amountsPerDayPerYear[index] = {};
    amountsPerDayPerYear[index].id = id;
    amountsPerDayPerYear[index].values = values;
  });
  const nowCorrectAmountsPerDayPerYear : any[] = [];
  amountsPerDayPerYear[0].values.forEach((value:any) => {
    nowCorrectAmountsPerDayPerYear.push({
      date: value.date
    });
  });
  amountsPerDayPerYear.forEach((value) => {
    nowCorrectAmountsPerDayPerYear.map((completeData, indexDay) => {
      completeData[value.id] = value.values[indexDay].total;
      return completeData;
    });
  });

  const years:number[] = [];
  amountsPerDayPerYear.forEach((value) => {
    years.push(value.id);
  });
  years.sort();

  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDay();
  const currentPeriod = years[years.length-1];

  nowCorrectAmountsPerDayPerYear.map((value) => {
    const beforeCurrentDate= value.date.getMonth() < currentMonth || (value.date.getMonth() === currentMonth && value.date.getDay() <= currentDay);
    if (!beforeCurrentDate) {
      delete value[currentPeriod];
    }
    return value;
  });

  return [years, nowCorrectAmountsPerDayPerYear];
}

function convertDayMonthToIndex(day:number, month:number) {
  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let result = day;
  for (let previousMonth = 0; previousMonth < month; ++previousMonth) {
    result = result + daysInMonth[previousMonth];
  }
  return result - 1;
}

function convertIndexToALeapYearDate(index:number) {
  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let day = index + 1;
  let month = 0;
  while (day > daysInMonth[month]) {
    day = day - daysInMonth[month];
    month = 1 + month;
  }
  const leapYearDate = new Date(2016, month, day, 8);
  return leapYearDate;
}

export default KPIDetailsCumulativeNumberPerYearDetails;
