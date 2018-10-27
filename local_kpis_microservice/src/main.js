// @flow
'use strict';

type SingleKPI = {
  _id:string;
  type:string;
  }; 

type KPIStore = {
  availableKPIs : () => [SingleKPI];
  getKPI: (string) => SingleKPI;
}

const express = require('express');

const config = require('./config');
const constructRouter = require('./routes');
const constructKPIFileWatcher = require('./kpiFileWatcher');
const constructKPIStore = require('./kpiStore');

const PORT = config.PORT;
const KPI_FILE = config.KPI_FILE;

const app = express();

const kpiStore : KPIStore = constructKPIStore();
const fileWatcher = constructKPIFileWatcher(KPI_FILE);
fileWatcher.callSetOnUpdate(kpiStore);
fileWatcher.updated();
const routes = constructRouter(kpiStore,()=>fileWatcher.lastUpdateOn());

app.use('/',routes);

// fallback
app.get('*',function (req, res) {
  res.sendStatus(404);
});

app.listen(PORT, () => {
});
