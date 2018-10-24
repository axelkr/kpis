// @flow
'use strict';

const express = require('express');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_NOT_FOUND = 404;

function constructRouter() {
  const router = express.Router();

  router.get('/kpis', (req, res) => {
    var kpis = [];
    for (var i = 0; i < 9; i++) {
      kpis.push(i);
    }
    res.status(HTTP_STATUS_OK).send(kpis);  
  });
    
  return router;
}

module.exports = constructRouter;