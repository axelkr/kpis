// @flow
'use strict';

const express = require('express');

const config = require('./config');
const constructRouter = require('./routes');
const constructKPIFileWatcher = require('./kpiFileWatcher');
const kpiStore = require('./kpis');

const PORT = config.PORT;
const KPI_FILE = config.KPI_FILE;

const app = express();

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
