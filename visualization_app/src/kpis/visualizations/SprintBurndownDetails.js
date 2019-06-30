// @flow
'use strict';

import React from 'react';
import moment from 'moment';
import ImprovedSprintBurndown from './ImprovedSprintBurndown';

import type KPI from '../records/KPI';
import type LoadObject from '../../utils/LoadObject';

import '../../App.css';
import './SprintBurndown.css';

type SprintBurndownDetailsProps = {
  KPI: LoadObject<KPI>
};

type SprintBurndownDetailsState = {
};

class SprintBurndownDetails extends React.Component<SprintBurndownDetailsProps, SprintBurndownDetailsState> {
   render() {
    if (!this.props.KPI.hasValue()) {
      return null;
    }
    var KPI = this.props.KPI.getValueEnforcing();
    var sprints = KPI.measurements;
    sprints = convertToProperJSObjects(sprints);
    sprints = normalizeMeasurements(sprints);
    sprints.sort((a,b)=>a.startedOn-b.startedOn);
    return <ImprovedSprintBurndown sprints={sprints} />
  }
}

function normalizeMeasurements(sprints) {
  sprints.forEach(value => {
    value.measurements = value.measurements.sort((a,b)=>a.date-b.date);
    value.measurements = fillMissingUserStoryPoints(value.measurements, value.startedOn);
  });
  return sprints;
}

function fillMissingUserStoryPoints(measurements,firstDayOfSprint) {
  var nextIndexToCheck = measurements.length-2;
  var nextDay = measurements[measurements.length-1];
  while(nextIndexToCheck>=0){
    var dayToCheck = measurements[nextIndexToCheck];
    var insertDayBeforeNextDay = moment.duration(new moment(nextDay.date).diff(new moment(dayToCheck.date))).asDays()>1;
    if (insertDayBeforeNextDay) {
      var additionalDay = {
        "date" : new moment(nextDay.date).add(-1, 'days').toDate(),
        "numberStoryPoints" : nextDay.numberStoryPoints
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

function convertToProperJSObjects(sprints) {
  const dateTimeFormat = 'DD.MM.YYYY';
  sprints.forEach((aSprint)=>{
    aSprint.startedOn = moment(aSprint.startedOn,dateTimeFormat).toDate();
    aSprint.endsOn = moment(aSprint.endsOn,dateTimeFormat).toDate();
    aSprint.measurements.forEach((aMeasurement)=>{
      aMeasurement.date = moment(aMeasurement.date,dateTimeFormat).toDate();
    })
  })
  return sprints;
}

export default SprintBurndownDetails;