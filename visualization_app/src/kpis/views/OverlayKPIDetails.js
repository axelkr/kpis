// @flow
'use strict';

import React from 'react';

import classnames from 'classnames';
import '../../App.css';
import '../KPI.css';

class OverlayKPIDetails extends React.Component {
  render(){    
    return (
      <div className="kpi-details-overlay">
        <div className="kpi-details">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default OverlayKPIDetails;