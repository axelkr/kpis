import * as React from 'react';
import './App.css';
import KPIGroup from './kpis/views/KPIGroup';

function App(props:any) {
  return (
    <div className="App">
      <KPIGroup {...props}/>
    </div>
  );
}

export default App;
