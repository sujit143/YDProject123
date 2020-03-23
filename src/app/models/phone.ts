export interface Phone {
  Id: number;
  PhoneType: PhoneType[];
  PhoneNumber: number;
  Extension: string;
  OtherPhoneType: string;
  Primary: boolean;
}

export interface PhoneType {
  Id: number;
  Name: string;
}
