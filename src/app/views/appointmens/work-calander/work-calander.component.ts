import { Component, ViewChild, ViewEncapsulation, OnInit, Output } from '@angular/core';
import {extend,closest,isNullOrUndefined,remove,removeClass,Internationalization} from '@syncfusion/ej2-base';
import {ContextMenuComponent,MenuItemModel,BeforeOpenCloseMenuEventArgs,MenuEventArgs} from '@syncfusion/ej2-angular-navigations';
import * as _ from 'lodash';
import {EventSettingsModel,DayService,WeekService,WorkWeekService,MonthService,AgendaService,ScheduleComponent,CellTemplateArgs,getWeekNumber,
  EventRenderedArgs,
  CellClickEventArgs,
  View,
  GroupModel,
  ResourceDetails,
  TreeViewArgs,
  Schedule
} from '@syncfusion/ej2-angular-schedule';
import {FormControl,FormArray,FormBuilder,Validators,FormGroup} from '@angular/forms';
import { SharedService } from '../../../services/appservices/shared.service';
import { formatDate, DatePipe } from '@angular/common';
import { Details } from '../../../models/details';
import {ConfirmationService, Message, MessageService} from 'primeng/api';
import { Router } from '@angular/router';
import { WorkCalender } from '../../../models/workcalender';
import { Provider } from '../../../models/Provider';
import { Location } from '../../../models/locations';
import { Speciality } from '../../../models/speciality';
import { ManageuserService } from '../../User/manage-user/manageuser.service';
import { Practice } from '../../../models/practice';
import { MasterService } from '../../../services/master.service';
import { AppointmentDetails } from '../../../models/patientdetails';
// import { AppointmentDetails } from '../appointment-dashboard/patientdetails';

@Component({
  selector: 'app-work-calander',
  templateUrl: './work-calander.component.html',
  styleUrls: ['./work-calander.component.scss',
  '../../../../assets/CSS/common.css',
],providers: [ DayService, WeekService, WorkWeekService, MonthService, AgendaService,DatePipe],
  encapsulation: ViewEncapsulation.None
})

export class WorkCalanderComponent implements OnInit {
  onlyOnSelectSchedule: boolean = false;
  dataFromWorkcal: any;
  selectedIdForRecurring: any ;
  IdForPartSchedule: number = 52;
  today: Date = new Date();
  onchangeLoc: any;
  onFilterForAllLoc: boolean = false;
  onFilterForPartLoc: boolean = false;
  onAddNewschedules: boolean = false;
  filteredLocId: any[] = [];
  getAllFilteredData: WorkCalender[] = [];
  allLocationData: any[];
  seldatalist: any[] = [];
  locationSelected: any;
  providerSelected: any;
  providerSelectedForAllLoc: any;
  displayOnlyRecurring: boolean = false;
  displayOnlyExceptions: boolean = false;
  DataForAllLocation: any;
  selectedProviderforDropdown: any = 'Kyriakides Christopher';
  selectedIdValue: any;
  selectedIdValueForExcep: any;
  currentYear: number;
  currentMonth: number;
  currentDay: number;
  ManageRecurring: FormGroup;
  msgs: Message[] = [];
  ListOfAppmnt: any[];
  ListofDataAfterFilter: any[] = [];
  selectedLocation: any[] = null;
  selectedProvider: any = null;
  selectedAppmnt: any = null;
  selectedPractice: any = null;
  selectedSpeciality: any = null;
  datatoblock: any[];
  marked = true;
  displaymorefilters: boolean = false;
  manageRecurring: boolean = false;
  updateRecurringData: boolean = false;
  updateException: boolean = false;
  form: FormGroup;
  addException: FormGroup;
  recurringExc: FormArray;
  exception :FormArray;
  exceptionDate :FormArray;
  recurringException : FormArray;
  sundayArray :FormArray;
  mondayArray :FormArray;
  tuesdayArray :FormArray;
  wednesdayArray : FormArray;
  thursdayArray: FormArray;
  fridayArray: FormArray;
  saturdayArray: FormArray;
  addTime: boolean = false;
  AddDayName: any;
  dayNameToAdd: any;
  checkboxEnabled: boolean = false;
  ProWorkSchedule: FormGroup;
  addManageException: FormGroup;
  manageException: boolean = false;
  ListOfData: WorkCalender[];
  AddRecurringSchedules: any[] = [];
  providerArr: Provider[];
  locationData: Location[];
  specialityData: Speciality[];
  practiceData: Practice[];
  formatedPracData: Practice[];
  formatedLocData: Location[];
  timeList: any;
  appointmentTypeData: AppointmentDetails[];
  public currentView: View = 'Week';
  @ViewChild('element', { static: true }) element;
  displayEditPopup: boolean = false;
  @ViewChild('scheduleObj', { static: true })
  public scheduleObj: ScheduleComponent;
  @ViewChild('menuObj', { static: true })
  public menuObj: ContextMenuComponent;
  public allowResizing: Boolean = false;
  public allowDragDrop: Boolean = false;
  public instance: Internationalization = new Internationalization();
  public selectedDate: Date = new Date(2020, 1, 18);
  public showQuickInfo: boolean = false;
  public projectResourceDataSource: any[] = [];
  public locationResourceDataSource: any[] = [];
  public group: GroupModel = {  byGroupID: false, resources: ['Projects', 'Categories'] };
  public allowMultiple: boolean = true;
  public eventSettings: EventSettingsModel = {
    dataSource: <Object[]>extend([], this.ListOfData, null, true),
    fields: {
      subject: { title: 'Practice' , name: 'Practice' },
      description: { title: 'Description', name: 'Subject' },
      startTime: { title: 'From', name: 'StartTime' },
      endTime: { title: 'To', name: 'EndTime' },
      location : { title : 'Location' , name : 'Location'}
    }
  };
  public selectedTarget: Element;
  public data: string[] = [ '', '', '', '' ];

  // set a value to pre-select
  public menuItems: MenuItemModel[] = [
    {
      text: 'New Appointment',
      iconCss: 'e-icons new',
      id: 'Add'
    },
    {
      text: 'New Recurring Appointment',
      iconCss: 'e-icons recurrence',
      id: 'AddRecurrence'
    },
    {
      text: 'Today',
      iconCss: 'e-icons today',
      id: 'Today'
    },
    {
      text: 'Edit',
      iconCss: 'e-icons edit',
      id: 'Save'
    },
    {
      text: 'Edit Recurring',
      id: 'EditRecurrenceEvent',
      iconCss: 'e-icons edit',
    },
    {
      text: 'Block ',
      iconCss: 'e-icons today',
      id: 'Block'
    },
    {
      text: 'Remove ',
      iconCss: 'e-icons delete',
      id: 'Delete'
    },
    {
      text: 'Remove ',
      id: 'DeleteRecurrenceEvent',
      iconCss: 'e-icons delete',
    }
  ];
  exceptionDropDownDays: { label: string; value: string; }[];
  exceptionDropDown: { label: string; value: string; }[];
  toTime: { label: string; value: string; }[];
  toTIming:  { label: string; value: string; }[];
  fromTime: { label: string; value: string; }[];
  ListOfLocation: { label: string; value: string; }[];
  ListOfPractices: { id: string; label: string; value: string; }[];
  ListOfProviders: { label: string ; value: string; }[];
  ListOfSpeciality: { label: string ; value: string; }[];
  AppointmentType: { label: string ; value: string; }[];
  public fields: Object = { text: 'label', value: 'value' };
  public fieldsforejs: Object = { text : 'name' , value : 'name' };
  public fieldsforloc: Object = { text : 'Name' , value : 'Name'};
  public fieldsforprac: Object = { text : 'Practice', value : 'Practice'};
  public fieldsforpro: Object = { text : 'ProviderName' , value : 'ProviderName'};
  public fieldsforappdata: Object = { text : 'Appointmenttype' , value : 'Appointmenttype'};

constructor(private fb:FormBuilder,private _data:SharedService,private confirmationService: ConfirmationService,
  private messageService: MessageService,private router:Router,private datePipe: DatePipe,private manageUser: ManageuserService,private masterService: MasterService
  ) {
      this.form = this.fb.group({
      sunday: this.fb.array([]),
      monday: this.fb.array([]),
      tuesday: this.fb.array([]),
      wednesday: this.fb.array([]),
      thursday: this.fb.array([]),
      friday: this.fb.array([]),
      saturday: this.fb.array([])
  });
  this.addException = this.fb.group({
    recurringException: this.fb.array([]),
    excceptiondata: this.fb.array([]),
    exceptionDate: this.fb.array([]),
    schedule_date : new FormControl(null),
    SelectTime : new FormControl(null),
    monthDate : new FormControl(null)
});
  this.recurringException  = this.addException.controls.recurringException as FormArray
  this.exception  = this.addException.controls.excceptiondata as FormArray
  this.exceptionDate  = this.addException.controls.exceptionDate as FormArray
  this.sundayArray  = this.form.controls.sunday as FormArray
  this.mondayArray = this.form.controls.monday as FormArray
  this.tuesdayArray = this.form.controls.tuesday as FormArray
  this.wednesdayArray = this.form.controls.wednesday as FormArray
  this.thursdayArray = this.form.controls.thursday as FormArray
  this.fridayArray = this.form.controls.friday as FormArray
  this.saturdayArray = this.form.controls.saturday as FormArray

    this.exceptionDropDown = [
      { label: 'Continous work days', value: 'Continous work days' },
      { label: 'Continous days', value: 'Continous days' },
      { label: 'Following weekday', value: 'Following weekday' },
      {
        label: 'Same day in folloing months',
        value: 'Same day in following months'
      }
    ];

    this.exceptionDropDownDays = [
      { label: '3 Days', value: '3 Days' },
      { label: '2 Weeks', value: '2 Weeks' },
      { label: '4 Days', value: '4 Days' }
    ];
  }
  addCreds() {
    const exception = this.addException.controls.excceptiondata as FormArray;
    exception.push(this.fb.group({
        practice: '',
        location: '',
        form: '',
        to: ''
    }));
}

toValidation(toTime, rowId){
}
formValidation(formTime, rowID){
}
exceptionData() {

  let errorException: boolean = false;
  let errorRecurringexcep: boolean = false;
      for(var k=0; k < this.addException.value.recurringException.length; k++){
        if(this.addException.value.recurringException[k].newTo < this.addException.value.recurringException[k].newForm){
        this.errorMessageLog();
        return;
        errorRecurringexcep = true;
      }
    }

    for(var k=0; k < this.addException.value.excceptiondata.length; k++){
        if(this.addException.value.excceptiondata[k].to < this.addException.value.excceptiondata[k].form){
        this.errorMessageLog();
        return;
        errorException = true;
      }
    }
    if (this.updateException) {
      const format = 'yyyy-MM-dd';
      const myDate = this.exceptionDate.value[0].scheduleDate;
      const locale = 'en-US';
      const formattedDate = formatDate(myDate, format, locale);
      console.log(formattedDate);
      if (this.addException.value.excceptiondata[0].practice !== '' &&
      this.addException.value.excceptiondata[0].location !== '' &&
      this.addException.value.excceptiondata[0].form !== '' &&
      this.addException.value.excceptiondata[0].to !== '') {
      for (let i = 0; i < this.DataForAllLocation.length ; i++) {
        if (this.DataForAllLocation[i].Id === this.selectedIdValueForExcep) {
          this.DataForAllLocation[i].Practice = this.addException.value.excceptiondata[0].practice;
          this.DataForAllLocation[i].Location = this.addException.value.excceptiondata[0].location;
          this.DataForAllLocation[i].StartTime =
          new Date(formattedDate + 'T' + this.addException.value.excceptiondata[0].form);
          this.DataForAllLocation[i].EndTime =
          new Date(formattedDate + 'T' + this.addException.value.excceptiondata[0].to);
          this.DataForAllLocation[i].From = this.addException.value.excceptiondata[0].form;
          this.DataForAllLocation[i].To = this.addException.value.excceptiondata[0].to;
        }
      }
      this.eventSettings = {
        dataSource: <Object[]>extend([], this.DataForAllLocation, null, true),
        fields: {
         subject: { title: 'Practice' , name: 'Practice' },
         description: { title: 'Description', name: 'Subject' },
         startTime: { title: 'From', name: 'StartTime' },
         endTime: { title: 'To', name: 'EndTime' },
         location : { title : 'Location' , name : 'Location'}
       }
      };
        setTimeout(() => {
            this.messageService.add({severity: 'success', summary: 'Message', detail: 'Updated Successfully.'});
        }, 1000);
        this.manageException = false;
        this.addException.reset();
    } else {
      setTimeout(() => {
        this.messageService.add({severity: 'error', summary: 'error', detail: 'Please select all of the new fields.'});
    }, 1000);
    }
    } else {
      console.log(this.ListOfData);
      const reqForMon = {
        Id : this.IdForPartSchedule++,
        Subject : 'Burning Man',
        StartTime : new Date('2020-02-19T08:30'),
        EndTime : new Date('2020-02-19T12:00'),
        StartTimezone: 'Asia/Kolkata',
        EndTimezone: 'Asia/Kolkata',
        Location : '54 DEAN',
        CategoryColor : '#E6E692',
        Providers : 'Kyriakides Christopher',
        Practice : 'HEMA',
        AppointMentType: 'Initial Evaluation',
        Speciality: 'OB / GYN',
        IsBlock : false,
        From: '08:30',
        To: '12:00',
        From_Date: '2020-02-19',
        To_Date: '2020-02-19',
        ProjectId: 1,
        ProviderId: 1,
        LocationId: 1,
        };
        this.ListOfData.push(reqForMon);
        this.eventSettings = {
          dataSource : this.ListOfData,
          fields: {
            subject: { title: 'Practice' , name: 'Practice' },
            description: { title: 'Description', name: 'Subject' },
            startTime: { title: 'From', name: 'StartTime' },
            endTime: { title: 'To', name: 'EndTime' },
            location : { title : 'Location' , name : 'Location'}
          }
        };

    }



}

errorMessageLog(){
    this.messageService.add({
      severity: 'error',
      summary: 'Mandatory Fields',
      detail: 'End Time should be greater that Start Time'
  });
}
formData() {
  if (this.updateRecurringData) {
    for (let i = 0 ; i < this.DataForAllLocation.length ; i++ ) {
      if (this.DataForAllLocation[i].Id === this.selectedIdForRecurring) {
        this.DataForAllLocation[i].Practice = this.form.value.monday[0].practice;
        this.DataForAllLocation[i].Location = this.form.value.monday[0].location;
        this.DataForAllLocation[i].From = this.form.value.monday[0].form;
        this.DataForAllLocation[i].To = this.form.value.monday[0].to;
        console.log(this.DataForAllLocation[i].Practice);
      }

    }
    this.eventSettings = {
      dataSource : this.DataForAllLocation,
      fields: {
        subject: { title: 'Practice' , name: 'Practice' },
        description: { title: 'Description', name: 'Subject' },
        startTime: { title: 'From', name: 'StartTime' },
        endTime: { title: 'To', name: 'EndTime' },
        location : { title : 'Location' , name : 'Location'}
      }
    };
  } else {
  this.AddRecurringSchedules = [];
  console.log(this.form.value);
  // tslint:disable-next-line: forin
  for (let i in this.form.controls) {
    console.log(this.form.controls[i].value.length);
    console.log(this.form.controls[i].value);
    if (this.form.controls[i].value.length !== 0) {
      var getLocationBySearch ;
      for (let j = 0 ; j < this.form.controls[i].value.length ; j++) {
        this.onAddNewschedules = true;
        getLocationBySearch = _.filter(this.locationData , (s)=>{
          return s.Name === this.form.controls[i].value[j].location;
        });
        console.log(getLocationBySearch);
        this.filteredLocId = [];
        this.filteredLocId.push(getLocationBySearch[0]);
      const latest_date = this.datePipe.transform(this.today, 'yyyy-MM-dd');
      const currentYearForAdd = this.today.getFullYear();
      const currentMonthForAdd = this.today.getMonth();
      const currentDayForAdd = this.today.getDate();
      if (i === 'monday') {
        var calculatedDate = currentDayForAdd-7;
        console.log(calculatedDate);
      }else if(i === 'tuesday') {
        calculatedDate = currentDayForAdd-6;
        console.log(calculatedDate);
      }else if( i === 'wednesday'){
        calculatedDate = currentDayForAdd-5;
        console.log(calculatedDate);
      }else if( i === 'thursday'){
        calculatedDate = currentDayForAdd-4;
        console.log(calculatedDate);
      }else if(i === 'friday'){
        calculatedDate = currentDayForAdd-3;
        console.log(calculatedDate);
      }
      const modifiedCurrentDate = new Date(currentYearForAdd, currentMonthForAdd, calculatedDate);
      const transformedDate = this.datePipe.transform(modifiedCurrentDate, 'yyyy-MM-dd');
      const selectedStartTime = this.form.controls[i].value[j].form;
      const selectedEndTime = this.form.controls[i].value[j].to;

      const reqForMon = {
        Id : this.IdForPartSchedule++,
        Subject : this.form.controls[i].value[j].practice,
        StartTime : new Date(transformedDate + 'T' + selectedStartTime),
        EndTime : new Date(transformedDate + 'T' + selectedEndTime),
        StartTimezone: 'Asia/Kolkata',
        EndTimezone: 'Asia/Kolkata',
        Location : this.form.controls[i].value[j].location,
        CategoryColor : '#89c2ef',
        Providers : 'Kyriakides Christopher',
        Practice : this.form.controls[i].value[j].practice,
        AppointMentType: 'Initial Evaluation',
        Speciality: 'OB / GYN',
        IsBlock : false,
        From: selectedStartTime,
        To: selectedEndTime,
        From_Date: transformedDate,
        To_Date: transformedDate,
        ProjectId: 1,
        ProviderId: 1,
        LocationId: this.filteredLocId[0].Id,
        };
        this.AddRecurringSchedules.push(reqForMon);
        console.log(this.AddRecurringSchedules);
    }
   }
  }
    for (let i = 0 ; i < this.ListOfData.length ; i++) {
      this.AddRecurringSchedules.push(this.ListOfData[i]);
    }
    console.log(this.AddRecurringSchedules);
    this.eventSettings = {
      dataSource : this.AddRecurringSchedules,
      fields: {
        subject: { title: 'Practice' , name: 'Practice' },
        description: { title: 'Description', name: 'Subject' },
        startTime: { title: 'From', name: 'StartTime' },
        endTime: { title: 'To', name: 'EndTime' },
        location : { title : 'Location' , name : 'Location'}
      }
    };
  }
    let errorSunday: boolean = false;
    let errorMonday: boolean = false;
    let errorTuesday: boolean = false;
    let errorWednesday: boolean = false;
    let errorThrusday: boolean = false;
    let errorFriday: boolean = false;
    let errorSaturday: boolean = false;

    for(var k=0; k < this.form.value.sunday.length; k++){
        if(this.form.value.sunday[k].to < this.form.value.sunday[k].form){
        this.errorMessageLog();
        return;
        errorSunday = true;
      }
    }
    for(var k=0; k < this.form.value.monday.length; k++){
      if(this.form.value.monday[k].to < this.form.value.monday[k].form){
        this.errorMessageLog();
      return;
      errorMonday = true;
    }
  }
  for(var k=0; k < this.form.value.tuesday.length; k++){
    if(this.form.value.tuesday[k].to < this.form.value.tuesday[k].form){
      this.errorMessageLog();
      return;
      errorTuesday = true;
  }
}
for(var k=0; k < this.form.value.wednesday.length; k++){
    if(this.form.value.wednesday[k].to < this.form.value.wednesday[k].form){
    this.errorMessageLog();
    return;
    errorTuesday = true;
  }
}
for(var k=0; k < this.form.value.thursday.length; k++){
      if(this.form.value.thursday[k].to < this.form.value.thursday[k].form){
        this.errorMessageLog();
      return;
      errorTuesday = true;
    }
}
for(var k=0; k < this.form.value.friday.length; k++){
  if(this.form.value.friday[k].to < this.form.value.friday[k].form){
    this.errorMessageLog();
      return;
      errorTuesday = true;
    }
}

for(var k=0; k < this.form.value.saturday.length; k++){
  if(this.form.value.saturday[k].to < this.form.value.saturday[k].form){
    this.errorMessageLog();
      return;
      errorTuesday = true;
    }
}



    this.manageRecurring = false;
}
  allForms(){
    const sundayArray = this.form.controls.sunday as FormArray;
    sundayArray.push(this.fb.group({
        practice: '',
        location: '',
        form: '',
        to: ''
    }));
  }
  onDeleteException(selectedId){
    const form = this.addException.get('excceptiondata') as FormArray
    form.removeAt(selectedId);
  }
  onDeleteSelectTimeClicked(selectedId, dayName){
    if(dayName == 'sunday'){
      const form = this.form.get('sunday') as FormArray
      form.removeAt(selectedId);
    } else if(dayName == 'monday'){
      const form = this.form.get('monday') as FormArray
      form.removeAt(selectedId);
    } else if(dayName == 'tuesday'){
      const form = this.form.get('tuesday') as FormArray
      form.removeAt(selectedId);
    } else if(dayName == 'wednesday'){
      const form = this.form.get('wednesday') as FormArray
      form.removeAt(selectedId);
    } else if(dayName == 'thursday'){
      const form = this.form.get('thursday') as FormArray
      form.removeAt(selectedId);
    } else if(dayName == 'friday'){
      const form = this.form.get('friday') as FormArray
      form.removeAt(selectedId);
    } else if(dayName == 'saturday'){
      const form = this.form.get('saturday') as FormArray
      form.removeAt(selectedId);
    }

  }
  onAddMore(dayName) {
    if(dayName == 'sunday'){
    const sundayArray = this.form.controls.sunday as FormArray;
    sundayArray.push(this.fb.group({
      practice: '',
      location: '',
      form: '',
      to: ''
    }));
  } else if(dayName == 'monday'){
    const mondayArray = this.form.controls.monday as FormArray;
    mondayArray.push(this.fb.group({
      practice: '',
      location: '',
      form: '',
      to: ''
    }));
  } else if(dayName == 'tuesday'){
    const tuesdayArray = this.form.controls.tuesday as FormArray;
    tuesdayArray.push(this.fb.group({
      practice: '',
      location: '',
      form: '',
      to: ''
    }));
  } else if(dayName == 'wednesday'){
    const wednesdayArray = this.form.controls.wednesday as FormArray;
      wednesdayArray.push(this.fb.group({
      practice: '',
      location: '',
      form: '',
      to: ''
    }));
  } else if(dayName == 'thursday'){
    const thursdayArray = this.form.controls.thursday as FormArray;
      thursdayArray.push(this.fb.group({
      practice: '',
      location: '',
      form: '',
      to: ''
    }));
  } else if(dayName == 'friday'){
    const fridayArray = this.form.controls.friday as FormArray;
      fridayArray.push(this.fb.group({
      practice: '',
      location: '',
      form: '',
      to: ''
    }));
  } else if(dayName == 'saturday'){
    const saturdayArray = this.form.controls.saturday as FormArray;
      saturdayArray.push(this.fb.group({
      practice: '',
      location: '',
      form: '',
      to: ''
    }));
  }
  }
  checkClose(){

  }
  toggleVisibility(e){
    this.marked= e.target.checked;
  }
  onAddTime(dayName){
    if (dayName == 'sunday') {
       this.dayNameToAdd = 'sunday';
    this.addTime = true;
    const sundayArray = this.form.controls.sunday as FormArray;
    sundayArray.push(this.fb.group({
        practice: '',
        location: '',
        form: '',
        to: ''
    }));
    } else if (dayName == 'monday') {
       this.dayNameToAdd = 'monday';
    this.addTime = true;
    const mondayArray = this.form.controls.monday as FormArray;
    mondayArray.push(this.fb.group({
        practice: '',
        location: '',
        form: '',
        to: ''
    }));
    } else if (dayName == 'tuesday') {
       this.dayNameToAdd = 'Tuesday';
    this.addTime = true;
    const tuesdayArray = this.form.controls.tuesday as FormArray;
    tuesdayArray.push(this.fb.group({
        practice: '',
        location: '',
        form: '',
        to: ''
    }));
    } else if (dayName == 'wednesday') {
      this.dayNameToAdd = 'Wednesday';
   this.addTime = true;
   const wednesdayArray = this.form.controls.wednesday as FormArray;
   wednesdayArray.push(this.fb.group({
       practice: '',
       location: '',
       form: '',
       to: ''
   }));
    } else if (dayName == 'thursday') {
        this.dayNameToAdd = 'Thursday';
    this.addTime = true;
    const thursdayArray = this.form.controls.thursday as FormArray;
    thursdayArray.push(this.fb.group({
        practice: '',
        location: '',
        form: '',
        to: ''
    }));
    }  else if (dayName == 'friday') {
      this.dayNameToAdd = 'Friday';
      this.addTime = true;
      const fridayArray = this.form.controls.friday as FormArray;
      fridayArray.push(this.fb.group({
          practice: '',
          location: '',
          form: '',
          to: ''
      }));
      } else if (dayName == 'saturday') {
        this.dayNameToAdd = 'Saturday';
        this.addTime = true;
        const saturdayArray = this.form.controls.saturday as FormArray;
            saturdayArray.push(this.fb.group({
            practice: '',
            location: '',
            form: '',
            to: ''
        }));
        }
  }
  AddAllDayControlsOfWeek() {
    this.mondayArray.removeAt(0);
    this.tuesdayArray.removeAt(0);
    this.wednesdayArray.removeAt(0);
    this.thursdayArray.removeAt(0);
    const mondayArray = this.form.controls.monday as FormArray;
    mondayArray.push(this.fb.group({
        practice: '',
        location: '',
        form: '',
        to: ''
    }));
    const tuesdayArray = this.form.controls.tuesday as FormArray;
    tuesdayArray.push(this.fb.group({
        practice: '',
        location: '',
        form: '',
        to: ''
    }));
    const wednesdayArray = this.form.controls.wednesday as FormArray;
    wednesdayArray.push(this.fb.group({
        practice: '',
        location: '',
        form: '',
        to: ''
    }));
    const thursdayArray = this.form.controls.thursday as FormArray;
    thursdayArray.push(this.fb.group({
        practice: '',
        location: '',
        form: '',
        to: ''
    }));
  }
  closeManageRecurringTime(){
    this.addTime = false;
    if(this.dayNameToAdd == 'sunday'){

    }
  }
  addFormData(){
  let errorSunday: boolean = false;
  let errorMonday: boolean = false;
  let errorTuesday: boolean = false;
  let errorWednesday: boolean = false;
  let errorThrusday: boolean = false;
  let errorFriday: boolean = false;
  let errorSaturday: boolean = false;
  if(this.dayNameToAdd == 'sunday'){
  for(var i=0; i < this.form.value.sunday.length; i++){
    if(this.form.value.sunday[i].to < this.form.value.sunday[i].form){
        this.messageService.add({
          severity: 'error',
          summary: 'Mandatory Fields',
          detail: 'End Time should be greater that Start Time'
      });
      return;
      errorSunday = true;
    }
   }
  } else if(this.dayNameToAdd == 'monday'){
    for(var i=0; i < this.form.value.monday.length; i++){
      if(this.form.value.monday[i].to < this.form.value.monday[i].form){
            this.messageService.add({
              severity: 'error',
              summary: 'Mandatory Fields',
              detail: 'End Time should be greater that Start Time'
          });
        return;
        errorMonday = true;
      }
      }
    } else if(this.dayNameToAdd == 'Tuesday'){
      for(var i=0; i < this.form.value.tuesday.length; i++){
        if(this.form.value.tuesday[i].to < this.form.value.tuesday[i].form){
          this.messageService.add({
            severity: 'error',
            summary: 'Mandatory Fields',
            detail: 'End Time should be greater that Start Time'
            });
          return;
          errorTuesday = true;
        }
      }
    } else if(this.dayNameToAdd == 'Wednesday'){
      for(var i=0; i < this.form.value.wednesday.length; i++){
        if(this.form.value.wednesday[i].to < this.form.value.wednesday[i].form){
          this.messageService.add({
            severity: 'error',
            summary: 'Mandatory Fields',
            detail: 'End Time should be greater that Start Time'
            });
          return;
          errorWednesday = true;
        }
      }
    } else if(this.dayNameToAdd == 'Thursday'){
      for(var i=0; i < this.form.value.thursday.length; i++){
        if(this.form.value.thursday[i].to < this.form.value.thursday[i].form){
          this.messageService.add({
            severity: 'error',
            summary: 'Mandatory Fields',
            detail: 'End Time should be greater that Start Time'
            });
          return;
          errorThrusday = true;
        }
      }
    } else if(this.dayNameToAdd == 'Friday'){
      for(var i=0; i < this.form.value.friday.length; i++){
        if(this.form.value.friday[i].to < this.form.value.friday[i].form){
          this.messageService.add({
            severity: 'error',
            summary: 'Mandatory Fields',
            detail: 'End Time should be greater that Start Time'
            });
          return;
          errorFriday = true;
        }
      }
    } else if(this.dayNameToAdd == 'Saturday'){
      for(var i=0; i < this.form.value.saturday.length; i++){
        if(this.form.value.saturday[i].to < this.form.value.saturday[i].form){
          this.messageService.add({
            severity: 'error',
            summary: 'Mandatory Fields',
            detail: 'End Time should be greater that Start Time'
            });
          return;
          errorSaturday = true;
        }
      }
    }

    if(this.dayNameToAdd == 'sunday'){
        if(errorSunday === false){
          this.form.patchValue(this.form.value);
          this.addTime = false;
        }
    } else if(this.dayNameToAdd == 'monday'){
      if(errorMonday === false){
        this.form.patchValue(this.form.value);
        this.addTime = false;
      }
    } else if(this.dayNameToAdd == 'Tuesday'){
      if(errorMonday === false){
        this.form.patchValue(this.form.value);
        this.addTime = false;
      }
    } else if(this.dayNameToAdd == 'Wednesday'){
      if(errorMonday === false){
        this.form.patchValue(this.form.value);
        this.addTime = false;
      }
    } else if(this.dayNameToAdd == 'Thursday'){
      if(errorMonday === false){
        this.form.patchValue(this.form.value);
        this.addTime = false;
      }
    } else if(this.dayNameToAdd == 'Friday'){
      if(errorMonday === false){
        this.form.patchValue(this.form.value);
        this.addTime = false;
      }
    } else if(this.dayNameToAdd == 'Saturday'){
      if(errorMonday === false){
        this.form.patchValue(this.form.value);
        this.addTime = false;
      }
    }
  }
  ngOnInit() {
    const scheduleDataProvider = {
      PatientId:  1,
      Text:  'Kyriakides Christopher'
    };
    this.projectResourceDataSource.push(scheduleDataProvider);
  console.log(this.projectResourceDataSource);
   const locaData = {
    PatientId: 1,
     Data: '54 DEAN'
   };
   this.locationResourceDataSource.push(locaData);
    const locationSecondData = {
      PatientId: 2,
      Data: '38 Astoria'
   };
    this.locationResourceDataSource.push(locationSecondData);
    this.getAllCalenderDetails();
    this.ManageRecurring = this.fb.group({
      practice_name : new FormControl(null),
      location_name : new FormControl(null),
      from_Time : new FormControl(null),
      to_Time : new FormControl(null)
    });
    const recExcep = this.addException.controls.recurringException as FormArray;
    recExcep.push(this.fb.group({
        newPractice: '',
        newLocation: '',
        newForm: '',
        newTo: ''
    }));

    const exception = this.addException.controls.excceptiondata as FormArray;
    exception.push(this.fb.group({
        practice: '',
        location: '',
        form: '',
        to: ''
    }));

    const exceptionDate = this.addException.controls.exceptionDate as FormArray;
    exceptionDate.push(this.fb.group({
        scheduleDate: '',
        scheduleDay: '',
        scheduledayCounts: ''
    }));
  }
  checkSunday(dayName) {
    let data = this.form.get('sunday') as FormArray;
    if (data.length <= 0) {
      return true;
    } else {
      return null;
    }
  }
  checkMonday(dayName) {
    let data = this.form.get('monday') as FormArray;
    if (data.length <= 0) {
      return true;
    } else {
      return null;
    }
  }
  checkTuesday(dayName) {
    let data = this.form.get('tuesday') as FormArray;
    if (data.length <= 0) {
      return true;
    } else {
      return null;
    }
  }
  checkWednesday(dayName) {
    let data = this.form.get('wednesday') as FormArray;
    if (data.length <= 0) {
      return true;
    } else {
      return null;
    }
  }
  checkThursday(dayName) {
    let data = this.form.get('thursday') as FormArray;
    if (data.length <= 0) {
      return true;
    } else {
      return null;
    }
  }
  checkFriday(dayName) {
    let data = this.form.get('friday') as FormArray;
    if (data.length <= 0) {
      return true;
    } else {
      return null;
    }
  }
  checkSaturday(dayName) {
    let data = this.form.get('saturday') as FormArray;
    if (data.length <= 0) {
      return true;
    } else {
      return null;
    }
  }
  onOpenCalendar(selectedDate){

  }
  checkStatus(checkSelect){
    this.checkboxEnabled = checkSelect;
  }
    onContextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
      console.log(args);
      const newEventElement: HTMLElement = document.querySelector(
        '.e-new-event'
      ) as HTMLElement;
      if (newEventElement) {
        remove(newEventElement);
        removeClass(
          [document.querySelector('.e-selected-cell')],
          'e-selected-cell'
        );
      }
      const targetElement: HTMLElement = <HTMLElement>args.event.target;
      if (closest(targetElement, '.e-contextmenu')) {
        return;
      }
      this.selectedTarget = closest(
        targetElement,
        '.e-appointment,.e-work-cells,' +
          '.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells'
      );
      console.log(this.selectedTarget);
      if (isNullOrUndefined(this.selectedTarget)) {
        args.cancel = true;
        return;
      }
      if (this.selectedTarget.classList.contains('e-appointment')) {
        const eventObj: { [key: string]: Object } = <{ [key: string]: Object }>(
          this.scheduleObj.getEventDetails(this.selectedTarget)
        );
        console.log('selected event object:', eventObj);
        if (eventObj.RecurrenceRule) {
          this.menuObj.showItems(
            ['EditRecurrenceEvent', 'DeleteRecurrenceEvent'],
            true
          );
          this.menuObj.hideItems(
            ['Add', 'AddRecurrence', 'Today', 'Save', 'Delete'],
            true
          );
        } else {
          this.menuObj.showItems(['Save', 'Delete'], true);
          this.menuObj.hideItems(
            [
              'Add',
              'AddRecurrence',
              'Today',
              'EditRecurrenceEvent',
              'DeleteRecurrenceEvent'
            ],
            true
          );
        }
        return;
      }
      this.menuObj.hideItems(
        ['Save', 'Delete', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'],
        true
      );
      this.menuObj.showItems(['Add', 'AddRecurrence', 'Today'], true);
    }
    onMenuItemSelect(args: MenuEventArgs): void {
      const selectedMenuItem: string = args.item.id;
      console.log('selected menu items::', selectedMenuItem);
      let eventObj: { [key: string]: Object };
      if (
        this.selectedTarget &&
        this.selectedTarget.classList.contains('e-appointment')
      ) {
        eventObj = <{ [key: string]: Object }>(
          this.scheduleObj.getEventDetails(this.selectedTarget)
        );
      }
      switch (selectedMenuItem) {
          case 'Today':
              this.scheduleObj.selectedDate = new Date();
              break;
          case 'Add':
          case 'AddRecurrence':
              const selectedCells: Element[] = this.scheduleObj.getSelectedElements();
              const activeCellsData: CellClickEventArgs = this.scheduleObj.getCellDetails(selectedCells.length > 0 ? selectedCells : this.selectedTarget);
              if (selectedMenuItem === 'Add') {
                  this.scheduleObj.openEditor(activeCellsData, 'Add');
              } else {
                  this.scheduleObj.openEditor(activeCellsData, 'Add', null, 1);
              }
              break;
          case 'Save':
              this.openEditPopup();
              break;
          case 'EditRecurrenceEvent':
              this.openEditForRecurring();
              break;
          case 'Delete':
            this.confirmationService.confirm({
              message: 'Do you want to delete this record?',
              header: 'Delete Confirmation',
              icon: 'pi pi-info-circle',
              accept: () => {
                  this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
                  this.scheduleObj.deleteEvent(eventObj);
              },
              reject: () => {
                  this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
              }
          });
              break;
                case 'DeleteRecurrenceEvent':
                  this.confirmationService.confirm({
                    message: 'Do you want to delete this record?',
                    header: 'Delete Confirmation',
                    icon: 'pi pi-info-circle',
                    accept: () => {
                        this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
                        this.scheduleObj.deleteEvent(eventObj);
                    },
                    reject: () => {
                        this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
                    }
                });
              break;
          case 'Block':
            this.datatoblock = this.ListOfData;
            console.log(this.datatoblock[0].IsBlock);
            this.datatoblock[0].IsBlock=true;
            console.log(this.datatoblock[0].IsBlock);
              break;
      }
  }
  openEditForRecurring() {
    var splitStringForRec;
    var selectedValueForRec = $(this.selectedTarget).attr('data-id');
    if (! _.isEmpty(selectedValueForRec)) {
      this.manageRecurring = true;
      this.updateRecurringData = true;
      var  getEditRecordForRec = [];
      splitStringForRec = selectedValueForRec.split('_');
      getEditRecordForRec = _.filter(this.DataForAllLocation, (p) => {
        return (p.Id == splitStringForRec[1]);
      });
      this.selectedIdForRecurring = getEditRecordForRec[0].Id;
      console.log(getEditRecordForRec);
      this.AddAllDayControlsOfWeek();
      this.mondayArray.patchValue([
        {
          practice : getEditRecordForRec[0].Practice,
          location : getEditRecordForRec[0].Location,
          form : getEditRecordForRec[0].From,
          to : getEditRecordForRec[0].To
        }
      ]);
      this.tuesdayArray.patchValue([
        {
          practice : getEditRecordForRec[0].Practice,
          location : getEditRecordForRec[0].Location,
          form : getEditRecordForRec[0].From,
          to : getEditRecordForRec[0].To
        }
      ]);
      this.wednesdayArray.patchValue([
        {
          practice : getEditRecordForRec[0].Practice,
          location : getEditRecordForRec[0].Location,
          form : getEditRecordForRec[0].From,
          to : getEditRecordForRec[0].To
        }
      ]);
      this.thursdayArray.patchValue([
        {
          practice : getEditRecordForRec[0].Practice,
          location : getEditRecordForRec[0].Location,
          form : getEditRecordForRec[0].From,
          to : getEditRecordForRec[0].To
        }
      ]);
    }
  }
  openEditPopup() {
    console.log(new Date('2019-06-11'));
    var splitString;
    var splitStyleString;
    var selctedValue = $(this.selectedTarget).attr('data-id');
    var selectedStyleData = $(this.selectedTarget).attr('style');
    if (!_.isEmpty(selectedStyleData)) {
      splitStyleString = selectedStyleData.split('; ');
    }
    if (splitStyleString[4] === 'background-color: rgb(230, 230, 146);') {
      var getEditRecordFroException = [];
      splitString = selctedValue.split('_');
      getEditRecordFroException = _.filter(this.DataForAllLocation, (p) => {
        return (p.Id == splitString[1]);
      });
      this.selectedIdValueForExcep = getEditRecordFroException[0].Id;
      this.manageException = true;
      this.updateException = true;
      this.addException.patchValue({
        monthDate : getEditRecordFroException[0].StartTime
      });
      this.exceptionDate.patchValue([
        {
          scheduleDate:  getEditRecordFroException[0].StartTime,
          scheduleDay: 'Continous work days',
          scheduledayCounts: '3 Days'
        }
      ]);
      this.recurringException.patchValue([
        {
          newPractice :  getEditRecordFroException[0].Practice,
          newLocation :  getEditRecordFroException[0].Location,
          newForm :  getEditRecordFroException[0].From,
          newTo :  getEditRecordFroException[0].To
        }
      ]);
    } else {
  if (! _.isEmpty(selctedValue)) {
      this.displayEditPopup = true;
      var  getEditRecord = [];
      splitString = selctedValue.split('_');
       getEditRecord = _.filter(this.ListOfData, (p) => {
        return (p.Id == splitString[1]);
      });
      if (this.onFilterForAllLoc) {
        getEditRecord = _.filter(this.allLocationData, (p) => {
          return (p.Id == splitString[1]);
        });
      } else if (this.onFilterForPartLoc) {
        getEditRecord = _.filter(this.getAllFilteredData, (p) => {
          return (p.Id == splitString[1]);
        });
      } else if(this.onAddNewschedules){
        getEditRecord = _.filter(this.AddRecurringSchedules, (p) => {
          return (p.Id == splitString[1]);
        });
      }
      console.log( getEditRecord);
      this.dataFromWorkcal = getEditRecord;
      console.log('pass data to child' , this.dataFromWorkcal);
      this.onlyOnSelectSchedule = true;
      this.selectedIdValue =  getEditRecord[0].Id;
      console.log(this.selectedIdValue);
      this.ManageRecurring.patchValue({
        practice_name :  getEditRecord[0].Practice,
        location_name :  getEditRecord[0].Location,
        from_Time :  getEditRecord[0].From,
        to_Time :  getEditRecord[0].To
      });
    }
    }
  }
  closeEditPopup(){
    this.displayEditPopup = false;
    this.ManageRecurring.reset();
  }
  ShowMoreFilters() {
    if(this.displaymorefilters===false){
      this.displaymorefilters = true;
    }else{
      this.displaymorefilters= false;
    }
  }
  getAllCalenderDetails() {
    this._data.getProviderDataForWorkCalender().subscribe(
      (data: Provider[] )=>{
        this.providerArr = data;
        console.log('provider data', this.providerArr);
      }
    );
    this._data.getLocationDataForGrouping().subscribe(
      (data: Location[] ) => {
        this.locationData = data;
        this.formatedLocData = this.masterService.formatDataforDropdown(
          'Name',
          data,
          'Select',
          'Name'
        );
        console.log('location data', this.locationData);
      }
    );
    this._data.getspecialitydetails().subscribe(
      (data: Speciality[]) => {
        this.specialityData = data;
        console.log('speciality data', this.specialityData);
      });
      this._data.getPracticeData().subscribe(
        (data: Practice[]) => {
          this.practiceData = data;
          this.formatedPracData = this.masterService.formatDataforDropdown(
            'Practice',
            data,
            'Select',
            'Practice'
          );
          console.log('get practice data', this.practiceData);
        }
      );
      this._data.getkanbanDatafiles().subscribe(
        (data: AppointmentDetails[]) => {
          this.appointmentTypeData = data;
          console.log('get all appoi' , this.appointmentTypeData);
        }
      );
      this._data.getTimeList().subscribe(
        (data: any) => {
          this.timeList = this.masterService.formatDataforDropdown(
            'label',
            data,
            'Select',
            'value'
          );
          console.log('get time data', this.timeList);
        }
      );
    this._data.getWorkCalenderData().subscribe(
      (data: WorkCalender[])=>{
        this.ListOfData=data;
        this.DataForAllLocation = data;
        for(let i=0;i<  this.ListOfData.length;i++){
          this.ListOfData[i].StartTime = new Date(this.ListOfData[i].StartTime);
          this.ListOfData[i].EndTime = new Date(this.ListOfData[i].EndTime);
        }
          this.ListOfData = _.filter(this.ListOfData, (l) => {
            return l.Providers === 'Kyriakides Christopher' || l.Providers === 'Dr Coba Miguel' || l.Providers === 'Dr Cabatu Orsuville';
           });
           console.log('getDataa:', this.ListOfData);
            console.log(this.locationResourceDataSource);
            this.eventSettings = {
              dataSource : this.ListOfData,
              fields: {
               subject: {title: 'Practice' , name: 'Practice' },
               description: {title: 'Description', name: 'Subject' },
               startTime: { title: 'From', name: 'StartTime' },
               endTime: { title: 'To', name: 'EndTime' },
               location : { title : 'Location' , name : 'Location'}
             }
            };
            console.log(this.eventSettings);
      }
    );
  }
  getProviderName(value: ResourceDetails | TreeViewArgs): string {
    return ((value as ResourceDetails).resourceData) ?
        (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string
        : (value as TreeViewArgs).resourceName;
  }
  filterBasedValue(item: any , value: string) {
    console.log(item);
    if (value === 'location') {
      this.selectedLocation = item.value;
      console.log(this.selectedLocation);
    } else if (value === 'providers') {
      this.selectedProvider = item.value;
      console.log(this.selectedProvider);
    } else if (value === 'practices') {
      this.selectedPractice = item.value;
      console.log(this.selectedPractice);
    } else if (value === 'speciality') {
      this.selectedSpeciality = item.value;
      console.log(this.selectedSpeciality);
    } else {
      this.selectedAppmnt = item.value;
      console.log(this.selectedAppmnt);
    }
  }
  public onEventRendered(args: EventRenderedArgs): void {
    let categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.scheduleObj.currentView === 'Agenda') {
      (args.element
        .firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }
  OnSelctedFilter() {
    if(this.selectedProvider === null || this.selectedLocation === null){
          setTimeout(() => {
             this.messageService.add({severity: 'error', summary: 'Mandatory Fields', detail: 'Please select both Location and Provider to filter'});
           }, 500);
    }
    else if(this.selectedLocation[0] === 'All Locations' && this.selectedProvider !== null) {
      this.onFilterForAllLoc = true;
      this.projectResourceDataSource = [];
      this.locationResourceDataSource = [];
      this.allLocationData = _.filter(this.DataForAllLocation,(d)=>{
        return d.Providers === this.selectedProvider ;
      });
      console.log(this.allLocationData);
      for(let i=0 ; i< this.locationData.length;i++){
        const locaData = {
          PatientId: this.locationData[i].PatientId,
          Data: this.locationData[i].Name
        };
        this.locationResourceDataSource.push(locaData);
      }
      this.providerSelectedForAllLoc = _.filter(this.providerArr , (p)=>{
        return p.ProviderName === this.selectedProvider
      });
      const scheduleDataForProvider = {
        PatientId:  this.providerSelectedForAllLoc[0].PatientId,
        Text:  this.selectedProvider
      };
      this.projectResourceDataSource.push(scheduleDataForProvider);
      this.eventSettings = {
        dataSource : this.allLocationData,
        fields: {
         subject: {title: 'Practice' , name: 'Practice' },
         description: {title: 'Description', name: 'Subject' },
         startTime: { title: 'From', name: 'StartTime' },
         endTime: { title: 'To', name: 'EndTime' },
         location : { title : 'Location' , name : 'Location'}
       }
      };
    }
    else {
      this.projectResourceDataSource = [];
      this.locationResourceDataSource = [];
      this.seldatalist = [];
      this.ListofDataAfterFilter = [];
      this.getAllFilteredData = [];
      for(let i = 0; i < this.selectedLocation.length ; i++) {
        this.ListOfAppmnt = _.filter(this.DataForAllLocation, (l) => {
          return l.Location === this.selectedLocation[i] && l.Providers === this.selectedProvider
         });
         console.log('filtered data', this.ListOfAppmnt);
         this.ListofDataAfterFilter.push(this.ListOfAppmnt);
         console.log('pushed data', this.ListofDataAfterFilter);
         this.locationSelected = _.filter(this.locationData,(s)=>{
          return s.Name === this.selectedLocation[i]
         });
         console.log('selected filtered data', this.locationSelected);
         this.seldatalist.push(this.locationSelected[0].PatientId);
         console.log(this.seldatalist);
          const locaData = {
            PatientId: this.seldatalist[i],
            Data: this.selectedLocation[i]
          };
          this.locationResourceDataSource.push(locaData);
          console.log(this.locationResourceDataSource);
     }
     console.log(this.ListOfAppmnt);
     this.providerSelected = _.filter(this.providerArr , (p)=>{
       return p.ProviderName === this.selectedProvider
     });
     console.log(this.providerSelected);
     const scheduleData = {
             PatientId:  this.providerSelected[0].PatientId,
             Text:  this.selectedProvider
           };
       this.projectResourceDataSource.push(scheduleData);
       console.log(this.projectResourceDataSource);
       for(let i = 0 ; i < this.ListofDataAfterFilter.length; i++) {
         for(let j = 0 ; j < this.ListofDataAfterFilter[i].length ; j++) {
          var formattedData = {
            Id: this.ListofDataAfterFilter[i][j].Id,
            Subject: this.ListofDataAfterFilter[i][j].Subject,
            StartTime: this.ListofDataAfterFilter[i][j].StartTime,
            EndTime: this.ListofDataAfterFilter[i][j].EndTime,
            StartTimezone: this.ListofDataAfterFilter[i][j].StartTimezone,
            EndTimezone: this.ListofDataAfterFilter[i][j].EndTimezone,
            Location: this.ListofDataAfterFilter[i][j].Location,
            CategoryColor: this.ListofDataAfterFilter[i][j].CategoryColor,
            Providers: this.ListofDataAfterFilter[i][j].Providers,
            Practice: this.ListofDataAfterFilter[i][j].Practice,
            AppointMentType: this.ListofDataAfterFilter[i][j].AppointMentType,
            Speciality: this.ListofDataAfterFilter[i][j].Speciality,
            IsBlock: this.ListofDataAfterFilter[i][j].IsBlock,
            From: this.ListofDataAfterFilter[i][j].From,
            To: this.ListofDataAfterFilter[i][j].To,
            From_Date: this.ListofDataAfterFilter[i][j].From_Date,
            To_Date: this.ListofDataAfterFilter[i][j].To_Date,
            ProjectId: this.ListofDataAfterFilter[i][j].ProjectId,
            LocationId: this.ListofDataAfterFilter[i][j].LocationId,
            ProviderId: this.ListofDataAfterFilter[i][j].ProviderId
           }
           console.log(formattedData);
           this.getAllFilteredData.push(formattedData);
           console.log(this.getAllFilteredData);
           this.eventSettings = {
            dataSource : this.getAllFilteredData,
            fields: {
             subject: {title: 'Practice' , name: 'Practice' },
             description: {title: 'Description', name: 'Subject' },
             startTime: { title: 'From', name: 'StartTime' },
             endTime: { title: 'To', name: 'EndTime' },
             location : { title : 'Location' , name : 'Location'}
           }
          };
         }
       }
    }
    }
    getModifiedData(value) {
      console.log(value);
      if ( value === false) {
        this.displayEditPopup = value;
      } else {
        this.saveManageRecurringChanges();
      }
    }

    saveManageRecurringChanges() {
      this.onchangeLoc = _.filter(this.locationData , (s) => {
        return s.Name === this.ManageRecurring.value.location_name;
      });
    console.log(this.onchangeLoc);
      if(this.onAddNewschedules) {
        for(let i=0 ;i < this.AddRecurringSchedules.length ; i++){
          if(this.AddRecurringSchedules[i].Id === this.selectedIdValue){
            this.AddRecurringSchedules[i].Practice = this.ManageRecurring.value.practice_name;
            this.AddRecurringSchedules[i].Location = this.ManageRecurring.value.location_name;
            this.AddRecurringSchedules[i].LocationId = this.onchangeLoc[0].Id;
            this.AddRecurringSchedules[i].StartTime = new Date(this.AddRecurringSchedules[i].From_Date + 'T' + this.ManageRecurring.value.from_Time);
            this.AddRecurringSchedules[i].EndTime = new Date(this.AddRecurringSchedules[i].To_Date + 'T' + this.ManageRecurring.value.to_Time);
            this.AddRecurringSchedules[i].From = this.ManageRecurring.value.from_Time;
            this.AddRecurringSchedules[i].To = this.ManageRecurring.value.to_Time;
            this.onFilterForPartLoc = true;
          }
        }
        this.eventSettings = {
          dataSource: <Object[]>extend([], this.AddRecurringSchedules, null, true),
          fields: {
           subject: { title: 'Practice' , name: 'Practice' },
           description: { title: 'Description', name: 'Subject' },
           startTime: { title: 'From', name: 'StartTime' },
           endTime: { title: 'To', name: 'EndTime' },
           location : { title : 'Location' , name : 'Location'}
         }
        };
      }else if(this.selectedLocation === null){
          console.log(this.ManageRecurring.value.from_Time);
          for(let i=0 ;i < this.ListOfData.length ; i++){
            if(this.ListOfData[i].Id === this.selectedIdValue){
              this.ListOfData[i].Practice = this.ManageRecurring.value.practice_name;
              this.ListOfData[i].Location = this.ManageRecurring.value.location_name;
              this.ListOfData[i].LocationId = this.onchangeLoc[0].Id;
              this.ListOfData[i].StartTime = new Date(this.ListOfData[i].From_Date + 'T' + this.ManageRecurring.value.from_Time);
              this.ListOfData[i].EndTime = new Date(this.ListOfData[i].To_Date + 'T' + this.ManageRecurring.value.to_Time);
              this.ListOfData[i].From = this.ManageRecurring.value.from_Time;
              this.ListOfData[i].To = this.ManageRecurring.value.to_Time;
              console.log(this.ListOfData[i]);
            }
          }

          this.eventSettings = {
            dataSource: <Object[]>extend([], this.ListOfData, null, true),
            fields: {
             subject: { title: 'Practice' , name: 'Practice' },
             description: { title: 'Description', name: 'Subject' },
             startTime: { title: 'From', name: 'StartTime' },
             endTime: { title: 'To', name: 'EndTime' },
             location : { title : 'Location' , name : 'Location'}
           }
          };
        }else if(this.selectedLocation[0] === 'All Locations'){
          console.log(this.ManageRecurring.value);
          for(let i=0 ;i < this.allLocationData.length ; i++){
            if(this.allLocationData[i].Id === this.selectedIdValue){
              this.allLocationData[i].Practice = this.ManageRecurring.value.practice_name;
              this.allLocationData[i].Location = this.ManageRecurring.value.location_name;
              this.allLocationData[i].LocationId = this.onchangeLoc[0].Id;
              this.allLocationData[i].StartTime = new Date(this.allLocationData[i].From_Date + 'T' + this.ManageRecurring.value.from_Time);
              this.allLocationData[i].EndTime = new Date(this.allLocationData[i].To_Date + 'T' + this.ManageRecurring.value.to_Time);
              this.allLocationData[i].From = this.ManageRecurring.value.from_Time;
              this.allLocationData[i].To = this.ManageRecurring.value.to_Time;
              this.onFilterForAllLoc = true;
            }
          }
          this.eventSettings = {
            dataSource: <Object[]>extend([], this.allLocationData, null, true),
            fields: {
             subject: { title: 'Practice' , name: 'Practice' },
             description: { title: 'Description', name: 'Subject' },
             startTime: { title: 'From', name: 'StartTime' },
             endTime: { title: 'To', name: 'EndTime' },
             location : { title : 'Location' , name : 'Location'}
           }
          };
        }else{
          console.log(this.ManageRecurring.value);
          for(let i=0 ;i < this.getAllFilteredData.length ; i++){
            if(this.getAllFilteredData[i].Id === this.selectedIdValue){
              this.getAllFilteredData[i].Practice = this.ManageRecurring.value.practice_name;
              this.getAllFilteredData[i].Location = this.ManageRecurring.value.location_name;
              this.getAllFilteredData[i].LocationId = this.onchangeLoc[0].Id;
              this.getAllFilteredData[i].StartTime = new Date(this.getAllFilteredData[i].From_Date + 'T' + this.ManageRecurring.value.from_Time);
              this.getAllFilteredData[i].EndTime = new Date(this.getAllFilteredData[i].To_Date + 'T' + this.ManageRecurring.value.to_Time);
              this.getAllFilteredData[i].From = this.ManageRecurring.value.from_Time;
              this.getAllFilteredData[i].To = this.ManageRecurring.value.to_Time;
              this.onFilterForPartLoc = true;
            }
          }
          this.eventSettings = {
            dataSource: <Object[]>extend([], this.getAllFilteredData, null, true),
            fields: {
             subject: { title: 'Practice' , name: 'Practice' },
             description: { title: 'Description', name: 'Subject' },
             startTime: { title: 'From', name: 'StartTime' },
             endTime: { title: 'To', name: 'EndTime' },
             location : { title : 'Location' , name : 'Location'}
           }
          };
        }
      this.displayEditPopup = false;
      setTimeout(() => {
        this.messageService.add({severity: 'success', summary: 'Message', detail: 'Updated Successfully.'});
          }, 1000);
    }
   openManageRecurringPopup() {
     this.manageRecurring = true;
   }
   closeManageRecurring(){
    this.mondayArray.removeAt(0);
    this.tuesdayArray.removeAt(0);
    this.wednesdayArray.removeAt(0);
    this.thursdayArray.removeAt(0);
     this.manageRecurring = false;
   }
   openManageExceptionPopUp(){
     this.manageException = true;
   }
   closeManageException(){
     this.addException.reset();
     this.manageException = false;
   }
   getEmployeeName(value: ResourceDetails | TreeViewArgs): string {
    return ((value as ResourceDetails).resourceData) ?
        (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string
        : (value as TreeViewArgs).resourceName;
  }
  openRecurring() {
    this.displayOnlyRecurring = true;
    this.displayOnlyExceptions = false;
  }
  openException() {
    this.displayOnlyRecurring = false;
    this.displayOnlyExceptions = true;
  }
  closeEditPopupForWC(){
    this.scheduleObj.closeEditor();
  }
  }
