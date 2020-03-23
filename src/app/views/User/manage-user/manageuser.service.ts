import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstant } from '../../../app.constant';

@Injectable({
  providedIn: 'root'
})
export class ManageuserService {
  concat: string;
  api_url: string;
  appendpoint: string;

  genders: string;
  avalablememberroles : string;
  practices : string;
  locations : string;
  langauges : string;
  organizations : string;

  constructor(private http: HttpClient) {
    this.api_url = AppConstant.ENDPOINT_FOR_JSON;
    this.appendpoint = this.api_url;
    this.genders= this.appendpoint + AppConstant.API_CONFIG.API_URL.CREATENEWUSER.GENDER;
    this.avalablememberroles= this.appendpoint + AppConstant.API_CONFIG.API_URL.CREATENEWUSER.AVAILABLEMEMBERROLES;
    this.practices= this.appendpoint + AppConstant.API_CONFIG.API_URL.CREATENEWUSER.PRACTICES;
    this.locations= this.appendpoint + AppConstant.API_CONFIG.API_URL.CREATENEWUSER.LOCATIONS;
    this.langauges= this.appendpoint + AppConstant.API_CONFIG.API_URL.CREATENEWUSER.LANGUAGES;
    this.organizations= this.appendpoint + AppConstant.API_CONFIG.API_URL.CREATENEWUSER.ORGANIZATIONS;
   }
  tripDetailsarray:any = []

  public getManageuser(): Observable<any> {
    return this.http.get('assets/JsonFiles/userModelJson/userJsonData.json');
  }


  public Practice():Observable<any>{
    return this.http.get(this.practices);
  }

  public Location():Observable<any>{
    return this.http.get(this.locations);
  }

  public gender():Observable<any>{
    return this.http.get(this.genders);
  }

  public types():Observable<any>{
    return this.http.get('assets/JsonFiles/userModelJson/type.json');
  }

  public Organizations():Observable<any>{
    return this.http.get(this.organizations);
  }

  // public AvailableMemberRole():Observable<any>{
  //   return this.http.get(this.avalablememberroles);
  // }

  public AvailableMemberRole():Observable<any>{
    return this.http.get('assets/JsonFiles/userModelJson/availableMemberRoles.json');
  }
  public Languages():Observable<any>{
    return this.http.get(this.langauges);
  }

  public MemberRoles():Observable<any>{
    return this.http.get(this.avalablememberroles);
  console.log('');
  }

    private updateData()
    {

    }

  public getUpdateData(editdata){

  }
}
