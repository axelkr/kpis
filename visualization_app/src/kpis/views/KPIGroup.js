// @flow
'use strict';

import type Immutable from 'immutable';
import type LoadObject from '../../utils/LoadObject';
import type LoadObjectMap from '../../utils/LoadObjectMap';
import type LoadObjectState from '../../utils/LoadObjectState';
import type KPI from '../records/KPI';
import KPIContainer from './KPIContainer';

import React from 'react';

import classnames from 'classnames';
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
    list.forEach((id, i) => {
      listItems.push(
        <KPIContainer
          key={id}
          KPILo={KPIs.get(id)}
        />
      );
    });
    return (
      <div>{listItems}</div>
    );
  }
}

export default KPIGroup;