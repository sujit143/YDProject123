import { state } from '@angular/animations';
import { Phone } from './phone';
import { State } from './demographics';

export interface PatientContact {
  Id?;
  FirstName;
  LastName;
  AddressLine1;
  AddressLine2;
  Zip;
  City;
  State: State[];
  Email;
  RelationshipType: RelationshipType;
  Phone: Phone[];
  Comments;
}

export interface RelationshipType {
  Id: number;
  Name: string;
}
