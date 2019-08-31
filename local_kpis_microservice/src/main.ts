import config from './config';
import * as express from 'express';
import * as bodyParser from 'body-parser';

const constructRouter = require('./constructRouter');
const KPIFileWatcher = require('./KPIFileWatcher');
const KPIFileWriter = require('./KPIFileWriter');
const KPIStore = require('./KPIStore');

const ContinuousWithoutDeadlineValidator = require('./ContinuousWithoutDeadlineValidator');
const ContinuousWithDeadlineValidator = require('./ContinuousWithDeadlineValidator');
const CumulativeNumberOverYearValidator = require('./CumulativeNumberOverYearValidator');
const SprintBurndownValidator = require('./SprintBurndownValidator');

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
