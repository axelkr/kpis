// @flow
'use strict';

import React from 'react';

//import type KPI from '../records/KPI';
//import type LoadObject from '../../utils/LoadObject';

import '../../App.css';
import './SprintBurndown.css';

/*
type SprintBurndownProps = {
  KPI: LoadObject<KPI>
};

type SprintBurndownState = {
};
*/

class SprintBurndown extends React.Component{//<SprintBurndownProps,SprintBurndownState> {
  render(){
    if (!this.props.KPI.hasValue()) {
      return null;
    }
    var KPI = this.props.KPI.getValueEnforcing();
    return (
      <div>Summary TBD</div>
    )
  }
}

export default SprintBurndown;