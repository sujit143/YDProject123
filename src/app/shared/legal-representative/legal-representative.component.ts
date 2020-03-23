import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

import * as _ from 'lodash';
import { DoctordataService } from '../../views/doctors/doctordata.service';
import { SharedService } from '../../services/appservices/shared.service';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-legal-representative',
  templateUrl: './legal-representative.component.html',
  styleUrls: ['./legal-representative.component.scss']
})
export class LegalRepresentativeComponent implements OnInit {
  haltEscapedialogClose;
  addpractice: FormGroup;
  editpractice: FormGroup;
  addOrganization: FormGroup;
  searchOrganisation: FormGroup;
  searchLegalRepresentative: FormGroup;
  showOrganisationDetails: FormGroup;
  showDetails: FormGroup;
  saveData: FormGroup;
  addNewOrganisation: FormGroup;
  legalRepresentativeArr: any = [];
  OrganisationArr: any = [];
  selectedValArr: any;
  viewDetails = false;
  selectedValArr1: any[] = [];
  selectOrganisationData: any = [];
  addPracLocArr: any = [];
  selectedOrg: any = [];
  orgnisationList: any[];
  stateList: any[];
  practiceList: any[];
  LocationList: any[];
  ManageUserData: any[];
  selectedVal: any;
  addOrganizationErrorObj: any;
  addNewOrganisationErrorObj: any;
  myDateValue: Date;
  showDetailsPopupdisp: boolean = false;
  organisationdisp: boolean = false;
  searchOrganisationdisp: boolean = false;
  organizationDisplay: boolean = false;
  add3: boolean = false;
  search1: boolean = false;
  legalRecords = false;
  showOrganisationTable = false;
  legalState: any;
  legalspecialities: any;
  ViewDetailsPopup: boolean = false;
  showxray = true;
  searchedRecordLength;


  constructor(private fb: FormBuilder,
    private doctordataService: DoctordataService,
    private messageService: MessageService,
    private sharedService: SharedService,
    private masterService: MasterService
  ) { }

  ngOnInit() {
    this.myDateValue = new Date();
    this.addpractice = this.fb.group({
      Practice: new FormControl(null, Validators.required),
      Location: new FormControl(null, Validators.required),
      Status: new FormControl(null, Validators.required),
      Substartdate: new FormControl(null, Validators.required),
      Subenddate: new FormControl(null)
    });
    this.editpractice = this.fb.group({
      Practice: new FormControl(null, Validators.required),
      Location: new FormControl(null, Validators.required),
      Status: new FormControl(null, Validators.required),
      Substartdate: new FormControl(null, Validators.required),
      Subenddate: new FormControl(null)
    });
    this.showDetails = this.fb.group({
      FirstName: new FormControl(),
      LastName: new FormControl(),
      City: new FormControl(),
      State: new FormControl(),
    });
    this.legalState = [
      { label: 'Any', value: 'Any' },
      { label: 'AE', value: 'AE' },
      { label: 'AK', value: 'AK' },
      { label: 'AR', value: 'AR' },
      { label: 'WA', value: 'WA' },
      { label: 'WI', value: 'WI' },
      { label: 'CA', value: 'CA' },
      { label: 'CO', value: 'CO' },

    ];
    this.legalspecialities = [
      { label: 'OB / GYN', value: 'OB / GYN' },
      { label: 'Anesthesia', value: 'Anesthesia' },
      { label: 'Bariatric Surgery', value: 'Bariatric Surgery' },
      { label: 'Medical Weight Loss Surgery', value: 'Medical Weight Loss Surgery' },
      { label: 'Minimally Invasive Spine', value: 'Minimally Invasive Spine' },
      { label: 'NeuroSurgery', value: 'NeuroSurgery' },
    ]
    this.addOrganization = this.fb.group({
      OrganisationName: new FormControl(),
      Title: new FormControl(),
      FirstName: new FormControl(null, Validators.required),
      MiddleName: new FormControl(),
      LastName: new FormControl(null, Validators.required),
      Suffix: new FormControl(),
      Specialty: new FormControl(),
      Office: new FormControl(null, Validators.required),
      Extension: new FormControl(),
      Cell: new FormControl(),
      Email: new FormControl(),
      addressLine1: new FormControl(),
      addressLine2: new FormControl(),
      ZIP: new FormControl(),
      City: new FormControl(),
      State: new FormControl(),
      Fax: new FormControl(),
      Comments: new FormControl()
    });
    this.addOrganizationErrorObj = {
      FirstName: { required: 'Please enter Full Name' },
      LastName: { required: 'Please enter Last Name' },
      Office: { required: 'Please Office#' },
    };
    this.searchOrganisation = this.fb.group({
      OrganisationName: new FormControl(null),
      FirstName: new FormControl(null),
      City: new FormControl(null),
      State: new FormControl(null)
    });
    this.showOrganisationDetails = this.fb.group({
      OrganisationName: new FormControl(null),
      LastName: new FormControl(null),
      City: new FormControl(null),
      State: new FormControl(null)
    });
    this.searchLegalRepresentative = this.fb.group({
      FirstName: new FormControl(null),
      Firm_Name: new FormControl(null),
      City: new FormControl(null),
      State: new FormControl(null)
    });
    this.addNewOrganisation = this.fb.group({
      OrganisationType: new FormControl(null, Validators.required),
      OrganisationName: new FormControl(null, Validators.required),
      Phone: new FormControl(null),
      Email: new FormControl(null),
      Fax: new FormControl(null),
      Address: new FormControl(null),
      ZIP: new FormControl(null),
      City: new FormControl(null),
      State: new FormControl(null),
      Website: new FormControl(null),
      Contact: new FormControl(null),
      ContactPhone: new FormControl(null),
      Comments: new FormControl(null),
      Practice: new FormControl(null),
      Location: new FormControl(null)
    });
    this.addNewOrganisationErrorObj = {
      OrganisationType: { required: 'The Organization Type field is required.' },
      OrganisationName: { required: 'The Organization Name field is required.' },
    };
    this.getOraganisation();
    this.getState();
    this.getPractice();
    this.getLocation();
    this.getOrganizationData();
    this.showContaint();
  }

  public isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  getOraganisation() {
    this.doctordataService.getOrganisationData().then(
      res => {
        this.orgnisationList = res;
      }
    );
  }
  getState() {
    this.doctordataService.getStatenData().then(
      res => {
        this.stateList = res;
      }
    );
  }
  getPractice() {
    this.doctordataService.getPracticeData().then(
      res => {
        this.practiceList = res;
      }
    );
  }
  getLocation() {
    this.doctordataService.getLocationData().then(
      res => {
        this.LocationList = res;
      }
    );
  }

  opensearch1popup() {
    this.legalRecords = false;
    this.showDetails.reset();
    this.search1 = true;
  }
  showContaint() {

    this.sharedService.getlegalRepresentative().subscribe(
      (data: any[]) => {
        this.legalRepresentativeArr = data;
        console.log(this.legalRepresentativeArr);
      }
    );
  }
  showDataContaint() {
    this.legalRecords = true;
    console.log(this.searchLegalRepresentative.value.FirstName);
    if (this.searchLegalRepresentative.value.FirstName !== null) {
      this.legalRepresentativeArr = _.filter(this.legalRepresentativeArr, (s) => {
        return s.FirstName === this.searchLegalRepresentative.value.FirstName;
      });
    } else {
      this.sharedService.getlegalRepresentative().subscribe(
        (data: any[]) => {
          this.legalRepresentativeArr = data;
          console.log(this.legalRepresentativeArr);
        }
      );
    }
  }

  ViewContent() {
    if (this.selectedVal !== undefined) {
      this.showDetailsPopupdisp = true;
    } else {
      this.messageService.add({
        severity: 'error',
        detail: 'Select organization'
      });
    }
  }

  selectSearch(searchedData) {
    this.selectedVal = searchedData.LastName + searchedData.FirstName;
    this.selectedValArr = searchedData;
    this.search1 = false;
  }
  saveLegalRepresentative() {
    // this.selectedValArr1 = [];
    if (this.isEmpty(this.selectedValArr)) {
      this.messageService.add({
        severity: 'error',
        detail: 'Please Select Member First'
      });
    } else {
      if (this.selectedValArr1.length > 0) {
        for (let i = 0; i < this.selectedValArr1.length;) {
          const arrEl = this.selectedValArr1[i];
          // for (let j = 0; j < this.selectedValArr.length;) {
            // const selectedEl = this.selectedValArr[j];
            if (arrEl.FirstName === this.selectedValArr.FirstName) {
              i = this.selectedValArr1.length;
            } else if (arrEl.FirstName === this.selectedValArr.FirstName) {
               i = this.selectedValArr1.length;
               console.log('Already exists');
            } else {
              console.log('new Legal');
              i = this.selectedValArr1.length;
              this.selectedValArr1.push(this.selectedValArr);
              this.selectedValArr = [];
              this.selectedVal = [];
              this.viewDetails = true;
            }
          // }
        }
      } else {
        this.selectedValArr1.push(this.selectedValArr);
        this.selectedValArr = [];
        this.selectedVal = [];
        this.viewDetails = true;
      }
    }
    // if (this.isEmpty(this.selectedValArr)) {
    //   this.messageService.add({
    //     severity: 'error',
    //     detail: 'Please Select Member First'
    //   });
    // } else {
    //   this.selectedValArr1.push(this.selectedValArr);
    //   this.selectedValArr = [];
    //   this.selectedVal = [];
    //   this.viewDetails = true;
    // }

  }
  closesearch1popup() {
    this.searchLegalRepresentative.reset();
    this.search1 = false;
  }
  closeDetailsPopup() {
    this.showDetails.reset();
    this.showDetailsPopupdisp = false;
    console.log('hi');
  }

  // -------------- Add New Organization --------------
  openOrganizationpopup() {
    this.organizationDisplay = true;
  }

  closeOrganizationpopup() {
    this.organizationDisplay = false;
  }
  searchOrganisationpopup() {
    this.showOrganisationTable = false;
    this.searchOrganisationdisp = true;
  }
  closeSearchOrganisationPopup() {
    this.searchOrganisation.reset();
    this.searchOrganisationdisp = false;
  }
  getOrganizationData() {
    this.sharedService.getOrganizationRecords().subscribe(
      (data: any[]) => {
        this.OrganisationArr = data;
      }
    );
  }

  displayOrganization() {
    this.showOrganisationTable = true;
    if (this.searchOrganisation.value.OrganisationName !== null) {
      this.OrganisationArr = _.filter(this.OrganisationArr, (s) => {
        return s.OrganisationName === this.searchOrganisation.value.OrganisationName;
      });
    } else {
      // this.sharedService.getOrganizationRecords().subscribe(
      //   (data: any[]) => {
      //     this.OrganisationArr = data;
      //   }
      // );
      this.getOrganizationData();
    }
  }
  selectOrganisation(searchedData) {
    this.selectOrganisationData = searchedData;
    console.log('dip', this.selectOrganisationData);
    this.addOrganization.patchValue({
      OrganisationName: searchedData.OrganisationName
    });
    this.searchOrganisationdisp = false;
  }
  showOrganisation() {
    this.organisationdisp = true;
  }
  closeOrganisationDetails() {
    this.organisationdisp = false;
  }
  addNewOrg(searchedData) {
    const isValid = this.masterService.getFormErrorMessage(this.addOrganization, this.addOrganizationErrorObj);
    if (isValid !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        detail: isValid
      });
    } else {
      this.selectedVal = searchedData.LastName + searchedData.FirstName;
      this.selectedValArr = searchedData;
      this.organizationDisplay = false;
      setTimeout(
        () => {
          this.messageService.add(
            {
              severity: 'success',
              summary: 'Success',
              detail: 'Request sent succesfully'
            }
          );
        }, 1000
      );
    }
  }

  // -------------- Add New Organization 2nd--------------
  openadd3popup() {
    this.add3 = true;
  }
  closeadd3popup() {
    this.add3 = false;
  }
  showPracLoc(searchedData) {
    this.addPracLocArr.push(searchedData);
    console.log(this.addPracLocArr);
  }
  deletePracLoc() {
    this.addPracLocArr.splice(0, 1);
  }
  addNewOrganisationData(searchedData) {
    const isValid = this.masterService.getFormErrorMessage(this.addNewOrganisation, this.addNewOrganisationErrorObj);
    if (isValid !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        detail: isValid
      }
      );
    } else {
      this.selectOrganisationData = searchedData;
      this.addOrganization.patchValue({
        OrganisationType: searchedData.OrganisationType,
        OrganisationName: searchedData.OrganisationName,
        Phone: searchedData.Phone,
        Email: searchedData.Email,
        Fax: searchedData.Fax,
        Address: searchedData.Address,
        ZIP: searchedData.ZIP,
        City: searchedData.City,
        State: searchedData.State,
        Website: searchedData.Website,
        Contact: searchedData.Contact,
        ContactPhone: searchedData.ContactPhone,
        Comments: searchedData.Comments,
        Practice: searchedData.Practice,
        Location: searchedData.Location
      }
      );
      this.add3 = false;
      setTimeout(
        () => {
          this.messageService.add(
            {
              severity: 'success',
              summary: 'Success',
              detail: 'Request sent succesfully'
            }
          );
        }, 1000);
    }
  }
  DocumentView() {
    this.ViewDetailsPopup = true;
  }
  closeViewdedetail() {
    this.ViewDetailsPopup = false;
  }
  showXRay(event) {
    this.showxray = event;
    this.showxray = false;
  }

}
