// @flow
'use strict';

import React from 'react';

import type KPI from '../records/KPI';

import type LoadObject from '../../utils/LoadObject';

const SingleNumberWithoutDeadline = React.lazy(() => import('./SingleNumberWithoutDeadline'));
const SingleNumberWithoutDeadlineDetails = React.lazy(() => import('./SingleNumberWithoutDeadlineDetails'));
const SingleNumberWithDeadline = React.lazy(() => import('./SingleNumberWithDeadline'));
const SingleNumberWithDeadlineDetails = React.lazy(() => import('./SingleNumberWithDeadlineDetails'));
const CumulativeNumberPerYear = React.lazy(() => import('./CumulativeNumberPerYear'));
const CumulativeNumberPerYearDetails = React.lazy(() => import('./CumulativeNumberPerYearDetails'));

const SprintBurndown = React.lazy(() => import('./SprintBurndown'));
const SprintBurndownDetails = React.lazy(() => import('./SprintBurndownDetails'));

const kpiTypeToComponent = {};

kpiTypeToComponent.selectSummaryComponent = function(type:string,KPILo:LoadObject<KPI>) {
    if (type === "continuous_without_deadline") {
        return (<SingleNumberWithoutDeadline KPI={KPILo}/>)
    }

    if (type === "continuous_with_deadline") {
        return (<SingleNumberWithDeadline KPI={KPILo}/>)
    }

    if (type === "cumulative_number_over_year") {
        return (<CumulativeNumberPerYear KPI={KPILo}/>)
    }

    if (type === "sprint_burndown") {
        return (<SprintBurndown KPI={KPILo}/>)
    }

    return null;
}

kpiTypeToComponent.selectDetailsComponent = function(type:string,KPILo:LoadObject<KPI>) {
    if (type === "continuous_without_deadline") {
        return (<SingleNumberWithoutDeadlineDetails KPI={KPILo}/>)
    }

    if (type === "continuous_with_deadline") {
        return (<SingleNumberWithDeadlineDetails KPI={KPILo}/>)
    }
    
    if (type === "cumulative_number_over_year") {
        return (<CumulativeNumberPerYearDetails KPI={KPILo}/>)
    }

    if (type === "sprint_burndown") {
        return (<SprintBurndownDetails KPI={KPILo}/>)
    }

    return null;
}

export default kpiTypeToComponent;