import * as React from 'react';
import './App.css';
import KPIGroup from './kpis/views/KPIGroup';
import appStore from './appStore';
import {connect} from 'react-redux';

function App(props:any) {
  React.useEffect(() => {appStore.dispatch({type: 'ids/start-load'}); return;}, []);
  return (
    <div className="App">
      <KPIGroup {...props}/>
    </div>
  );
}
const connectToStore = connect((state:any)=> {
  const props:any = {};
  props.ids = state.kpiLists.kpiLists;
  props.KPIs = state.kpis.kpis;
  return props;
});

export default connectToStore(App);
