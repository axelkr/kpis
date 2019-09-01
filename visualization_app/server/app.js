'use strict';

const express = require('express');
const config = require('./config');

const PORT = config.PORT;

const app = express();

app.use('*.js', (req, res, next) => {
  res.set('Content-Type', 'text/javascript')
  next();
})

app.use('/', express.static('.'));
app.use(express.static('dist'));

app.get('*',function (req, res) {
  res.sendStatus(404);
});

app.listen(PORT, () => {
});
