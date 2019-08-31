export default class KPI {
  private _id : string;
  private name: string;
  private description:any;
  private type:any;
  private tags:any;
  private _goal:any;
  private _measurements:any;

  constructor(data:any) {
    this._id = data._id;
    this.name = data.name;
    this.description = data.description;
    this.type = data.type;
    this.tags = data.tags;
    this._goal = data.goal;
    this._measurements = data.measurements;
  }

  public get goal(): any {
    return this._goal;
  }

  public get measurements(): any {
    return this._measurements;
  }
}
