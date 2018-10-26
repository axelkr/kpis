'use strict';

import React, { Component } from 'react';
import './App.css';
import LandingPage from './LandingPage';
import KPIApp from './kpis/views/KPIApp';


import {BrowserRouter as Router, Route} from 'react-router-dom';

function App(props){
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={routingProps => (<LandingPage {...props}/>)}/>   
          <Route exact path="/" render={routingProps => (<KPIApp {...props}/>)}/>     
        </div>
      </Router>
    );
  };

export default App;
