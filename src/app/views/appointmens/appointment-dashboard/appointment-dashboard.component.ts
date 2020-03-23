import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { SharedService } from '../../../services/appservices/shared.service';
import { Validators, FormControl, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Addpatient } from '../../../models/addpatient';
import { MessageService, ConfirmationService } from 'primeng/primeng';
import * as _ from 'lodash';
import { CalendarComponent, RenderDayCellEventArgs } from '@syncfusion/ej2-angular-calendars';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { MasterService } from '../../../services/master.service';
import { DatePipe } from '@angular/common';
import { AppointmentDetails } from '../../../models/patientdetails';
import { PreviousMemoData } from '../../../models/previousmemo';
import { SearchData } from '../../../models/searchdetails';
import { CancelReason } from '../../../models/cancelreason';

import { Kanban } from '@syncfusion/ej2-kanban';
import { extend } from '@syncfusion/ej2-base';
import * as kanbanData from '../../../../assets/kanbandata.json';

 interface TemplateFunction extends Window {
    getTags?: Function;
}

 interface CardDetails {
  Id?: string;
  Status?: string;
  Summary?: string;
  Type?: string;
  Priority?: string;
  Tags?: string;
  Estimate?: number;
  Assignee?: string;
  RankId?: number;
}


export interface StatesList {
  id: number;
  name: string;
  value: string;
}
export interface IncidentTypes {
  id: number;
  name: string;
  value: string;
}
export interface CaseTypes {
  id: number;
  name: string;
  value: string;
}
export interface ProviderList {
  Id: number;
  ProviderName: string;
  PatientId: number;
  Location: string;
  Specialty: string;
}
@Component({
  selector: 'app-appointment-dashboard',
  templateUrl: './appointment-dashboard.component.html',
  styleUrls: ['./appointment-dashboard.component.scss',
    '../../../../assets/CSS/common.css',
  ],
})

export class DashboardComponent implements OnInit, AfterViewInit {

  patientinfo: boolean = false;
  public selectedTarget: Element;
  selectedId: any;
  editPopUpData: FormGroup;
  selectedVal: any = null;
  patientName: any;
  appointmenttypes: any;
  myDateValue: any = null;
  showDetails: boolean = false;

  selectedTime: any;
  Recurringtime: boolean = true;
  displayRadiobutton: boolean = false;
  selectedAppt: string = '';
  selctedbodypart: string = '';
  selectedProvider: string = ' ';
  selectlocation: string = '';
  selectdate: string = '';
  selecttime: string = ''
  count: number = 0;
  frequencyNote: string;
  checkCalender: boolean = false;
  args: any;
  showSelectedMembers: boolean = false;
  editPopUpDataErrorObj: any;

  // EDIT
  Id: number;
  Summary: string = '';
  Status: string = '';
  Type: string = '';
  Priority: string = '';
  Tags: string = '';
  RankId: string = '';
  Estimate: string = '';
  Assignee: string = '';
  ImageUrl: string = '';
  Patientname: string = '';
  Dob: Date;
  Gender: string = '';
  casetype1: string = '';
  incidenttype1: string = '';
  Dateofaccident: Date;
  Phone: number;
  Email: string = '';
  Address: string = '';
  appointmenttype1: string = '';
  provider1: string = '';
  Bodypart: string = '';
  Frequency: string = '';
  Location: string = '';
  Time: string = '';
  Date: Date;
  // EDIT END

  checkedRow: boolean = false;
  checked: boolean = true;
  marked: boolean = false;
  inputname: string = '';
  ptag1: boolean = false;
  ptag2: boolean = false;
  ptag3: boolean = false;
  etag1: boolean = false;
  etag2: boolean = false;
  etag3: boolean = false;
  edit1: boolean = true;
  edit2: boolean = true;
  edit3: boolean = true;
  save1: boolean = false;
  save2: boolean = false;
  save3: boolean = false;
  displayMemo: boolean = false;
  cancel: boolean = false;
  next: boolean = false;
  showRowTextBox: boolean = false;
  showTextBox: boolean = false;
  selectedEntry;
  table: boolean = false;
  searchArr: SearchData[] = [];
  appointmentDetails: AppointmentDetails[] = [];
  memoArr: PreviousMemoData[] = [];
  comments: string = '';
  creator: string = '';
  createdby: string = '';
  selectedItem: any;
  searchItem: AppointmentDetails[];
  reasons: CancelReason[];
  time: any;
  inputarr: SearchData[] = [];
  editarr: AppointmentDetails[] = [];
  newpatientform: any;
  newpatient: boolean = false;
  onSearchProviderdiplay: boolean = false;

  ListOfPractices: { id: string; label: string; value: string; }[];
  ListOfProviders: { label: string; value: string; }[];
  ListOfSpeciality: { label: string; value: string; }[];
  AppointmentType: { label: string; value: string; }[];
  daysData = [
    { day: 'sunday', value: 0, id: 1 }, { day: 'monday', value: 1, id: 2 }, { day: 'tuesday', value: 2, id: 3 },
    { day: 'wednesday', value: 3, id: 4 },
    { day: 'thursday', value: 4, id: 5 }, { day: 'friday', value: 5, id: 6 }, { day: 'saturday', value: 6, id: 7 }
  ];
  menuItem: any;
  customMenuItems: any;
  displaymorefilters: boolean = false;
  kanbanappointments: any = [];
  public dateValue: Date = new Date();
  public calendarObj: CalendarComponent;
  public year: number = new Date().getFullYear();
  public month: number = new Date().getMonth();
  public date: number = new Date().getDate();
  public fullYear: number = new Date().getFullYear();
  public minDate: Date = new Date(this.fullYear, this.month, 2);
  public maxDate: Date = new Date(this.fullYear, this.month, 9);
  public dates: Date[] = [new Date(this.year, this.month), new Date(this.year, this.month), new Date(this.year, this.month)];

  date_temp: string;
  public multiSelection: boolean = true;
  public kanbanData: any;
  public editDateValue: any = [];
  public datevalue: any = [];
  date_templist: any;
  public datevalue1: any;
  public selectedDate: any = [];
  public selectedMonth: any;
  public editDate1: any;
  public editMonth: any;
  public locations: string[] = ['54 dean ', '38 Astoria', 'Bronx', 'Edison'];
  public providers: string[] = ['Dr Adin David', 'Aron', 'Dr Capiola David', 'Dabin'];
  public Practice: string[] = ['Health East Ambulatory Surgical Center', 'Englewood Hospital', 'Mount Sinai Beth Israel', 'New Horizons ASC', 'New York Methodist Hospital'];
  public Specialities: string[] = ['OB / GYN', 'NeuroSurgery', 'Orthopaedics', 'Pain Management', 'Physical Therapy', 'Spine Care'];
  public AppointmenTType: string[] = ['Consultaion', 'Physical Theropy', 'Virtual visit', 'Surgical', 'Initail Evaluation', 'Ancle'];

  nextFrequency: string = "";
  nextTime: string = "";

  selectedCities: string[] = [];
  display: boolean = false;
  flag: boolean = true;
  Dashboard: false;
  Scheduler: false;
  GeneralRequests: false;
  WorkCalender: false;
  nextdispl: boolean;
  doctor: boolean = false;
  patient: boolean = false;
  selectedFrequency: any;
  color = {
    '#cb2027': 'Follow up Visit',
    '#67ab47': 'Physical Therapy',
    '#fbae19': 'Follow up',
    '#76D7C4 ': 'Consulation',
    '#58D68D ': 'APOS Therapy',
    '#78281F': 'Initial Evaluation',
    '#2E4053 ': 'Physical Therapy Visit',
    '#6E2C00': 'Foloo',
  };
  addpatient: boolean = false;
  Casetype: any;
  Incidenttype: any;
  search: boolean = false;
  dateRangeSel: any;
  arr1: any;
  Appointmenttype: any;
  Provider: any;['03/02/2020']
  fname: string;
  lname: string;
  dob: any;
  appointmenttype: string;
  provider: string;
  dateofservice: any;
  casetype: string;
  incidenttype: string;
  dateofaccident: any;
  addpatientform: FormGroup;
  searchedArray: any;
  cancelForm: FormGroup;
  nextAppForm: FormGroup;
  editAppForm: FormGroup;
  editAppointmentType: any;
  editProvider: any;
  editedLocation: any;
  editBodyPart: any;
  editDate: any;
  editTime: any;
  freqnote: any;
  providerList: ProviderList[];
  incidentTypeList: IncidentTypes[];
  caseTypesList: CaseTypes[];
  selprovider: boolean = false;
  searchProvider: FormGroup;
  providerArr: any[];
  submitted: boolean = false;
  descriptionEnable: boolean = false;
  showZipCode: boolean = false;
  showSurgery: boolean = false;
  displayselectlocation: boolean = false;
  addPatientDataErrorObj: any;
  displaycasetypestate: boolean = false;
  CaseTypeState: any;
  StatesDrop: StatesList[];
  norecordfound: boolean = false;;

  constructor(private data: SharedService, private fb: FormBuilder, private messageService: MessageService,
    private confirmationService: ConfirmationService, private sharedService: SharedService,
    private cd: ChangeDetectorRef, private masterService: MasterService, ) {
    this.selectedItem = [];
    this.selectedItem = AppointmentDetails;

    this.customMenuItems = [{ text: 'Edit Reschedule', template: '#editsubmenu' }, { text: 'Move to Column', template: '#submenu' },
    { text: 'Appointment Memo', template: '#addmenu' }, { text: 'Cancel', template: '#cancelmenu' }, { text: 'Next Appointment', template: '#nextappointment' }];

    this.customMenuItems = [{ text: 'Edit Reschedule', template: '#editsubmenu' }];

    this.Appointmenttype = [
      { label: 'select', value: '' },
      { label: 'Consultaion', value: 'Consultaion' },
      { label: 'Physical Theropy', value: 'Physical Theropy' },
      { label: 'Virtual visit', value: 'Virtual visit' },
      { label: 'Surgical', value: 'Surgical' },
      { label: 'Initail Evaluation', value: 'Initail Evaluation' },
      { label: 'Ancle', value: 'Ancle' }];

    this.CaseTypeState = [
      { label: 'select', value: '' },
      { label: 'American Samoa', value: 'American Samoa' },
      { label: 'Alabama', value: 'Alabama' },
      { label: 'Alabama', value: 'Alabama' },
    ]; 

    this.ListOfPractices = [
      { id: '1', label: 'HEMA', value: 'HEMA' },
      { id: '2', label: 'HAMG', value: 'HAMG' },
      { id: '3', label: 'Health East Ambulatory Surgical Center', value: ' Health East Ambulatory Surgical Center' },
      { id: '4', label: 'Englewood Hospital', value: 'Englewood Hospital' },
      { id: '5', label: 'Mount Sinai Beth Israel', value: 'Mount Sinai Beth Israel' },
      { id: '6', label: 'New Horizons ASC', value: 'New Horizons ASC' },
      { id: '7', label: 'New York Methodist Hospital ', value: 'New York Methodist Hospital ' }];

    this.ListOfProviders = [
      { label: 'Dr Coba Miguel', value: 'Dr Coba Miguel' },
      { label: 'Dr Cabatu Orsuville', value: 'Dr Cabatu Orsuville' },
      { label: 'Dr Kaplan Charles', value: 'Dr Kaplan Charles' },
      { label: 'Dabin', value: 'Dabin' },
      { label: 'Dr Capiola David', value: 'Dr Capiola David' },
      { label: 'Aron', value: 'Aron' },
      { label: 'Dr Adin David', value: 'Dr Adin David' }];

    this.ListOfSpeciality = [
      { label: 'OB / GYN', value: 'OB / GYN' },
      { label: 'Anesthesia', value: 'Anesthesia' },
      { label: 'NeuroSurgery', value: 'NeuroSurgery' },
      { label: 'Orthopaedics', value: 'Orthopaedics' },
      { label: 'Pain Management', value: 'Pain Management' },
      { label: 'Physical Therapy', value: 'Physical Therapy' },
      { label: 'Spine Care', value: 'Spine Care' }];

     this.editDate = [
      { label: ' 02-04-2020', value: '02-04-2020' },
      { label: ' 02-05-2020', value: '02-05-2020' },
      { label: ' 02-06-2020', value: '02-06-2020' },
      { label: ' 02-11-2020', value: '02-11-2020' },
      { label: ' 02-12-2020', value: '02-12-2020' },
      { label: ' 02-17-2020', value: '02-17-2020' },
      { label: ' 02-13-2020', value: '02-13-2020' },
      { label: ' 02-18-2020', value: '02-18-2020' },
      { label: ' 02-19-2020', value: '02-19-2020' },
      { label: ' 02-20-2020', value: '02-20-2020' },
      { label: ' 02-25-2020', value: '02-25-2020' },
      { label: ' 02-26-2020', value: '02-26-2020' },
      { label: ' 02-27-2020', value: '02-27-2020' }
    ];

  }


  ngOnInit() {
    this.getkanbandata();
    this.getPreviousMemo();
    this.getdata();
    this.getProvider();
    this.getNewAppointmentData();
    this.getState();
    this.getNewAppointmentData();

    this.getIncidentTypes();
    this.getCaseTypes();
    this.cancelReason();

    let data: Object[] = <Object[]>extend([], (kanbanData as any).cardData, null, true);
    let kanbanObj: Kanban = new Kanban({ //Initialize Kanban control
        dataSource: data,
        keyField: 'Status',
        enableTooltip: true,
        columns: [
            { headerText: 'To Do', keyField: 'Open', template: '#headerTemplate', allowToggle: true },
            { headerText: 'In Progress', keyField: 'InProgress', template: '#headerTemplate', allowToggle: true },
            { headerText: 'In Review', keyField: 'Review', template: '#headerTemplate', allowToggle: true },
            { headerText: 'Done', keyField: 'Close', template: '#headerTemplate', allowToggle: true }
        ],
        cardSettings: {
            contentField: 'Summary',
            headerField: 'Id',
            template: '#cardTemplate',
            selectionType: 'Multiple'
        },
        swimlaneSettings: {
            keyField: 'Assignee',
        }
    });
    kanbanObj.appendTo('#Kanban'); //Render initialized Kanban control

    (window as TemplateFunction).getTags = (data: CardDetails) => {
        let tagDiv: string = '<div class="e-tags">';
        let tags: string[] = data.Tags.split(',');
        for (let tag of tags) {
            tagDiv = tagDiv.concat('<div class="e-tag e-tooltip-text">' + tag + '</div>');
        }
        return tagDiv.concat('</div>');
    };


    this.addpatientform = this.fb.group({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      dob: new FormControl(null),
      appointmenttype: new FormControl(null, Validators.required),
      provider: new FormControl(null, Validators.required),
      dateofservice: new FormControl(null),
      casetype: new FormControl(null, Validators.required),
      casetypestate: new FormControl(null),
      incidenttype: new FormControl(null, Validators.required),
      dateofaccident: new FormControl(null),
      checkinpatient: new FormControl(null),
      printSuperBills: new FormControl(null),
    });

    this.cancelForm = this.fb.group({
      cancelSingle: new FormControl(null),
      cancelAll: new FormControl(null),
      cancelReason: new FormControl(null),
      cancelComment: new FormControl(null)
    });

    this.nextAppForm = this.fb.group({
      nextTime: new FormControl(null),
      nextRecurringTime: new FormControl(null),
      nextAppointmentDate: new FormControl(null),
      nextRecurringDate: new FormControl(null),
      date: [null, Validators.required]
    });

    this.editAppForm = this.fb.group({
      editAppointmentType: new FormControl(),
      editBodyPart: new FormControl(null),
      editProvider: new FormControl(null),
      editedLocation: new FormControl(null),
      editTime: new FormControl(null),
      editDate: new FormControl(null),
      ejdate: [null, Validators.required],
      name: new FormControl(null),
      Patientform: new FormControl(null),
      Doctorform: new FormControl(null),
      Freqdate: new FormControl(null),
      EditRecurringDate: new FormControl(null),
      EditRecurringTime: new FormControl(null),
      Frequency: new FormControl(null)
    });

    this.editPopUpData = this.fb.group({
      PatientName: new FormControl(null),
      Location: new FormControl(null, Validators.required),
      preferredDate: new FormControl(null),
      StartTime: new FormControl(null),
      EndTime: new FormControl(null),
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
    };
    this.addPatientDataErrorObj = {
      appointmenttype: { required: 'Please enter Appointment Type' },
      fname: { required: 'Please enter First Name' },
      lname: { required: 'Please enter Last Name' },
      provider: { required: 'Please enter Provider' },
      casetype: { required: 'Please enter Casetype' },
      incidenttype: { required: 'Please enter Incident type' },
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
    this.cd.detectChanges();
  }

  ngAfterViewInit() {

  }

  openeditreschredule(Patientname) {
    this.nextdispl = true;
    this.editAppForm.controls.EditRecurringTime.reset();
    this.recurtime = false;
    this.etag1 = false;
    this.etag2 = false;
    this.etag3 = false;
    this.edit1 = true;
    this.edit2 = true;
    this.edit3 = true;
    this.save1 = false;
    this.save2 = false;
    this.save3 = false;
    this.ptag1 = true;
    this.ptag2 = true;
    this.ptag3 = true;
    this.editAppForm.patchValue({
      editAppointmentType: this.selectedAppt,
      editBodyPart: this.selctedbodypart,
      editProvider: this.selectedProvider,
      editedLocation: this.selectlocation,
      editDate: this.selectdate,
      editTime: this.selecttime,

    });
    this.data.getItemByName(Patientname)
      .subscribe((item: any) => {
        this.selectedItem = item;
      });
  }

  closeeditreschredule() {
    this.nextdispl = false;
    this.dates = [];
  }

  getkanbandata() {
    this.data.getkanbanDatafiles().subscribe(
      (data) => {
        this.kanbanappointments = data;
      }
    );
  }

  getdata() {
    this.data.getkanbanDatafiles().subscribe((data: AppointmentDetails[]) => {
      this.appointmentDetails = data;
      console.log('opt', this.appointmentDetails);
    }
    );
  }
  getProvider() {
    this.sharedService.getProviderData().subscribe(
      (data: ProviderList[]) => {
        this.providerList = this.masterService.formatDataforDropdown(
          'ProviderName',
          data,
          'Select',
          'ProviderName'
        );
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


  openadd() {
    this.addpatient = true;
    this.search = false;
    this.showDetails = false;
  }

  closepopup() {
    this.addpatient = false;
    this.showDetails = false;
    this.addpatientform.reset();
  }

  inputtabs(item) {
    console.log(item)
    this.submitted = true;
    this.showDetails = true;
    var geteditdata = item;
    console.log(geteditdata);
    this.selectedId = geteditdata.Id;
    console.log(this.selectedId);
    if (geteditdata.Appointmenttype === 'Surgical') {
      this.showZipCode = false;
      this.showSurgery = true;
    } else {
      this.showZipCode = true;
      this.showSurgery = false;
    }
    this.addpatientform.patchValue({
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
  search1: boolean = false;

  onSearchClick(value) {
    if (this.addpatientform.value.fname) {
      if (this.addpatientform.value.lname) {
        if (value != "") {
          this.searchedArray = this.arr1.filter(x => x.PatientName.indexOf(value) != -1);
          console.log(this.searchedArray);
          if (this.searchedArray.length == 0) {
            this.search1 = true;
          } else {
            this.search = true;
          }
        }

      }
      else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: 'Please enter Last name'
        });
      }
    }
    else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please enter First name'
      });
    }
  }
  addpatientforms() {
    const isValid = this.masterService.getFormErrorMessage(this.addpatientform, this.addPatientDataErrorObj);
    if (isValid !== undefined) {
      this.messageService.add({ severity: 'error', summary: 'Warning', detail: isValid });
    } else {
      this.arr1.push(this.addpatientform.value);
      console.log('canbandata', this.arr1);
      this.addpatientform.reset();
      this.display = false;
      this.addpatient = false;
      setTimeout(
        () => {
          this.messageService.add(
            {
              severity: 'success',
              summary: 'Success',
              detail: 'Data Added succesfully'
            }
          );
        }, 1000
      );
    }
  }

  getNewAppointmentData() {
    this.sharedService.getNewAppointmentData().subscribe(
      (data: any[]) => {
        this.arr1 = data;
        console.log("arr1", this.arr1)
      }
    );
  }


  OnClosepateintinfo() {
    this.patientinfo = false;
    this.descriptionEnable = false;
  }
  selectprovider() {
    this.selprovider = true;
  }

  openpatientinfo() {
    this.onEditPopUp();
    this.patientinfo = true;

  }
  onEditPopUp() {

    console.log(this.arr1);
    var filterd_data = _.filter(this.arr1, (s) => {
      return s.Id === this.selectedId;
    });
    console.log(filterd_data);
    this.editPopUpData.patchValue({
      PatientName: this.arr1[0].PatientName,
      Location: filterd_data[0].Location,
      AppointmentType: filterd_data[0].Appointmenttype,
      providerPhysicianAssistant: filterd_data[0].Provider,
      preferredDate: filterd_data[0].PreferredDate,
      StartTime: filterd_data[0].StartTime,
      EndTime: filterd_data[0].EndTime,
      Appmemo: filterd_data[0].Appointment_memo,
      reason: filterd_data[0].Reason,
      description: filterd_data[0].Description
    });
    console.log('Appointment Type', this.editPopUpData.value.AppointmentType);
    this.patientName = this.arr1[0].PatientName;
    this.appointmenttypes = this.arr1[0].Appointmenttype;


  };
  saveEditedData() {
    console.log(this.editPopUpData.value)
    const isValid = this.masterService.getFormErrorMessage(this.editPopUpData, this.editPopUpDataErrorObj);
    if (isValid !== undefined) {
      this.messageService.add({ severity: 'error', summary: 'Warning', detail: isValid });
    } else {
      for (let i = 0; i < this.searchedArray.length; i++) {
        if (this.searchedArray[i].Id === this.selectedId) {
          this.searchedArray[i].Location = this.editPopUpData.value.Location;
          this.searchedArray[i].Provider = this.editPopUpData.value.providerPhysicianAssistant;
          this.searchedArray[i].Appointmenttype = this.editPopUpData.value.AppointmentType;
          this.searchedArray[i].StartTime = this.editPopUpData.value.StartTime;
          this.searchedArray[i].EndTime = this.editPopUpData.value.EndTime;
          if (this.descriptionEnable === true) {
            this.searchedArray[i].Reason = this.editPopUpData.value.reason;
            this.searchedArray[i].Description = this.editPopUpData.value.description;
          }
        }

        this.patientinfo = false;
      }
      console.log("Updated", this.searchedArray);

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
  }

  addpatientedit() {
    console.log(this.addpatientform.value);
    for (let i = 0; i < this.searchedArray.length; i++) {
      if (this.searchedArray[i].Id === this.selectedId) {
        this.searchedArray[i].PatientName = this.addpatientform.value.fname;
        this.searchedArray[i].Lname = this.addpatientform.value.lname;
        this.searchedArray[i].Dob = this.addpatientform.value.dob;
        this.searchedArray[i].Appointmenttype = this.addpatientform.value.appointmenttype;
        this.searchedArray[i].Casetype = this.addpatientform.value.casetype;
        this.searchedArray[i].Incidenttype = this.addpatientform.value.incidenttype;
        this.searchedArray[i].Dateofaccident = this.addpatientform.value.dateofaccident;
        this.searchedArray[i].Dateofservice = this.addpatientform.value.dateofservice;
        this.searchedArray[i].Provider = this.addpatientform.value.provider;
      }

    }
    console.log("Updated", this.searchedArray);

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
    this.addpatient = false;
    this.addpatientform.reset();
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
  changeAppointment(event) {
    if (event.value === 'Workers Compensation') {
      this.displaycasetypestate = true;
    } else {
      this.displaycasetypestate = false;
    }
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
    this.editPopUpData.patchValue({
      providerPhysicianAssistant: searchedData.ProviderName
    });
    this.addpatientform.patchValue({
      provider: searchedData.ProviderName
    });
    this.selprovider = false;
  }

  ShowMoreFilters() {
    if (this.displaymorefilters === false) {
      this.displaymorefilters = true;
    } else {
      this.displaymorefilters = false;
    }
  }

  openMemoPopup(Patientname) {
    this.displayMemo = true;
    this.table = false;
    this.showSelectedMembers = false;
    this.inputarr = [];
    this.showTextBox = false;
    this.showRowTextBox = false;
    this.checkedRow = false;
    this.comments = "";
    this.data.getItemByName(Patientname)
      .subscribe((item: any) => {
        this.selectedItem = item;
      })
  }

  closeMemoPopup() {
    this.displayMemo = false;
  }

  showTagMembers(event) {
    if (event) {
      this.showRowTextBox = true;
    } else if (!event) {
      this.showRowTextBox = false;
      this.showSelectedMembers = false;
      this.table = false;
      this.inputarr = [];
    }
  }

  searchDisplay() {
    this.getSearchData();
    this.table = true;
  }

  getSearchData() {
    this.data.getSearchData().subscribe((data: SearchData[]) => {
      this.searchArr = data;
    });
  }

  getPreviousMemo() {
    this.data.getPreviousMemoData().subscribe((data: PreviousMemoData[]) => {
      this.memoArr = data;
    });
  }

  onSaveMemo() {
    if (this.comments == "") {
      this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Please enter the comments' });
    } else {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully!' });
      this.memoArr.push(new PreviousMemoData(this.comments, this.creator, this.createdby));
    }
  }

  inputtab(checked, name) {
    this.showTextBox = true;
    if (checked) {
      this.data.getItemByNameSearch(name)
        .subscribe((item: any) => {
          this.searchItem = item;
        });
      this.inputarr.push(name);
      this.showTextBox = true;
    } else if (!checked) {
      this.inputarr.splice(name, 1);
    }
  }

  unSelectInput(value) {
    this.inputarr.splice(value, 1);
  }

  opencancelpopup(Patientname) {
    this.cancel = true;
    this.cancelForm.reset();
    this.data.getItemByName(Patientname)
      .subscribe((item: any) => {
        this.selectedItem = item;
      })
  }

  cancelReason(){
    this.data.getCancelReason().subscribe((item: CancelReason[])=>{
      this.reasons = item;
      console.log('reasons',this.reasons);
    });
  }

  closecancelpopup() {
    this.cancel = false;
  }

  opennextpopup(Patientname) {
    this.next = true;
    this.recurtime = false;
    this.dates = [];
    this.datevalue = [];
    this.count = 0;
    this.etag1 = false;
    this.etag2 = false;
    this.etag3 = false;
    this.edit1 = true;
    this.edit2 = true;
    this.edit3 = true;
    this.save1 = false;
    this.save2 = false;
    this.save3 = false;
    this.ptag1 = true;
    this.ptag2 = true;
    this.ptag3 = true;
    this.nextAppForm.reset();
    this.data.getItemByName(Patientname)
      .subscribe((item: any) => {
        this.selectedItem = item;
      })
  }

  closenextpopup() {
    this.next = false;
    this.dates = [];
  }

  onEdit1() {
    this.ptag1 = false;
    this.etag1 = true;
    this.save1 = true;
    this.edit1 = false;
  }

  onSave1() {
    this.ptag1 = true;
    this.etag1 = false;
    this.save1 = false;
    this.edit1 = true;
  }

  onEdit2() {
    this.ptag2 = false;
    this.etag2 = true;
    this.save2 = true;
    this.edit2 = false;
  }

  onSave2() {
    this.ptag2 = true;
    this.etag2 = false;
    this.save2 = false;
    this.edit2 = true;
  }

  onEdit3() {
    this.ptag3 = false;
    this.etag3 = true;
    this.save3 = true;
    this.edit3 = false;
  }

  onSave3() {
    this.ptag3 = true;
    this.etag3 = false;
    this.save3 = false;
    this.edit3 = true;
  }

  recurringDate(event) {
    if (event === true) {
      var dates = this.dates;
      var arr1;
      var arr2;
      var test = [], count = [];
      var result;
      _.forEach(this.dates, (d, index) => {
        test.push(d.toString());
        arr1 = test[index].split(' ');
        arr2 = arr1[1].split(',');
        var month = d.getMonth();
        var examp = d.getDay();
        result = this.convertingMonth(arr1[3], month, arr1[2], examp);
        count.push(result);
      });
    }
    else {

    }
  }

  convertingMonth(year, month, day, day1) {
    var counter, date;
    counter = 0;
    date = new Date(year, month, day);
    while (date.getMonth() === month) {
      if (date.getDay() === day1) {
        counter += 1;
      }
      day += 1;
      date = new Date(year, month, day);
    }
    return counter;
  }

  Onappointment(event) {
    this.appointmenttype1 = event.value.Appointmenttype;
  }

  Onbodypart(event) {
    this.Bodypart = event.value.Bodypart;
  }

  Onprovider(event) {
    this.provider1 = event.value.Provider;
    if (this.provider1 == 'Dr.assistant physical') {
      console.log('hello');
      if (this.provider1) {
        this.selectedDate.push = ['06/02/2020', '07/02/2020', '08/02/2020', '09/02/2020'];
      }
    }
  }

  Onlocation(event) {
    this.Location = event.value.Location;
  }

  Onfrequency(event, optionalDate?) {
    this.Frequency = ((event === '' || event === undefined) ? optionalDate : event.value.Frequency);
    var weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';
    var date1 = new Date(this.editDateValue),
      mnth = ("0" + (date1.getMonth() + 1)).slice(-2),
      day = ("0" + date1.getDate()).slice(-2);
    this.editMonth = mnth;
    this.editDate1 = day;
    if (this.Frequency === '1st time') {
      this.displayRadiobutton = false;
      this.dates = [new Date(this.year, this.month, this.editDate1)];
      var test = _.filter(this.daysData, (d) => {
        return (d.value == 4);
      });
      var dates = new Date(this.year, this.month, this.date);
      var month = this.month + 1;
      this.date_temp = month + '/' + dates.getDate() + ', ' + this.year + ' , ' + weekday[dates.getDay()];
    } else if (this.Frequency === '3x for 4 weeks') {
      this.displayRadiobutton = true;
      this.editAppForm.patchValue({
        EditRecurringDate: 'Recurring Date'
      });
      this.dates =
        [new Date(this.year, this.month, this.editDate1), new Date(this.year, this.month, this.editDate1 - (-7)), new Date(this.year, this.month, this.editDate1 - (-14)), new Date(this.year, this.month, this.editDate1 - (-21)),
        new Date(this.year, this.month, (this.editDate1 - (-1))), new Date(this.year, this.month, (this.editDate1 - (-1)) - (-7)), new Date(this.year, this.month, (this.editDate1 - (-1)) - (-14)), new Date(this.year, this.month, (this.editDate1 - (-1)) - (-21)),
        new Date(this.year, this.month, (this.editDate1 - (-2))), new Date(this.year, this.month, (this.editDate1 - (-2)) - (-7)), new Date(this.year, this.month, (this.editDate1 - (-2)) - (-14)), new Date(this.year, this.month, (this.editDate1 - (-2)) - (-21))
        ];
      var datelist = [];
      for (let i = 0; i < this.dates.length; i++) {
        var dates = this.dates[i];
        var req = {
          date: dates.getDate(),
          day: weekday[dates.getDay()],
          month: dates.getMonth(),
          year: dates.getFullYear()
        };
        datelist.push(req);
      }
      var last = _.last(datelist);
      datelist = _.uniqBy(datelist, 'day');
      var daysString = '';
      var nofdays = _.forEach(datelist, (d) => {
        daysString = daysString + d.day + ',';
      });
      datelist[0].month = datelist[0].month + 1;
      last.month = last.month + 1;
      this.date_temp = datelist[0].month + '/' + datelist[0].date + '-' + last.month + '/' + last.date + ', ' + last.year + ' Every ' + daysString;
      this.frequencyNote = "and other 11 days";
    }
    else if (this.Frequency === '1x for 4 weeks') {
      this.displayRadiobutton = true;
      this.editAppForm.patchValue({
        EditRecurringDate: 'Recurring Date'
      });
      this.dates =
        [new Date(this.year, this.month, this.editDate1), new Date(this.year, this.month, this.editDate1 - (-7)), new Date(this.year, this.month, this.editDate1 - (-14)), new Date(this.year, this.month, this.editDate1 - (-21))
        ];
      var test = _.filter(this.daysData, (d) => {
        return (d.value == 4);
      });
      var datelist = [];
      for (let i = 0; i < this.dates.length; i++) {
        var dates = this.dates[i];
        var req = {
          date: dates.getDate(),
          day: weekday[dates.getDay()],
          month: dates.getMonth(),
          year: dates.getFullYear()
        };
        datelist.push(req);
      }
      var last = _.last(datelist);
      datelist = _.uniqBy(datelist, 'day');
      var daysString = '';
      var nofdays = _.forEach(datelist, (d) => {
        daysString = daysString + d.day + ',';
      });
      datelist[0].month = datelist[0].month + 1;
      last.month = last.month + 1;
      this.date_temp = datelist[0].month + '/' + datelist[0].date + '-' + last.month + '/' + last.date + ', ' + last.year + ' Every ' + daysString;
      this.frequencyNote = "and other 3 days";
    }

    else if (this.Frequency === '2x for 4 weeks') {
      this.dates =
        [new Date(this.year, this.month, this.editDate1), new Date(this.year, this.month, this.editDate1 - (-7)), new Date(this.year, this.month, this.editDate1 - (-14)), new Date(this.year, this.month, this.editDate1 - (-21)),
        new Date(this.year, this.month, (this.editDate1 - (-1))), new Date(this.year, this.month, (this.editDate1 - (-1)) - (-7)), new Date(this.year, this.month, (this.editDate1 - (-1)) - (-14)), new Date(this.year, this.month, (this.editDate1 - (-1)) - (-21))
        ];
      var test = _.filter(this.daysData, (d) => {
        return (d.value == 4);
      });
      var datelist = [];
      for (let i = 0; i < this.dates.length; i++) {
        var dates = this.dates[i];
        var req = {
          date: dates.getDate(),
          day: weekday[dates.getDay()],
          month: dates.getMonth(),
          year: dates.getFullYear()
        };
        datelist.push(req);
      }
      var last = _.last(datelist);
      datelist = _.uniqBy(datelist, 'day');
      var daysString = '';
      var nofdays = _.forEach(datelist, (d) => {
        daysString = daysString + d.day + ',';
      });
      datelist[0].month = datelist[0].month + 1;
      last.month = last.month + 1;
      this.date_temp = datelist[0].month + '/' + datelist[0].date + '-' + last.month + '/' + last.date + ', ' + last.year + ' Every ' + daysString;
      this.frequencyNote = "and other 8 days";
    }
  }

  Ontime(event) {
    this.selectedTime = event.value;
    console.log(this.selectedTime);
    if (this.selectedTime === '10:30AM') {
      this.editAppForm.patchValue({
        EditRecurringTime: null
      });
    }
    this.Time = event.value.Time;
    console.log('this.time', this.Time);
  }

  Ondate(event) {
    this.Date = event.value;
    this.editAppForm.patchValue({
      ejdate: this.Date
    });
    this.editDateValue = this.Date;
    this.selectedFrequency = this.editAppForm.value;
    if (this.selectedFrequency.Frequency != undefined || this.selectedFrequency.Frequency != null) {
      this.Onfrequency('', this.selectedFrequency.Frequency.Frequency);
    }
  }


  onSubmit(editAppForm) {
    this.editarr.push(new AppointmentDetails(this.Id, this.Patientname, this.Status, this.Type, this.Priority, this.Tags, this.RankId, this.Estimate,
      this.Assignee, this.ImageUrl, this.Patientname, this.Dob, this.Gender, this.casetype1, this.incidenttype1, this.Dateofaccident, this.Phone,
      this.Email, this.Address, this.appointmenttype1, this.provider1, this.Bodypart, this.Frequency, this.Location, this.Time, this.Date));
    this.nextdispl = false;

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully!' });
    this.nextdispl = false;
  }

  printPage() {
    window.print();
  }

  onClickSave() {
    this.showSelectedMembers = true;
    this.showRowTextBox = false;
    this.table = false;
    this.showTextBox = false;
    console.log('inputarray', this.inputarr);
    if (this.inputarr.length == 0) {
      this.table = true;
      this.messageService.add({ severity: 'error', summary: 'Mandatory Fields', detail: 'Member' });
    }
  }

  closeconfirmsingle: boolean = false;
  closeconfirmall: boolean = false;
  single: boolean = false;
  all: boolean = false;

  confirmCancel1() {
    if ((this.cancelForm.controls.cancelSingle.value || !this.cancelForm.controls.cancelAll.value || !this.cancelForm.controls.cancelReason.value || !this.cancelForm.controls.cancelComment.value) &&
      (!this.cancelForm.controls.cancelSingle.value || this.cancelForm.controls.cancelAll.value || !this.cancelForm.controls.cancelReason.value || !this.cancelForm.controls.cancelComment.value)) {
      this.cancel = true;
      this.messageService.add({ severity: 'error', summary: 'Mandatory', detail: 'Enter the mandatory fields' });
    } else {
      this.closeconfirmsingle = true;      
    }
  }

  closeallconfirms() {
    this.cancel = false;
    this.closeconfirmsingle = false;
    this.messageService.add({ severity: 'success', summary: 'Cancelled', detail: 'Appointment cancelled successfully!' });
  }

  closeconfirm() {
    this.cancel = true;
    this.closeconfirmsingle = false;
  }

  doItLater() {
    this.next = false;
  }

  nextSave() {
    if ((!this.nextAppForm.controls.nextRecurringTime.value && !this.nextAppForm.controls.nextRecurringDate.value) && ((!this.nextAppForm.controls.nextRecurringTime.value && !this.nextAppForm.controls.nextRecurringDate.value))) {
      this.next = true;
      this.messageService.add({ severity: 'error', summary: 'Mandatory', detail: 'Recurring time or date' });
    } else {
      this.next = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully!' });
    }
  }

  insertDate() {
    this.dates = [new Date(this.year, this.month), new Date(this.year, this.month), new Date(this.year, this.month)];
  }

  editRecTime: string = "";

  clickCalender1() {
    const req1 = {
      date: this.editAppForm.controls.ejdate.value.getDate(),
      month: this.editAppForm.controls.ejdate.value.getMonth(),
      year: this.editAppForm.controls.ejdate.value.getFullYear()
    }
    this.editDateValue.push(req1);
    console.log("selected date:", this.editDateValue);
  }

  Onnextfrequency(event) {
    this.nextFrequency = event.value.Frequency;
    console.log(this.nextFrequency);
  }

  OnnextTime(event) {
    this.nextTime = event.value.Time;
    console.log(this.nextTime);
  }

  clickCalender() {
    const req = {
      date: this.nextAppForm.controls.date.value.getDate(),
      month: this.nextAppForm.controls.date.value.getMonth(),
      year: this.nextAppForm.controls.date.value.getFullYear()
    }
    this.datevalue.push(req);
    console.log("selected date:", this.datevalue);

  }

  public onRenderCell(args: RenderDayCellEventArgs): void {
    const datePipe = new DatePipe('en-US');
    const test = datePipe.transform(args.date, 'dd/MM/yyyy');
    const date1 = new Date();//, date2 = new Date('24/02/2020'), date3 = new Date('25/02/2020');
    this.date_templist = [datePipe.transform(date1, 'dd/MM/yyyy')];
    if (test != this.date_templist[0]) {
      args.isDisabled = true;
    }
    if (this.provider1 === 'Dr.Advin David') {
      if (args.date.getDay() == 2 || args.date.getDay() == 3 || args.date.getDay() == 4 && args.date.getMonth() == 1) {
        args.isDisabled = false;
      }
    } else if (this.provider1 === 'Dr.Capiola David') {
      if (args.date.getDay() == 1 || args.date.getDay() == 2 || args.date.getDay() == 3 && args.date.getMonth() == 2) {
        args.isDisabled = false;
      }
    }
    if (this.selectedItem.Provider === 'Dr.assistant physical') {
      if (args.date.getDay() == 2 || args.date.getDay() == 3 || args.date.getDay() == 4 || args.date.getDay() == 5 && args.date.getMonth() == 1) {
        args.isDisabled = false;
      }
    }
    if (this.selectedItem.Provider === 'Dr.assistant physical') {
      if (args.date.getDay() == 1 || args.date.getDay() == 2 || args.date.getDay() == 3 || args.date.getDay() == 4 && args.date.getMonth() == 1) {
        args.isDisabled = false;
      }
    }
    if (this.selectedItem.Provider === 'Dr.Badri Homam') {
      if (args.date.getDay() == 1 || args.date.getDay() == 2 || args.date.getDay() == 3 || args.date.getDay() == 5 && args.date.getMonth() == 1) {
        args.isDisabled = false;
      }
    }
  }

  public onRenderCellNext(args: RenderDayCellEventArgs): void {
    if (this.selectedItem.Provider === 'Dr.Advin David') {
      if (args.date.getDay() == 0 || args.date.getDay() == 6 || args.date.getDay() == 1) {
        args.isDisabled = true;
      }
    }
    if (this.selectedItem.Provider === 'Dr.Capiola David') {
      if (args.date.getDay() == 0 || args.date.getDay() == 6 || args.date.getDay() == 2) {
        args.isDisabled = true;
      }
    }
    if (this.selectedItem.Provider === 'Kyriakides Christopher') {
      if (args.date.getDay() == 0 || args.date.getDay() == 6 || args.date.getDay() == 3) {
        args.isDisabled = true;
      }
    }
    if (this.selectedItem.Provider === 'Dr.assistant physical') {
      if (args.date.getDay() == 0 || args.date.getDay() == 6 || args.date.getDay() == 4) {
        args.isDisabled = true;
      }
    }
    if (this.selectedItem.Provider === 'Dr.Badri Homam') {
      if (args.date.getDay() == 0 || args.date.getDay() == 6 || args.date.getDay() == 5) {
        args.isDisabled = true;
      }
    }
  }

  recurdate: boolean = false;

  recurring(cal) {
    var weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';
    console.log('cal', cal);
    if (cal) {
      for (let i = 0; i < this.datevalue.length; i++) {
        console.log('for', this.datevalue)
        if (this.datevalue[i].date && this.nextFrequency === '3x for 4 weeks') {
          this.dates =
            [new Date(this.year, this.month, this.datevalue[0].date), new Date(this.year, this.month, this.datevalue[0].date + 7), new Date(this.year, this.month, this.datevalue[0].date + 14), new Date(this.year, this.month, this.datevalue[0].date + 21),
            new Date(this.year, this.month, this.datevalue[1].date), new Date(this.year, this.month, this.datevalue[1].date + 7), new Date(this.year, this.month, this.datevalue[1].date + 14), new Date(this.year, this.month, this.datevalue[1].date + 21),
            new Date(this.year, this.month, this.datevalue[2].date), new Date(this.year, this.month, this.datevalue[2].date + 7), new Date(this.year, this.month, this.datevalue[2].date + 14), new Date(this.year, this.month, this.datevalue[2].date + 21)
            ];

          var datelist = [];
          for (let i = 0; i < this.dates.length; i++) {
            var dates = this.dates[i];
            var req = {
              date: dates.getDate(),
              day: weekday[dates.getDay()],
              month: dates.getMonth(),
              year: dates.getFullYear()
            };
            datelist.push(req);
          }
          var last = _.last(datelist);
          datelist = _.uniqBy(datelist, 'day');
          var daysString = '';
          var nofdays = _.forEach(datelist, (d) => {
            daysString = daysString + d.day + ',';
          });
          datelist[0].month = datelist[0].month + 1;
          last.month = last.month + 1;
          this.date_temp = datelist[0].month + '/' + datelist[0].date + '-' + last.month + '/' + last.date + ', ' + last.year + ' Every ' + daysString;

        } else if (this.datevalue[i].date && this.nextFrequency === '2x for 4 weeks') {
          this.dates =
            [new Date(this.year, this.month, this.datevalue[0].date), new Date(this.year, this.month, this.datevalue[0].date + 7), new Date(this.year, this.month, this.datevalue[0].date + 14), new Date(this.year, this.month, this.datevalue[0].date + 21),
            new Date(this.year, this.month, this.datevalue[1].date), new Date(this.year, this.month, this.datevalue[1].date + 7), new Date(this.year, this.month, this.datevalue[1].date + 14), new Date(this.year, this.month, this.datevalue[1].date + 21)
            ];

          var datelist = [];
          for (let i = 0; i < this.dates.length; i++) {
            var dates = this.dates[i];
            var req = {
              date: dates.getDate(),
              day: weekday[dates.getDay()],
              month: dates.getMonth(),
              year: dates.getFullYear()
            };
            datelist.push(req);
          }
          var last = _.last(datelist);
          datelist = _.uniqBy(datelist, 'day');
          var daysString = '';
          var nofdays = _.forEach(datelist, (d) => {
            daysString = daysString + d.day + ',';
          });
          datelist[0].month = datelist[0].month + 1;
          last.month = last.month + 1;
          this.date_temp = datelist[0].month + '/' + datelist[0].date + '-' + last.month + '/' + last.date + ', ' + last.year + ' Every ' + daysString;

        } else if (this.datevalue[i].date && this.nextFrequency === '1x for 4 weeks') {
          this.dates =
            [new Date(this.year, this.month, this.datevalue[0].date), new Date(this.year, this.month, this.datevalue[0].date + 7), new Date(this.year, this.month, this.datevalue[0].date + 14), new Date(this.year, this.month, this.datevalue[0].date + 21)
            ];

          var datelist = [];
          for (let i = 0; i < this.dates.length; i++) {
            var dates = this.dates[i];
            var req = {
              date: dates.getDate(),
              day: weekday[dates.getDay()],
              month: dates.getMonth(),
              year: dates.getFullYear()
            };
            datelist.push(req);
          }
          var last = _.last(datelist);
          datelist = _.uniqBy(datelist, 'day');
          var daysString = '';
          var nofdays = _.forEach(datelist, (d) => {
            daysString = daysString + d.day + ',';
          });
          datelist[0].month = datelist[0].month + 1;
          last.month = last.month + 1;
          this.date_temp = datelist[0].month + '/' + datelist[0].date + '-' + last.month + '/' + last.date + ', ' + last.year + ' Every ' + daysString;
        }
      }
    }
    else if (!cal) {
      this.dates = [];
      this.datevalue = [];
      this.nextAppForm.controls.nextAppointmentDate.reset();
    }
  }

  recurtime: boolean = false;
  nextLength: any;

  recurringTime(event) {
    if (event) {
      for (let i = 0; i < this.datevalue.length; i++) {
        if (this.datevalue[i].date && this.nextTime) {
          console.log('recurring', this.nextTime)
          console.log('date', this.datevalue[i].date)
          this.recurtime = true;
          console.log(this.datevalue.length);
        }
        this.nextLength = this.datevalue.length;
      }
    } else if (!event) {
      this.recurtime = false;
      this.datevalue = [];
    }
  }

  editRecurringTime(event) {
    if (event) {
      for (let i = 0; i < this.editDateValue.length; i++) {
        if (this.editDateValue[i].date && this.Time) {
          console.log('recurring', this.Time)
          console.log('date', this.editDateValue[i].date)
          this.recurtime = true;
          console.log(this.editDateValue.length);
        }
        this.nextLength = this.editDateValue.length;
      }
    } else if (!event) {
      this.recurtime = false;
      this.editDateValue = [];
    }
  }


}



