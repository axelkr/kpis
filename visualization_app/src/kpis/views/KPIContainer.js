// @flow
'use strict';

import React from 'react';
import classnames from 'classnames';

import type LoadObject from '../../utils/LoadObject';
import type KPI from '../records/KPI';

import LoadingKPI from './LoadingKPI';
import OverlayKPIDetails from './OverlayKPIDetails';
import kpiTypeToComponent from './kpiTypeToComponent';

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
    const KPIVisualization = kpiTypeToComponent.selectComponent(KPI);
    const KPIVisualizationDetails = kpiTypeToComponent.selectDetailsComponent(KPI);

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