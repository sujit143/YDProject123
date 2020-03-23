import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, Message } from 'primeng/primeng';
import { SharedService } from '../../../services/appservices/shared.service';
import * as _ from 'lodash';
import { empty } from 'rxjs';
import { select } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-sch-care-team',
  templateUrl: './sch-care-team.component.html',
  styleUrls: ['./sch-care-team.component.scss']
})
export class SchCareTeamComponent implements OnInit {

  AddGroup:boolean=false;
    addMember = false;
    MemberSeach = false;
    AddMember = false;
    MemberDetail =false;
    ComplExpInfo = false;
    roleSelect = false;
    Searchpractices = false;
    editMember = false;
    QATeam = false;
    ConsultationTeam = false;
    CarwTeam = false;

    consult = true;
    Qa = true;
    carw = true;
    groupnameSelect = false;
    groupmembers = false;
    groupNamelabel = false;
    ShowSearchedCont = false;
    searchResultMember;
    searchResultMemberID;
    RoleSelectTrue =false;
    // StaticArray---------------------------->
    GroupMemData:GroupMembers[];
    addedGroups  = [];
    addedGroupNames:any = [];
SearchMemberContacts:any = [];
AddNewMember:Member[] = [];

    // P-DropDowns---------------------------->
    roles:SelectItem[];
    speciality:SelectItem[];
    StatesDrop: SelectItem[];
    careTeamGroup:SelectItem[];


    // FormControlls----------------------->
    AddNewgroup_Form:FormGroup;
    AddNewMember_Form:FormGroup;
    EditMemberPopup_Form:FormGroup;


    AddNewGroupMem: GroupMembers[] = [
      new GroupMembers(1, 'Adin David', 'Physician', '', ''),
      new GroupMembers(2, 'Capiola David', 'Physician', '', ''),
      new GroupMembers(3, 'Kaplan Charles', 'Physician', '', ''),
      new GroupMembers(4, 'Kyriakides Christopher', 'Physician', '', ''),
      new GroupMembers(5, 'Mourkakos Stacey', 'Physician', '', ''),
      new GroupMembers(6, 'Scilaris Thomas', 'Physician', '', '')

   ];

  constructor(
    private fb:FormBuilder,
    private messageService:MessageService,
    private _data: SharedService
  ) {

    this.roles = [
      {label:'Select',value:'0'},
      {label:'Anesthesiologist',value:'56'},
      {label:'Billing',value:'23'},
      {label:'Care Coordinator',value:'62'},
      {label:'Insurance Carrier',value:'7'},
      {label:'Case Manager',value:'11'},
      {label:'Collection',value:'47'},
      {label:'Coordinator',value:'18'},
      {label:'DME',value:'57'},
      {label:'Front Desk',value:'12'},
      {label:'HR',value:'25'},
      {label:'Legal',value:'48'},
      {label:'Location Case Manager',value:'14'},
      {label:'Medical Assistant',value:'20'},
      {label:'Physician',value:'2'},
      {label:'Physician Assistant',value:'34'},
      {label:'Representative',value:'6'},
      {label:'Staff',value:'4'},
      {label:'Superviser',value:'26'},
      {label:'Surgeon',value:'19'},
      {label:'TPA',value:'10'},
      {label:'Verifier',value:'22'},
  ];

  this.speciality = [
    {label:'Select',value:''},
    {label:' OB / GYN',value:'17'},
    {label:'Anesthesia',value:'13'},
    {label:'Bariatric Surgery',value:'16'},
    {label:'Medical Weight Loss Surgery',value:'10'},
    {label:'Minimally Invasive Spine',value:'11'},
    {label:'NeuroSurgery',value:'12'},
    {label:'Orthopaedics',value:'1'},
    {label:'Orthopedic Spine',value:'21'},
    {label:'Others',value:'19'},
    {label:'Pain Management',value:'3'},
    {label:'Physical Medicine & Rehabilitation',value:'5'},
    {label:'Physical Therapy',value:'6'},
    {label:'Plastic Surgery',value:'18'},
    {label:'Podiatry',value:'4'},
    {label:'Radiology',value:'20'},
    {label:'Reconstructive & Plastic Surgery',value:'8'},
    {label:'Spine Care',value:'2'},
    {label:'Spine care',value:'24'},
    {label:'Spine Surgery',value:'14'},
    {label:'Sports Medicine',value:'22'}

  ];
  this.StatesDrop = [
    {label: 'any', value: ''},
    {label: 'AE', value: 'AE'},
    {label: 'AK', value: 'AK'},
    {label: 'AL', value: 'AL'},
    {label: 'AR', value: 'AR'},
    {label: 'AS', value: 'AS'},
    {label: 'AZ', value: 'AZ'},
    {label: 'CA', value: 'CA'},
    {label: 'CO', value: 'CO'},
    {label: 'CT', value: 'CT'},
    {label: 'DC', value: 'DC'},
    {label: 'DE', value: 'DE'},
    {label: 'FL', value: 'FL'},
    {label: 'FM', value: 'FM'},
    {label: 'GA', value: 'GA'},
    {label: 'GU', value: 'GU'},
    {label: 'HI', value: 'HI'},
    {label: 'IA', value: 'IA'},
    {label: 'ID', value: 'ID'},
    {label: 'IL', value: 'IL'},
    {label: 'IN', value: 'IN'},
    {label: 'KS', value: 'KS'}

  ];

  this.careTeamGroup = [
    {label:'Select',value:''},
    {label:'care teams',value:'13'},
    {label:'carw',value:'11'},
    {label:'Consultation Team',value:'8'},
    {label:'Office Visit',value:'10'},
    {label:'office visits',value:'5'},
    {label:'QA Team',value:'9'},
    {label:'Surgery Team',value:'3'},
    {label:'test team',value:'6'},
    {label:'testdr',value:'12'},
    {label:'Yourdrs',value:'7'}
  ];
   }

  ngOnInit() {
   this.AddNewgroup_Form = this.fb.group({
    careteamSelect : new FormControl(null,Validators.required),
    startdate : new FormControl(null, Validators.required),
    enddate : new FormControl(null)
   });

   this.AddNewMember_Form = this.fb.group({
     id:new FormControl(null),
    roleSelect : new FormControl(null,Validators.required),
    memberSelect : new FormControl(null,Validators.required),
    startDate : new FormControl(null,Validators.required),
    endDate : new FormControl(null,Validators.required),
    specialitySelect : new FormControl(null,Validators.required)
   });

   this.EditMemberPopup_Form = this.fb.group({
     id:new FormControl(null),
     MemberName : new FormControl(null),
    roleNames : new FormControl(null,Validators.required),
    startDate : new FormControl(null,Validators.required),
    endDate : new FormControl(null,Validators.required),
    specialitylist : new FormControl(null,Validators.required),
   });

  }

  openAddGroup(){
      this.AddGroup=true;
  }

  closeAddGroup(){

    this.AddGroup=false;
    this.AddNewgroup_Form.reset();
    this.groupnameSelect = false;

  }


  OnAddMemberClick(){
    this.addMember = true;
}
OnCloseAddMember(){
    this.addMember = false;
    this.AddNewMember_Form.reset();
}

// popup

OnMemberDetailsClick(){
this.MemberDetail = true;
}
OnCloseMemberDetails(){
  this.MemberDetail = false;
    }

    OnSelectRole(event){
      if(event){
        this.RoleSelectTrue = true;
      }else{
        this.RoleSelectTrue = false;
      }
    }

OnSearchMemberClick(){

    // if(this.AddNewMember_Form.value.roleSelect.value == 0 || this.RoleSelectTrue == false ){
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: 'Mandatory Fields',
    //     detail: 'Select role to search member'
    //    });
    // }
if(this.AddNewMember_Form.get('roleSelect').touched && this.AddNewMember_Form.value.roleSelect.value != 0 ){

    this.MemberSeach = true;
    console.log("if exicuted!",this.AddNewMember_Form.get('roleSelect').touched)

}
 else{
  this.messageService.add({
        severity: 'error',
        summary: 'Mandatory Fields',
        detail: 'Select role to search member'
       });

  }

}
closeSearchMember(){
    this.MemberSeach = false;
    this.ShowSearchedCont = false;
}

OnAddMemberpopClick(){
    this.AddMember = true;
}
OnCloseAddMemberpop(){
    this.AddMember = false;
}


OnOpenSearchPracticesClick(){
this.Searchpractices = true;
}
closeSearchPractice(){
    this.Searchpractices = false;
}

// fetchMemberDetail(item:number){
//   return this.AddNewMember.filter(x => x.id === item);
// }

OnEditMemberClick(item){
  this.searchResultMemberID = item.id;
  this.EditMemberPopup_Form.patchValue({
    id : item.id,
    MemberName : item.name,
    roleNames : item.role,
    startDate : item.start,
    endDate : item.end,
    specialitylist : item.speciality
  });
this.editMember = true;
console.log("selectedMemID",this.EditMemberPopup_Form.value.startDate);
// var test = this.fetchMemberDetail(item.id);
// console.log("Fetched Data",test);

}
OnCloseEditMember(){
  this.editMember = false;
}

OnQATeamClick(){
    this.QATeam = true;
}
OnCloseQATeam(){
  this.QATeam = false;
}
OnQAYesClick(){
    this.Qa = false;
    this.QATeam = false;
}

OnConsultationTeamClick(){
  this.ConsultationTeam = true;
}
OnCloseConsultationTeam(){
this.ConsultationTeam = false;
}
OnConsultYesClick(){
  this.consult = false;
  this.ConsultationTeam = false;
}

OnCarwTeamClick(){
  this.CarwTeam = true;
}
OnCloseCarwTeam(){
this.CarwTeam = false;
}
OnCarwYesClick(){
  this.carw = false;
  this.CarwTeam = false;
}


OnEditCareTeamGroupMem(){
  this.groupmembers = true;
}
OnCloseCareTeamGroupMem(){
  this.groupmembers = false;
}
// END popup


handleData(event) {
  if (event) {
      this.ComplExpInfo = true;
  } else {
      this.ComplExpInfo = false;
  }
console.log('oncheck', event);
}


onChange(event) {
  if(event.value.value == ''){
     this.roleSelect =false;
  }else{
      this.roleSelect = true;
  }
console.log('event :' + event);
console.log(event.value.value);
}

OnSelectGroup(event){
if(event.value.value == ''){
  this.groupnameSelect = false;
}else{
  this.groupnameSelect = true;
}


}



onSaveNewGroup(){
  if(this.AddNewgroup_Form.value.careteamSelect) {
      if(this.AddNewgroup_Form.value.startdate) {
            this.GroupMemData = this.AddNewGroupMem;
            this.groupNamelabel = true;
            this.addedGroupNames.push(this.AddNewgroup_Form.value.careteamSelect.label);
            this.addedGroups =  this.AddNewGroupMem.map(o => {
              return {
                       name: o.name,
                       rolename: o.rolename,
                       start : this.AddNewgroup_Form.value.startdate,
                       end : this.AddNewgroup_Form.value.enddate,
                    };
                  })
                  this.AddGroup = false;
                  this.AddNewgroup_Form.reset();
                  this.groupnameSelect = false;
                } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Mandatory Fields',
                detail: 'Please Select the Start Date'
              });
              }
  } else {
    this.messageService.add({
      severity: 'error',
      summary: 'Mandatory Fields',
      detail: 'Please Select the Care Team Group'
     });
  }

}

OnSearchContactClick(){
  this._data.getmembercontacts().subscribe(
    (data) => {
      this.SearchMemberContacts = data,
     console.log( "SearchMemData" , this.SearchMemberContacts);
     this.ShowSearchedCont = true; }
    );
}

OnSelectContact(item){
  this.searchResultMember = item.name;
  this.searchResultMemberID = item.id;
  this.MemberSeach = false;

}

OnSaveAddNewMember(){
if(this.AddNewMember_Form.value.startDate){
  if(this.AddNewMember_Form.value.memberSelect){
    const req ={
      id: this.searchResultMemberID,
      name: this.AddNewMember_Form.value.memberSelect,
      role:this.AddNewMember_Form.value.roleSelect,
      start:this.AddNewMember_Form.value.startDate,
      end:this.AddNewMember_Form.value.endDate,
      speciality:this.AddNewMember_Form.value.specialitySelect
}
this.AddNewMember.push(req);
console.log("Add New Member Array",this.AddNewMember);
this.addMember = false;
this.AddNewMember_Form.reset();


  }else{
    this.messageService.add({
      severity: 'error',
      summary: 'Mandatory Fields',
      detail: 'Select Member'
     });
  }
}else{
  this.messageService.add({
    severity: 'error',
    summary: 'Mandatory Fields',
    detail: 'Please Select the Start Date'
   });
}
}

onUpdateNewMember(){
  _.forEach(this.AddNewMember, (data, index) => {
    if ( this.searchResultMemberID  === data.id) {
      // console.log(this.id);
      // console.log(data.id);
      data.name = this.EditMemberPopup_Form.value.MemberName;
      data.role = this.EditMemberPopup_Form.value.roleNames;
      data.start = this.EditMemberPopup_Form.value.startDate;
      data.end = this.EditMemberPopup_Form.value.endDate;
      data.speciality = this.EditMemberPopup_Form.value.specialitylist.label;
      this.editMember = false;

    }
        console.log("date",data.start);
  });
}

}









export class GroupMembers {
  public constructor(
    public id: number,
    public name: string,
    public rolename: string,
    public start: string,
    public end: string

  ) {}
}

export class Member {
  public constructor(
    public id: number,
    public name: string,
    public role: string,
    public start: string,
    public end: string,
    public speciality?: string

  ) {}
}
