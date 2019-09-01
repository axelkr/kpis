import * as React from 'react';

import KPI from '../records/KPI';
import LoadObject from '../../utils/LoadObject';

import '../../App.css';
import './SprintBurndown.css';

interface ISprintBurndownProps {
  KPI: LoadObject<KPI>;
}

export default class SprintBurndown extends React.Component<ISprintBurndownProps,{}> {
  public render() {
    if (!this.props.KPI.hasValue()) {
      return null;
    }
    return (
      <div>Summary TBD</div>
    );
  }
}
