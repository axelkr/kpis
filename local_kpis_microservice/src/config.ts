const fs = require('fs');

const configFile = 'config.json';
const default_PORT = 3001;
const default_KPI_FILE = "local_kpis.json";

let config:any = {};

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
if (!config.hasOwnProperty('KPI_FILE')) {
    console.log("no KPI_FILE configured. Use default "+default_KPI_FILE);
    config.KPI_FILE = default_KPI_FILE;
}

export default config;