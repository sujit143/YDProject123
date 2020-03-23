import { CommonHttpService } from './../../shared/common-http.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../app.constant';


@Injectable({
  providedIn: 'root'
})
export class DoctordetailsService {

  api_url: string;
  urlForDoctors: string ;
  appendpoint: string;
  urlb:string="https://qaapi.yourdrs.com/api/Admin/GetBodyParts";
  bodyPartsDrs: string= "https://qa.yourdrs.com/Home/GetDoctorsLocation";
  concat: any;

  constructor(private _http:HttpClient, private httpservice: CommonHttpService) {
    this.api_url = AppConstant.API_ENDPOINT;
    this.appendpoint = this.api_url;
    this.urlForDoctors = this.appendpoint + AppConstant.API_CONFIG.API_URL.DOCTORS.GETALLDOCTORS;
   }

  getAllDoctors(){
   return this._http.get(this.urlForDoctors);
  }

  getBodyPartDrs(id){
    this.concat = 'MemberId=' + id;
    return this._http.get(this.urlForDoctors + this.concat);
  }

  getAllParts(){
    return this._http.get(this.urlb);
}

bodypartsjson() {
  let req_url = '../ankle/bodyparts.json';
  return this.httpservice.globalGetServiceByUrl('assets/bodyparts_json.json', '').then (data => {
    return data;
  });
}


}
