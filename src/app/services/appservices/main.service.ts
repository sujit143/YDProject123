import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { CommonHttpService } from '../../shared/common-http.service';
import { AppConstant } from '../../app.constant';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private subject = new Subject<any>();
  private subjectLog = new Subject<any>();
  private subjectSelectedUser = new Subject<any>();
  private subjectAlert = new Subject<any>();
  private subjectSearchItem = new Subject<any>();
  private subjectViewDetails = new Subject<any>();
  api_url: string;

  concat: string;
  appendpoint: string;
  getbodypartdetail: string;
  ENDPOINT: string = 'https://qaapi.yourdrs.com/api/Admin/FindYourDoctor?SpecialityId=null&LocationSearchString=null&Gender=null&Miles=null&LanguageId=null&StartDate=null&EndDate=null';

  constructor(private _http: HttpClient, private httpservice: CommonHttpService) {
    this.api_url = AppConstant.API_ENDPOINT;
    this.appendpoint = this.api_url;
    this.getbodypartdetail = this.appendpoint + AppConstant.API_CONFIG.API_URL.HOME.GETBODYPARTS;

  }

  login(userInfo) {
    console.log("uddddd", userInfo);
    let req_url = 'https://qaapi.yourdrs.com/api/Account/Get?UserName=' + userInfo.username + '&Password=' + userInfo.password;
    return this.httpservice.globalGetServiceByUrl(req_url, '').then(data => {
      return data;
    });
  }


  getDocter() {
    return this._http.get(this.ENDPOINT);
  }

  sendMessage(message: boolean) {
    this.subject.next(message);
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  sendlogindialog(message: boolean) {
    this.subjectLog.next(message);
  }

  clearlogindialog() {
    this.subjectLog.next();
  }

  getlogindialog(): Observable<any> {
    return this.subjectLog.asObservable();
  }

  bodypartsjson() {
    let req_url = '../ankle/bodyparts.json';
    return this.httpservice.globalGetServiceByUrl('assets/bodyparts_json.json', '').then(data => {
      return data;
    });
  }

  getBodyPartDetails() {
    return this.httpservice.globalGetService(this.getbodypartdetail, null).then(
      data => {
        console.log(data);
        return data;
      }
    );
  }
  getbodySidePart() {
    return this.httpservice.globalGetServiceByUrl('assets/JsonFiles/body_side_part.json', '').then(data => {
      return data;
    });
  }

  sendSelectedUser(message: any) {
    this.subjectSelectedUser.next(message);
  }

  clearSelectedUser() {
    this.subjectSelectedUser.next();
  }

  getSelectedUser(): Observable<any> {
    return this.subjectSelectedUser.asObservable();
  }

  sendAlertMsg(message: any) {
    this.subjectAlert.next(message);
  }

  clearAlertMsg() {
    this.subjectAlert.next();
  }

  getAlertMsg(): Observable<any> {
    return this.subjectAlert.asObservable();
  }

  sendSelectedSearchItem(item: any) {
    this.subjectSearchItem.next(item);
  }

  clearSelectedSearchItem() {
    this.subjectSearchItem.next();
  }
  getSelectedSearchItem(): Observable<any> {
    return this.subjectSearchItem.asObservable();
  }

  sendViewDetail(itemDetail) {
    this.subjectViewDetails.next(itemDetail);
  }
  clearViewDetail() {
    this.subjectViewDetails.next();
  }
  getViewDetail(): Observable<any> {
    return this.subjectViewDetails.asObservable();
  }
}
