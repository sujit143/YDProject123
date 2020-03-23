import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import "rxjs/add/operator/delay";
// import "rxjs/add/operator/map";
// import "rxjs/add/operator/filter";

@Injectable({
    providedIn: "root"
})
export class DataService {
    urlpatient: string = "https://5750a4bf.ngrok.io/api/Schedular/GetScheduleappointmentMatcingPatients?FirstName=";
    constructor(private _http: HttpClient) { }
  getPatient(fname) {
        return this._http.get(this.urlpatient + fname);
    }
    // getschedulebyDate(AppointmentDate) {
    //     return this._http.get(this.urlscheduleId +AppointmentDate +"&AppointmentToDate=&SchedulerView=" + 'day' +"&CategorySpecialityId=&SpecialityId=&AppointmentRequestId=&MemberId=1114&PracticeListId=81" );

    // }
    // getdoctors() {
    //     return this._http.get(this.Urlspeciality);
    // }

    // getbodyParts(){
    //     return this._http.get(this.Urlbodyparts);
    // }
}
