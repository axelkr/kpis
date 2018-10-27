// @flow
'use strict';

import React from 'react';
import classnames from 'classnames';

import type LoadObject from '../../utils/LoadObject';
import type KPI from '../records/KPI';

import LoadKPIItem from './LoadKPIItem';
import SingleNumberWithoutDeadline from './SingleNumberWithoutDeadline';
import CumulativeNumberPerYear from './CumulativeNumberPerYear';
import CumulativeNumberPerYearDetails from './CumulativeNumberPerYearDetails';
import OverlayKPIDetails from './OverlayKPIDetails';

import '../../App.css';
import '../KPI.css';

type KPIItemProps = {
  KPILo: LoadObject<KPI>
};

type KPIListItemState = {
};

class KPIListItem extends React.Component<KPIItemProps,KPIListItemState> {
  constructor(props:KPIItemProps){
    super(props);
  }

  selectComponent(KPI) {
    if (KPI.type === "continuous_without_deadline") {
      return (<SingleNumberWithoutDeadline KPI={KPI}/>)
    }
    
    if (KPI.type === "cumulative_number_over_year") {
      return (<CumulativeNumberPerYear KPI={KPI}/>)
    }
    
    return (<div/>)
  }

  selectDetailsComponent(KPI) {
    if (KPI.type === "cumulative_number_over_year") {
      return (<CumulativeNumberPerYearDetails KPI={KPI}/>)
    }
    
    return (<div/>)
  }

  render(){
    const {
      KPILo,
    } = this.props;

    if (!KPILo.hasValue()) {
      return (
          <div className="kpi_card">
            <LoadKPIItem />
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

export default KPIListItem;