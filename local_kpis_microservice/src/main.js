// @flow
'use strict';

const fs = require('fs');
const express = require('express');

const config = require('./config');
const constructRouter = require('./routes');
const kpis = require('./kpis');

const PORT = config.PORT;
const KPI_FILE = config.KPI_FILE;

const app = express();
const _kpis = kpis;

var rawKPIFileContent = fs.readFileSync(KPI_FILE, 'utf8');
const kpisJson = JSON.parse(rawKPIFileContent); 
_kpis.read(kpisJson);

const routes = constructRouter(_kpis);

app.use('/',routes);

// fallback
app.get('*',function (req, res) {
  res.sendStatus(404);
});

app.listen(PORT, () => {
});
