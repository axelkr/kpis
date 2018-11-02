// @flow
'use strict';

const express    = require('express');
const bodyParser = require("body-parser");

const config = require('./config');
const constructRouter = require('./constructRouter');
const KPIFileWatcher = require('./KPIFileWatcher');
const KPIFileWriter = require('./KPIFileWriter');
const KPIStore = require('./KPIStore');

const ContinuousWithoutDeadlineValidator = require('./ContinuousWithoutDeadlineValidator');
const CumulativeNumberOverYearValidator = require('./CumulativeNumberOverYearValidator');

const PORT = config.PORT;
const KPI_FILE = config.KPI_FILE;

const app = express();

const kpiStore = new KPIStore([new ContinuousWithoutDeadlineValidator(),new CumulativeNumberOverYearValidator()]);
const fileWatcher = new KPIFileWatcher(KPI_FILE);
fileWatcher.startWatching();
fileWatcher.callSetOnUpdate(kpiStore);
fileWatcher.updated();
const fileWriter = new KPIFileWriter(KPI_FILE,kpiStore);
const router = constructRouter(kpiStore,()=>fileWatcher.lastUpdateOn(), ()=> fileWriter.writeKPIs());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/',router);

// fallback
app.get('*',function (req, res) {
  res.sendStatus(404);
});

app.listen(PORT, () => {
});
