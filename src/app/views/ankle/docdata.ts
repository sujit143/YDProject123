export class Data {
    public constructor(
    public Id: number,
    public DisplayName: string,
    public ProfilePhoto : string,
    public Specialities : string,
    public Educations : string,
    public Sufix : string,
    public YearsOfExperience: number,
    public MemberLocations : Array <memberlocations> = [],
    public OfficeHours:Array<officeHours> = [],
    public FeedBacksCount:number
    
    ) {}
    }
    export class memberlocations {
    public constructor (
    public Name:string,
    public Address:string,
    public City :string,
    public State:string,
    public Zipcode:string,
    public Longitude:number,
    public Lattitude:number
    ){}
    }
    
    export class officeHours{
    public constructor(
    public Practice:string,
    public Location:string,
    public PhoneNumber:string,
    public Fax :string,
    public Longitude:number,
    public Lattitude:number,
    public Email: string,
    public Address:string,
    public City:string,
    public State:string,
    public Zipcode:string,
    public Country:string,
    public StartDate:string,
    public EndDate:string,
    public Sunday:string,
    public Monday:string,
    public Tuesday:string,
    public Wednesday:string,
    public Thursday:string,
    public Friday:string,
    public Saturday:string
    
    ){}
    }