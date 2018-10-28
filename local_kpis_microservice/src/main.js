// @flow
'use strict';

const express = require('express');

const config = require('./config');
const constructRouter = require('./constructRouter');
const KPIFileWatcher = require('./KPIFileWatcher');
const KPIStore = require('./KPIStore');

const ContinuousWithoutDeadlineValidator = require('./ContinuousWithoutDeadlineValidator');
const CumulativeNumberOverYearValidator = require('./CumulativeNumberOverYearValidator');

const PORT = config.PORT;
const KPI_FILE = config.KPI_FILE;

const app = express();

const kpiStore = new KPIStore([ContinuousWithoutDeadlineValidator,CumulativeNumberOverYearValidator]);
const fileWatcher = new KPIFileWatcher(KPI_FILE);
fileWatcher.startWatching();
fileWatcher.callSetOnUpdate(kpiStore);
fileWatcher.updated();
const router = constructRouter(kpiStore,()=>fileWatcher.lastUpdateOn());

app.use('/',router);

// fallback
app.get('*',function (req, res) {
  res.sendStatus(404);
});

app.listen(PORT, () => {
});
