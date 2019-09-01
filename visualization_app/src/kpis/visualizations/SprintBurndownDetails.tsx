import * as React from 'react';
import * as Moment from 'moment';
import ImprovedSprintBurndown from './ImprovedSprintBurndown';

import KPI from '../records/KPI';
import LoadObject from '../../utils/LoadObject';

import '../../App.css';
import './SprintBurndown.css';

interface ISprintBurndownDetailsProps {
  KPI: LoadObject<KPI>;
}

export default class SprintBurndownDetails extends React.Component<ISprintBurndownDetailsProps, {}> {
   public render() {
    if (!this.props.KPI.hasValue()) {
      return null;
    }
    const aKPI = this.props.KPI.getValueEnforcing();
    let sprints = aKPI.measurements;
    sprints = convertToProperJSObjects(sprints);
    sprints = normalizeMeasurements(sprints);
    sprints.sort((a:any,b:any)=>a.startedOn-b.startedOn);
    return <ImprovedSprintBurndown sprints={sprints} />;
  }
}

function normalizeMeasurements(sprints:any) {
  sprints.forEach((value:any) => {
    value.measurements = value.measurements.sort((a:any,b:any)=>a.date-b.date);
    value.measurements = fillMissingUserStoryPoints(value.measurements, value.startedOn);
  });
  return sprints;
}

function fillMissingUserStoryPoints(measurements:any,firstDayOfSprint:any) {
  let nextIndexToCheck = measurements.length-2;
  let nextDay = measurements[measurements.length-1];
  while(nextIndexToCheck>=0) {
    const dayToCheck = measurements[nextIndexToCheck];
    const insertDayBeforeNextDay = Moment.duration(Moment(nextDay.date).diff(Moment(dayToCheck.date))).asDays()>1;
    if (insertDayBeforeNextDay) {
      const additionalDay = {
        date : Moment(nextDay.date).add(-1, 'days').toDate(),
        numberStoryPoints : nextDay.numberStoryPoints
      };
      measurements.splice(nextIndexToCheck+1, 0, additionalDay);
      nextDay = additionalDay;
    } else {
      nextDay = dayToCheck;
      nextIndexToCheck = nextIndexToCheck-1;
    }
  }
  return measurements;
}

function convertToProperJSObjects(sprints:any) {
  const dateTimeFormat = 'DD.MM.YYYY';
  sprints.forEach((aSprint:any)=> {
    aSprint.startedOn = Moment(aSprint.startedOn,dateTimeFormat).toDate();
    aSprint.endsOn = Moment(aSprint.endsOn,dateTimeFormat).toDate();
    aSprint.measurements.forEach((aMeasurement:any)=> {
      aMeasurement.date = Moment(aMeasurement.date,dateTimeFormat).toDate();
    });
  });
  return sprints;
}
