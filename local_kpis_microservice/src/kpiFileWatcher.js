// @flow
'use strict';
const fs = require('fs');

const path = require('path');

function constructKPIFileWatcher(kpiFile) {
  const fileWatcher = {};
  fileWatcher._setOnUpdate = [];
  fileWatcher._timeOfLastUpdate = undefined;
  if (! path.isAbsolute(kpiFile)) {
    kpiFile = path.join(__dirname,"..",kpiFile);
  }
  fileWatcher._fileToWatch = path.normalize(kpiFile);

  fileWatcher.callSetOnUpdate = function(anObject) {
    fileWatcher._setOnUpdate.push(anObject); 
  }

  fileWatcher.lastUpdateOn = function() {
    return fileWatcher._timeOfLastUpdate;
  }

  fileWatcher.updated = function () {
    if (!fs.existsSync(fileWatcher._fileToWatch)) {
        console.log("file not available: "+fileWatcher._fileToWatch);
        return;
    }
    fs.readFile(fileWatcher._fileToWatch, (err,rawContent) => {
      var writeOngoing = (rawContent.length == 0);
        if (writeOngoing) {
          return;
        }
        var asJSON = JSON.parse(rawContent);
        fileWatcher._setOnUpdate.forEach(function(element) {
            element.read(asJSON);
        });
        fileWatcher._timeOfLastUpdate = new Date();
    });    
  }

  if (fs.existsSync(fileWatcher._fileToWatch)) {
    fs.watch(fileWatcher._fileToWatch, { persistent: false}, (eventType, filename) => {
      fileWatcher.updated();
    });
  }

  return fileWatcher;
}


module.exports = constructKPIFileWatcher;