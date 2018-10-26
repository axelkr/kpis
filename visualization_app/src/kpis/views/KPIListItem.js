// @flow
'use strict';

import React from 'react';
import classnames from 'classnames';

import type LoadObject from '../../utils/LoadObject';
import type KPI from '../records/KPI';

import LoadKPIItem from './LoadKPIItem';

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

    return (
      <li className={classnames({
        hasError: KPILo.hasError(),
        shimmer: KPILo.hasOperation(),
      })}>
        <div className="view">
          <label>{KPI.name}</label>
        </div>
      </li>
    );
  }
}

export default KPIListItem;