// @flow
'use strict';

const express = require('express');
const fs = require('fs');

const config = require('./config');
const constructRouter = require('./routes');

const PORT = config.PORT;
const KPI_FILE = config.KPI_FILE;

const app = express();

const routes = constructRouter();

app.use('/',routes);

// fallback
  app.get('*',function (req, res) {
    res.sendStatus(404);
});


fs.readFile(KPI_FILE, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});


app.listen(PORT, () => {
});
