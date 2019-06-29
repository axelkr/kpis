// @flow
'use strict';

import React from 'react';

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
    return null;
  }
}

export default SprintBurndownDetails;