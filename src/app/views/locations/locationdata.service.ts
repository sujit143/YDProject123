import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationdataService {
  concat:string;
  urlForLocations: string = 'https://qaapi.yourdrs.com/api/Admin/FindYourDoctor?SpecialityId=null&LocationSearchString=null&Gender=null&Miles=null&Languageid=null&StartDate=null&EndDate=null&MemberLocations=null';
  constructor(private httpClient:HttpClient) {  }

  getLocationsData() {
    return this.httpClient.get(this.urlForLocations);
  }

}
