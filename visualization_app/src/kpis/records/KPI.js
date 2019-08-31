export default class KPI {
  _id;
  name;
  description;
  type;
  tags;
  goal;
  measurements;

  constructor(data) {
    this._id = data._id;
    this.name = data.name;
    this.description = data.description;
    this.type = data.type;
    this.tags = data.tags;
    this.goal = data.goal;
    this.measurements = data.measurements;
  }
}
