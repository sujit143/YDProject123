import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonHttpService } from '../../shared/common-http.service';



@Injectable({
  providedIn: 'root'
})
export class AboutService {
  urlloc:string = "https://e0b4d44a.ngrok.io/api/Location/GetPracticeLocationsForCreateUser?PracticeId=81&MemberId=1114";

  constructor(private _http : HttpClient, private commonHttpService: CommonHttpService) { }


public getbodyparts(data: any): Promise<any> {
  return this.commonHttpService
      .globalGetServiceByUrl('assets/bodyparts.json', '')
      .then(data => {
        return data;
      });
}

getLocation() {
  return this._http.get(this.urlloc);
}
}
