// @flow
'use strict';

import React from 'react';

import type KPI from '../records/KPI';

import type LoadObject from '../../utils/LoadObject';

import SingleNumberWithoutDeadline from './SingleNumberWithoutDeadline';
import CumulativeNumberPerYear from './CumulativeNumberPerYear';
import CumulativeNumberPerYearDetails from './CumulativeNumberPerYearDetails';


const kpiTypeToComponent = {};

kpiTypeToComponent.selectSummaryComponent = function(type:string,KPILo:LoadObject<KPI>) {
    if (type === "continuous_without_deadline") {
        return (<SingleNumberWithoutDeadline KPI={KPILo}/>)
    }

    if (type === "cumulative_number_over_year") {
        return (<CumulativeNumberPerYear KPI={KPILo}/>)
    }

    return null;
}

kpiTypeToComponent.selectDetailsComponent = function(KPI:KPI) {
    if (KPI.type === "cumulative_number_over_year") {
      return (<CumulativeNumberPerYearDetails KPI={KPI}/>)
    }
    
    return null;
}

export default kpiTypeToComponent;