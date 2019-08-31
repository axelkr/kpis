export default class KPI {
  private _id : string;
  private name: string;
  private description:any;
  private type:any;
  private tags:any;
  private goal:any;
  private measurements:any;

  constructor(data:any) {
    this._id = data._id;
    this.name = data.name;
    this.description = data.description;
    this.type = data.type;
    this.tags = data.tags;
    this.goal = data.goal;
    this.measurements = data.measurements;
  }
}
