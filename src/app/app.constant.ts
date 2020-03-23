export const AppConstant = Object.freeze({
  APP: {
    MODULE_NAME: 'ZoomTeams-CpMp'
  },
  API_ENDPOINT: 'https://qaapi.yourdrs.com/api/',
  ENDPOINT_FOR_JSON: 'assets/JsonFiles/',
  UI_MP_ORGIN: 'https://ZoomTeams.com/',
  UI_UP_ORGIN: 'http://localhost:52718/',
  UI_UP_SUBORGIN: '/up/',
  FILE_LOCATION: {
    base: 'wwwroot',
    ConnectionFilesPath: 'StaticFiles/ConnectionFiles/HTML/',
    DocumentFilePath: 'StaticFiles/TempFiles/Documents/',
    Connection: 'XML',
  },
  ENCRYPTDECRIYPTKEY: 'moc.mooz-smaet-key',
  API_CONFIG: {
    APP_CONTENT: {
      APP_NAME: 'ZoomTeams',
      APP_DESC: 'ZoomTeams',
    },
    LOCALSTORAGE: {
      STR_PREFIX: 'zoom-',
      STR_PREFIX_UP: 'zoom-',
      ISMOBILEDEV: 'ismobileDevice',
      TOKEN: 'token',
      TOKEN_TYPE: 'token_type',
      TOKEN_EXPIRES: 'expires_in',
      ROLE: 'rl',
      USERINFO: 'userinfo',
      APPSETTING: 'appsettings',
      CompanyId: 'companyId',
      COMPANYINFO: 'companyinfo',
      PREFERENCESETTINGS: 'preferenceSettings',
      EMPINFOID: 'empinfoid',
      SELCTEDEMPNAME: 'selectedempname',
    },
    M_ACCOUNT_URL: 'V1/account/',
    M_CONNECT_URL: 'connect/',
    M_BASE_URL: 'api/',
    IDENTITY_CONFIG: {
      GRAND_TYPE: 'password',
      SCOPE: 'api1 openid',
      CLIENTID: 'ro.angular',
      CLIENTSECRET: 'secret'
    },
    HEADER_CONTENT_TYPE: {
      FORM_URL_ENCODE: 'application/x-www-form-urlencoded;charset=utf-8;',
      APPLICATION_JSON: 'application/json',
    },
    DATE: {
      format1: 'dd-MM-yyyy',
      apiFormat: 'YYYY-MM-DD',  // A valid moment js data format. Refer https://momentjs.com/docs/#/parsing/string-format/
      displayFormat: 'DD-MM-YYYY',
      sqlDateFormat: 'DD-MM-YYYY',
      dotnetDateFormat: 'MM/DD/YYYY',
      dotnetFullDateFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    ANG_DATE: {
      displaydtime: 'dd-MMM-yyyy HH:mm',
      displayMediumFormat: 'MMM d, y, h:mm:ss a',
      displayFormat: 'dd-MM-y', // 01-31-2019 y-MM-dd
      apiFormat: 'y-MM-dd',
      apiTSFormat: 'y-MM-dd HH:mm',

    },
    EmployeeCategory: {
      MANAGER: 1,
    },
    API_URL: {
      UP_Login: 'token',
      UP_userinfo: 'userinfo',
      // iconPath: "StaticFiles/icons/",
      iconPath: 'ZoomTeams/',
      iconsizeLimit: 20480,//4 kb
      iconDimLimit: 100,//4 kb
      photoPath: 'UserPhotos/',
      photosizeLimit: 102400,//102 kb
      photoDimLimit: 600,//600 pixels
      account: {
        BASE: 'Account',
        REGISTER: '/register',
        LOGOUT: '/logout',
        LOGIN: '/login',
        FORGOT: '/forgot',
        RESET: '/reset'
      },
      DOCTORS: {
        GETALLDOCTORS: 'Admin/FindYourDoctor?SpecialityId=null&LocationSearchString=null&Gender=null&Miles=null&Languageid=null&StartDate=null&EndDate=null&MemberLocations=null',
        GETALLSPECIALITY: 'Message/GetSpecialities',
        GETALLLANGUAGES: 'Admin/GetLanguages',
        GETALLLOCATIONS: 'Admin/GetLocations',
        GETMEMDETAILS: 'Admin/GetSelectedMemberDetail?',
        GETSPECIALITYDOC: 'Admin/FindYourDoctor?',
        SEARCHDOC: 'Admin/FindYourDoctor?',
        SAVEREQUEST: 'Admin/SaveAppointmentRequestLatest'
      },
      LOGIN: {

      },
      HOME: {
        GETBODYPARTS: 'Admin/GetBodyParts'
      },
      WORKCALENDER: {
        GETALLCALENDERDATA: 'workcalendar/workcalender.json',
        GETALLPROVIDERDATA: 'workcalendar/ProviderDataForWorkCalender.json',
        GETALLLOCATIONDATA: 'workcalendar/locationListsForWorkCalender.json',
        GETTIME: 'workcalendar/startTimeEndTime.json'
      },
      DASHBOARD: {
        GETKANBANDATA: 'dashboard/kanbandata.json',
        GETSEARCHDATA: 'dashboard/search_details.json',
        GETPREVIOUSMEMO: 'dashboard/previousmemo_details.json',
        GETCANCELREASON: 'dashboard/cancelreason.json'
      },
      PATIENTDEMOGRAPHICS: {
        GETDEMOGRAPHICS: 'demographics/patientDemographics.json',
        GETINSURANCE: 'demographics/insurance.json',
        GETLEGALREPRESENTATIVE: 'legalRepresentative.json',
        GETPATIENTCONTACT: 'patientContact.json',
        GETSCHPROVIDER: 'SchedulerJson/provider.json',
        GETPROVIDER: 'provider.json',
        GETALERT: 'demographics/alert.json',
        GETREFFERALSOURCE: 'demographics/referralSource.json',
        GETORGANIZATION: 'demographics/organization.json',
        GETPASTSURGICALHISTORY: 'demographics/pastSurgicalHistory.json'
      },
      PROVIDERDASHBOARD: {
        GETALLPROVIDERS: 'yourdrs.json'
      },
      DROPDOWNS: {
        GETFROMREFERRAL: 'demographics/fromReferral.json',
        GETTOREFERRAL: 'demographics/toReferral.json',
        WHEREDIDYOUHEARABOUTYOURDRS: 'demographics/whereDidYouHearAboutUs.json',
        GETGENDER: 'userModelJson/gender.json',
        GETSEXUALORIENTATION: 'demographics/sexualOrientation.json',
        GETGENDERIDENTITY: 'demographics/genderIdentity.json',
        GETMARITALSTATUS: 'demographics/maritalStatus.json',
        GETSTATES: 'states.json',
        GETLANGUAGE: 'language.json',
        GETRACE: 'demographics/race.json',
        GETETHNICITY: 'demographics/ethnicity.json',
        GETSMOKINGSTATUS: 'demographics/smokingStatus.json',
        GETALCOHOL: 'demographics/alcohol.json',
        GETRELATIONSHIPTYPE: 'relationShipTypes.json',
        GETPHONETYPE: 'phoneType.json',
        GETORGANIZATION: 'userModelJson/organizationList.json',
        GETORGANIZATIONTYPE: 'organizationtype.json',
        GETINCIDENTTYPE: 'incidenttype.json',
        GETPRACTICE: 'practice.json',
        GETLOCATION: 'location.json',
        GETORIGINATEDSOURCE: 'originatedsource.json',
        GETCASETYPE: 'casetype.json',
        SEARCHFACILITIES: 'healthcarefacilities.json',
        GETSEARCHFACILITY : 'searchfacilities.json',

        // Provider DashBoard Satrt

        GetPractice: 'Providerdashboard/Practice.json',
        GetLocation: 'Providerdashboard/Location.json',
        GetPosPractice: 'Providerdashboard/Pospractice.json',
        GetPosLocation: 'Providerdashboard/Poslocation.json',
        GetProvider: 'Providerdashboard/Provider.json',
        GetApmtType: 'Providerdashboard/Appointmenttype.json',
        GetApmtStatus: 'Providerdashboard/Appointmentstatus.json',
        GetDicStatus: 'Providerdashboard/Dictationstatus.json',
        GetAsstStatus: 'Providerdashboard/Assessmentstatus.json',
        GetBillType: 'Providerdashboard/Biilstatus.json',
        GetCaseType: 'Providerdashboard/Casetype.json',
        GetDicType: 'Providerdashboard/Dictationtype.json',
        GetEpiStatus: 'Providerdashboard/Episodestatus.json',
        GetAutStatus: 'Providerdashboard/Authorizationstatus.json',
        GetVerStatus: 'Providerdashboard/Verificationstatus.json',
        GetSuperBillStatus: 'Providerdashboard/Superbillstatus.json',
        GetFavFil: 'Providerdashboard/Favouritefilters.json'

        // Provider DashBoard End


      },

      SCHEDULEANAPPOINTMENT: {
        GETMEMCONTACTS: 'sch-an-appointment/memberContacts.json',
        GETPATIENTDETAILS: 'sch-an-appointment/patientDetails.json',
        GETPROVIDERDETAILS: 'sch-an-appointment/providers.json',
        GETPAYERDETAILS: 'sch-an-appointment/payer.json'
      },
      NEWAPPOINTMENT: {
        GETPATIENTDATA: 'newappointment.json'

      },
      CASENOTE: {
        GETREMINDERTIME: 'casenotes/selecttime.json',
        GETTASKTYPES: 'casenotes/tasktype.json',
        GETTASKSTATUS: 'casenotes/taskstatustypes.json',
        GETDOCCATEGORY: 'casenotes/taskdocumentcategory.json',
        GETDOCUMENTTYPES: 'casenotes/taskdocumenttype.json',
        GETPROVIDERTYPES: 'casenotes/taskprovidertype.json',
        GETSEARCH: 'casenotes/casenotesearch.json'

      },

      CREATENEWUSER: {
        GENDER: 'userModelJson/gender.json',
        AVAILABLEMEMBERROLES: 'userModelJson/availableMemberRoles.json',
        PRACTICES: 'userModelJson/practices.json',
        LOCATIONS: 'userModelJson/locations.json',
        LANGUAGES: 'language.json',
        ORGANIZATIONS: 'userModelJson/organizationList.json',
      },

    }
  }
});
