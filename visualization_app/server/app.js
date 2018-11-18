// @flow
'use strict';

const express = require('express');
const request = require('request');
const config = require('./config');

const PORT = config.PORT;

const app = express();

app.use('/', express.static('.'));
app.use(express.static('dist'));

app.get('*',function (req, res) {
  res.sendStatus(404);
});

app.listen(PORT, () => {
});
