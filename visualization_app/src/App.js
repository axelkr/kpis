'use strict';

import React, { Component } from 'react';
import './App.css';
import KPIList from './kpis/views/KPIList';

function App(props){
  return (
    <div className="App">
      <h2>KPIs</h2>
      <KPIList {...props}/>
    </div>
  );
};

export default App;
