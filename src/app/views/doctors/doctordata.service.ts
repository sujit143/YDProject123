import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CommonHttpService } from '../../shared/common-http.service';
import { AppConstant } from '../../app.constant';

@Injectable({
  providedIn: 'root'
})
export class DoctordataService {

  api_url: string;
  concat: string;
  appendpoint: string;
  urlForDoctors: string ;
  urlForSpeciality: string ;
  urlForLanguage: string ;
  urlForLocation: string;
  urlForPartDoc: string;
  specDoctors: string ;
  urlForSearch: string ;
  requestAnApointment: string;

  constructor(private httpClient: HttpClient, private commonHttpService: CommonHttpService) {
    this.api_url = AppConstant.API_ENDPOINT;
      this.appendpoint = this.api_url;
      this.urlForDoctors = this.appendpoint + AppConstant.API_CONFIG.API_URL.DOCTORS.GETALLDOCTORS;
      this.urlForSpeciality = this.appendpoint + AppConstant.API_CONFIG.API_URL.DOCTORS.GETALLSPECIALITY;
      this.urlForLanguage = this.appendpoint + AppConstant.API_CONFIG.API_URL.DOCTORS.GETALLLANGUAGES;
      this.urlForPartDoc = this.appendpoint + AppConstant.API_CONFIG.API_URL.DOCTORS.GETMEMDETAILS;
      this.specDoctors = this.appendpoint + AppConstant.API_CONFIG.API_URL.DOCTORS.GETSPECIALITYDOC;
      this.urlForSearch = this.appendpoint + AppConstant.API_CONFIG.API_URL.DOCTORS.SEARCHDOC;
      this.requestAnApointment = this.appendpoint + AppConstant.API_CONFIG.API_URL.DOCTORS.SAVEREQUEST;
      this.urlForLocation = this.appendpoint + AppConstant.API_CONFIG.API_URL.DOCTORS.GETALLLOCATIONS;
   }

  getDoctorsData(): Promise<any> {
    // return this.httpClient.get(this.urlForDoctors);
    // if(value==null){
      return this.commonHttpService.globalGetService(this.urlForDoctors, null).then(
        data => {
          return data;
        }
      );
    // } else {
    //   this.concat='SpecialityId='+value+'&LocationSearchString=null&Gender=null&Miles=null&Languageid=null&StartDate=null&EndDate=null&MemberLocations=null';
    //   return this.commonHttpService.globalGetService(this.specDoctors + this.concat, null);
    // }

  }

  getDoctorsSpeciality(): Promise<any> {
    // return this.httpClient.get(this.urlForSpeciality);
    return this.commonHttpService.globalGetService(this.urlForSpeciality, null).then(
      data => {
        return data;
      }
    );
  }

  getDoctorsLanguage() {
    // return this.httpClient.get(this.urlForLanguage);
    return this.commonHttpService.globalGetService(this.urlForLanguage, null).then(
      data => {
        return data;
      }
    );
  }

  getDoctorsLocation() {
    // return this.httpClient.get(this.urlForLanguage);
    return this.commonHttpService.globalGetService(this.urlForLocation, null).then(
      data => {
        return data;
      }
    );
  }

  getDoctorsDataById(id) {
    console.log(id);
    this.concat='MemberId=' +id+ '&SpecialityId=null&LocationSearchString=null&Gender=null&Miles=null&LanguageId=null&StartDate=null&EndDate=null';
    return this.httpClient.get(this.urlForPartDoc + this.concat);
  }
  getDoctorsAfterSearch(value) {
    console.log(value);
    // this.concat = 'SpecialityId=' +value.speciality+ '&LocationSearchString=null&Gender=' +value.gender+ '&Miles=null&Languageid=null&StartDate=null&EndDate=null&MemberLocations=null';
    this.concat = 'SpecialityId=' +value.speciality+ '&LocationSearchString=' +value.locations+ '&Gender=' +value.gender+ '&Miles=null&Languageid=' +value.languages+ '&StartDate=' +value.schedule_date+ '&EndDate=null';
    return this.httpClient.get(this.urlForSearch + this.concat);
  }

  getSaveRequest(data: any): Promise<any> {
    console.log(data);
    // return this.httpClient.get(this.urlForSpeciality);
    return this.commonHttpService.globalPostService(this.requestAnApointment, data).then(
      data => {
        return data;
      }
    );
  }

  getDoctorBySpecId(value){
    this.concat='SpecialityId='+value+'&LocationSearchString=null&Gender=null&Miles=null&Languageid=null&StartDate=null&EndDate=null&MemberLocations=null';
      return this.commonHttpService.globalGetService(this.specDoctors + this.concat, null).then(
        data => {
          return data;
        }
      );
  }

  public getManageLicenceAgreementData(): Promise<any> {
    return this.commonHttpService.globalGetServiceByUrl('assets/manageLicence.json', '').then(
      data => {
        return data;
      }
    );
  }
  public getOrganisationData(): Promise<any> {
    return this.commonHttpService.globalGetServiceByUrl('assets/organisation.json', '').then(
      data => {
        return data;
      }
    );
  }
  public getStatenData(): Promise<any> {
    return this.commonHttpService.globalGetServiceByUrl('assets/JsonFiles/states.json', '').then(
      data => {
        return data;
      }
    );
  }
  public getPracticeData(): Promise<any> {
    return this.commonHttpService.globalGetService('assets/JsonFiles/userModelJson/practices.json', null).then(
      data => {
        return data;
      }
    );
  }
  public getLocationData(): Promise<any> {
    return this.commonHttpService.globalGetServiceByUrl('assets/JsonFiles/userModelJson/locations.json', '').then(
      data => {
        return data;
      }
    );
  }
}
