'use strict';

import React, { Component } from 'react';
import './App.css';
import KPIGroup from './kpis/views/KPIGroup';

function App(props){
  return (
    <div className="App">
      <h2>KPIs</h2>
      <KPIGroup {...props}/>
    </div>
  );
};

export default App;
