// @flow
'use strict';


import React from 'react';

import classnames from 'classnames';
import '../../App.css';
import '../KPI.css';

class OverlayKPIDetails extends React.Component {
  render(){    
    return (
        <div className="kpi-details-overlay">{this.props.children}</div>
    );
  }
}

export default OverlayKPIDetails;