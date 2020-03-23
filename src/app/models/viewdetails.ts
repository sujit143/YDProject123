import { State } from './demographics';
export interface ViewDetails {
  Id: number;
  Title: string;
  Name: string;
  FirstName?: string;
  LastName?: string;
  MiddleName?: string;
  City?: string;
  State?: State[];
  Gender?: string;
  DateOfBirth?;
  Practice?: string;
  Location?: string;
  AssociatedOrganization?: string;
  CellPhone?: number;
  OfficeNumber?: number;
  Email?: string;
  Fax?: number;
  Address?: string;
  Website?: string;
  Phone?: number;
  ProfileImage?: string;
}
