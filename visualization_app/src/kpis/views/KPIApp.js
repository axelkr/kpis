// @flow
'use strict';

import React,{Component} from 'react';
import '../../App.css';
import type Immutable from 'immutable';

import KPIList from './KPIList';

import KPI from '../records/KPI';
import LoadObjectState from '../../utils/LoadObjectState'
import LoadObjectMap from '../../utils/LoadObjectMap'

type KPIAppProps = {
    ids: LoadObjectState<Immutable.List<string>>,
    KPIs: LoadObjectMap<string, KPI>,
      
    onDelete: (ids: Array<string>) => void,
    onRetry: (KPI: KPI) => void,
    onUpdateKPIs: (KPIs: Array<KPI>) => void,
};

function KPIApp(props:KPIAppProps){
    return (
    <div className="KPIApp">
        <KPIList {...props}/>
    </div>
    );
}

export default KPIApp;
