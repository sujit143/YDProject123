import { Component, OnInit } from '@angular/core';
import { SelectItem, Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-sch-appointments',
  templateUrl: './sch-appointments.component.html',
  styleUrls: ['./sch-appointments.component.scss']
})
export class SchAppointmentsComponent implements OnInit {

    Category: SelectItem[];
    speciality: SelectItem[];
    msgs: Message[] = [];

    AdminReq:boolean = false;
    SchAppoint:boolean = true;
    SelectApptProvider:boolean = false;

  constructor(private messageService:MessageService) {
      this.Category = [
        {label: 'Select', value: ''},
        {label: 'MSK', value: '1'}

    ];
    this.speciality = [
        {label: 'Select', value: ''},
        {label: 'OB / GYN', value: '17'},
        {label: 'Anesthesia', value: '13'},
        {label: 'Bariatric Surgery', value: '16'},
        {label: 'Medical Weight Loss Surgery', value: '10'},
        {label: 'Minimally Invasive Spine', value: '11'},
        {label: 'NeuroSurgery', value: '12'},
        {label: 'Orthopaedics', value: '1'},
        {label: 'Orthopedic Spine', value: '21'},
        {label: 'Others', value: '19'},
        {label: 'Pain Management', value: '3'},
        {label: 'Physical Medicine &amp; Rehabilitation', value: '5'},
        {label: 'Physical Therapy', value: '6'},
        {label: 'Podiatry', value: '4'},
        {label: 'Plastic Surgery', value: '18'},
        {label: 'Radiology', value: '20'},
        {label: 'Reconstructive &amp; Plastic Surgery', value: '8'},
        {label: 'Spine Care', value: '2'},
        {label: 'Spine care', value: '24'},
        {label: 'Spine Surgery', value: '14'},
        {label: 'Sports Medicine', value: '22'}
    ];

   }

  ngOnInit() {
  }

  OnadminreqClick(){
    this.AdminReq = true;
    this.SchAppoint = false;
    this.SelectApptProvider = false;
  }

  OnAdminReqPreviousClick(){
    this.AdminReq = false;
    this.SchAppoint = true;
    this.SelectApptProvider = false;
  }

  OnNextClick(){

  }

  AppointmentReasonClick(){
      this.SelectApptProvider = true;
      this.SchAppoint = false;
      this.AdminReq = false;
  }

  OnScheduleApptProvider_PreviousClick(){
    this.SelectApptProvider = false;
    this.SchAppoint = true;
    this.AdminReq = false;
  }

  OnSchApptNext_Click(){
      if(!this.AdminReq && !this.SelectApptProvider)
      {   this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: 'Please Select Appointment Type to Continue' });
    }
      }
  }

