// @flow
'use strict';

const express = require('express');
const request = require('request');
const config = require('./config');
const microService = require('./microService');

const PORT = config.PORT;

const app = express();

var microServices : Array<microService>;
var microServices = [];
microServices.push(new microService('/kpi/*','http://localhost:3001'));
// has to be last route, otherwise the other routes are not found
microServices.push(new microService('/','http://localhost:3003'));

for (var i=0;i<microServices.length ; i++) {
  var aMicroService = microServices[i];
  const route = aMicroService.route;
  const targetUrl = aMicroService.url;
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
}

app.get('*',function (req, res) {
  res.sendStatus(404);
});

app.listen(PORT, () => {
});
