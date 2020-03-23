import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Newappointment } from '../../../models/newappointment';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/primeng';
import { MasterService } from '../../../services/master.service';
import { ReferralSourceComponent } from '../../../shared/referral-source/referral-source.component';
import { SharedService } from '../../../services/appservices/shared.service';
import * as _ from 'lodash';
import { Details } from '../../../models/details';

import { DatePipe } from '@angular/common';
import { Procedure } from '../../../shared/surgery/surgery';
import { IncidentTypes } from '../../../models/incidentTypes';
import { StatesList } from '../../../models/statesList';
import { CaseTypes } from '../../../models/caseTypes';
import { Provider } from '../../../models/Provider';
import { MainService } from '../../../services/appservices/main.service';
import { Subscription } from 'rxjs';

import { SearchFacilities } from '../../../models/search-facilities';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss',
    '../../../../assets/CSS/common.css',
  ]
})
export class AppointmentsComponent implements OnInit {
  visibleCaseDetails: boolean = false;
  messageValue: string;
  subscription: Subscription;
  private _subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private messageService: MessageService,
    private masterService: MasterService,
    private sharedService: SharedService
    ) {

      this.subscription = this.sharedService.getCaseDetails().subscribe(message => {
        console.log(message);
        this.visibleCaseDetails = message.message;
        this.messageValue = message.value;
        if (this.visibleCaseDetails === true) {
          this.router.navigate(['dashboard/appointments/caseDetails'], { queryParams: { page: 1, Value: this.messageValue } });
        }
      });


    this.selectedValArr = [];
    this.selectedValArr1 = [];

    this.Appointmenttype = [
      { label: 'Select', value: '' },
      { label: 'Consultaion', value: 'Consultaion' },
      { label: 'Physical Theropy', value: 'Physical Theropy' },
      { label: 'Virtual visit', value: 'Virtual visit' },
      { label: 'Surgical', value: 'Surgical' },
      { label: 'Initail Evaluation', value: 'Initail Evaluation' },
      { label: 'Ancle', value: 'Ancle' },

    ];

    this.OrganizationType = [
      { label: 'Select', value: '' },
      { label: 'Insurance Company', value: '2' },
      { label: 'Representative', value: '3' },
      { label: 'Employer', value: '4' },
      { label: 'Third Party Administrator', value: '5' },
      { label: 'Hospital', value: '6' },
      { label: 'Medical Practice', value: '7' },
      { label: 'Urgent Care', value: '8' },
      { label: 'Surgical Facilities', value: '9' },
      { label: 'Management Company', value: '10' },
      { label: 'Sports', value: '11' },
      { label: 'NYC LAW', value: '12' },
      { label: 'Church', value: '13' },
      { label: 'Firemans Insurance Co', value: '14' },
      { label: 'Normandy Insurance', value: '15' }
    ];


    this.Practice = [
      { label: 'Select Practice', value: '' },
      { label: 'Advanced Pain care', value: '434' },
      { label: 'Apple Pain Management and Rehab ', value: '77' },
      { label: 'Baynes Ortho', value: '83' },
      { label: 'Bronx', value: '385' },
      { label: 'Edison Rehab and Acupuncture PC', value: '333' },
      { label: 'Electrodiagnostics and Physical Medicine', value: '321' },
      { label: 'First Practice', value: '474' },
      { label: 'Flushing Office', value: '383' },
      { label: 'Foot and Ankle Surgical Associates', value: '102' },
      { label: 'Gaon Pain Clinic', value: '384' },
      { label: 'HEMA', value: '81' },
      { label: 'HEMG', value: '82' },
      { label: 'magnacarepractice', value: '415' },
      { label: 'Montefiore New Rochelle Hospital', value: '458' },

    ];

    this.Location = [
      { label: 'Select Location', value: '' },
      { label: ' Baarn Rehab & Pain Clinic, Flushing, NY', value: '449' },
      { label: ' Flemington Neuro', value: '237' },
      { label: ' New Brunswick', value: '446' },
      { label: ' Rehabilitation Medicine Center of New York, New York, NY', value: '445' },
      { label: '100A Liv, Brooklyn', value: '610' },
      { label: '209- 35 Northern Blvd', value: '537' },
      { label: '23967 Brandon Parkway Trace', value: '751' },
      { label: '330 9th Street, Brooklyn NY 11215', value: '686' },
      { label: '347 Agustin Parks Fork', value: '749' },

    ];
  }
  childData: any;
  Appointmenttype: any;
  Provider: any;
  newpatient: boolean = false;
  newpatientform: FormGroup;
  arr1: any = [];
  fname: string;
  lname: string;
  dob: any;
  gender: string;
  call: string;
  home: string;
  work: string;
  preference: string;
  email: string;
  appointmenttype: string;
  provider: string;
  dateofservice: any;
  casetype: string;
  incidenttype: string;
  dateofaccident: any;
  accidentzip: string;
  accidentstate: string;
  name: string;
  phonenum: any;
  relationship: string;
  accidentcity: string;
  selectedCar1: string;
  Casetype: any;
  Incidenttype: any;
  callbyothers = false;
  search: boolean = false;
  arr2: any[];
  path: string = 'dashboard';
  norecordfound: boolean = false;
  navbar = 'dashboard';
  FormErrorObj: any;
  callbyotr: FormGroup;
  hospital: boolean = false;
  emergencyroom: boolean = false;
  searchhospitalClick: boolean = false;
  addhospital: boolean = false;
  openhospital: boolean = false;
  OrganizationType: any;
  StatusDrop: any;
  StatesDrop: StatesList[];
  Practice: any;
  Location: any;
  searchfacilities: FormGroup;
  searchfacilitiesArr: SearchFacilities[] = [];
  legalRecords: boolean = false;
  selectedVal: any = null;
  selectedValArr: any;
  addNewOrganisationErrorObj: any;
  addNewOrganisation: FormGroup;
  addPracLocArr: any = [];
  showPracLocs: boolean = false;
  selectedVal1: any;
  check: boolean = false;
  addButton: boolean = false;
  closenewappointment: boolean = false;
  showDetails: boolean = false;
  patientinfo: boolean = false;
  myname: any;
  selprovider: boolean = false;
  searchProvider: FormGroup;
  onSearchProviderdiplay: boolean = false;
  providerArr: any[];
  editPopUpData: FormGroup;
  editPopUpDataErrorObj: any;
  openEditAddPopupdisp: boolean;
  myDateValue: any = null;
  public selectedTarget: Element;
  patientArr: Details[] = [];
  selectedId: any;
  patientName: any;
  appointmenttypes: any;
  filteredProcedure: any[];
  appType;
  submitted: boolean = false;
  selectedValArr1: any;
  emergencyArray: boolean = false;
  showZipCode: boolean = false;
  showSurgery: boolean = false;
  descriptionEnable: boolean = false;
  locationEnable: boolean = false;
  selectedVals: any = null;
  openEmergency: boolean = false;
  displayselectlocation: boolean = false;
  Providers: Provider[];
  incidentTypeList: IncidentTypes[];
  caseTypesList: CaseTypes[];
  search1: boolean = false;
  selectedProcedure: any;


  ngOnInit() {

    this.newpatientform = this.fb.group({
      id: new FormControl(null),
      fname: new FormControl(null, Validators.required),
      lname: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),


      cell: new FormControl(null, [Validators.required]),
      home: new FormControl(),
      work: new FormControl(null),
      preference: new FormControl(null),
      email: new FormControl(null, Validators.required),
      appointmenttype: new FormControl(null, Validators.required),
      provider: new FormControl(null, Validators.required),
      dateofservice: new FormControl(null, Validators.required),
      casetype: new FormControl(null, Validators.required),
      incidenttype: new FormControl(null),
      dateofaccident: new FormControl(null),
      accidentzip: new FormControl(null, Validators.pattern('[0-9]*')),
      accidentstate: new FormControl(null, Validators.required),
      accidentcity: new FormControl(null),
      address1: new FormControl(null),
      address2: new FormControl(null),
      zip: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      ssn: new FormControl(null),
      language: new FormControl(null),
      email1: ['email'],
      phone: ['phone'],
      text: ['text'],
      yes: new FormControl(null),
      no: new FormControl(null),
      emergencyyes: new FormControl(null),
      emergencyno: new FormControl(null),
      general_hospital: new FormControl(null),
      general_emergency: new FormControl(null),




    });
    this.callbyotr = this.fb.group({
      name: new FormControl('', Validators.required),
      phonenum: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
      relationship: new FormControl('', Validators.required)
    });

    this.searchfacilities = this.fb.group({
      First_Name: new FormControl(null),
      City: new FormControl(null),
      State: new FormControl(null)
    });

    this.addNewOrganisation = this.fb.group({
      OrganisationType: new FormControl(null, Validators.required),
      First_Name: new FormControl(null, Validators.required),
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


    this.searchProvider = this.fb.group({
      ProviderName: new FormControl(null),
      Practice: new FormControl(null),
      Location: new FormControl(null),
      Specialty: new FormControl(null),
      ZIP: new FormControl(null),
      City: new FormControl(null),
      State: new FormControl(null)
    });
    this.FormErrorObj = {
      fname: { required: 'Firstname is required' },
      lanme: { required: 'Lastname is required' },
      cell: { required: 'Cell is required' },
      dob: { required: 'Date of birth is required' },
      gender: { required: 'Gender is required' },
      email: { required: 'email is required' },
      appointmenttype: { required: 'Appointmenttype is required' },
      provider: { required: 'Provider is required' },
      dateofservice: { required: 'Date of Service is required' },
      casetype: { required: 'Case Type is required' },
      accidentstate: { required: 'Accident state is required' },
      accidentzip: { required: 'Zip is required' }
    };
    this.editPopUpData = this.fb.group({
      PatientName: new FormControl(null),
      Zipcode: new FormControl(null),
      Location: new FormControl(null, Validators.required),
      preferredDate: new FormControl(null),
      StartTime: new FormControl(null, Validators.required),
      EndTime: new FormControl(null, Validators.required),
      Appmemo: new FormControl(null),
      reason: new FormControl(null),
      AppointmentType: new FormControl(null, Validators.required),
      description: new FormControl(null),
      providerPhysicianAssistant: new FormControl(null, Validators.required),
      ProviderId: new FormControl(null)
    });
    this.editPopUpDataErrorObj = {
      AppointmentType: { required: 'Please enter Appointment Type' },
      Location: { required: 'Please enter Location' },
      providerPhysicianAssistant: { required: 'Please enter provider/PhysicianAssistant' },
      reason: { required: 'Please enter reason' },
      description: { required: 'Please enter description' },
    };
    this.showContaint();
    this.getState();
    this.getNewAppointmentData();
    this.getProviderList();
    this.getIncidentTypes();
    this.getCaseTypes();
  }

  getNewAppointmentData() {
    this.sharedService.getNewAppointmentData().subscribe(
      (data: any[]) => {
        this.arr1 = data;
      }
    );
  }

  getState() {
    this.sharedService.getDropDownStates().subscribe(
      (data: StatesList[]) => {
        this.StatesDrop = this.masterService.formatDataforDropdown(
          'name',
          data,
          'Select',
          'name'
        );
      }
    );
  }
  getProviderList() {
    this.sharedService.getProviderData().subscribe(
      (data: Provider[]) => {
        this.Providers = this.masterService.formatDataforDropdown(
          'ProviderName',
          data,
          'Select',
          'ProviderName'
        );
      }
    );
  }
  getIncidentTypes() {
    this.sharedService.getincidenttypedetails().subscribe(
      (data: IncidentTypes[]) => {
        this.incidentTypeList = this.masterService.formatDataforDropdown(
          'name',
          data,
          'Select',
          'name'
        );
      }
    );
  }
  getCaseTypes() {
    this.sharedService.getcasetypedetails().subscribe(
      (data: CaseTypes[]) => {
        this.caseTypesList = this.masterService.formatDataforDropdown(
          'name',
          data,
          'Select',
          'name'
        );
      }
    );
  }


  showContaint() {
    this.sharedService.getSearchfacilities().subscribe(
      (data: SearchFacilities[]) => {
        this.searchfacilitiesArr = data;
        console.log(this.searchfacilitiesArr);
      }
    );
  }
  showDataContaint() {
    this.legalRecords = true;
    console.log(this.searchfacilities.value.First_Name);
    if (this.searchfacilities.value.First_Name !== null) {

      this.searchfacilitiesArr = _.filter(this.searchfacilitiesArr, (s) => {
        return s.First_Name === this.searchfacilities.value.First_Name;
      });
    } else {
      this.sharedService.getSearchfacilities().subscribe(
        (data: SearchFacilities[]) => {
          this.searchfacilitiesArr = data;
          console.log(this.searchfacilitiesArr);
        }
      );
    }
    this.searchfacilities.reset();

  }


  selectProcedure(event) {
    this.selectedProcedure = event.ProviderName;
  }
  closeTag() {
    this.selectedProcedure = undefined;
  }
  filterProcedure(event) {
    const filterQuery = event.query;
    console.log("jjkh",filterQuery);
    this.sharedService.getProviderData().subscribe(
      procedures => {
      console.log("jjkh",procedures);
    this.filteredProcedure = this.getFilterProcedure(filterQuery, procedures);
    console.log("j",this.filteredProcedure);
    });
  }

  getFilterProcedure(filterQuery, procedures: any): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < procedures.length; i++) {
      const procedure = procedures[i];
       if (procedure.ProviderName.toLowerCase().indexOf(filterQuery.toLowerCase()) === 0) {
        filtered.push(procedure);
      }
    }
    return filtered;
  }

  selectSearch(searchedData, value) {

    this.selectedVal = searchedData.First_Name;
    if (value === 'Hospital') {
      console.log(value);
      this.newpatientform.patchValue({
        general_hospital: this.selectedVal
      });
      this.selectedValArr = searchedData;
    } else {
      this.newpatientform.patchValue({
        general_emergency: this.selectedVal
      });
      this.selectedValArr1 = searchedData;
    }
    console.log(this.selectedValArr);
    this.searchhospitalClick = false;

  }
  selectSearch1(searchedData, value) {
    var searchedData1 = searchedData;

    this.selectedVals = searchedData1.First_Name;
    console.log(this.selectedVals);
    if (value === 'Hospital') {
      console.log(value);
      this.newpatientform.patchValue({
        general_hospital: this.selectedVals
      });
      this.selectedValArr = searchedData;
    } else {
      this.newpatientform.patchValue({
        general_emergency: this.selectedVals
      });
      this.selectedValArr1 = searchedData;
    }
    console.log(this.selectedValArr);
    this.searchhospitalClick = false;

  }


  addNewOrg(searchedData, value) {
    console.log(searchedData);

    const isValid = this.masterService.getFormErrorMessage(this.addNewOrganisation, this.addNewOrganisationErrorObj);
    if (isValid !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        detail: isValid
      });
    } else {
      this.selectedVal = searchedData.First_Name;
      if (value === 'Hospital') {
        this.newpatientform.patchValue({
          general_hospital: this.selectedVal
        });
        this.selectedValArr = searchedData;
      } else {
        this.newpatientform.patchValue({
          general_emergency: this.selectedVal
        });
        this.selectedValArr1 = searchedData;
      }
      console.log(this.selectedValArr);

      this.addhospital = false;
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
      this.addNewOrganisation.reset();
    }
  }

  addNewOrg1(searchedData, value) {
    console.log(searchedData, value);

    const isValid = this.masterService.getFormErrorMessage(this.addNewOrganisation, this.addNewOrganisationErrorObj);
    if (isValid !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        detail: isValid
      });
    } else {
      this.selectedVals = searchedData.First_Name;

      console.log(this.selectedVals);
      if (value === 'Hospital') {
        this.newpatientform.patchValue({
          general_hospital: this.selectedVals
        });
        this.selectedValArr = searchedData;
      } else {
        this.newpatientform.patchValue({
          general_emergency: this.selectedVals
        });
        this.selectedValArr1 = searchedData;
      }
      console.log(this.selectedValArr1);

      this.addhospital = false;
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
      this.addNewOrganisation.reset();
    }
  }
  showPracLoc(searchedData) {
    this.showPracLocs = true;
    console.log(searchedData);
    this.addPracLocArr.push(searchedData);
    console.log(this.addPracLocArr);
  }
  deletePracLoc() {
    this.addPracLocArr.splice(0, 1);
  }
  onSelectAppointmentType() {
    if (this.editPopUpData.value.AppointmentType === null) {
      this.editPopUpData.patchValue({
        Location: null,
        providerPhysicianAssistant: null
      });
    } else {
      this.onEditPopUp();
    }
  }
  onEditPopUp() {

    console.log(this.arr1);
    // tslint:disable-next-line: prefer-const
    var filterd_data = _.filter(this.arr1, (s) => {
      return s.Id === this.selectedId;
    });
    console.log(filterd_data);
    this.editPopUpData.patchValue({
      //  PatientName: this.arr1[0],
      Location: filterd_data[0].Location,
      AppointmentType: filterd_data[0].Appointmenttype,
      providerPhysicianAssistant: filterd_data[0].Provider,
      Zipcode: filterd_data[0].Zipcode,
      preferredDate: filterd_data[0].PreferredDate,
      StartTime: filterd_data[0].StartTime,
      EndTime: filterd_data[0].EndTime,
      Appmemo: filterd_data[0].Appointment_memo,
      reason: filterd_data[0].Reason,
      description: filterd_data[0].Description
    });
    console.log('hhiiiidfddfgi', this.editPopUpData.value.AppointmentType);
    // this.selectedVal = this.arr1[0].provider;
    this.patientName = this.arr1[0].PatientName;
    this.appointmenttypes = this.arr1[0].Appointmenttype;


  }





  // pop ups
  openadd() {
    this.newpatient = true;
    this.search = false;

  }
  closepopup() {
    this.showDetails = false;
    this.closenewappointment = true;
    this.newpatientform.reset();
    this.selectedValArr = [];
    this.selectedValArr1 = [];
    // this.newpatient = false;
    this.newpatientform.controls.general_hospital.reset();
    this.newpatientform.controls.general_emergency.reset();

  }
  closeconfirm() {
    this.closenewappointment = false;
  }
  closeallconfirms() {
    this.newpatient = false;
    this.closenewappointment = false;
  }
  calledbyothers() {
    this.callbyothers = true;
  }
  calledbyother() {
    this.callbyothers = false;
  }
  hospitlised() {
    this.hospital = true;
  }
  nohospitlised() {
    this.hospital = false;
  }
  emergency() {
    this.emergencyroom = true;
  }
  noemergency() {
    this.emergencyroom = false;
  }
  allClear() {
    this.newpatientform.controls.yes.reset();
    this.newpatientform.controls.no.reset();
    this.hospital = false;

  }
  allemergencyClear() {
    this.newpatientform.controls.emergencyyes.reset();
    this.newpatientform.controls.emergencyno.reset();
    this.emergencyroom = false;
  }

  // view org
  OnOpenhospitalDetails(value) {
    if (this.selectedVal !== null) {
      this.openhospital = true;
    } else {
      this.messageService.add({
        severity: 'error',
        detail: 'Select organization'
      });
    }
    // this.openhospital = true;
    if (value == 'Hospital') {
      this.emergencyArray = true;
    } else {
      this.emergencyArray = false;
    }
  }
  OnOpenhospitalDetails1(value) {
    if (this.selectedVals !== null) {
      this.openEmergency = true;
    } else {
      this.messageService.add({
        severity: 'error',
        detail: 'Select organization'
      });
    }
    // this.openhospital = true;
    if (value == 'Hospital') {
      this.emergencyArray = true;
    } else {
      this.emergencyArray = false;
    }
  }
  OnCloseOrgDetails() {
    this.openhospital = false;
  }
  OnCloseOrgDetails1() {
    this.openEmergency = false;
  }

  // search
  OnSearchhospitalClick(value) {
    if (value === 'Hospital') {
      this.check = true;
    } else {
      this.check = false;
    }
    this.searchhospitalClick = true;
    this.legalRecords = false;
  }
  OnCloseOrg() {
    this.searchhospitalClick = false;
  }

  // add org
  OnAddhospital(value) {
    if (value === 'Hospital') {
      this.addButton = true;
    } else {
      this.addButton = false;
    }
    this.addhospital = true;
    this.showPracLocs = false;
  }
  OnCloseAddOrg() {
    this.addhospital = false;
  }
  onSearchClick(value) {
    if (this.newpatientform.value.fname) {
      if (this.newpatientform.value.lname) {
        if (value !== '') {
          this.arr2 = this.arr1.filter(x => x.PatientName.indexOf(value) != -1);
          console.log(this.arr2);

          if (this.arr2.length == 0) {
            this.search1 = true;
          } else {
            this.search = true;
          }
          this.datePipe.transform(this.arr2[0].dob, 'yyyy/MM/dd');

        }

      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: 'Please enter Last name'
        });
      }

    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please enter First name'
      });
    }
  }




  newpatientadd() {
    const isValid = this.masterService.getFormErrorMessage(this.newpatientform, this.FormErrorObj);
    if (isValid !== undefined) {
      this.messageService.add({ severity: 'error', summary: 'Warning', detail: isValid });
    } else {
      this.arr1.push(this.newpatientform.value);
      this.myname = this.arr1[0].PatientName;
      console.log(this.myname);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Successfully created' });
      console.log(this.arr1);
      this.newpatientform.reset();
      this.newpatient = false;
    }
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  changePath(path) {
    this.path = path;
    this.navbar = path;
  }


  close() {
    if (this.newpatientform.value.fname) {
      if (this.newpatientform.value.lname) {
        if (this.callbyotr.value.name && this.callbyotr.value.phonenum && this.callbyotr.value.relationship) {

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Successfuly saved'
          });
          this.newpatient = false;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error Message',
            detail: 'Please enter caller detailes empty fields'
          });
        }
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: 'Please enter patient lastname'
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please enter First name'
      });
    }

  }
  inputtab(item) {
    console.log(item);

    this.showDetails = true;
    this.submitted = true;

    var geteditdata = item;
    console.log(geteditdata);
    this.selectedId = geteditdata.Id;
    console.log(this.selectedId);
    console.log(geteditdata.Appointmenttype);
    if (geteditdata.Appointmenttype === 'Surgical') {
      this.showZipCode = false;
      this.showSurgery = true;
    } else {
      this.showZipCode = true;
      this.showSurgery = false;
    }
    console.log(geteditdata.Provider);
    this.newpatientform.patchValue({
      fname: geteditdata.PatientName,
      lname: geteditdata.Lname,
      dob: geteditdata.Dob,
      gender: geteditdata.Gender,
      cell: geteditdata.Cell,
      home: geteditdata.Home,
      work: geteditdata.Work,
      preference: geteditdata.Preference,
      email: geteditdata.Email,
      appointmenttype: geteditdata.Appointmenttype,
      provider: geteditdata.Provider,
      dateofservice: geteditdata.Dateofservice,
      casetype: geteditdata.Casetype,
      incidenttype: geteditdata.Incidenttype,
      dateofaccident: geteditdata.Dateofservice,
      accidentzip: geteditdata.Accidentzip,
      accidentstate: geteditdata.Accidentstate,
      accidentcity: geteditdata.Accidentcity,
      address1: geteditdata.Address1,
      address2: geteditdata.Address2,
      zip: geteditdata.Zip,
      city: geteditdata.City,
      state: geteditdata.State,
      ssn: geteditdata.Ssn,
      language: geteditdata.Language,
      email1: geteditdata.Email1,
      phone: geteditdata.Phone,
      text: geteditdata.Text,
      general_hospital: geteditdata.General_hospital,
      general_emergency: geteditdata.General_emergency

    });
  }
  openpatientinfo() {
    this.onEditPopUp();
    this.patientinfo = true;



  }
  OnClosepateintinfo() {
    this.patientinfo = false;
    this.descriptionEnable = false;
  }
  selectprovider() {
    this.selprovider = true;
  }

  closeEditAddPopup() {
    this.selprovider = false;
    this.searchProvider.reset();
  }
  onSearchProvider() {
    this.onSearchProviderdiplay = true;
    if (this.searchProvider.value.ProviderName !== null) {
      this.providerArr = _.filter(this.providerArr, (s) => {
        return s.ProviderName === this.searchProvider.value.ProviderName;
      });
    } else {
      this.sharedService.getProviderData().subscribe(
        (data: any) => {
          this.providerArr = data;
        }
      );
    }
  }
  selectSearchdata(searchedData) {
    // this.selectedVal = searchedData.ProviderName;
    this.editPopUpData.patchValue({
      providerPhysicianAssistant: searchedData.ProviderName
    });
    this.newpatientform.patchValue({
      provider: searchedData.ProviderName
    });
    this.selprovider = false;
  }
  saveEditedData() {

    console.log(this.editPopUpData.value);
    const isValid = this.masterService.getFormErrorMessage(this.editPopUpData, this.editPopUpDataErrorObj);
    if (isValid !== undefined) {
      this.messageService.add({ severity: 'error', summary: 'Warning', detail: isValid });
    } else {
      for (let i = 0; i < this.arr2.length; i++) {
        if (this.arr2[i].Id === this.selectedId) {
          this.arr2[i].Location = this.editPopUpData.value.Location;
          this.arr2[i].Zipcode = this.editPopUpData.value.Zipcode;
          this.arr2[i].Provider = this.editPopUpData.value.providerPhysicianAssistant;
          this.arr2[i].Appointmenttype = this.editPopUpData.value.AppointmentType;
          this.arr2[i].StartTime = this.editPopUpData.value.StartTime;
          this.arr2[i].EndTime = this.editPopUpData.value.EndTime;
          if (this.descriptionEnable === true) {
            this.arr2[i].Reason = this.editPopUpData.value.reason;
            this.arr2[i].Description = this.editPopUpData.value.description;
          }
        }

        this.patientinfo = false;
        this.descriptionEnable = false;
      }
      console.log('Updated', this.arr2);

      setTimeout(
        () => {
          this.messageService.add(
            {
              severity: 'success',
              summary: 'Success',
              detail: 'Data Updated succesfully'
            }
          );
        }, 1000
      );

    }
    this.appType = this.editPopUpData.value.AppointmentType;
  }
  newpatientedit() {
    console.log(this.newpatientform.value);
    console.log(this.newpatientform.value.provider);
    for (let i = 0; i < this.arr2.length; i++) {
      if (this.arr2[i].Id === this.selectedId) {
        this.arr2[i].PatientName = this.newpatientform.value.fname;
        this.arr2[i].Lname = this.newpatientform.value.lname;
        this.arr2[i].Dob = this.newpatientform.value.dob;
        this.arr2[i].Gender = this.newpatientform.value.gender;
        this.arr2[i].Cell = this.newpatientform.value.cell;
        this.arr2[i].Home = this.newpatientform.value.home;
        this.arr2[i].Work = this.newpatientform.value.work;
        this.arr2[i].Preference = this.newpatientform.value.preference;
        this.arr2[i].Email = this.newpatientform.value.email;
        this.arr2[i].Appointmenttype = this.newpatientform.value.appointmenttype;
        this.arr2[i].Provider = this.newpatientform.value.provider;
        this.arr2[i].Dateofservice = this.newpatientform.value.dateofservice;
        this.arr2[i].Casetype = this.newpatientform.value.casetype;
        this.arr2[i].Incidenttype = this.newpatientform.value.incidenttype;
        this.arr2[i].Dateofaccident = this.newpatientform.value.dateofaccident;
        this.arr2[i].Accidentzip = this.newpatientform.value.accidentzip;
        this.arr2[i].Accidentstate = this.newpatientform.value.accidentstate;
        this.arr2[i].Accidentcity = this.newpatientform.value.accidentcity;
        this.arr2[i].Address1 = this.newpatientform.value.address1;
        this.arr2[i].Address2 = this.newpatientform.value.address2;
        this.arr2[i].Zip = this.newpatientform.value.zip;
        this.arr2[i].City = this.newpatientform.value.city;
        this.arr2[i].State = this.newpatientform.value.state;
        this.arr2[i].Ssn = this.newpatientform.value.ssn;
        this.arr2[i].Language = this.newpatientform.value.language;
        this.arr2[i].Email1 = this.newpatientform.value.email1;
        this.arr2[i].Phone = this.newpatientform.value.phone;
        this.arr2[i].Text = this.newpatientform.value.text;
        this.arr2[i].General_hospital = this.newpatientform.value.general_hospital;
        this.arr2[i].general_emergency = this.newpatientform.value.general_emergency;

      }

    }
    console.log('Updated', this.arr2);

    setTimeout(
      () => {
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Success',
            detail: 'Data Updated succesfully'
          }
        );
      }, 1000
    );

    this.newpatientform.reset();
    this.newpatient = false;
    this.showDetails = false;
  }
  resonEnable() {
    if (this.descriptionEnable = true) {
      this.editPopUpData.get('reason').setValidators(Validators.required);

      this.editPopUpData.get('description').setValidators(Validators.required);
    }
  }
  selectAppointment(event) {
    if (event.value === 'Surgical') {
      this.displayselectlocation = true;
    } else {
      this.displayselectlocation = false;
    }

  }
}

