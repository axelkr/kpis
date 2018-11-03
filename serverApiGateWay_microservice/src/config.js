'use strict';

const config = {
    "PORT" : 3000,
    "ROUTES": [
        {route:'/kpi*', forwardTo : 'http://localhost:3001'},
        // has to be last route, otherwise the other routes are not found
        {route:'/', forwardTo : 'http://localhost:3003'}
    ]
};

module.exports = config;