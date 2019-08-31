// @flow
'use strict';

import React from 'react';

//import type LoadObject from '../../utils/LoadObject';
//import type KPI from '../records/KPI';

import LoadingKPI from './LoadingKPI';
import OverlayKPIDetails from './OverlayKPIDetails';

import '../../App.css';
import '../KPI.css';
/*
type KPICardProps = {
  KPILo: LoadObject<KPI>;
  summary: React.Component;
  details: React.Component;
};

type KPICardState = {
  detailsVisible : boolean
};
*/
class KPICard extends React.Component { //<KPICardProps,KPICardState> {
  constructor(props){//}:KPICardProps){
    super(props);
    this.state = {
      detailsVisible : false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(state => ({
      detailsVisible: !state.detailsVisible
    }));
  }

  render(){
    const {
      KPILo,
      summary,
      details
    } = this.props;

    if (!KPILo.hasValue()) {
      return (
          <div className="kpi_card">
            <LoadingKPI />
          </div>
      );
    }

    const KPI = KPILo.getValueEnforcing();
    var overlayWithDetails = null;
    if (this.state.detailsVisible && details) {
      overlayWithDetails = (<OverlayKPIDetails>{details}</OverlayKPIDetails> );
    }

    return (
        <div className="kpi_card" onClick={this.handleClick}>
          <div className="kpi_card_title">{KPI.name}</div>
          <br/>
          {summary}
          {overlayWithDetails}
        </div>
    );
  }
}

export default KPICard;