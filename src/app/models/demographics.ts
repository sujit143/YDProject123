import { Phone } from './phone';

export interface PatientRecord {
  Id;
  FirstName;
  MiddleName;
  LastName;
  BirthGender;
  SexualOrientation: SexualOrientation[];
  GenderIdentity: GenderIdentity[];
  OtherGenderIdentity;
  DateOfBirth;
  MaritalStatus: MaritalStatus[];
  Address1;
  Address2;
  Status;
  Zip;
  City;
  State: State[];
  Race: Race[];
  Ethnicity: Ethnicity[];
  Language: Language[];
  Email;
  SSN;
  Suffix;
  PreviousName;
  GranularRace: Race[];
  GranularEthnicity: Ethnicity[];
  SmokingStatus: SmokingStatus[];
  StartDate;
  EndDate;
  Comments;
  Alcohol: Alcohol[];
  Drug: Drug[];
  HeightFt;
  HeightIn;
  Weight;
  AuthorisationToContactPatient: AuthorisationToContactPatient;
  ContactInformation: ContactInformation;
}


export interface ContactInformation {
  Phone: Phone[];
  Comments;
  CreatedBy;
  CreatedDate;
  ModifiedBy;
  ModifiedDate;
  AuthorisationToContactPatient: any;
  ProfilePicture;
}

export interface AuthorisationToContactPatient {
  Phone: boolean;
  Email: boolean;
  Text: boolean;
}

export interface Race {
  Id: number;
  Name: string;
}

export interface State {
  Id: number;
  Name: string;
}

export interface SmokingStatus {
  Id: number;
  Name: string;
}

export interface Language {
  Id: number;
  Name: string;
}
export interface MaritalStatus {
  Id: number;
  Name: string;
}
export interface GenderIdentity {
  Id: number;
  Name: string;
}
export interface SexualOrientation {
  Id: number;
  Name: string;
}

export interface Ethnicity {
  Id: number;
  Name: string;
}

export interface Drug {
  Id: number;
  Name: string;
}

export interface Alcohol {
  Id: number;
  Name: string;
}
