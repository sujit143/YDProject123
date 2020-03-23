import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ExistingPatients } from '../../shared/schedule-appointment/ExistingEpisodes';
import { AppConstant } from '../../app.constant';
import { AppointmentDetails } from '../../models/patientdetails';
import { SearchData } from '../../models/searchdetails';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private caseDetailsLog = new Subject<any>();

  concat: string;
  api_url: string;
  appendpoint: string;
  allcaldata: string;
  providerdata: string;
  locationdata: string;
  timelist: string;
  memberContact :string;
  patientDetails : string;
  providerDetails : string;
  payerDetails:string;

  SERVER_URL_GET_REMINDERTIME: string;
  SERVER_URL_GET_TASKTYPES: string;
  SERVER_URL_GET_TASKSTATUSTYPES: string;
  SERVER_URL_GET_DOCCATEGORY: string;
  SERVER_URL_GET_DOCUMENTTYPES: string;
  SERVER_URL_GET_PROVIDERTYPES: string;
  SERVER_URL_GET_SEARCH: string;

  SERVER_URL_GET_DEMOGRAPHICS: string;
  SERVER_URL_GET_INSURANCE: string;
  SERVER_URL_GET_FROMREFERRAL: string;
  SERVER_URL_GET_TOREFERRAL: string;
  SERVER_URL_GET_WHEREDIDYOUHEARABOUTYOURDRS: string;
  SERVER_URL_GET_GENDER: string;
  SERVER_URL_GET_SEXUALORIENTATION: string;
  SERVER_URL_GET_GENDERIDENTITY: string;
  SERVER_URL_GET_MARITALSTATUS: string;
  SERVER_URL_GET_STATES: string;
  SERVER_URL_GET_LANGUAGE: string;
  SERVER_URL_GET_RACE: string;
  SERVER_URL_GET_ETHNICITY: string;
  SERVER_URL_GET_SMOKINGSTATUS: string;
  SERVER_URL_GET_ALCOHOL: string;
  SERVER_URL_GET_RELATIONSHIPTYPE: string;
  SERVER_URL_GET_PHONEYPE: string;
  SERVER_URL_GET_LEGALREPRESENTATIVE: string;
  SERVER_URL_GET_ORGANIZATION: string;
  SERVER_URL_GET_PASTSURGICALHISTORY: string;
  SERVER_URL_GET_DROPDOWNORGANIZATION: string;
  SERVER_URL_GET_PATIENTCONTACT: string;
  SERVER_URL_GET_PROVIDER: string;
  SERVER_URL_GET_SCHPROVIDER: string;
  SERVER_URL_GET_ALERT: string;
  SERVER_URL_GET_REFERRALSOURCE: string;

  SERVER_URL_GET_ORGANIZATIONTYPE: string;
  SERVER_URL_GET_INCIDENTTYPE: string;
  SERVER_URL_GET_PRACTICE: string;
  SERVER_URL_GET_LOCATIONS: string;
  SERVER_URL_GET_ORIGINATEDSOURCE: string;
  SERVER_URL_GET_CASETYPE: string;
  SERVER_URL_GET_SEARCHFACILITIES: string;
  kanbandata: string;
  searchdata: string;
  previousmemo: string;
  cancelreason: string;

  SERVER_URL_GET_PATIENTDATA: string;

  // Provider Dashboard Start

  Server_Url_Get_Practice: string;
  Server_Url_Get_Location: string;
  Server_Url_Get_PosPractice: string;
  Server_Url_Get_PosLocation: string;
  Server_Url_Get_Provider: string;
  Server_Url_Get_ApmtType: string;
  Server_Url_Get_ApmtStatus: string;
  Server_Url_Get_DicStatus: string;
  Server_Url_Get_AsstStatus: string;
  Server_Url_Get_BillType: string;
  Server_Url_Get_CaseType: string;
  Server_Url_Get_DicType: string;
  Server_Url_Get_EpiStatus: string;
  Server_Url_Get_AutStatus: string;
  Server_Url_Get_VerStatus: string;
  Server_Url_Get_SuperBillStatus: string;
  Server_Url_Get_FavFil: string;

  // Provider Dashboard End

  SERVER_URL_GET_SEARCHFACILITY: string;
  constructor(private httpClient: HttpClient) {
    this.api_url = AppConstant.ENDPOINT_FOR_JSON;
    this.appendpoint = this.api_url;
    this.allcaldata = this.appendpoint + AppConstant.API_CONFIG.API_URL.WORKCALENDER.GETALLCALENDERDATA;
    this.providerdata = this.appendpoint + AppConstant.API_CONFIG.API_URL.WORKCALENDER.GETALLPROVIDERDATA;
    this.locationdata = this.appendpoint + AppConstant.API_CONFIG.API_URL.WORKCALENDER.GETALLLOCATIONDATA;
    this.timelist = this.appendpoint + AppConstant.API_CONFIG.API_URL.WORKCALENDER.GETTIME;
    this.getDemographicsApi();
    this.kanbandata = this.appendpoint + AppConstant.API_CONFIG.API_URL.DASHBOARD.GETKANBANDATA;
    this.searchdata = this.appendpoint + AppConstant.API_CONFIG.API_URL.DASHBOARD.GETSEARCHDATA;
    this.previousmemo = this.appendpoint + AppConstant.API_CONFIG.API_URL.DASHBOARD.GETPREVIOUSMEMO;
    this.memberContact = this.appendpoint + AppConstant.API_CONFIG.API_URL.SCHEDULEANAPPOINTMENT.GETMEMCONTACTS;
    this.patientDetails = this.appendpoint + AppConstant.API_CONFIG.API_URL.SCHEDULEANAPPOINTMENT.GETPATIENTDETAILS;
    this.providerDetails = this.appendpoint + AppConstant.API_CONFIG.API_URL.SCHEDULEANAPPOINTMENT.GETPROVIDERDETAILS;
    this.payerDetails = this.appendpoint + AppConstant.API_CONFIG.API_URL.SCHEDULEANAPPOINTMENT.GETPAYERDETAILS;
    this.cancelreason = this.appendpoint + AppConstant.API_CONFIG.API_URL.DASHBOARD.GETCANCELREASON;

    this.SERVER_URL_GET_SEARCHFACILITY = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETSEARCHFACILITY;

    this.SERVER_URL_GET_PATIENTDATA = this.appendpoint + AppConstant.API_CONFIG.API_URL.NEWAPPOINTMENT.GETPATIENTDATA;
    this.getProviderdashboardApi();

    this.getCasenotesApi();
   }
  getGeneralRequests() {
    return this.httpClient.get('assets/GeneralRequests.json');
   }
  public getSchedularData() {
    return this.httpClient.get('assets/JsonFiles/SchedulerJson/schedularData.json');
  }
  public getProviderDropDownData() {
    return this.httpClient.get('assets/JsonFiles/SchedulerJson/provider.json');
  }

  // src\assets\provider.json


  public getLocationData() {
    return this.httpClient.get('assets/JsonFiles/SchedulerJson/location.json');
  }
  public getPracticeData() {
    return this.httpClient.get('assets/JsonFiles/SchedulerJson/practice.json');
  }
  public getPracticeLocationData() {
    return this.httpClient.get('assets/JsonFiles/SchedulerJson/PracticeLocation.json');
  }
  getProviderData() {
    return this.httpClient.get(this.SERVER_URL_GET_SCHPROVIDER);
  }

  /* Demographics Begins  */
  getDemographicsApi() {
    this.SERVER_URL_GET_DEMOGRAPHICS = this.appendpoint + AppConstant.API_CONFIG.API_URL.PATIENTDEMOGRAPHICS.GETDEMOGRAPHICS;
    this.SERVER_URL_GET_INSURANCE = this.appendpoint + AppConstant.API_CONFIG.API_URL.PATIENTDEMOGRAPHICS.GETINSURANCE;
    this.SERVER_URL_GET_FROMREFERRAL = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETFROMREFERRAL;
    this.SERVER_URL_GET_TOREFERRAL = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETTOREFERRAL;
    this.SERVER_URL_GET_WHEREDIDYOUHEARABOUTYOURDRS = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.WHEREDIDYOUHEARABOUTYOURDRS;
    this.SERVER_URL_GET_GENDER = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETGENDER;
    this.SERVER_URL_GET_SEXUALORIENTATION = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETSEXUALORIENTATION;
    this.SERVER_URL_GET_GENDERIDENTITY = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETGENDERIDENTITY;
    this.SERVER_URL_GET_MARITALSTATUS = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETMARITALSTATUS;
    this.SERVER_URL_GET_STATES = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETSTATES;
    this.SERVER_URL_GET_LANGUAGE = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETLANGUAGE;
    this.SERVER_URL_GET_RACE = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETRACE;
    this.SERVER_URL_GET_ETHNICITY = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETETHNICITY;
    this.SERVER_URL_GET_SMOKINGSTATUS = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETSMOKINGSTATUS;
    this.SERVER_URL_GET_ALCOHOL = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETALCOHOL;
    this.SERVER_URL_GET_RELATIONSHIPTYPE = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETRELATIONSHIPTYPE;
    this.SERVER_URL_GET_PHONEYPE = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETPHONETYPE;
    this.SERVER_URL_GET_LEGALREPRESENTATIVE = this.appendpoint + AppConstant.API_CONFIG.API_URL.PATIENTDEMOGRAPHICS.GETLEGALREPRESENTATIVE;
    this.SERVER_URL_GET_DROPDOWNORGANIZATION = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETORGANIZATION;
    this.SERVER_URL_GET_PATIENTCONTACT = this.appendpoint + AppConstant.API_CONFIG.API_URL.PATIENTDEMOGRAPHICS.GETPATIENTCONTACT;
    this.SERVER_URL_GET_PROVIDER = this.appendpoint + AppConstant.API_CONFIG.API_URL.PATIENTDEMOGRAPHICS.GETPROVIDER;
    this.SERVER_URL_GET_SCHPROVIDER = this.appendpoint + AppConstant.API_CONFIG.API_URL.PATIENTDEMOGRAPHICS.GETSCHPROVIDER;
    this.SERVER_URL_GET_ALERT = this.appendpoint + AppConstant.API_CONFIG.API_URL.PATIENTDEMOGRAPHICS.GETALERT;
    this.SERVER_URL_GET_REFERRALSOURCE = this.appendpoint + AppConstant.API_CONFIG.API_URL.PATIENTDEMOGRAPHICS.GETREFFERALSOURCE;
    this.SERVER_URL_GET_ORGANIZATION = this.appendpoint + AppConstant.API_CONFIG.API_URL.PATIENTDEMOGRAPHICS.GETORGANIZATION;
    this.SERVER_URL_GET_PASTSURGICALHISTORY = this.appendpoint + AppConstant.API_CONFIG.API_URL.PATIENTDEMOGRAPHICS.GETPASTSURGICALHISTORY;
    this.SERVER_URL_GET_ORGANIZATIONTYPE = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETORGANIZATIONTYPE;
    this.SERVER_URL_GET_INCIDENTTYPE = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETINCIDENTTYPE;
    this.SERVER_URL_GET_PRACTICE = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETPRACTICE;
    this.SERVER_URL_GET_LOCATIONS = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETLOCATION;
    this.SERVER_URL_GET_ORIGINATEDSOURCE = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETORIGINATEDSOURCE;
    this.SERVER_URL_GET_CASETYPE = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GETCASETYPE;
    this.SERVER_URL_GET_SEARCHFACILITIES = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.SEARCHFACILITIES;
  }

  getPatientDemographicsData() {
    return this.httpClient.get(this.SERVER_URL_GET_DEMOGRAPHICS);
  }
  getPatientInsuranceData() {
    return this.httpClient.get(this.SERVER_URL_GET_INSURANCE);
  }
  getReferralSourceRecords() {
    return this.httpClient.get(this.SERVER_URL_GET_REFERRALSOURCE);
  }
  getOrganizationRecords() {
    return this.httpClient.get(this.SERVER_URL_GET_ORGANIZATION);
  }
  getPastSurgicalHistoryRecords() {
    return this.httpClient.get(this.SERVER_URL_GET_PASTSURGICALHISTORY);
  }
  getDropDownFromReferral() {
    return this.httpClient.get(this.SERVER_URL_GET_FROMREFERRAL);
  }
  getDropDownToReferral() {
    return this.httpClient.get(this.SERVER_URL_GET_TOREFERRAL);
  }
  getDropDownWhereDidYouHearAboutUs() {
    return this.httpClient.get(this.SERVER_URL_GET_WHEREDIDYOUHEARABOUTYOURDRS);
  }
  getDropDownGender() {
    return this.httpClient.get(this.SERVER_URL_GET_GENDER);
  }

  getDropDownSexualOrientation() {
    return this.httpClient.get(this.SERVER_URL_GET_SEXUALORIENTATION);
  }
  getAllALerts() {
    return this.httpClient.get(this.SERVER_URL_GET_ALERT);
  }
  getDropDownGenderIdentity() {
    return this.httpClient.get(this.SERVER_URL_GET_GENDERIDENTITY);
  }
  getDropDownMaritalStatus() {
    return this.httpClient.get(this.SERVER_URL_GET_MARITALSTATUS);
  }
  getDropDownStates() {
    return this.httpClient.get(this.SERVER_URL_GET_STATES);
  }
  getDropDownLanguages() {
    return this.httpClient.get(this.SERVER_URL_GET_LANGUAGE);
  }
  getDropDownRace() {
    return this.httpClient.get(this.SERVER_URL_GET_RACE);
  }
  getDropDownEthnicity() {
    return this.httpClient.get(this.SERVER_URL_GET_ETHNICITY);
  }
  getDropDownSmokingStatus() {
    return this.httpClient.get(this.SERVER_URL_GET_SMOKINGSTATUS);
  }
  getDropDownAlcoholStatus() {
    return this.httpClient.get(this.SERVER_URL_GET_ALCOHOL);
  }
  getDropDownRelationShipTypes() {
    return this.httpClient.get(this.SERVER_URL_GET_RELATIONSHIPTYPE);
  }
  getDropDownPhoneTypes() {
    return this.httpClient.get(this.SERVER_URL_GET_PHONEYPE);
  }

  public getlegalRepresentative() {
    return this.httpClient.get(this.SERVER_URL_GET_LEGALREPRESENTATIVE);
  }
  public getDropDownOrganisation() {
    return this.httpClient.get(this.SERVER_URL_GET_DROPDOWNORGANIZATION);
  }
  getPatientPatientContactsData() {
    return this.httpClient.get(this.SERVER_URL_GET_PATIENTCONTACT);
  }
  getAllProviderRecords() {
    return this.httpClient.get(this.SERVER_URL_GET_PROVIDER);
  }
  public getDropDownOriginatedSource() {
    return  this.httpClient.get(this.SERVER_URL_GET_ORIGINATEDSOURCE);
  }
  /*   Demographics  Ends   */

  public getSearchfacilities() {
    return this.httpClient.get(this.SERVER_URL_GET_SEARCHFACILITY);
  }
  public gettaskEpisode() {
    return this.httpClient.get('assets/taskepisode.json');
  }
  public getWorkCalenderData() {
    return this.httpClient.get(this.allcaldata);
  }
  public getProviderDataForWorkCalender() {
    return this.httpClient.get(this.providerdata);
  }
  public getLocationDataForGrouping() {
    return this.httpClient.get(this.locationdata);
  }
  public getTimeList() {
    return this.httpClient.get(this.timelist);
  }
  public getkanbanDatafiles() {
    return this.httpClient.get(this.kanbandata);
  }

  getItemByName(name: string) {
    return this.httpClient.get<Array<AppointmentDetails>>(this.kanbandata)
      .pipe(
        map((items: Array<AppointmentDetails>) => {
          return items.find((item: AppointmentDetails) => {
            return item.Patientname === name;
          });
        })
      );
  }

  getSearchData() {
    return this.httpClient.get(this.searchdata);
  }

  getCancelReason() {
    return this.httpClient.get(this.cancelreason);
  }

  getItemByNameSearch(name: string) {
    return this.httpClient.get<Array<SearchData>>(this.searchdata)
      .pipe(
        map((items: Array<SearchData>) => {
          return items.find((item: SearchData) => {
            return item.name === name;
          });
        })
      );
  }

  getPreviousMemoData() {
    return this.httpClient.get(this.previousmemo);
  }
  public getPatientDetails() {
    return this.httpClient.get('assets/Patientdata.json');
  }
  public getSurgery() {
    return this.httpClient.get('assets/surgeon.json');
  }

  public getprocedure() {
    return this.httpClient.get('assets/JsonFiles/procedure.json');
  }


  public getservice() {
    return this.httpClient.get('assets/JsonFiles/service.json');
  }

  public getpro1() {
    return this.httpClient.get('assets/JsonFiles/pro1.json');
  }

  public getlegend() {
    return this.httpClient.get('assets/JsonFiles/legend.json');
  }

  public getapp() {
    return this.httpClient.get('assets/JsonFiles/app.json');
  }

  // Schedule-an-appointment--------------------------------------------------->
  public getmembercontacts() {
    return this.httpClient.get(this.memberContact);
  }

  public getsearchpatient() {
    return this.httpClient.get(this.patientDetails);
  }

  public searchpatientByName(name: string) {
    return this.httpClient.get<Array<ExistingPatients>>('assets/JsonFiles/sch-an-appointment/patientDetails.json')
      .pipe(
        map((items: Array<ExistingPatients>) => {
          return items.find((item: ExistingPatients) => {
            return item.Name === name;
          });
        })
      );
  }

  public getproviderDetails() {
    return this.httpClient.get(this.providerDetails);
  }

public getPayer(){
  return this.httpClient.get(this.payerDetails);
}

public SearchEpisodeMembers(){
  return this.httpClient.get(this.memberContact);
}

  // END OF Schedule-an-appointment--------------------------------------------------->
  public getcasetypedetails() {
    return this.httpClient.get(this.SERVER_URL_GET_CASETYPE);
  }
  public getincidenttypedetails() {
    return this.httpClient.get( this.SERVER_URL_GET_INCIDENTTYPE);
  }
  public gethealthcaresearchtable() {
    return this.httpClient.get(this.SERVER_URL_GET_SEARCHFACILITIES);
  }
  public getsearchMember() {
    return this.httpClient.get('assets/SearchContactMemvber.json');
  }
  public getNewAppointmentData() {
    return this.httpClient.get(this.SERVER_URL_GET_PATIENTDATA);
  }
  //Casenote component

  getCasenotesApi(){
    this.SERVER_URL_GET_REMINDERTIME = this.appendpoint + AppConstant.API_CONFIG.API_URL.CASENOTE.GETREMINDERTIME;
    this.SERVER_URL_GET_TASKTYPES = this.appendpoint + AppConstant.API_CONFIG.API_URL.CASENOTE.GETTASKTYPES;
    this.SERVER_URL_GET_TASKSTATUSTYPES = this.appendpoint + AppConstant.API_CONFIG.API_URL.CASENOTE.GETTASKSTATUS;
    this.SERVER_URL_GET_DOCCATEGORY = this.appendpoint + AppConstant.API_CONFIG.API_URL.CASENOTE.GETDOCCATEGORY;
    this.SERVER_URL_GET_DOCUMENTTYPES = this.appendpoint + AppConstant.API_CONFIG.API_URL.CASENOTE.GETDOCUMENTTYPES;
    this.SERVER_URL_GET_PROVIDERTYPES = this.appendpoint + AppConstant.API_CONFIG.API_URL.CASENOTE.GETPROVIDERTYPES;
    this.SERVER_URL_GET_SEARCH = this.appendpoint + AppConstant.API_CONFIG.API_URL.CASENOTE.GETSEARCH;

  }
  public gettasktype() {
    return this.httpClient.get('assets/tasktype.json');

  }
  public gettaskstatus() {
    return this.httpClient.get('assets/taskstatustypes.json');

  }
  public getdoccategory() {
    return this.httpClient.get('assets/taskdocumentcategory.json');
  }
  public getdoctypes() {
    return this.httpClient.get('assets/taskdocumenttype.json');
  }
  public getprovidertypes() {
    return this.httpClient.get('assets/taskprovidertype.json');
  }
  public getremindertime() {
    return this.httpClient.get('assets/selecttime.json');
  }
  public getcasenotesearchdata() {
    return this.httpClient.get('assets/casenotesearch.json');
  }
  public getspecialitydetails() {
    return this.httpClient.get('assets/speciality.json');
  }
  public getsearchPartnerOrgnization() {
    return this.httpClient.get('assets/SearchPartnerOrgnization.json');
  }

  // Provider Dashboard Start

  getProviderdashboardApi() {
    this.Server_Url_Get_Practice = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GetPractice;
    this.Server_Url_Get_Location = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GetLocation;
    this.Server_Url_Get_PosPractice = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GetPosPractice;
    this.Server_Url_Get_PosLocation = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GetPosLocation;
    this.Server_Url_Get_Provider = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GetProvider;
    this.Server_Url_Get_ApmtType = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GetApmtType;
    this.Server_Url_Get_ApmtStatus = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GetApmtStatus;
    this.Server_Url_Get_DicStatus = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GetDicStatus;
    this.Server_Url_Get_AsstStatus = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GetAsstStatus;
    this.Server_Url_Get_BillType = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GetBillType;
    this.Server_Url_Get_CaseType = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GetCaseType;
    this.Server_Url_Get_DicType = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GetDicType;
    this.Server_Url_Get_EpiStatus = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GetEpiStatus;
    this.Server_Url_Get_AutStatus = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GetAutStatus;
    this.Server_Url_Get_VerStatus = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GetVerStatus;
    this.Server_Url_Get_SuperBillStatus = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GetSuperBillStatus;
    this.Server_Url_Get_FavFil = this.appendpoint + AppConstant.API_CONFIG.API_URL.DROPDOWNS.GetFavFil;
  }


  public getdataPractice() {
    return this.httpClient.get(this.Server_Url_Get_Practice);
  }
  // public getdataPractice() {
  //   return this.httpClient.get('assets/JsonFiles/Providerdashboard/Practice.json');
  // }
  public getdataLocation() {
    return this.httpClient.get(this.Server_Url_Get_Location);
  }
  public getdataPosPractice() {
    return this.httpClient.get(this.Server_Url_Get_PosPractice);
  }
  public getdataPosLocation() {
    return this.httpClient.get(this.Server_Url_Get_PosLocation);
  }
  public getdataProvider() {
    return this.httpClient.get(this.Server_Url_Get_Provider);
  }
  public getdataApmttype() {
    return this.httpClient.get(this.Server_Url_Get_ApmtType);
  }
  public getdataApmtstatus() {
    return this.httpClient.get(this.Server_Url_Get_ApmtStatus);
  }
  public getdataDicstatus() {
    return this.httpClient.get(this.Server_Url_Get_DicStatus);
  }
  public getdataAsststatus() {
    return this.httpClient.get(this.Server_Url_Get_AsstStatus);
  }
  public getdataBillstatus() {
    return this.httpClient.get(this.Server_Url_Get_BillType);
  }
  public getdataCasetype() {
    return this.httpClient.get(this.Server_Url_Get_CaseType);
  }
  public getdataDictype() {
    return this.httpClient.get(this.Server_Url_Get_DicType);
  }
  public getdataEpistatus() {
    return this.httpClient.get(this.Server_Url_Get_EpiStatus);
  }
  public getdataAutstatus() {
    return this.httpClient.get(this.Server_Url_Get_AutStatus);
  }
  public getdataVerstatus() {
    return this.httpClient.get(this.Server_Url_Get_VerStatus);
  }
  public getdataSuperbillstatus() {
    return this.httpClient.get(this.Server_Url_Get_SuperBillStatus);
  }
  public getdataFavfil() {
    return this.httpClient.get(this.Server_Url_Get_FavFil);
  }

  // Provider Dashboard End

  public getlocation() {
    return this.httpClient.get(this.SERVER_URL_GET_LOCATIONS);
  }
  public getpractice() {
    return this.httpClient.get(this.SERVER_URL_GET_PRACTICE);
  }
  public getorganizationtype() {
return this.httpClient.get(this.SERVER_URL_GET_ORGANIZATIONTYPE);
  }
  public getRoles() {
    return this.httpClient.get('assets/JsonFiles/roles.json');
  }

  sendCaseDetails(message: boolean, value: string) {
    this.caseDetailsLog.next({message, value});
  }

  clearCaseDetails() {
    this.caseDetailsLog.next();
  }

  getCaseDetails(): Observable<any> {
    return this.caseDetailsLog.asObservable();
  }


}
