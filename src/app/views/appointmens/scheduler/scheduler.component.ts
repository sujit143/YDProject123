import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  extend,
  Internationalization,
  closest,
  isNullOrUndefined,
  remove,
  removeClass
} from '@syncfusion/ej2-base';
import {
  EventSettingsModel,
  GroupModel,
  ResourceDetails,
  TreeViewArgs,
  View,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  MonthAgendaService,
  DragAndDropService,
  ScheduleComponent,
  TimeScaleModel
} from '@syncfusion/ej2-angular-schedule';
import { ContextMenuComponent, MenuItemModel, BeforeOpenCloseMenuEventArgs, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';
import { SharedService } from '../../../services/appservices/shared.service';
import { MasterService } from '../../../services/master.service';
import { Details } from '../../../models/details';
import { Provider } from '../../../models/Provider';
import { Location } from '../../../models/locations';
import { Practice } from '../../../models/practice';
import { PracticeLocation } from '../../../models/practice-location';
import { Speciality } from '../../../models/speciality';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss',
  '../../../../assets/CSS/common.css',
],
  providers: [ DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, DragAndDropService  ],
})

export class SchedulerComponent implements OnInit {
  @ViewChild('scheduleObj', { static: true })
  public scheduleObj: ScheduleComponent;
  @ViewChild('menuObj', { static: true })
  public menuObj: ContextMenuComponent;
  bsValue = new Date();
  patientName;
  Location;
  Providers;
  AppointmentType;
  StartTime;
  EndTime;
  Status;
  Practice;
  reason;
  description;
  removeAt: number;
  scheduleData: any;
  closeArgs: any;
  selectedId: any;
  selectedValues: any;
  editPopUpDataErrorObj: any;
  selectedVal: any;
  appointmentData: any;
  FirstLoadData: any ;
  filteredSelData: any;
  locaData: any;
  slctdProviderToAddResource: any;
  locationSelected: any;
  providerSelected: any;
  providerSelectedForAllLoc: any;
  PracticeSelectedForAllLoc: any;
  LocationSelectedForAllProv: any;
  myDateValue: any = null;
  displayReason: boolean = false;
  selectedPractice: any = null;
  selectedLocation: any = null;
  selectedAppmnt: any = null;
  selectedSpeciality: any = null;
  displayFields: boolean = false;
  openEditPopup: boolean = false;
  onSearchProviderdiplay: boolean = false;
  openEditAddPopupdisp: boolean = false;
  openDetailsPopupdisp: boolean = false;
  appointmentCancelDisplay: boolean = false;
  transferCancelDisplay: boolean = false;
  showTransToHospitalBox = false;
  showTransToPCPBox = false;

  patientData: Details[] = [];
  LocationData: Location[];
  PracticeData: Practice[];
  ProviderData: Provider[] = [];
  getAllFilteredData: Details[] = [];
  practiceLocationData: PracticeLocation[];
  SpecialtyData: Speciality[];

  allLocationData: any[];
  CancelReason: any[] = [];
  TransferToPCP: any[] = [];
  TransferToHosp: any[] = [];
  ListOfAppmnt: any[];
  selectedProvider: any[] = null;
  seldatalist: any[] = [];
  public locationResourceDataSource: any[] = [];
  public resourceDataSource: any[] = [];
  ListofDataAfterFilter: any[] = [];
  FilteredArray: Object[] = [];
  public tabdata: object[];

  editPopUpData: FormGroup;
  searchProvider: FormGroup;
  cancelForm: FormGroup;
  transHospForm: FormGroup;
  cancelAppointment: FormArray;
  transferToHospital: FormArray;
  preferredDate_temp: any;
  public showQuickInfo: boolean = false;
  public allowResizing: boolean = false;
  public allowDragDrop: boolean = true;
  public allowMultiple: boolean = true;
  public selectedDate: Date = new Date(2020, 1, 25);
  public currentView: View = 'WorkWeek';
  public group: GroupModel = {  byGroupID: false, resources: ['Conferences', 'Categories'] };
  public data: Object[] = <Object[]>extend([], this.patientData, null, true);
  public temp: string = '<div class="tooltip-wrap" style="cursor: pointer;" >' +
  '<div class="image ${EventType}"></div>' +
  '<div class="content-area"><div class="name">PatientName&nbsp;:&nbsp;${PatientName}</></div>' +
  '${if(AppointmentType !== null && AppointmentType !== undefined)}<div class="AppointmentType">AppointmentType&nbsp;:&nbsp;${AppointmentType}</div>${/if}' +
  '${if(Location !== null && Location !== undefined)}<div class="Location">Location&nbsp;:&nbsp;${Location}</div>${/if}' +
  '${if(Providers !== null && Providers !== undefined)}<div class="Providers">Providers&nbsp;:&nbsp;${Providers}</div>${/if}' +
  '${if(Practice !== null && Practice !== undefined)}<div class="Practice">Practice&nbsp;:&nbsp;${Practice}</div>${/if}' +
  '<div class="Status">Status&nbsp;:&nbsp;${Status} </div>' +
  '<div class="time">From&nbsp;:&nbsp;${StartTime.toLocaleString()} </div>' +
  '<div class="time">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;${EndTime.toLocaleString()} </div></div></div>';
  public eventSettings: EventSettingsModel = { dataSource: this.data, enableTooltip: true, tooltipTemplate: this.temp };

  public timeScale: TimeScaleModel = {
    enable: true,
    interval: 60, slotCount: 4,
    majorSlotTemplate: '#majorSlotTemplate',
    minorSlotTemplate: '#minorSlotTemplate'
  };

  public instance: Internationalization = new Internationalization();
  displaymorefilters: boolean = false;
  public selectedTarget: Element;
  public menuItems: MenuItemModel[] = [
    {
      text: 'Move to check-In',
      id: 'Today',
      iconCss: 'e-icons new'
    }, {
      text: 'Edit/Reschedule',
      id: 'Save',
      iconCss: 'e-icons edit',
    }, {
      text: 'Details',
      id: 'Add',
      iconCss: 'e-icons delete',
    }, {
      text: 'Print',
      id: 'print',
      iconCss: 'e-icons print',
      items: [
        {
          text: 'Super Bill',
          id: 'superBill'
        }, {
          text: 'Patient summary',
          id: 'patientSummary'
        }, {
          text: 'Dx Testing',
          id: 'dxTesting'
        }, {
          text: 'Rx PT',
          id: 'rxPT'
        }
      ]
    }, {
      text: 'Cancel',
      iconCss: 'e-icons delete',
      id: 'Delete',
      items: [
        {
        text: 'No Show',
        id: 'DeleteOccurrenceNoShow'
        }, {
          text: 'Rescheduled on Provider Request',
          id: 'DeleteOccurrenceProvider'
        }, {
          text: 'Rescheduled on Patient Request',
          id: 'DeleteOccurrencePatient'
        }, {
          text: 'Authorization Denied',
          id: 'DeleteOccurrenceDenied'
        }, {
          text: 'Transfer to Hospital',
          id: 'DeleteOccurrenceHospital'
        }, {
          text: 'Transfer to PCP',
          id: 'DeleteOccurrencePCP'
        }, {
          text: 'Transfer Other',
          id: 'DeleteOccurrenceTransfer'
        }, {
          text: 'Other',
          id: 'DeleteOccurrenceOther'
        }
      ]
    }, {
      text: 'Case-Details',
      iconCss: 'e-icons delete',
      id: 'CaseDetails',
    }
  ];
  public practices: Object = { text: 'Practice', value: 'Practice' };
  public locations: Object = { text: 'Name', value: 'Name' };
  public providers: Object = { text: 'ProviderName', value: 'ProviderName' };
  public specialties: Object = { text: 'name', value: 'name' };

  constructor(private sharedService: SharedService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private masterService: MasterService,
    private router: Router
    ) {
      this.AppointmentType = [
        { label : 'Initial Evaluation', value : 'Initial Evaluation'},
        { label : 'Workers compensation', value : 'Workers compensation'},
        { label : 'Surgery', value : 'Surgery'}
      ];
      this.CancelReason = [
        {label: 'Select', value: 'Select'},
        {label: 'Rescheduled on Patient Request', value: 'Rescheduled on Patient Request'},
        {label: 'No Show', value: 'No Show'},
        {label: 'Rescheduled on Provider Request', value: 'Rescheduled on Provider Request'},
        {label: 'Other', value: 'Other'},
        {label: 'Transfer to Hospital', value: 'Transfer to Hospital'},
        {label: 'Transfer to PCP', value: 'Transfer to PCP'},
        {label: 'Transfer Other', value: 'Transfer Other'},
        {label: 'Authorization Denied', value: 'Authorization Denied'},
        {label: 'As per Patient request', value: 'As per Patient request'}
      ];
      this.TransferToHosp = [
        {label: 'Select', value: 'Select'},
        {label: 'Englewood Hospital - Englewood Hospital @ Englewood Hospital',
        value: 'Englewood Hospital - Englewood Hospital @ Englewood Hospital'},
        {label: 'Holy Name Medical Center - Holy Name Hospital @ Teaneck, NJ ',
        value: 'Holy Name Medical Center - Holy Name Hospital @ Teaneck, NJ '},
        {label: 'Pascack Valley Hospital - Pascack Valley Hospital @ Westwood, NJ',
        value: 'Pascack Valley Hospital - Pascack Valley Hospital @ Westwood, NJ'},
        {label: 'Mount Sinai Beth Israel - Mount Sinai Beth Israel @ New York, NY',
        value: 'Mount Sinai Beth Israel - Mount Sinai Beth Israel @ New York, NY'},
        {label: 'St Josephs Regional Medical Center - St. Joseph Hospital @ Paterson, NJ',
        value: 'St Josephs Regional Medical Center - St. Joseph Hospital @ Paterson, NJ'},
        {label: 'Park Avenue Trauma - 100 Liv 2', value: 'Park Avenue Trauma - 100 Liv 2'},
        {label: 'New York Spine and Pain Care - 100 Liv 2', value: 'New York Spine and Pain Care - 100 Liv 2'},
        {label: 'Health East Ambulatory Surgical Center - 100 Liv 2', value: 'Health East Ambulatory Surgical Center - 100 Liv 2'},
        {label: 'Surgicare of Manhattan - SurgiCare of Manhattan', value: 'Surgicare of Manhattan - SurgiCare of Manhattan'},
        {label: 'Englewood Hospital - Englewood Hospital @ Englewood Hospital',
        value: 'Englewood Hospital - Englewood Hospital @ Englewood Hospital'},
    ];
    this.TransferToPCP = [
      {label: 'Select', value: 'Select'},
      {label: 'Dr Adin David ', value: 'Dr Adin David lect'},
      {label: ' Aron', value: ' Aron'},
      {label: 'Select', value: ' Assistant Provider'},
      {label: 'Dr Sushma', value: 'Dr Sushma'},
      {label: 'Dr Sai', value: 'Dr Sai'},
      {label: 'Dr Deepa', value: 'Dr Deepa'},
      {label: 'Dr Ashwini', value: 'Dr Ashwini'},
      {label: 'Dr Kavya', value: 'Dr Kavya'},
    ];
    this.cancelForm = this.fb.group({
      cancelDetails: this.fb.array([]),
    });
    this.cancelAppointment  = this.cancelForm.controls.cancelDetails as FormArray;
    this.cancelAppointment.push(this.fb.group({
      reason:  new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      HospitalLocation: new FormControl(null),
      Physician: new FormControl(null)
   }));
  }

  ngOnInit() {
    this.editPopUpData = this.fb.group({
      PatientName: new FormControl(null),
      AppointmentType: new FormControl(null, Validators.required),
      Location: new FormControl(null, Validators.required),
      providerPhysicianAssistant: new FormControl(null, Validators.required),
      preferredDate: new FormControl(null),
      StartTime: new FormControl(null),
      EndTime: new FormControl(null),
      reason: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      ProviderId: new FormControl(null)
    });
    this.editPopUpDataErrorObj = {
      AppointmentType: { required: 'Please enter Appointment Type'},
      Location: { required: 'Please enter Location'},
      providerPhysicianAssistant: { required: 'Please enter provider/PhysicianAssistant'},
      reason: { required: 'Please enter reason'},
      description: { required: 'Please enter description'},
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
    this.getPracticeLocationData();
    this.getProviderData();
    this.getSpecialtyData();
    this.getAllData();
  }
getPracticeLocationData() {
  this.sharedService.getPracticeLocationData().subscribe(
    (data: PracticeLocation[] ) => {
      this.practiceLocationData = data;
      for (let index = 0; index < this.practiceLocationData.length; index++) {
        const scheduleData = {
          Id:  this.practiceLocationData[index].Id,
          Text:  this.practiceLocationData[index].PracticeLocation
        };
        this.locationResourceDataSource.push(scheduleData);
      }
    }
  );
}
getProviderData() {
  this.sharedService.getProviderData().subscribe(
    (data: any) => {
      this.ProviderData = data;
      console.log('ProviderData:', this.ProviderData);
      for (let index = 0; index < this.ProviderData.length; index++) {
        this.scheduleData = {
          Id:  this.ProviderData[index].Id,
          Data:  this.ProviderData[index].ProviderName
        };
        this.resourceDataSource.push(this.scheduleData);
      }
    }
  );
}
getSpecialtyData() {
  this.sharedService.getspecialitydetails().subscribe(
    (data: Speciality[] ) => {
      this.SpecialtyData = data;
    }
  );
}
  getAllData() {

    this.sharedService.getLocationData().subscribe(
      (data: Location[] ) => {
        this.LocationData = data;
      }
    );
    this.sharedService.getPracticeData().subscribe(
      (data: Practice[] ) => {
        this.PracticeData = data;
      }
    );

    this.sharedService.getSchedularData().subscribe(
      (data: Details[]) => {
        this.patientData = data;
        this.appointmentData = data;
        for (let i = 0; i < this.patientData.length; i++) {
          this.patientData[i].StartTime = new Date(this.patientData[i].StartTime);
          this.patientData[i].EndTime = new Date(this.patientData[i].EndTime);
        }

        this.eventSettings = {
          dataSource : this.patientData,
          fields: {
            subject: {title: 'PatientName' , name: 'PatientName' },
            description: {title: 'AppointmentType', name: 'AppointmentType' },
            startTime: { title: 'From', name: 'StartTime' },
            endTime: { title: 'To', name: 'EndTime' },
            location : { title : 'Location' , name : 'Location'}
          }
        };
      }
    );
  }

  filterBasedonPractice(item: any ) {
    this.selectedPractice = item.value;
  }
  filterBasedonLocation(item: any) {
    this.selectedLocation = item.value;
  }
  filterBasedonProviders(item: any) {
    this.selectedProvider = item.value;
  }
  filterBasedonSpeciality(item: any) {
    this.selectedSpeciality = item.value;
  }
  filterBasedonAppmnt(item: any) {
    this.selectedAppmnt = item.value;
  }
  OnSelctedFilter() {
    if (this.selectedLocation === null && this.selectedPractice === null) {
      setTimeout(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Mandatory Fields',
          detail: 'Please select Practice or Location to filter'
        });
       }, 500);
    } else if (this.selectedPractice !== null) {
      this.locationResourceDataSource = [];
      this.resourceDataSource = [];
      this.PracticeSelectedForAllLoc = [];
      this.PracticeSelectedForAllLoc = _.filter(this.practiceLocationData , (p) => {
        return p.Practice === this.selectedPractice[0];
      });

      for (let i = 0; i < this.PracticeSelectedForAllLoc.length; i++) {
        const scheduleDataForPractice = {
          Id:  this.PracticeSelectedForAllLoc[i].Id,
          Text:  this.PracticeSelectedForAllLoc[i].PracticeLocation
        };
        this.locationResourceDataSource.push(scheduleDataForPractice);
      }
      for (let i = 0; i < this.ProviderData.length; i++) {
        this.scheduleData = {
          Id:  this.ProviderData[i].Id,
          Data:  this.ProviderData[i].ProviderName
        };
        this.resourceDataSource.push(this.scheduleData);
      }
      this.eventSettings = {
        dataSource : this.appointmentData,
        fields: {
        subject: {title: 'PatientName' , name: 'PatientName' },
        description: {title: 'AppointmentType', name: 'AppointmentType' },
        startTime: { title: 'From', name: 'StartTime' },
        endTime: { title: 'To', name: 'EndTime' },
        location : { title : 'Location' , name : 'Location'}
        }
      };
    } else if (this.selectedLocation !== null) {
      this.locationResourceDataSource = [];
      this.resourceDataSource = [];
      this.LocationSelectedForAllProv = [];
      this.LocationSelectedForAllProv = _.filter(this.practiceLocationData , (p) => {
        return p.Location === this.selectedLocation[0];
      });

      for (let i = 0; i < this.LocationSelectedForAllProv.length; i++) {
        const scheduleDataForPractice = {
          Id:  this.LocationSelectedForAllProv[i].Id,
          Text:  this.LocationSelectedForAllProv[i].PracticeLocation
        };
        this.locationResourceDataSource.push(scheduleDataForPractice);
      }
      for (let i = 0; i < this.ProviderData.length; i++) {
        this.scheduleData = {
          Id:  this.ProviderData[i].Id,
          Data:  this.ProviderData[i].ProviderName
        };
        this.resourceDataSource.push(this.scheduleData);
      }
      this.eventSettings = {
        dataSource : this.appointmentData,
        fields: {
        subject: {title: 'PatientName' , name: 'PatientName' },
        description: {title: 'AppointmentType', name: 'AppointmentType' },
        startTime: { title: 'From', name: 'StartTime' },
        endTime: { title: 'To', name: 'EndTime' },
        location : { title : 'Location' , name : 'Location'}
        }
      };
    } else {
      this.resourceDataSource = [];
      this.locationResourceDataSource = [];
      this.seldatalist = [];
      this.ListofDataAfterFilter = [];
      this.getAllFilteredData = [];
      for (let i = 0; i < this.selectedLocation.length ; i++) {
        this.ListOfAppmnt = _.filter(this.appointmentData, (l) => {
          return l.Name === this.selectedLocation[i] && l.Providers === this.selectedProvider[i];
        });
        this.ListofDataAfterFilter.push(this.ListOfAppmnt);
        this.locationSelected = _.filter(this.LocationData, (s) => {
          return s.Name === this.selectedLocation[i];
        });
        this.seldatalist.push(this.locationSelected[0].PatientId);
        const locaData = {
          Id: this.seldatalist[i],
          Text: this.selectedLocation[i]
        };
        this.locationResourceDataSource.push(locaData);
      }
      for (let i = 0; i <= this.ProviderData.length; i++) {
        this.providerSelected = _.filter(this.ProviderData , (p) => {
          return p.ProviderName === this.selectedProvider[i];
        });
        this.scheduleData = {
          Id:  this.providerSelected[0].PatientId,
          Data:  this.selectedProvider[i]
        };
        this.resourceDataSource.push(this.scheduleData);
      }

      for (let i = 0 ; i < this.ListofDataAfterFilter.length; i++) {
        for (let j = 0 ; j < this.ListofDataAfterFilter[i].length ; j++) {
          var formatedData = {
            Id: this.ListofDataAfterFilter[i][j].Id,
            PatientName: this.ListofDataAfterFilter[i][j].PatientName,
            StartTime: this.ListofDataAfterFilter[i][j].StartTime,
            EndTime: this.ListofDataAfterFilter[i][j].EndTime,
            AppointmentType: this.ListofDataAfterFilter[i][j].AppointmentType,
            LocationId: this.ListofDataAfterFilter[i][j].LocationId,
            Location: this.ListofDataAfterFilter[i][j].Location,
            ProviderId: this.ListofDataAfterFilter[i][j].ProviderId,
            Providers: this.ListofDataAfterFilter[i][j].Providers,
            PracticeId: this.ListofDataAfterFilter[i][j].ProviderId,
            Practice: this.ListofDataAfterFilter[i][j].Practice,
            Speciality: this.ListofDataAfterFilter[i][j].Speciality,
            Status: this.ListofDataAfterFilter[i][j].Status,
            CategoryColor: this.ListofDataAfterFilter[i][j].CategoryColor,
            StartTimezone: this.ListofDataAfterFilter[i][j].StartTimezone,
            EndTimezone: this.ListofDataAfterFilter[i][j].EndTimezone,
            IsBlock: this.ListofDataAfterFilter[i][j].IsBlock,
            From: this.ListofDataAfterFilter[i][j].From,
            To: this.ListofDataAfterFilter[i][j].To,
            From_Date: this.ListofDataAfterFilter[i][j].From_Date,
            To_Date: this.ListofDataAfterFilter[i][j].To_Date,
            ProjectId: this.ListofDataAfterFilter[i][j].ProjectId,
            PracticeLocation: this.ListofDataAfterFilter[i][j].PracticeLocation,
            reason: this.ListofDataAfterFilter[i][j].reason,
            description: this.ListofDataAfterFilter[i][j].description
          };
          this.getAllFilteredData.push(formatedData);
          this.eventSettings = {
            dataSource : this.getAllFilteredData,
            fields: {
            subject: {title: 'PatientName' , name: 'PatientName' },
            description: {title: 'AppointmentType', name: 'AppointmentType' },
            startTime: { title: 'From', name: 'StartTime' },
            endTime: { title: 'To', name: 'EndTime' },
            location : { title : 'Location' , name : 'Location'}
          }
        };
      }
    }
  }

  }

  OnSelctedFilter1() {
    if (this.selectedLocation === null && this.selectedProvider === null) {
      setTimeout(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Mandatory Fields',
          detail: 'Please select both Location and Provider to filter'
        });
       }, 500);
    } else if (this.selectedLocation[0] === 'All Locations' && this.selectedProvider[0] !== null) {
      this.resourceDataSource = [];
      this.locationResourceDataSource = [];
      for (let i = 0; i <= this.ProviderData.length; i++) {
        this.allLocationData = _.filter(this.appointmentData, (d) => {
          return d.Providers === this.selectedProvider[i] ;
        });
      }
      for (let i = 0 ; i < this.LocationData.length; i++) {
        const locaData = {
          Id: this.LocationData[i].PatientId,
          Text: this.LocationData[i].Name
        };
        this.locationResourceDataSource.push(locaData);
      }
      for (let i = 0; i <= this.ProviderData.length; i++) {
        this.providerSelectedForAllLoc = _.filter(this.ProviderData , (p) => {
          return p.ProviderName === this.selectedProvider[i];
        });
        const scheduleDataForProvider = {
          Id:  this.providerSelectedForAllLoc[0].PatientId,
          Data:  this.selectedProvider[i]
        };
        this.resourceDataSource.push(scheduleDataForProvider);
      }
      this.eventSettings = {
        dataSource : this.allLocationData,
        fields: {
        subject: {title: 'PatientName' , name: 'PatientName' },
        description: {title: 'AppointmentType', name: 'AppointmentType' },
        startTime: { title: 'From', name: 'StartTime' },
        endTime: { title: 'To', name: 'EndTime' },
        location : { title : 'Location' , name : 'Location'}
        }
      };
    } else {
        this.resourceDataSource = [];
        this.locationResourceDataSource = [];
        this.seldatalist = [];
        this.ListofDataAfterFilter = [];
        this.getAllFilteredData = [];
        for (let i = 0; i < this.selectedLocation.length ; i++) {
          this.ListOfAppmnt = _.filter(this.appointmentData, (l) => {
            return l.Name === this.selectedLocation[i] && l.Providers === this.selectedProvider[i];
          });
          this.ListofDataAfterFilter.push(this.ListOfAppmnt);
          this.locationSelected = _.filter(this.LocationData, (s) => {
            return s.Name === this.selectedLocation[i];
          });
          this.seldatalist.push(this.locationSelected[0].PatientId);
          const locaData = {
            Id: this.seldatalist[i],
            Text: this.selectedLocation[i]
          };
          this.locationResourceDataSource.push(locaData);
        }
        for (let i = 0; i <= this.ProviderData.length; i++) {
          this.providerSelected = _.filter(this.ProviderData , (p) => {
            return p.ProviderName === this.selectedProvider[i];
          });
          this.scheduleData = {
            Id:  this.providerSelected[0].PatientId,
            Data:  this.selectedProvider[i]
          };
          this.resourceDataSource.push(this.scheduleData);
        }

        for (let i = 0 ; i < this.ListofDataAfterFilter.length; i++) {
          for (let j = 0 ; j < this.ListofDataAfterFilter[i].length ; j++) {
            var formatedData = {
              Id: this.ListofDataAfterFilter[i][j].Id,
              PatientName: this.ListofDataAfterFilter[i][j].PatientName,
              StartTime: this.ListofDataAfterFilter[i][j].StartTime,
              EndTime: this.ListofDataAfterFilter[i][j].EndTime,
              AppointmentType: this.ListofDataAfterFilter[i][j].AppointmentType,
              LocationId: this.ListofDataAfterFilter[i][j].LocationId,
              Location: this.ListofDataAfterFilter[i][j].Location,
              ProviderId: this.ListofDataAfterFilter[i][j].ProviderId,
              Providers: this.ListofDataAfterFilter[i][j].Providers,
              PracticeId: this.ListofDataAfterFilter[i][j].ProviderId,
              Practice: this.ListofDataAfterFilter[i][j].Practice,
              Speciality: this.ListofDataAfterFilter[i][j].Speciality,
              Status: this.ListofDataAfterFilter[i][j].Status,
              CategoryColor: this.ListofDataAfterFilter[i][j].CategoryColor,
              StartTimezone: this.ListofDataAfterFilter[i][j].StartTimezone,
              EndTimezone: this.ListofDataAfterFilter[i][j].EndTimezone,
              IsBlock: this.ListofDataAfterFilter[i][j].IsBlock,
              From: this.ListofDataAfterFilter[i][j].From,
              To: this.ListofDataAfterFilter[i][j].To,
              From_Date: this.ListofDataAfterFilter[i][j].From_Date,
              To_Date: this.ListofDataAfterFilter[i][j].To_Date,
              ProjectId: this.ListofDataAfterFilter[i][j].ProjectId,
              PracticeLocation: this.ListofDataAfterFilter[i][j].PracticeLocation,
              reason: this.ListofDataAfterFilter[i][j].reason,
              description: this.ListofDataAfterFilter[i][j].description
            };
            this.getAllFilteredData.push(formatedData);
            this.eventSettings = {
              dataSource : this.getAllFilteredData,
              fields: {
              subject: {title: 'PatientName' , name: 'PatientName' },
              description: {title: 'AppointmentType', name: 'AppointmentType' },
              startTime: { title: 'From', name: 'StartTime' },
              endTime: { title: 'To', name: 'EndTime' },
              location : { title : 'Location' , name : 'Location'}
            }
          };
        }
      }
    }
  }
  getEmployeeName(value: ResourceDetails | TreeViewArgs): string {
    return ((value as ResourceDetails).resourceData) ?
        (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string
        : (value as TreeViewArgs).resourceName;
  }
  getMajorTime(date: Date): string {
    return this.instance.formatDate(date, { skeleton: 'hm' });
  }

  getMinorTime(date: Date): string {
    return this.instance.formatDate(date, { skeleton: 'ms' }).replace(':00', '');
  }

  onContextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    const newEventElement: HTMLElement = document.querySelector('.e-new-event') as HTMLElement;
    if (newEventElement) {
      remove(newEventElement);
      removeClass([document.querySelector('.e-selected-cell')], 'e-selected-cell');
    }
    const targetElement: HTMLElement = <HTMLElement>args.event.target;
    if (closest(targetElement, '.e-contextmenu')) {
      return;
    }

    this.selectedTarget = closest(targetElement, '.e-appointment,.e-work-cells,' +
      '.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells');
    if (isNullOrUndefined(this.selectedTarget)) {
      args.cancel = true;
      return;
    }

    if (this.selectedTarget.classList.contains('e-appointment')) {
      const eventObj: { [key: string]: Object } = <{ [key: string]: Object }>this.scheduleObj.getEventDetails(this.selectedTarget);
      if (eventObj.RecurrenceRule) {
        this.menuObj.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
        this.menuObj.hideItems(['Today', 'Save', 'print', 'Delete', 'Add', 'CaseDetails'], true);
      } else {
        this.menuObj.showItems(['Today', 'Save', 'print', 'Delete', 'Add'], true);
        this.menuObj.hideItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent', 'CaseDetails'], true);
      }
      return;
    }
    this.menuObj.hideItems(['Today', 'Save', 'print', 'Delete', 'DeleteRecurrenceEvent', 'Add', 'CaseDetails'], true);
    this.menuObj.showItems([''], true);
  }

  onMenuItemSelect(args: MenuEventArgs): void {
    const selectedMenuItem: string = args.item.id;
    let eventObj: { [key: string]: Object };
    if (this.selectedTarget.classList.contains('e-appointment')) {
      eventObj = <{ [key: string]: Object }>this.scheduleObj.getEventDetails(this.selectedTarget);
    }
    switch (selectedMenuItem) {
      case 'Today':
        this.statusChange();
        break;
      case 'Add':
      case 'AddRecurrence':
        this.onEditPopUp();
        this.openDetailsPopupdisp = true;
        break;
      case 'Save':
      case 'EditOccurrence':
      case 'EditSeries':
        this.openEditPopup = true;
        this.onEditPopUp();
        break;
      case 'Delete':
        break;
      case 'DeleteOccurrence':
      case 'DeleteSeries':
        break;
        case 'DeleteOccurrenceNoShow':
          this.cancelAppointment  = this.cancelForm.controls.cancelDetails as FormArray;
          this.cancelAppointment.push(this.fb.group({
          reason:  new FormControl('No Show'),
          description: new FormControl (null)
           }));
           this.appointmentCancelDisplay = true;
           this.showTransToHospitalBox = false;
          this.showTransToPCPBox = false;
           break;
        case 'DeleteOccurrenceProvider':
          if (this.cancelAppointment != null) {
            this.cancelAppointment.removeAt(0);
          }
          this.cancelAppointment  = this.cancelForm.controls.cancelDetails as FormArray;
          this.cancelAppointment.push(this.fb.group({
          reason:  new FormControl('Rescheduled on Provider Request'),
          description: new FormControl (null)
        }));
        this.appointmentCancelDisplay = true;
        this.showTransToHospitalBox = false;
        this.showTransToPCPBox = false;
        break;
      case 'DeleteOccurrencePatient':
        if (this.cancelAppointment != null) {
          this.cancelAppointment.removeAt(0);
          this.cancelAppointment.removeAt(1);
        }
        this.cancelAppointment  = this.cancelForm.controls.cancelDetails as FormArray;
        this.cancelAppointment.push(this.fb.group({
          reason:  new FormControl('Rescheduled on Patient Request'),
          description: new FormControl (null)
        }));
        this.appointmentCancelDisplay = true;
        this.showTransToHospitalBox = false;
        this.showTransToPCPBox = false;
        break;
      case 'DeleteOccurrenceDenied':
        if (this.cancelAppointment != null) {
          this.cancelAppointment.removeAt(0);
          this.cancelAppointment.removeAt(1);
          this.cancelAppointment.removeAt(2);
        }
        this.cancelAppointment  = this.cancelForm.controls.cancelDetails as FormArray;
        this.cancelAppointment.push(
          this.fb.group({
            reason:  new FormControl('Authorization Denied'),
            description: new FormControl (null)
          })
        );
        this.appointmentCancelDisplay = true;
        this.showTransToHospitalBox = false;
        this.showTransToPCPBox = false;
        break;
      case 'DeleteOccurrenceTransfer':
        if (this.cancelAppointment != null) {
        this.cancelAppointment.removeAt(0);
        this.cancelAppointment.removeAt(1);
        this.cancelAppointment.removeAt(2);
        this.cancelAppointment.removeAt(3);
        }
        this.cancelAppointment  = this.cancelForm.controls.cancelDetails as FormArray;
        this.cancelAppointment.push(
          this.fb.group({
            reason:  new FormControl('Transfer Other'),
            description: new FormControl (null)
          })
        );
        this.appointmentCancelDisplay = true;
        this.showTransToHospitalBox = false;
        this.showTransToPCPBox = false;
        break;
      case 'DeleteOccurrenceOther':
        if (this.cancelAppointment != null) {
          this.cancelAppointment.removeAt(0);
          this.cancelAppointment.removeAt(1);
          this.cancelAppointment.removeAt(2);
          this.cancelAppointment.removeAt(3);
          this.cancelAppointment.removeAt(4);
        }
        this.cancelAppointment  = this.cancelForm.controls.cancelDetails as FormArray;
        this.cancelAppointment.push(
          this.fb.group({
            reason:  new FormControl('Other'),
            description: new FormControl (null)
          })
        );
        this.appointmentCancelDisplay = true;
        this.showTransToHospitalBox = false;
        this.showTransToPCPBox = false;
        break;
      case 'DeleteOccurrenceHospital':
        if (this.cancelAppointment != null) {
          this.cancelAppointment.removeAt(0);
        this.cancelAppointment.removeAt(1);
        this.cancelAppointment.removeAt(2);
        this.cancelAppointment.removeAt(3);
        this.cancelAppointment.removeAt(4);
        this.cancelAppointment.removeAt(5);
        }
        this.cancelAppointment  = this.cancelForm.controls.cancelDetails as FormArray;
        this.cancelAppointment.push(
          this.fb.group({
            reason:  new FormControl('Transfer to Hospital'),
            description: new FormControl (null)
          })
        );
        this.appointmentCancelDisplay = true;
        this.showTransToHospitalBox = true;
        this.showTransToPCPBox = false;
        break;
      case 'DeleteOccurrencePCP':
        if (this.cancelAppointment != null) {
          this.cancelAppointment.removeAt(0);
        this.cancelAppointment.removeAt(1);
        this.cancelAppointment.removeAt(2);
        this.cancelAppointment.removeAt(3);
        this.cancelAppointment.removeAt(4);
        this.cancelAppointment.removeAt(5);
        this.cancelAppointment.removeAt(6);
        }
        this.cancelAppointment  = this.cancelForm.controls.cancelDetails as FormArray;
        this.cancelAppointment.push(
          this.fb.group({
            reason:  new FormControl('Transfer to PCP'),
            description: new FormControl (null)
          })
        );
        this.appointmentCancelDisplay = true;
        this.showTransToPCPBox = true;
        this.showTransToHospitalBox = false;
      break;
      case 'CaseDetails':
        this.openCaseDetails();
      break;
    }
  }
  ShowMoreFilters() {
    if (this.displaymorefilters === false) {
      this.displaymorefilters = true;
    } else {
      this.displaymorefilters = false;
    }
  }
  closeEditPopup() {
    this.openEditPopup = false;
    this.editPopUpData.reset();
  }
  onEditPopUp() {
    var strSplit;
    var targetId = $(this.selectedTarget).attr('data-id');
    if (! _.isEmpty(targetId)) {
      var result = [];
      strSplit = targetId.split('_');
      result = _.filter(this.patientData, (p) => {
        return (p.Id == strSplit[1]);
      });
      this.selectedId = result[0].Id;
      this.selectedId = result[0].Id;

      this.editPopUpData.patchValue({
        PatientName: result[0].PatientName,
        Location: result[0].Location,
        providerPhysicianAssistant: result[0].Providers,
        providerId: result[0].ProviderId,
        AppointmentType: result[0].AppointmentType,
        preferredDate: new Date(result[0].From_Date),
        StartTime: result[0].From,
        EndTime: result[0].To
      });
      this.selectedVal = result[0].Providers;
      this.patientName = result[0].PatientName;
      this.Location = result[0].Location;
      this.Providers = result[0].Providers;
      this.AppointmentType = result[0].AppointmentType;
      this.StartTime = result[0].StartTime;
      this.EndTime = result[0].EndTime;
      this. Status = result[0].Status;
      this.Practice = result[0].Practice;
      this.reason = result[0].reason;
      this.description = result[0].description;
    }
    this.searchProvider.patchValue({
      PatientName: result[0].PatientName,
      Location: result[0].Location,
      providerPhysicianAssistant: result[0].Providers,
      providerId: result[0].ProviderId,
      Practice: result[0].Practice,
      AppointmentType: result[0].AppointmentType,
      preferredDate: new Date(result[0].From_Date),
      StartTime: result[0].From,
      EndTime: result[0].To
    });
  }
  onSelectAppointmentType() {
    if (this.editPopUpData.value.AppointmentType === null) {
      this.editPopUpData.patchValue({
        Location: null,
        providerPhysicianAssistant: null
      });
    }
  }
  saveEditedData() {
    const isValid = this.masterService.getFormErrorMessage(this.editPopUpData, this.editPopUpDataErrorObj);
    if (isValid !== undefined) {
      this.messageService.add({severity: 'error', summary: 'Warning', detail: isValid});
    } else {
      for (let i = 0 ; i < this.patientData.length ; i++) {
        if (this.patientData[i].Id === this.selectedId) {
          this.patientData[i].Location = this.editPopUpData.value.Location;
          this.patientData[i].Providers = this.editPopUpData.value.providerPhysicianAssistant;
          this.patientData[i].AppointmentType =  this.editPopUpData.value.AppointmentType;
          let date = JSON.stringify(this.editPopUpData.value.preferredDate);
          date = date.slice(1, 11);
          this.patientData[i].StartTime = new Date(date + 'T' + this.editPopUpData.value.StartTime);
          this.patientData[i].EndTime = new Date(date + 'T' + this.editPopUpData.value.EndTime);
        }
      }
      this.eventSettings = {
        dataSource: <Object[]>extend([], this.patientData, null, true),
        fields: {
         subject: { title: 'PatientName' , name: 'PatientName' },
         description: { title: 'Providers', name: 'Providers' },
         startTime: { title: 'From', name: 'StartTime' },
         endTime: { title: 'To', name: 'EndTime' },
         location : { title : 'Location' , name : 'Location'}
        }
      };
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
      this.openEditPopup = false;
      this.editPopUpData.reset();
    }
  }

  openEditAddPopup() {
    this.onEditPopUp();
    this.openEditAddPopupdisp = true;

  }
  closeEditAddPopup() {
    this.openEditAddPopupdisp = false;
    this.searchProvider.reset();
  }
  onSearchProvider() {
    this.onSearchProviderdiplay = true;
    if (this.searchProvider.value.ProviderName !== null) {
      this.ProviderData = _.filter(this.ProviderData , (s) => {
        return s.ProviderName === this.searchProvider.value.ProviderName;
      });
    } else {
      this.sharedService.getProviderData().subscribe(
        (data: any) => {
          this.ProviderData = data;
        }
      );
    }
  }
  selectSearch(searchedData) {
    this.editPopUpData.patchValue({
      providerPhysicianAssistant: searchedData.ProviderName
    });
    this.openEditAddPopupdisp = false;
  }
  closeDetailsPopup() {
    this.openDetailsPopupdisp = false;
  }

  closeEditModal() {
    this.scheduleObj.closeEditor();
  }

  closeCancelPopup() {
    this.appointmentCancelDisplay = false;
  }
  onCancelSubmit(cancelForm) {
    if (this.cancelForm.value.cancelDetails[0].reason === 'Select' || this.cancelForm.value.cancelDetails[0].reason == null) {

      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please select description'
      });

}  else if (this.cancelForm.value.cancelDetails[0].description === '' || this.cancelForm.value.cancelDetails[0].description == null) {
  this.messageService.add({
    severity: 'error',
    summary: 'Error Message',
    detail: 'Please Add the description'
  });
} else {
  var strSplit;
  var targetId = $(this.selectedTarget).attr('data-id');
  if (! _.isEmpty(targetId)) {
    var result = [];
    strSplit = targetId.split('_');
    result = _.filter(this.patientData, (p) => {
      return (p.Id == strSplit[1]);
    });
    this.selectedId = result[0].Id;
    this.patientData[0].reason = this.cancelForm.value.cancelDetails[0].reason;
    this.patientData[0].description = this.cancelForm.value.cancelDetails[0].description;
    result[0].reason = this.cancelForm.value.cancelDetails[0].reason;
    result[0].description = this.cancelForm.value.cancelDetails[0].description;
    result[0].Status = 'cancelled';
    this.patientData[0].Status =  result[0].Status;
    this.eventSettings = {
      dataSource: <Object[]>extend([], this.patientData, null, true),
      fields: {
       subject: { title: 'PatientName' , name: 'PatientName' },
       description: { title: 'Providers', name: 'Providers' },
       startTime: { title: 'From', name: 'StartTime' },
       endTime: { title: 'To', name: 'EndTime' },
       location : { title : 'Location' , name : 'Location'}
     }
    };
  }
  setTimeout(() => {
    this.messageService.add({ severity: 'success', summary: 'Success Message', detail: ' Sucessfully' });
  }, 1000);
  this.appointmentCancelDisplay = false;
  this.cancelForm.reset();
}

  }

  findData(event) {
    if (event.value === 'Transfer to Hospital') {
      this.showTransToHospitalBox = true;
    } else {
      this.showTransToHospitalBox = false;
    }
    if (event.value === 'Transfer to PCP') {
      this.showTransToPCPBox = true;
    } else {
      this.showTransToPCPBox = false;
    }
  }
  statusChange() {
    var strSplit;
    var targetId = $(this.selectedTarget).attr('data-id');
    if (! _.isEmpty(targetId)) {
      var result = [];
      strSplit = targetId.split('_');
      result = _.filter(this.patientData, (p) => {
        return (p.Id == strSplit[1]);
      });
      this.selectedId = result[0].Id;
      if (result[0].Status !== 'checked-In') {
        result[0].Status = 'checked-In';
        this.patientData[0].Status =  result[0].Status;
      }
      this.eventSettings = {
        dataSource: <Object[]>extend([], this.patientData, null, true),
        fields: {
         subject: { title: 'PatientName' , name: 'PatientName' },
         description: { title: 'Providers', name: 'Providers' },
         startTime: { title: 'From', name: 'StartTime' },
         endTime: { title: 'To', name: 'EndTime' },
         location : { title : 'Location' , name : 'Location'}
       }
      };
    }
  }

  onValueChange(value: Date): void {
    const datePipe = new DatePipe('en-US');
    const test = datePipe.transform(value, 'dd/MM/yyyy');
    this.preferredDate_temp =  datePipe.transform(this.editPopUpData.value.preferredDate, 'dd/MM/yyyy');
    if (this.preferredDate_temp === test) {
      this.displayReason = false;
    }    else {
      this.displayReason = true;
    }
  }
  openCaseDetails() {
    var strSplit;
    var targetId = $(this.selectedTarget).attr('data-id');
    if (! _.isEmpty(targetId)) {
      var result = [];
      strSplit = targetId.split('_');
      result = _.filter(this.patientData, (p) => {
        return (p.Id == strSplit[1]);
      });
      this.selectedId = result[0].Id;

      this.sharedService.sendCaseDetails( true, 'shivu');
      // this.router.navigate(['dashboard/patientinfo'], { queryParams: { page: 1, Value: 'shivu' } });
    }
  }
}



