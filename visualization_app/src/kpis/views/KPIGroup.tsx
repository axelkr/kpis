import * as Immutable from 'immutable';
import LoadObjectMap from '../../utils/LoadObjectMap';
import LoadObjectState from '../../utils/LoadObjectState';
import KPI from '../records/KPI';
import KPICard from './KPICard';
import LoadingKPI from './LoadingKPI';
import kpiTypeToComponent from '../visualizations/kpiTypeToComponent';

import * as React from 'react';

import '../../App.css';

interface IKPIGroupProps {
  ids: LoadObjectState<Immutable.List<string>>;
  KPIs: LoadObjectMap<string, KPI>;
}

export default class KPIGroup extends React.Component<IKPIGroupProps> {
  public render() {
    const {
      ids,
      KPIs,
    } = this.props;

    if (!ids.getLoadObject().hasValue()) {
      return null;
    }

    const list : any = ids.getLoadObject().getValueEnforcing();
    if (list.size === 0) {
      return null;
    }

    const listItems :any = [];
    list.forEach((id:any,_:any) => {
      const KPISummary = kpiTypeToComponent.selectSummaryComponent(id.type,KPIs.get(id._id));
      const KPIDetails = kpiTypeToComponent.selectDetailsComponent(id.type,KPIs.get(id._id));
      listItems.push(
        <React.Suspense key={id._id} fallback={<div className="kpi_card"> <LoadingKPI /></div>}>
        <KPICard
          key={id._id}
          KPILo={KPIs.get(id._id)}
          summary={KPISummary}
          details={KPIDetails}
        />
        </React.Suspense>
      );
    });
    return (
      <>{listItems}</>
    );
  }
}
