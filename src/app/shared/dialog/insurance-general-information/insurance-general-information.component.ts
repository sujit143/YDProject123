import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../../services/appservices/shared.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { MessageService } from 'primeng/primeng';


@Component({
  selector: 'app-insurance-general-information',
  templateUrl: './insurance-general-information.component.html',
  styleUrls: ['./insurance-general-information.component.scss']
})
export class InsuranceGeneralInformationComponent implements OnInit {
  table: boolean = false;
  panel: boolean = true;
  PayerEligibility: boolean = false;
  emergency: boolean = false;
  hospitalized: boolean = false;
  incidentdocument: boolean = false;
  document: boolean = false;
  docDetailTable: boolean = false;
  frequency: boolean = false;
  description: boolean = false;
  ComInformation: boolean = false;
  Searchhealthcarefacility: boolean = false;
  Searchhealthcaretable: boolean = false;
  showmri = false;
  showctscan = false;
  showxray = false;
  incidenttype: any [];
  casetype: any [];
  state: any [];
  addneworganizationdetails1: boolean = false;

  ////////////////
  location: any[];
  practice: any[];
  organiztiontype: any[];
  DocCategory: any[];
  DocType: any[];
  showPublicText: boolean = false;
  showPrivateText: boolean = false;
  showGrantAccess: boolean = false;
  showTable: boolean = false;
  addNewDocumentDisplay: boolean = false;
  imagePath: any;
  country: any;
  selectedvaluestate: any;
  filteredCountriesSingle: any[];
  filterAssignedTo: any[];
  Assignto: any[];
  minDate: any;
  maxDate: any;
  Role: any[];
  TaskType: any[];
  selectedAssign: any;
  assign: string;
   name: string;
  ListOfData: any;
  documentTable: any[] = [];
  selectedRoles: any = null;
  incidentRadioYes: any;
  incidentRadioNo: any;
  displayDicomDetails: boolean = false;
  selectCheckbox: any;
  addDocumentform: FormGroup;
  config: any;

  // incidentReportField: boolean = false;
  ////////////////////
  tabledata: any[];
  speciality: any [];
  selectedValue1: string = 'val1';
  selectedValue2: string = 'val2';
  selectedValue3: string = 'val3';
  selectedValue4: string = 'val4';
  selectedValue5: string = 'val5';
  selectedValue6: string = 'val6';
  selectedvalue: any;
  searchContactMember: FormGroup;
  searchPartnerOrgnization: FormGroup;
  emergencyform: FormGroup;
  Newproviderform: FormGroup;
  Addpractice: FormGroup;
  hospitalizedform: FormGroup;
  addnewform: FormGroup;
  addpracticelocation: FormGroup;
  SearchMember: boolean = false;
  legalRecords = false;
  searchOrgnization = false;
  legalRepresentativeArr: any = [];
  serachParOrgArr: any = [];
  emergencyformarr: any = [];
  addnewformarr: any = [];
  hospitalizedformarr: any = [];
  addpracticeloactionarr: any = [];
  selectedVal: any;
  selectedOrganizationVal: any;
  selectedemergencyvalue: any;
  selectedValArr: any = [];
  selectedvaluearray: any = [];
  selectedemergencyvaluearray: any = [];
  addneworgarr: any =[];
  addproconarr: any =[];
  search1: boolean = false;
  ViewDetails: boolean = false;
  showviewDetails: FormGroup;
  AddNewMember: boolean = false;
  ViewDetailsofsearchhealthcare: boolean = false;
  SearchPartnerOrgnization: boolean = false;
  AddNewOrganization: boolean = false;
  ViewDetailsofemergencyroom: boolean = false;
  Searchemergencyhealthcarefacility: boolean = false;
  addneworganizationdetails: boolean = false;
  Searchhealthcaretable1: boolean = false;
  alert: boolean = false;
  alert1: boolean = false;
  onaddnewsave: boolean = false;
  onsearchselect: boolean = false;
  onemergencysearch: boolean = false;
  onemergencyadd: boolean = false;
  radioSelected: any;
  radioSelected1: any;
  radioselected2: any;
  radioselected3: any;
  curtreatradio1: any;
  curtreatradio2: any;
  collection = [];
  filterInput: any;
  constructor(private _data: SharedService, private fb: FormBuilder,  private messageService: MessageService) {
    this.DocCategory = [
      {label: 'Select', value: 'Select'},
      {label: 'Intake', value: 'Intake'},
      {label: 'Billing', value: 'Billing'},
      {label: 'Diagnostic Testing', value: 'Diagnostic Testing'},
      {label: 'Insurance Correspondence', value: 'Insurance Correspondence'},
      {label: 'Medical Records', value: 'Medical Records'},
      {label: 'Plan Of Actions', value: 'Plan Of Actions'},
      {label: 'Refferals(Rx)', value: 'Refferals(Rx)'},
      {label: 'Pre-Surgical Charts', value: 'Pre-Surgical Charts'},
     ];
     this.DocType = [
       {   label: 'Select', value: 'Select'    },
       {   label: 'Accident Report', value: 'Accident Report'    },
       {   label: 'Assignment of Benefits', value: 'Assignment of Benefits'    },
       {   label: 'Consult Sheets', value: 'Consult Sheets'    },
       {   label: 'Demographics(Patient info)', value: 'Demographics(Patient info)'    },
       {   label: 'Emergency room report', value: 'Emergency room report'    },
       {   label: 'Insurance card', value: 'Insurance card'    }
     ];
  this.Assignto = [
{ value: 'Ashwini'},
{ value: 'Sushma'},
{ value: 'Sai'},
{ value: 'Abhishek'},
{ value: 'Deepa'},
{ value: 'Rohit'},
  ];
  this.Role = [
    { label: 'Select', value: 'Select'},
    { label: 'Provider', value: 'Provider'},
    { label: 'Care Team', value: 'Care Team'},
    { label: 'Case Manager', value: 'Case Manager'},
    { label: 'Facility', value: 'Facility'}
  ];
  this.TaskType = [
    { label: 'Select', value: 'Select'},
    { label: 'Authorization Request', value: 'Authorization Request'},
    { label: 'Appointment Request', value: 'Appointment Request'},
    { label: 'General', value: 'General'},
    { label: 'Billing', value: 'Billing'},
    { label: 'Collection', value: 'Collection'}
  ];
  this.config = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems:this.collection.length
  };
  }

  ngOnInit() {
    this.searchContactMember = this.fb.group({
      First_Name: new FormControl(null),
      City: new FormControl(null),
      State: new FormControl(null)
    });
    this.searchPartnerOrgnization = this.fb.group({
      Name: new FormControl(null),
      City: new FormControl(null),
      State : new FormControl(null)
    });

    this.showviewDetails = this.fb.group({
      First_Name: new FormControl(),
      Last_Name: new FormControl(),
      City: new FormControl(),
      State: new FormControl(),
    });
    this.emergencyform = this.fb.group({
      Name: new FormControl(),
      City: new FormControl(),
      State: new FormControl(),
    });
    this.Newproviderform = this.fb.group({
      Practice: new FormControl(),
      Title: new FormControl(),
      First_Name: new FormControl(null),
      Middle_Name: new FormControl(),
      Last_Name: new FormControl(null),
      Suffix: new FormControl(),
      Specialty: new FormControl(),
      Office: new FormControl(),
      Extension: new FormControl(),
      Cell: new FormControl(),
      Email: new FormControl(),
      Make_Member_Of_YourDrs: new FormControl(),
      Complete_Expanded_Information: new FormControl(),
      Address_Line_1: new FormControl(),
      Address_Line_2: new FormControl(),
      ZIP: new FormControl(),
      City: new FormControl(),
      State: new FormControl(),
      Fax: new FormControl(),
      Comments: new FormControl()
    });
    this.Addpractice = this.fb.group({
      Practice_Name: new FormControl(null),
      Email: new FormControl(),
      WebSite: new FormControl(),
      Practice_Description: new FormControl(),
      Location_Name: new FormControl(null),
      Address: new FormControl(),
      ZIP: new FormControl(),
      City: new FormControl(),
      State: new FormControl(),
      Work_Phone1: new FormControl(),
      Work_Phone2: new FormControl(),
      Fax: new FormControl(),
      Longitude: new FormControl(),
      Lattitude: new FormControl(),
      TaxId: new FormControl(),
      NPINumber: new FormControl(),
      Practice_Short_Name: new FormControl(),
      Secured_Email: new FormControl(),
      Secured_Password: new FormControl(),
      Share_Schedule_With_Other_Location: new FormControl(),
      Is_Billing: new FormControl(),
      Start_Date: new FormControl(),
      End_Date: new FormControl(),
      Is_Collection: new FormControl(),
      Is_Transcription: new FormControl(),
      Is_Office: new FormControl(),
      Is_Surgical: new FormControl(),
      Is_Eclaim_Enabled: new FormControl(),
    });

    this.hospitalizedform = this.fb.group({
      Name: new FormControl(),
      City: new FormControl(),
      State: new FormControl(),
    });
    this.addnewform = this.fb.group({
      organization: new FormControl(),
      Name: new FormControl(),
      phone: new FormControl(),
      Email: new FormControl('', [ Validators.email, Validators.required ]),
      fax: new FormControl(),
      address: new FormControl(),
      zip: new FormControl(),
      City: new FormControl(),
      State: new FormControl(),
      website: new FormControl(),
      contact: new FormControl(),
      contactphone: new FormControl(),
      comments: new FormControl(),
    });
    this.addpracticelocation = this.fb.group({
      practice: new FormControl(),
      location: new FormControl(),
    });
   this.addDocumentform = this.fb.group({
     documentCategory: new FormControl(null),
     documentType: new FormControl(null ),
     documentAccess: new FormControl(null),
     addAttachment: new FormControl( null)
   });
    this.getRoleJson();
    this.getCasedetails();
    this.getIncidentdetails();
    this.getStatedetails();
    this.getsearchhealthcaretable();
    this.showContaint();
    this.getlocationdetails();
    this.getorganiztiontypedetails();
    this.getpracticedetails();
    this.getSpecialitydetails();
    this.showContaintParnerOrgnization();
  }

  openPopUp() {

  }
  getIncidentdetails() {
    this._data.getincidenttypedetails().subscribe(
      (data: any) => {
        this.incidenttype = data;
        console.log(this.incidenttype);
      }
    );
  }
  getCasedetails() {
    this._data.getcasetypedetails().subscribe(
      (data: any) => {
        this.casetype = data;
        console.log(this.casetype);
      }
    );
  }
  getStatedetails() {
    this._data.getDropDownStates().subscribe(
      (data: any) => {
        this.state = data;
        console.log(this.state);
      }
    );
  }
  getsearchhealthcaretable() {
    this._data.gethealthcaresearchtable().subscribe(
      (data: any) => {
        this.tabledata = data;
      }
    );
  }

getSpecialitydetails() {
  this._data.getspecialitydetails().subscribe(
    (data: any) => {
      this.speciality = data;
      console.log(this.speciality);
    }
  );
}
  closePopUp() {
  }
  onaddhealthinsurance() {
    this.panel = false;
    this.table = true;

  }
  payerEli() {
    this.PayerEligibility = true;
  }
  closepayeli() {
    this.PayerEligibility = false;
  }
  emergencyclick() {
    this.emergency = true;
  }
  noemergencyclick() {
    this.emergency = false;
  }
  patienthospitalized() {
    this.hospitalized = true;
  }
  nopatienthospitalized() {
    this.hospitalized = false;
  }
  incidentreport() {
    this.incidentdocument = true;
    this.document = true;
    this.docDetailTable = false;
    // this.incidentReportField = true;
  }
  clearIncidentReport() {
    this.incidentdocument = false;
    this.document = false;
    this.incidentRadioYes = false;
    this.incidentRadioNo = false;
    this.docDetailTable = false;
  }
  noincidentreport() {
    this.incidentdocument = false;
    this.document = false;
    this.docDetailTable = false;
  }
  currenttreatment() {
    this.frequency = true;
  }
  nocurrenttreatment() {
    this.frequency = false;
  }
  physicaltherapy() {
    this.description = true;
  }
  nophysicaltherapy() {
    this.description = false;
  }

  addNewDocument() {
   this.addNewDocumentDisplay = true;
  }
   closeDocumentpop() {
    this.addNewDocumentDisplay = false;
  }
  displayPublic() {
   this.showPublicText = true;
   this.showGrantAccess = false;
   this.showPrivateText = false;
   this.showTable = false ;
  }
  displayPrivate() {
    this.showPrivateText = true;
    this.showGrantAccess = true;
    this.showPublicText = false;
    this.showTable = false;
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
       reader.onload = (event: any) => {
        this.imagePath = event.target.result;
      };
    }
  }

     selectedAssignedTo() {
    this.selectedAssign = this.assign;
    this.assign = null;
  }
  closeAssign() {
    this.selectedAssign = undefined;
  }
  filterAssign(assign) {
    this.filterAssignedTo = [];
   for (let i = 0; i < this.Assignto.length; i++) {
        let filterassign = this.Assignto[i].value;
        if (filterassign.toLowerCase().indexOf(assign.query.toLowerCase()) === 0) {
            this.filterAssignedTo.push(filterassign);
        }
      }
    }

    getRoleJson() {
      this._data.getRoles().subscribe(
        (data: any) => {
        this.ListOfData = data;
         let listData = this.ListOfData;
         if (this.selectedRoles != null) {
           this.ListOfData = [];
           var filterData = _.filter(listData, (l) => {
             if (l.role === this.selectedRoles) {
               this.ListOfData.push(l);
             }
           });
         }});
      }

    selectRoles(item) {
      this.selectedRoles = item.value;
  }
    onRolesSearch() {
      this.showTable = true;
      this.getRoleJson();
        }
        selectDiagnostic(diagnostic) {
     if (diagnostic.value === 'Diagnostic Testing') {
      this.displayDicomDetails = true;
     } else {
      this.displayDicomDetails = false;
     }
        }
        onCheck(name) {
          this.selectCheckbox = name;
        }
        closeName() {
          this.selectCheckbox = undefined;
        }
        onDocumentSave() {
          const req = {
            documCategory: this.addDocumentform.value.documentCategory,
            documType: this.addDocumentform.value.documentType,
            documentAccess: this.addDocumentform.value.documentAccess,
            fileName: 'image',
            description: 'NA',
            reportAddedOn: '20-02-2020',
            reportAddedBy: 'Admin',
            addAttachment: this.addDocumentform.value.addAttachment
          };
          localStorage.setItem( this.addDocumentform.value.addAttachment, 'addAttachment');
          this.documentTable.push(req);
          this.addNewDocumentDisplay = false;
          this.addDocumentform.reset();
          this.docDetailTable = true;
          this.document = false;
        }
        pageChange(event) {
          this.config.currentPage = event;
         }
/////////////////////////////////////
  closesearch() {
    this.Searchhealthcarefacility = false;
  }
  closesearch1() {
    this.Searchemergencyhealthcarefacility = false;
  }
  searchfacility() {
    this.Searchhealthcarefacility = true;
  }
  filterSelectedhealthcaredoc() {
    this.Searchhealthcaretable = true;
    this.alert = true;
    this._data.gethealthcaresearchtable().subscribe(
      (data: any[]) => {
        this.emergencyformarr = data;
        console.log(this.emergencyformarr);
        console.log(this.emergencyform.value.Name);
        if (this.emergencyform.value.Name !== null) {
          this.emergencyformarr = _.filter(this.emergencyformarr, (s) => {
            return s.Name === this.emergencyform.value.Name;
          });
       this.alert=false;
        } else {
          this.Searchhealthcaretable = true;
        }
      }
    );

  }
  filterSelectedhealthcaredoc1() {
    this._data.gethealthcaresearchtable().subscribe(
      (data: any[]) => {
        this.hospitalizedformarr = data;
        console.log(this.hospitalizedformarr);
        console.log(this.hospitalizedform.value.Name);
        if (this.hospitalizedform.value.Name !== null) {
          this.hospitalizedformarr = _.filter(this.hospitalizedformarr, (s) => {
            return s.Name === this.hospitalizedform.value.Name;
          });
          this.alert= false;
         }
         else {
          this.Searchhealthcaretable1 = true;
         }
      }
    );
  }


  selectSearchItem(searchedItem) {
    this.selectedvalue = searchedItem.Name;
    this.selectedvaluearray = searchedItem;
    this.Searchhealthcarefacility = false;
    this.hospitalizedform.reset();
    this.Searchhealthcaretable1 = false;
    this.alert = false;
    this.onaddnewsave = false;
    this.onsearchselect = true;

  }

  selectemergencyroomSearchItem(searchedItem1) {
    this.selectedemergencyvalue = searchedItem1.Name;
    this.selectedemergencyvaluearray = searchedItem1;
    this.Searchemergencyhealthcarefacility = false;
    this.emergencyform.reset();
    this.Searchhealthcaretable = false;
    this.alert = false;
    this.onemergencysearch  = true;
     this.onemergencyadd = false;


  }

  serchMember() {
    this.SearchMember = true;
  }
  closesermem() {
    this.SearchMember = false;
  }
  showDataContaint() {
    this.legalRecords = true;
    console.log(this.searchContactMember.value.First_Name);
    if (this.searchContactMember.value.First_Name !== null) {
      this.legalRepresentativeArr = _.filter(this.legalRepresentativeArr, (s) => {
        return s.First_Name === this.searchContactMember.value.First_Name;
      });
    } else {
      this._data.getsearchMember().subscribe(
        (data: any[]) => {
          this.legalRepresentativeArr = data;
          console.log(this.legalRepresentativeArr);
        }
      );
    }
  }
  selectSearch(searchedData) {
    this.selectedVal = searchedData.First_Name;
    this.selectedValArr = searchedData;
    this.SearchMember = false;
  }
  showContaint() {
    this._data.getsearchMember().subscribe(
      (data: any[]) => {
        this.legalRepresentativeArr = data;
        console.log(this.legalRepresentativeArr);
      }
    );
  }
  // Search Member End

  // View Details Start
  viewDetails() {
    if (this.selectedVal !== undefined) {
    this.ViewDetails = true;
  } else {
    this.messageService.add({
      severity: 'error',
      detail: 'Select organization'
    });
  }
  }
  closeviwdet() {
    this.ViewDetails = false;
  }
  // View Details End

  // Add New Member Start
  addnewMember() {
    this.AddNewMember = true;
  }
  closeaddnewmem() {
    this.AddNewMember = false;
  }
  // Add New Member End
  viewhealthfacility() {
    if (this.selectedvalue !== undefined) {
      this.ViewDetailsofsearchhealthcare = true;
    } else {
      this.messageService.add({
        severity: 'error',
        detail: 'Select organization'
      });
    }
  }
  closeviewdetails() {
    this.ViewDetailsofsearchhealthcare = false;
  }
  viewhealthfacility1() {
    if (this.selectedemergencyvalue !== undefined) {
      this.ViewDetailsofemergencyroom = true;
    } else {
      this.messageService.add({
        severity: 'error',
        detail: 'Select organization'
      });
    }
  }
  searchfacility1() {
    this.Searchemergencyhealthcarefacility = true;
  }
  closeviewdetailsofemergency() {
    this.ViewDetailsofemergencyroom = false;
  }
  clearemergencytab() {
    this.emergency = false;
    this.radioselected2 = false;
    this.radioselected3 = false;
  }
  clearhospitalizedtab() {
    this.hospitalized = false;
    this.radioSelected = false;
    this.radioSelected1 = false;
  }

   showMRI(event)
    {
     this.showmri = event;
   }

   showCTscan(event) {
    this.showctscan = event;
   }
   showXRay(event) {
     this.showxray = event;
   }
   completeinfo() {
     this.ComInformation = true;
   }
   noncompleteinfo() {
     this.ComInformation = false;
   }
  //  Search organization Partner Satrt
  serchpartOrganization() {
    this.SearchPartnerOrgnization = true;
  }
  closederparorag() {
    this.SearchPartnerOrgnization = false;
  }
  showDataPartnerOrgnization() {
    this.searchOrgnization = true;
    console.log(this.searchPartnerOrgnization.value.Name);
    if (this.searchPartnerOrgnization.value.Name !== null) {
      this.serachParOrgArr = _.filter(this.serachParOrgArr , (s) => {
        return s.Practice === this.searchPartnerOrgnization.value.Name;
      });
    } else {
      this._data.getsearchPartnerOrgnization().subscribe(
        (data: any[]) => {
          this.serachParOrgArr = data;
          console.log(this.serachParOrgArr);
        }
      );
    }
  }
  selectSearchPartnerOrgization(searchedData) {
    this.selectedOrganizationVal = searchedData.Practice;
   this.selectedValArr = searchedData;
    this.SearchPartnerOrgnization = false;
  }
  showContaintParnerOrgnization() {
    this._data.getsearchPartnerOrgnization().subscribe(
      (data: any[]) => {
        this.serachParOrgArr = data;
        console.log(this.serachParOrgArr);
      }
    );
  }
  //  Search organization Partner Satrt

  // Add New Orgnization Start
  addnewOrganization() {
    this.AddNewOrganization = true;
  }
  closeneworag() {
   this.AddNewOrganization = false;
  }
  addPractice() {
    if (this.Addpractice.value.Practice_Name  === null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        detail: 'Select Practice_Name'
      });
      return;
    } else if (this.Addpractice.value.Location_Name  === null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        detail: 'Select Location_Name'
      });
      return;
    } else {
    this.addneworgarr.push(this.Addpractice.value);
    console.log(this.Addpractice.value);
    this.searchPartnerOrgnization.reset();
    this.selectedOrganizationVal = this.Addpractice.value.Practice_Name + this.Addpractice.value.Location_Name;
    this.messageService.add({
      severity: 'success',
      summary: 'Added',
      detail: 'Successfully Created'
   });
    this.AddNewOrganization = false;
  }
}
  // Add New Orgnization End
  addProvCon() {
    if (this.Newproviderform.value.First_Name  === null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        detail: 'Select First_Name'
      });
      return;
    } else if (this.Newproviderform.value.Last_Name  === null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        detail: 'Select Last_Name'
      });
      return;
    } else {
    this.addproconarr.push(this.Newproviderform.value);
    this.searchContactMember.reset();
    this.selectedVal = this.Newproviderform.value.First_Name + this.Newproviderform.value.Last_Name;
    this.messageService.add({
      severity: 'success',
      summary: 'Added',
      detail: 'Successfully Created'
   });
    this.AddNewMember = false;
  }
}
  clearcurtreattab() {
    this.frequency = false;
    this.curtreatradio1 = false;
    this.curtreatradio2 = false;
  }
  closeaddneworganization() {
this.addneworganizationdetails = false;
  }
  addnewdetails() {
    this.addnewform.reset();
    this.addpracticelocation.reset();
    this.addneworganizationdetails = true;

  }
  getlocationdetails() {
this._data.getlocation().subscribe(
  (data: any) => {
this.location = data;
console.log(this.location);
  }
);
  }
  getpracticedetails() {
this._data.getpractice().subscribe(
  (data: any) => {
    this.practice = data;
    console.log(this.practice);
  }
);
  }
  getorganiztiontypedetails() {
this._data.getorganizationtype().subscribe(
  (data: any) => {
    this.organiztiontype = data;
    console.log(this.organiztiontype);
  }
);
  }
  get Email() { return this.addnewform.get('Email'); }

  onsave() {
    if (this.addnewform.value.organization  === null) {
      this.messageService.add({
        severity: 'error',
        detail: 'Select organization'
      });
    } else if (this.addnewform.value.Name  === null) {
      this.messageService.add({
        severity: 'error',
        detail: 'Select Name'
      });
    } else if (this.Email.hasError('email')) {
      this.messageService.add({
        severity: 'error',
        detail: 'Select Valid Email Id'
      });
    } else {
      this.emergencyformarr.push(this.addnewform.value);
      console.log(this.addnewform.value);
      this.hospitalizedform.reset();
      this.selectedvalue = this.addnewform.value.Name;
      this.selectedvaluearray = this.addnewform.value;
       this.selectedvaluestate = this.addnewform.value.State.name;
       this.onaddnewsave = true;
       this.onsearchselect = false;
      console.log(this.addnewform.value.State.name);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Saved Sucessfully'
     });
      this.addneworganizationdetails = false;
    }
  }
  onadd() {
    if (this.addpracticelocation.value.practice  === null) {
      this.messageService.add({
        severity: 'error',
        detail: 'Select practice'
      });
    } else if (this.addpracticelocation.value.location  === null) {
      this.messageService.add({
        severity: 'error',
        detail: 'Select location'
      });
    } else {
this.addpracticeloactionarr.push(this.addpracticelocation.value );
console.log(this.addpracticelocation.value.practice.name);
console.log(this.addpracticeloactionarr);
    }
  }
  ondelete(item, value) {
this.addpracticeloactionarr.splice(value, 1);
  }
  addneworg() {
  this.addnewform.reset();
  this.addpracticelocation.reset();
 this.addneworganizationdetails1 = true;


  }
  onsaveitem() {
    if (this.addnewform.value.organization  === null) {
      this.messageService.add({
        severity: 'error',
        detail: 'Select organization'
      });
    } else if (this.addnewform.value.Name  === null) {
      this.messageService.add({
        severity: 'error',
        detail: 'Select Name'
      });
    } else if (this.Email.hasError('email')) {
      this.messageService.add({
        severity: 'error',
        detail: 'Select Valid Email Id'
      });
    }
    else {
      this.emergencyformarr.push(this.addnewform.value);
      this.selectedemergencyvalue = this.addnewform.value.Name;
      this.selectedemergencyvaluearray = this.addnewform.value;
      this.selectedvaluestate = this.addnewform.value.State.name;
      this.onemergencysearch  = false;
      this.onemergencyadd = true;
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Saved Sucessfully'
     });
      this.addneworganizationdetails1 = false;
    }
  }
  closeaddneworganization1() {
    this.addneworganizationdetails1 = false;
  }
}

