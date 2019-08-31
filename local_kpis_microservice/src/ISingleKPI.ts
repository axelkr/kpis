export default interface ISingleKPI {
  _id:number;
  type:string;
  description:string;
  goal:any;
  measurements:any;
  tags:Array<string>
}