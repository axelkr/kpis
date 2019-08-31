import { writeFile } from 'fs';
import {isAbsolute as isAbsolutePath, join as joinPaths, normalize as normalizePath} from 'path';
import KPIStore from './KPIStore';

export default class KPIFileWriter {
  private _fileToWrite : string;
  private _kpiStore : KPIStore;

  constructor(kpiFile:string,aKPIStore:KPIStore) {
    this._kpiStore = aKPIStore;
    if (! isAbsolutePath(kpiFile)) {
      kpiFile = joinPaths(__dirname,"..",kpiFile);
    }
    this._fileToWrite = normalizePath(kpiFile);
  }

  public writeKPIs() {
    const allKPIs = this._kpiStore.getAllKPIs();
    const state = JSON.stringify({kpis:allKPIs});
    writeFile(this._fileToWrite, state, (err:any) => {
      if (err) {
        throw err;
      }
    });
  }
}
