export interface ProviderData {
  appt_date: Date;
  auth_status: string;
  case: string;
  mop: string;
  sup_bilstatus: string;
  check_in_time: string;
  pat_name: string;
  appt_cre_date: Date;
  provider: string;
  ver_status: string;
  location: string;
  case_detail: string;
  appt_status: string;
  dic_type: string;
  ass_status: string;
  pos_loc: string;
  vid_session: string;
  dic_status: string;
  bill_status: string;
  appt_type: string;
}
export interface Location {
  Id: Date;
  Location: string;
  LocationId: string;
}
export interface Practice {
  Id: number;
  Practice: string;
  PatientId: string;
}
export interface POSPractice {
  Id: number;
  PosPractice: string;
  PosPracticeId: string;
}
export interface POSLocation {
  Id: number;
  PosPractice: string;
  PosPracticeId: string;
}
export interface Provider {
  Id: number;
  Provider: string;
  ProviderId: string;
}
export interface ApmtType {
  Id: number;
  AppmtType: string;
  AppmtTypeId: string;
}
export interface ApmtStatus {
  Id: number;
  AppmtStatus: string;
  AppmtStatusId: string;
}
export interface DicStatus {
  Id: number;
  DicStatus: string;
  DicStatusId: string;
}
export interface AsstStatus {
  Id: Date;
  AsstStatus: string;
  AsstStatusId: string;
}
export interface BillStatus {
  Id: number;
  Billstatus: string;
  BillstatusId: string;
}
export interface CaseType {
  Id: number;
  CaseType: string;
  CaseTypeId: string;
}
export interface DicType {
  Id: number;
  DicType: string;
  DicTypeId: string;
}
export interface EpiStatus {
  Id: number;
  EpiStatus: string;
  EpiStatusId: string;
}
export interface AutStatus {
  Id: number;
  AutStatus: string;
  AutStatusId: string;
}
export interface VerStatus {
  Id: number;
  VerStatus: string;
  VerStatusId: string;
}
export interface SuperBillStatus {
  Id: number;
  SuperBillStatus: string;
  SuperBillStatusId: string;
}
export interface FavFilter {
  Id: number;
  FavFil: string;
  FavFilId: string;
}
export class Endtime {
  public constructor(
  public time: string,

  ) {}
}
export class Speciality {
  public constructor(
  public name: string,

  ) {}
}
export class State {
  public constructor(
  public name: string,

  ) {}
}
export class Mop {
  public constructor(
  public name: string,

  ) {}
}
export class ApptMemo {
  public constructor(
  public appt_memo: string,
  public who_added: string,
  public when_added: string
  ) {}
  }
  export class Favfilter {
    public constructor(
      public name: string,
    ) {}
  }
  export class Starttime {
    public constructor(
    public time: string,

    ) {}
  }
