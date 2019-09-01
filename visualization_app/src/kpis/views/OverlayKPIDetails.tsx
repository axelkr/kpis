import * as React from 'react';

import '../../App.css';
import '../KPI.css';

function OverlayKPIDetails(props:any) {
  return (
    <div className="kpi-details-overlay">
      <div className="kpi-details">
        {props.children}
      </div>
    </div>
  );
}

export default OverlayKPIDetails;
