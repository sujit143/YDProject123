import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstant } from '../../app.constant';
@Injectable({
  providedIn: 'root'
})
export class DashboadService {
  api_url: string;
  appendpoint: string;
  allProdata : any;
  constructor(private http: HttpClient) {
    this.api_url = AppConstant.ENDPOINT_FOR_JSON;
    this.appendpoint = this.api_url;
    this.allProdata = this.appendpoint + AppConstant.API_CONFIG.API_URL.PROVIDERDASHBOARD.GETALLPROVIDERS;
   }
  public getDocumentList() {
    return this.http.get('assets/fileupload.json');
    }
    public getOriginPractices() {
      return this.http.get('assets/JsonFiles/userModelJson/practices.json');
    }
    public getOriginLocations() {
      return this.http.get('assets/JsonFiles/userModelJson/locations.json');
    }
    public getTreatProviders() {
      return this.http.get ('assets/JsonFiles/TreatingProvider.json');
    }
    public getDocuments() {
      return this.http.get ('assets/JsonFiles/DocumentType.json');
    }
    public getyourdrs() {
      return this.http.get(this.allProdata);
    }
    public getserprovider() {
      return this.http.get('assets/searchprovider.json');
    }
    public getapptmemo() {
      return this.http.get('assets/apptmemo.json');
    }
    public gettagmem() {
      return this.http.get('assets/tagmember.json');
    }
}
