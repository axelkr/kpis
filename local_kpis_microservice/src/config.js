// @flow
'use strict';

const fs = require('fs');

var rawConfig = fs.readFileSync('config.json', 'utf8');
var config = JSON.parse(rawConfig);

module.exports = config;