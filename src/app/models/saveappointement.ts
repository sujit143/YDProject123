export class SaveAppointement {
  constructor(
    public PatientFirstName: string,
    public PatientLastName: string,
    public PatientEmail: string,
    public Contact: string,
    public ChiefComplaint: string,
    public LocationId: number,
    public AppointmentDateTimeList: string
  ) {}
}
