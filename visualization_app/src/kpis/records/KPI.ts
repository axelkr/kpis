export default class KPI {
  private _id : string;
  private _name: string;
  private _description:any;
  private _type:any;
  private _tags:any;
  private _goal:any;
  private _measurements:any;

  constructor(data:any) {
    this._id = data._id;
    this._name = data.name;
    this._description = data.description;
    this._type = data.type;
    this._tags = data.tags;
    this._goal = data.goal;
    this._measurements = data.measurements;
  }

  public get goal(): any {
    return this._goal;
  }

  public get measurements(): any {
    return this._measurements;
  }

  public get id(): string {
    return this._id;
  }
}
