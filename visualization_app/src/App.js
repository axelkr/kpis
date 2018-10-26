'use strict';

import React, { Component } from 'react';
import './App.css';
import KPIApp from './kpis/views/KPIApp';

function App(props){
    return (
        <div className="App">
        <h2>KPIs</h2>
          <KPIApp {...props}/> 
        </div>
    );
  };

export default App;
