import config from './config';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import constructRouter from './constructRouter';
import KPIFileWatcher from './KPIFileWatcher';
import KPIFileWriter from './KPIFileWriter';
import KPIStore from './KPIStore';

import ContinuousWithoutDeadlineValidator from './ContinuousWithoutDeadlineValidator';
import ContinuousWithDeadlineValidator from './ContinuousWithDeadlineValidator';
import CumulativeNumberOverYearValidator from './CumulativeNumberOverYearValidator';
import SprintBurndownValidator from './SprintBurndownValidator';

const PORT = config.PORT;
const KPI_FILE = config.KPI_FILE;

const app = express();

const kpiStore = new KPIStore([new ContinuousWithoutDeadlineValidator(),new CumulativeNumberOverYearValidator(),new ContinuousWithDeadlineValidator(), new SprintBurndownValidator()]);
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
