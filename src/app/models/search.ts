import { State } from './demographics';
export interface Search {
  Id: number;
  Title?: string;
  Name?: string;
  FirstName?: string;
  LastName?: string;
  DateOfBirth?: string;
  Zip?: number;
  Phone?: number;
  Email?: string;
  Suffix?: string;
  City?: string;
  State: State[];
  Gender?: string;
  FirmName?: string;
  NPI?: number;
  Practice?: string;
  Location?: string;
}

