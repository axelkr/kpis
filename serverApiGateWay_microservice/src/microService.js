// @flow
'use strict';

class microService {
    route:string;
    url:string;

    constructor(route:string,url:string) {
        this.route = route;
        this.url = url;
    }
}


module.exports = microService;