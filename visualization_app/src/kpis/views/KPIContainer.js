// @flow
'use strict';

import React from 'react';
import classnames from 'classnames';

import type LoadObject from '../../utils/LoadObject';
import type KPI from '../records/KPI';

import LoadingKPI from './LoadingKPI';
import SingleNumberWithoutDeadline from './SingleNumberWithoutDeadline';
import CumulativeNumberPerYear from './CumulativeNumberPerYear';
import CumulativeNumberPerYearDetails from './CumulativeNumberPerYearDetails';
import OverlayKPIDetails from './OverlayKPIDetails';

import '../../App.css';
import '../KPI.css';

type KPIContainerProps = {
  KPILo: LoadObject<KPI>
};

type KPIContainerState = {
  detailsVisible : boolean
};

class KPIContainer extends React.Component<KPIContainerProps,KPIContainerState> {
  constructor(props:KPIContainerProps){
    super(props);
    this.state = {
      detailsVisible : false
    };
  }

  selectComponent(KPI) {
    if (KPI.type === "continuous_without_deadline") {
      return (<SingleNumberWithoutDeadline KPI={KPI}/>)
    }
    
    if (KPI.type === "cumulative_number_over_year") {
      return (<CumulativeNumberPerYear KPI={KPI}/>)
    }
    
    return null;
  }

  selectDetailsComponent(KPI) {
    if (KPI.type === "cumulative_number_over_year") {
      return (<CumulativeNumberPerYearDetails KPI={KPI}/>)
    }
    
    return null;
  }

  render(){
    const {
      KPILo,
    } = this.props;

    if (!KPILo.hasValue()) {
      return (
          <div className="kpi_card">
            <LoadingKPI />
          </div>
      );
    }

    const KPI = KPILo.getValueEnforcing();
    const KPIVisualization = this.selectComponent(KPI);
    const KPIVisualizationDetails = this.selectDetailsComponent(KPI);

    return (
        <div className="kpi_card">
          <div className="kpi_card_title">{KPI.name}</div>
          <br/>
          {KPIVisualization}
          {KPIVisualizationDetails}
          <OverlayKPIDetails {...this.props}/> 
        </div>
    );
  }
}

export default KPIContainer;