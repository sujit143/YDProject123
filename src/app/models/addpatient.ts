export class Addpatient{
  public constructor(
    public id:string,
    public fname:string,
    public lname:string,
    public dob:any,

    public appointmenttype:string,
    public provider:string,
    public dateofservice:string,
    public casetype:string,
    public incidenttype:string,
    public dateofaccident:string,

  ){}
}
