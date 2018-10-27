// @flow
'use strict';
const fs = require('fs');

const path = require('path');

type KPIStore = {
  read : (any) => void;
}

class KPIFileWatcher {
  _setOnUpdate : Array<KPIStore>;
  _timeOfLastUpdate : ?Date;
  _fileToWatch : string;

  constructor(kpiFile:string) {
    this._setOnUpdate = [];
    this._timeOfLastUpdate = undefined;
    if (! path.isAbsolute(kpiFile)) {
      kpiFile = path.join(__dirname,"..",kpiFile);
    }
    this._fileToWatch = path.normalize(kpiFile);
  }

  callSetOnUpdate(anObject) {
    this._setOnUpdate.push(anObject); 
  }

  lastUpdateOn() {
    return this._timeOfLastUpdate;
  }

  updated() {
    if (!fs.existsSync(this._fileToWatch)) {
        console.log("file not available: "+this._fileToWatch);
        return;
    }
    fs.readFile(this._fileToWatch, (err,rawContent) => {
      var writeOngoing = (rawContent.length == 0);
        if (writeOngoing) {
          return;
        }
        var asJSON = undefined;
        try {
          asJSON = JSON.parse(rawContent);
        }
        catch (e) {
          return;
        }

        this._setOnUpdate.forEach(function(element) {
            element.read(asJSON);
        });
        this._timeOfLastUpdate = new Date();
    });    
  }

  startWatching() {
    if (fs.existsSync(this._fileToWatch)) {
      fs.watch(this._fileToWatch, { persistent: false}, (eventType, filename) => {
        this.updated();
      });
    }
  }
}


module.exports = KPIFileWatcher;