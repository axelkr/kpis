// @flow
'use strict';

const express = require('express');

const config = require('./config');
const constructRouter = require('./routes');
const KPIFileWatcher = require('./kpiFileWatcher');
const KPIStore = require('./kpiStore');

const PORT = config.PORT;
const KPI_FILE = config.KPI_FILE;

const app = express();

const kpiStore = new KPIStore();
const fileWatcher = KPIFileWatcher(KPI_FILE);
fileWatcher.startWatching();
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
