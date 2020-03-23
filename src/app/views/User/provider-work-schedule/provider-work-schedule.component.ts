import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-provider-work-schedule',
  templateUrl: './provider-work-schedule.component.html',
  styleUrls: ['./provider-work-schedule.component.scss']
})
export class ProviderWorkScheduleComponent implements OnInit {
checkboxstatus:boolean = false;
sundaycheckbox:boolean = false;
mondaycheckbox:boolean = false;
tuesdaycheckbox:boolean = false;
weddaycheckbox:boolean = false;
thurdaycheckbox:boolean = false;
fridaycheckbox:boolean = false;
satdaycheckbox:boolean = false;
addNewSchedulePopup:boolean=false;
ProWorkSchedule: FormGroup;
ListOfPractices:any[];
dispDeleteButton:boolean=false;
  constructor(private fb:FormBuilder) {
    this.ListOfPractices = [
      {label: 'HEMA', value: 'HEMA'},
      {label: 'HAMG', value: 'HAMG'},
      {label: 'HEMA', value: 'HEMA'},
      {label: 'HAMG', value: 'HAMG'},
      {label: 'HEMA', value: 'HEMA'},
      {label: 'HEMA', value: 'HEMA'},
      {label: 'HAMG', value: 'HAMG'},
      {label: 'HEMA', value: 'HEMA'},
      {label: 'HAMG', value: 'HAMG'},
      {label: 'HAMG', value: 'HAMG'}
  ];
   }

  ngOnInit() {
    this.ProWorkSchedule=this.fb.group({
      Practice: new FormControl(null),
      Location:new FormControl(null),
      Provider : new FormControl(null),
      FromDate: new FormControl(null),
      ToDate: new FormControl(null),
      SelectTime: new FormArray([])
    });
  }
  openAddNewSchedule(){
    this.addNewSchedulePopup = true;
  }
  closeadd(){
    this.addNewSchedulePopup = false;
  }
  addnewpws(){

  }
  checkStatus($event,value) {
    console.log(value);
    console.log($event);
    if (value === 'Sunday') {
      this.sundaycheckbox = $event;
    }else if ( value === 'Monday') {
      this.mondaycheckbox=$event;
    }
    else if( value === 'Tuesday') {
      this.tuesdaycheckbox=$event;
    }
    else if( value === 'Wednesday') {
      this.weddaycheckbox=$event;
    }
    else if( value === 'Thursday') {
      this.thurdaycheckbox=$event;
    }
    else if( value === 'Friday') {
      this.fridaycheckbox=$event;
    }
    else( value === 'Saturday')
    {
      this.satdaycheckbox=$event;
    }


  }
  getControls() {
    return (<FormArray>this.ProWorkSchedule.get('SelectTime')).controls;
 }
  onAddSelectTime() {
    this.dispDeleteButton=true;
    let control = new FormControl(null, Validators.required);
    (<FormArray>this.ProWorkSchedule.get('SelectTime')).push(control);
  }
  onDeleteSelectTimeClicked(i) {
    (<FormArray>this.ProWorkSchedule.get('SelectTime')).removeAt(i);
  }
}
