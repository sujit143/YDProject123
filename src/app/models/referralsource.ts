export interface ReferralSource {
  Id: number;
  FromReferralSource;
  ReferralSourceFromMember: ReferralSourceMember;
  ToReferralSource;
  ReferralSourceToMember: ReferralSourceMember;
  ReferredDate;
}

export interface ReferralSourceMember {
  Id: number;
  Name: string;
  City: string;
  State: string;
  Address: string;
  Zip: number;
}
