// @flow
/* keep console.log to inform new users*/
/* eslint no-console: 0 */
'use strict';

const fs = require('fs');

const configFile = 'config.json';
const default_PORT = 3000;

var config = {};

if (fs.existsSync(configFile)) {
    var rawConfig = fs.readFileSync(configFile, 'utf8');
    config = JSON.parse(rawConfig);
} else {
    console.log("config file "+configFile+" not found. Using defaults instead.");
}
if (!config.hasOwnProperty('PORT')) {
    console.log("no PORT configured. Use default "+default_PORT);
    config.PORT = default_PORT;
}
if (!Number.isInteger(config.PORT)|| config.PORT < 1)  {
    console.log("PORT not configured to a positive integer. Fall back to default "+default_PORT);
    config.PORT = default_PORT;
}
if (!config.hasOwnProperty('ROUTES')) {
    console.log("no ROUTES configured.");
    config.ROUTES = [];
}
module.exports = config;