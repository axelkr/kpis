// @flow
'use strict';

import type Immutable from 'immutable';
import type LoadObjectMap from '../../utils/LoadObjectMap';
import type LoadObjectState from '../../utils/LoadObjectState';
import type KPI from '../records/KPI';
import KPICard from './KPICard';
import LoadingKPI from './LoadingKPI';
import kpiTypeToComponent from '../visualizations/kpiTypeToComponent';

import React, {Suspense} from 'react';

import '../../App.css';

type KPIGroupProps = {
  ids: LoadObjectState<Immutable.List<string>>,
  KPIs: LoadObjectMap<string, KPI>,
};

class KPIGroup extends React.Component<KPIGroupProps> {
  render(){
    const {
      ids,
      KPIs,
    } = this.props;

    if (!ids.getLoadObject().hasValue()) {
      return null;
    }

    const list = ids.getLoadObject().getValueEnforcing();
    if (list.size === 0) {
      return null;
    }

    const listItems = [];
    list.forEach((id,_) => {
      const KPISummary = kpiTypeToComponent.selectSummaryComponent(id.type,KPIs.get(id._id));
      const KPIDetails = kpiTypeToComponent.selectDetailsComponent(id.type,KPIs.get(id._id));
      listItems.push(
        <Suspense key={id._id} fallback={<div className="kpi_card"> <LoadingKPI /></div>}>
        <KPICard
          key={id._id}
          KPILo={KPIs.get(id._id)}
          summary={KPISummary}
          details={KPIDetails}
        />
        </Suspense>
      );
    });
    return (
      <>{listItems}</>
    );
  }
}

export default KPIGroup;