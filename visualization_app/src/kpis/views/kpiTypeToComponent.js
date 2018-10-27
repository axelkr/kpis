// @flow
'use strict';

import React from 'react';

import type KPI from '../records/KPI';

import SingleNumberWithoutDeadline from './SingleNumberWithoutDeadline';
import CumulativeNumberPerYear from './CumulativeNumberPerYear';
import CumulativeNumberPerYearDetails from './CumulativeNumberPerYearDetails';


const kpiTypeToComponent = {};

kpiTypeToComponent.selectComponent = function(KPI) {
    if (KPI.type === "continuous_without_deadline") {
        return (<SingleNumberWithoutDeadline KPI={KPI}/>)
    }

    if (KPI.type === "cumulative_number_over_year") {
        return (<CumulativeNumberPerYear KPI={KPI}/>)
    }

    return null;
}

kpiTypeToComponent.selectDetailsComponent = function(KPI) {
    if (KPI.type === "cumulative_number_over_year") {
      return (<CumulativeNumberPerYearDetails KPI={KPI}/>)
    }
    
    return null;
}

export default kpiTypeToComponent;