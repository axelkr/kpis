import * as React from 'react';

import LoadObject from '../../utils/LoadObject';
import KPI from '../records/KPI';

import LoadingKPI from './LoadingKPI';
import OverlayKPIDetails from './OverlayKPIDetails';

import '../../App.css';
import '../KPI.css';

interface IKPICardProps {
  KPILo: LoadObject<KPI>;
  summary: React.Component;
  details: React.Component;
}

interface IKPICardState {
  detailsVisible : boolean;
}

export default class KPICard extends React.Component<IKPICardProps,IKPICardState> {
  constructor(props:IKPICardProps) {
    super(props);
    this.state = {
      detailsVisible : false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  public render() {
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

    const aKPI = KPILo.getValueEnforcing();
    let overlayWithDetails = null;
    if (this.state.detailsVisible && details) {
      overlayWithDetails = (<OverlayKPIDetails>{details}</OverlayKPIDetails> );
    }

    return (
        <div className="kpi_card" onClick={this.handleClick}>
          <div className="kpi_card_title">{aKPI.name}</div>
          <br/>
          {summary}
          {overlayWithDetails}
        </div>
    );
  }

  private handleClick(e:React.MouseEvent) {
    e.preventDefault();
    this.setState( (state) => ({
      detailsVisible: !state.detailsVisible
    }));
  }
}
