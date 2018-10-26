// @flow
'use strict';

import React from 'react';
import classnames from 'classnames';

import type LoadObject from '../../utils/LoadObject';
import type KPI from '../records/KPI';

import LoadKPIItem from './LoadKPIItem';
import SingleNumberWithoutDeadline from './SingleNumberWithoutDeadline';

import '../../App.css';

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
    
    return (<label/>)
  }

  render(){
    const {
      KPILo,
    } = this.props;

    if (!KPILo.hasValue()) {
      return (
        <li className={classnames({
          hasError: KPILo.hasError(),
          shimmer: KPILo.hasOperation(),
        })}>
          <div className="view">
            <LoadKPIItem />
          </div>
        </li>
      );
    }

    const KPI = KPILo.getValueEnforcing();
    const KPIVisualization = this.selectComponent(KPI);

    return (
      <li className={classnames({
        hasError: KPILo.hasError(),
        shimmer: KPILo.hasOperation(),
      })}>
        <div className="view">
          {KPIVisualization}
        </div>
      </li>
    );
  }
}

export default KPIListItem;