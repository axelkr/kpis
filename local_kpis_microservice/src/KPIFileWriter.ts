const fs = require('fs');

const path = require('path');

import KPIStore from './KPIStore';

export default class KPIFileWriter {
  _fileToWrite : string;
  _kpiStore : KPIStore;

  constructor(kpiFile:string,aKPIStore:KPIStore) {
    this._kpiStore = aKPIStore;
    if (! path.isAbsolute(kpiFile)) {
      kpiFile = path.join(__dirname,"..",kpiFile);
    }
    this._fileToWrite = path.normalize(kpiFile);
  }

  writeKPIs() {
    var allKPIs = this._kpiStore.getAllKPIs();
    var state = JSON.stringify({kpis:allKPIs});
    fs.writeFile(this._fileToWrite, state, (err:any) => {
      if (err) throw err;
    }); 
  }
}