// @flow
'use strict';

const express = require('express');
const request = require('request');
const config = require('./config');

const PORT = config.PORT;
const routes = config.ROUTES;

const app = express();

routes.forEach(function(configuredRoute) {
  const route = configuredRoute.route;
  const targetUrl = configuredRoute.forwardTo;
  app.use(route, function (req,res){
    var newUrl = targetUrl+req.originalUrl;
    request({url: newUrl, method:req.method,headers: req.headers, body:req.body}, function(error, response, body){
      const errorOccurred = error !== null;
      if (errorOccurred) {
        res.status(500).send();
        return;
      }
      res.status(response.statusCode).send(body);
    });
  });
});

app.get('*',function (req, res) {
  res.sendStatus(404);
});

app.listen(PORT, () => {
});
