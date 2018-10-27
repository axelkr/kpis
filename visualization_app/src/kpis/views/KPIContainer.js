// @flow
'use strict';

import React from 'react';
import classnames from 'classnames';

import type LoadObject from '../../utils/LoadObject';
import type KPI from '../records/KPI';

import LoadingKPI from './LoadingKPI';
import OverlayKPIDetails from './OverlayKPIDetails';

import '../../App.css';
import '../KPI.css';

type KPIContainerProps = {
  KPILo: LoadObject<KPI>;
  summary: React.Component;
  details: React.Component;
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

export default KPIContainer;