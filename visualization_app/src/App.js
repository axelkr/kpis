'use strict';

import React, { Component } from 'react';
import './App.css';
import KPIGroup from './kpis/views/KPIGroup';

function App(props){
  return (
    <div className="App">
      <KPIGroup {...props}/>
    </div>
  );
}

export default App;
