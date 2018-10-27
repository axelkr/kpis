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

kpiTypeToComponent.selectDetailsComponent = function(type:string,KPILo:LoadObject<KPI>) {
    if (type === "cumulative_number_over_year") {
      return (<CumulativeNumberPerYearDetails KPI={KPILo}/>)
    }
    
    return null;
}

export default kpiTypeToComponent;