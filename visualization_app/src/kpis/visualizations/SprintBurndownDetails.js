// @flow
'use strict';

import React from 'react';
import moment from 'moment';

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
    sprints.sort((a,b)=>a.startedOn-b.startedOn);
    return null;
  }
}

function convertToProperJSObjects(sprints) {
  const dateTimeFormat = 'DD.MM.YYYY';
  sprints.map((aSprint)=>{
    aSprint.startedOn = moment(aSprint.startedOn,dateTimeFormat);
    aSprint.endsOn = moment(aSprint.endsOn,dateTimeFormat);
    aSprint.measurements.map((aMeasurement)=>{
      aMeasurement.date = moment(aMeasurement.date,dateTimeFormat);
      return aMeasurement;
    })
    return aSprint;
  })
  return sprints;
}

export default SprintBurndownDetails;