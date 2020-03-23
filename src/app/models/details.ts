export class Details {
  constructor(
    public Id: number,
    public PatientName: string,
    public StartTime: Date,
    public EndTime: Date,
    public AppointmentType: string,
    public LocationId: number,
    public Location: string,
    public ProviderId: number,
    public Providers: string,
    public PracticeId: number,
    public Practice: string,
    public Speciality: string,
    public Status: string,
    public From: string,
    public To: string,
    public ProjectId: number,
    public From_Date: Date,
    public To_Date: Date,
    public PracticeLocation: number,
    public reason: string,
    public description: string
  ) {

  }
}
