import ISingleKPI from './ISingleKPI';

export default interface IKPIValidator {
  isApplicableFor(aKPI:ISingleKPI) : boolean;
  isValid(aKPI:ISingleKPI):boolean;
  isValidMeasurement(aMeasurement:any) : boolean;
}
