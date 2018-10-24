// @flow
'use strict';

const express = require('express');

const config = require('./config');
const constructRouter = require('./routes');

const PORT = config.PORT;

const app = express();

const routes = constructRouter();

app.use('/',routes);

// fallback
  app.get('*',function (req, res) {
    res.sendStatus(404);
});


app.listen(PORT, () => {
});
