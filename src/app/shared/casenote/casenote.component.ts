import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Case, CaseNotesDisplay, SearchDisplay, Searchepisode, TaskClass, ReminderClass } from './casenote';
import * as _ from 'lodash';
import { PatientInfoComponent } from './../patient-info/patient-info.component';
import { MainService } from './../../services/appservices/main.service';
import { SharedService } from '../../services/appservices/shared.service';
import { MessageService } from 'primeng/primeng';
import { MasterService } from '../../../app/services/master.service';
import { remindsetTime } from '../../models/getTime';
import { getTasktypes } from '../../models/tasktype';
import { getTaskstatustypes } from '../../models/taskstatus';
import { getDocumentcategory } from '../../models/documentcategory';
import { getDocumentType } from '../../models/documenttype';
import { getprovidertypes } from '../../models/provideroption';

// abc start
interface MemberDetails {
  Title;
  first_Name;
  middle_Name;
  last_Name;
  gender;
  DOB;
  location;
  email;
  state;
}
const searchArr = [
  { Id: 1, Title: 'Mr', Name: 'Admin YourDrs', City: 'Eaglewood', State: 'AE', Gender: 'Male' },
  { Id: 2, Title: 'Mr', Name: 'Abhi', City: 'Eaglewood', State: 'AE', Gender: 'Male' },
  { Id: 3, Title: 'Mr', Name: 'Capiola David', City: 'Eaglewood', State: 'AE', Gender: 'Male' },
  { Id: 4, Title: "Ms", Name: 'Levine Pamela', City: 'Eaglewood', State: 'AE', Gender: 'FeMale' },
  { Id: 5, Title: "Ms", Name: 'Akshata', City: 'Eaglewood', State: 'AE', Gender: 'FeMale' },
];

@Component({
  selector: 'app-casenote',
  templateUrl: './casenote.component.html',
  styleUrls: ['./casenote.component.scss']
})
export class CasenoteComponent implements OnInit {
  cars: SelectItem[];
  addappointpop: SelectItem[];

  selectedRole: any;
  selRole: any;
  selectedadmin: any;
  addadminwho: any;
  selappointment: any;
  displayrecord: boolean = true;
  displaygeneralrecord: boolean = true;
  data: any;
  dataadmin: any;
  adddata: any;
  casedisplay1: any;
  casedisplay2: any;
  adminrole: any;
  adddropdown = [];
  selectedtargetroledisplay: any;
  addselctedadmin: any;
  addsearcheck = [];
  replysearcheck = [];
  tagsearchcheck = [];
  myItem: any;
  table: boolean = false;
  table1: boolean = false;
  remindersearcharray = [];
  @ViewChild(PatientInfoComponent, { static: false }) child: PatientInfoComponent;
  @Input() public parentdata;
  memberDetailsArr: MemberDetails[] = [];
  selectedFromSource: any;
  filteredSourceToMember: any[];
  selectedToSource: any;
  selectvalue = true;



  // // Task Episode Task Start

  legalRecords = false;
  searchTaskForm: FormGroup;
  selectedVal: any[];
  episodesearchdata: any = [];
  searchdata: any = [];
  additem: any;

  role: SelectItem[];
  tasktypesoptions: getTasktypes[];
  taskstatus: getTaskstatustypes[];
  doccategorytypes: getDocumentcategory[];
  doctype: getDocumentType[];
  provideroption: getprovidertypes[];
  time: remindsetTime[];

  caseForm: FormGroup;
  replyForm: FormGroup;
  search: boolean = false;
  search1: boolean = false;
  general: any;
  Notes: any
  selectedtitle: any;
  targetroledisplay: any;
  admintargetrole: any;
  config: any;
  collection = [];
  labelId: any;
  mark: any;
  items: SelectItem[];
  addselpopup: SelectItem[];
  target: SelectItem[];
  timerole: SelectItem[];
  tasktypechoosen: SelectItem[];
  taskstatuschoosen: SelectItem[];
  doccategorychoosen: SelectItem[];
  doctypechoosen: SelectItem[];
  providerchoosen: SelectItem[];
  selecteLanguages: []

  selectedreplycheck1: boolean = false;
  tagselectedcheck1: boolean = false;
  selectedaddcheck1: boolean = false;
  reminderselectedcheck1: boolean = false;
  showTextBox: boolean = false;
  your: any;
  id: number;
  allfilterdata: any;
  patientdata: any;
  name: any;
  account_Number: any;
  case: any;
  comment: string;
  caseErrorObj: any;
  searchstr: string;
  item: string;

  createtaskarray: TaskClass[];
  remindersavearray: ReminderClass[];

  replydisplayarray: CaseNotesDisplay[] = [
    new CaseNotesDisplay(1, "General", "Admin YourDrs", "1/31/2020 at 12:30 pm", "Tool Admin", "All", "this patient appointed for Initial evaluation", "surgical Team")
  ]

  casedisplay: CaseNotesDisplay[] = [
    new CaseNotesDisplay(1, "General", "Admin YourDrs", "1/31/2020 at 12:30 pm", "Tool Admin", "All", "this patient appointed for Initial evaluation", "surgical Team"),
    new CaseNotesDisplay(2, "General", "Admin YourDrs", "2/3/2020 at 10:30 am", "Tool Admin", "case manager", "this patient appointed for Initial evaluation", "surgical Team"),
  ]

  providerdisplay: CaseNotesDisplay[] = [
    new CaseNotesDisplay(1, "Dr. Kyriakides Christopher , Initial evaluation,1/27/2020", "Admin YourDrs", "1/31/2020 at 12:30 pm", "Tool Admin", "RN", "this patient appointed for Initial evaluation", "surgical Team"),
    new CaseNotesDisplay(2, "Dr. Kyriakides Christopher , Initial evaluation,1/27/2020", "Admin YourDrs", "2/2/2020 at 8:30 pm", "Tool Admin", "MA", "this patient appointed for Initial evaluation", "surgical Team"),
    new CaseNotesDisplay(3, "Dr. Kyriakides Christopher , Initial evaluation,1/27/2020", "Admin YourDrs", "11/11/2020 at 9:30 pm", "Tool Admin", "Case Manager", "this patient appointed for Initial evaluation", "surgical Team"),
    new CaseNotesDisplay(4, "Dr. Kyriakides Christopher , Initial evaluation,1/27/2020", "Admin YourDrs", "12/12/2020 at 7:30 pm", "Tool Admin", "Physician", "this patient appointed for Initial evaluation", "surgical Team"),
    new CaseNotesDisplay(5, "Dr. Kyriakides Christopher , Initial evaluation,1/27/2020", "Admin YourDrs", "3/4/2020 at 12:30 pm", "Tool Admin", "Coordinator", "this patient appointed for Initial evaluation", "surgical Team"),
    new CaseNotesDisplay(6, "Dr. Kyriakides Christopher , Initial evaluation,1/27/2020", "Admin YourDrs", "3/4/2020 at 12:30 pm", "Tool Admin", "Billing", "this patient appointed for Initial evaluation", "surgical Team"),
    new CaseNotesDisplay(7, "Dr. Kyriakides Christopher , Initial evaluation,1/27/2020", "Admin YourDrs", "3/4/2020 at 12:30 pm", "Tool Admin", "Collection", "this patient appointed for Initial evaluation", "surgical Team"),

  ]
  selectedItem: any;
  taskdata: any;
  constructor(private http: HttpClient,
    private mainService: MainService,
    private fb: FormBuilder,
    private dataService: SharedService, private messageService: MessageService, private masterService: MasterService, ) {

    this.cars = [
      { label: 'Select an appointment', value: 'Select an appointment' },
      { label: 'General Episode', value: 'General Episode' },
      { label: 'Dr. Kyriakides Christopher , Initial evaluation,1/27/2020', value: 'Dr. Kyriakides Christopher , Initial evaluation,1/27/2020' },
    ];
    this.items = [];
    for (let i = 0; i < 10000; i++) {
      this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
    }

    this.addappointpop = [
      { label: 'General Episode', value: 'General Episode' },
      { label: 'Dr. Kyriakides Christopher , Initial evaluation,1/27/2020', value: 'Dr. Kyriakides Christopher , Initial evaluation,1/27/2020' },
    ];
    this.addselpopup = [];
    for (let i = 0; i < 10000; i++) {
      this.addselpopup.push({ label: 'Item ' + i, value: 'Item ' + i });
    }

    this.role = [
      { label: 'All', value: 'All' },
      { label: 'Case Manager', value: 'Case Manager' },
      { label: 'Physician', value: 'Physician' },
      { label: 'Verifier', value: 'Verifier' },
      { label: 'Coordinator', value: 'Coordinator' },
      { label: 'RN', value: 'RN' },
      { label: 'MA', value: 'MA' },
      { label: 'Billing', value: 'Billing' },
      { label: 'FrontDesk', value: 'FrontDesk' },
      { label: 'Collection', value: 'Collection' },
      { label: 'Legal', value: 'Legal' }
    ];
    this.target = [];
    for (let i = 0; i < 10000; i++) {
      this.target.push({ label: 'Item ' + i, value: 'Item ' + i });
    }

    this.allfilterdata = [];
    this.allfilterdata = this.providerdisplay;
    console.log('allfilterdata', this.allfilterdata);
    this.config = {
      currentPage: 1,
      itemsPerPage: 4,
      totalItems: this.collection.length
    };

  }
  ngOnInit() {

    this.caseForm = this.fb.group({
      id: new FormControl(null),
      Generalepisode: new FormControl(null, Validators.required),
      targetrole: new FormControl(null, Validators.required),
      comment: new FormControl('', Validators.required),
      searchmember: new FormControl(null),
      displaytype: new FormControl(null, Validators.required),
      tagsearch: new FormControl(null),
      tagselectedcheck1: new FormControl(null, Validators.required),
      tagselectedcheck2: new FormControl(null, Validators.required),
      remindernote: new FormControl(null, Validators.required),
      reminderdate: new FormControl(null, Validators.required),
      remindertime: new FormControl(null, Validators.required),
      remindersearch: new FormControl(null),
      Notes: new FormControl(null, Validators.required),
      reminderselectedcheck1: new FormControl(null, Validators.required),
      // reminderselectedcheck2:new FormControl(null, Validators.required),
      selectedcheck: new FormControl(null, Validators.required),
      taskassignto: new FormControl(null, Validators.required),
      taskepisode: new FormControl(null, Validators.required),
      tasksubject: new FormControl(null, Validators.required),
      taskdescription: new FormControl(null, Validators.required),
      taskduedate: new FormControl(null, Validators.required),
      tasktype: new FormControl(null, Validators.required),
      taskstatustype: new FormControl(null, Validators.required),
      addnewattachment: new FormControl(null, Validators.required),
      doccategory: new FormControl(null, Validators.required),
      documenttype: new FormControl(null, Validators.required),
      providercontrol: new FormControl(null, Validators.required),
      taskterminatedate: new FormControl(null, Validators.required),
      selectedaddcheck1: new FormControl(null, Validators.required),
      Assignto: new FormControl(null, Validators.required),
      Search1: new FormControl(null),
      name: new FormControl(null, Validators.required)
    });
    this.replyForm = this.fb.group({
      id: new FormControl(null),
      general: new FormControl(null, Validators.required),
      targetroledisplay: new FormControl(null, Validators.required),
      replysearch: new FormControl(null),
      Notes: new FormControl(null, Validators.required),
      selectedreplycheck1: new FormControl(null, Validators.required),
      selectedreplycheck2: new FormControl(null, Validators.required)
    })
    this.searchTaskForm = this.fb.group({
      Search1: new FormControl(null),
    });
    this.showContaint();
    this.getTasks();
    this.getStatus();
    this.getDocumentcategory();
    this.getDocumenttype();
    this.getProvider();
    this.getTime();
  }
  pageChange(event) {
    this.config.currentPage = event;
  }
  getTasks() {
    this.dataService.gettasktype().subscribe(
      (data: getTasktypes[]) => {
        this.tasktypesoptions = data;
        console.log(this.tasktypesoptions);
      }
    );
  }
  getStatus() {
    this.dataService.gettaskstatus().subscribe(
      (data: getTaskstatustypes[]) => {
        this.taskstatus = data;
        console.log(this.taskstatus);
      }
    );
  }
  getDocumentcategory() {
    this.dataService.getdoccategory().subscribe(
      (data: getDocumentcategory[]) => {
        this.doccategorytypes = data;
        console.log(this.doccategorytypes);
      }
    );
  }
  getDocumenttype() {
    this.dataService.getdoctypes().subscribe(
      (data: getDocumentType[]) => {
        this.doctype = data;
        console.log(this.doctype);
      }
    );
  }
  getProvider() {
    this.dataService.getprovidertypes().subscribe(
      (data: getprovidertypes[]) => {
        this.provideroption = data;
        console.log(this.provideroption);
      }
    );
  }
  getTime() {
    this.dataService.getremindertime().subscribe(
      (data: remindsetTime[]) => {
        this.time = data;
        console.log(this.time);
      }
    );
  }

  showMark() {
    this.mark = true;
  }
  selectedLabel(item, value) {
    this.selRole = value;
    console.log(this.selRole);
    this.labelId = item;
    if (this.selRole == 'RN') {
      this.allfilterdata = [];
      _.filter(this.providerdisplay, (c) => {
        if (c.targetroledisplay === this.selRole) {
          this.allfilterdata.push(c);
        }
      }
      );
      console.log(this.providerdisplay);
    } else if (this.selRole == 'MA') {
      this.allfilterdata = [];
      _.filter(this.providerdisplay, (c) => {
        if (c.targetroledisplay === this.selRole) {
          this.allfilterdata.push(c);
        }
      }

      );
    } else if (this.selRole == 'Case Manager') {
      this.allfilterdata = [];
      _.filter(this.providerdisplay, (c) => {
        if (c.targetroledisplay === this.selRole) {
          this.allfilterdata.push(c);
        }
      }
      );
    } else if (this.selRole == 'Physician') {
      this.allfilterdata = [];
      _.filter(this.providerdisplay, (c) => {
        if (c.targetroledisplay === this.selRole) {
          this.allfilterdata.push(c);
        }
      }
      );
    } else if (this.selRole == 'Coordinator') {
      this.allfilterdata = [];
      _.filter(this.providerdisplay, (c) => {
        if (c.targetroledisplay === this.selRole) {
          this.allfilterdata.push(c);
        }
      }
      );
    } else if (this.selRole == 'Billing') {
      this.allfilterdata = [];
      _.filter(this.providerdisplay, (c) => {
        if (c.targetroledisplay === this.selRole) {
          this.allfilterdata.push(c);
        }
      }
      );
    } else if (this.selRole == 'Collection') {
      this.allfilterdata = [];
      _.filter(this.providerdisplay, (c) => {
        if (c.targetroledisplay === this.selRole) {
          this.allfilterdata.push(c);
        }
      }
      );

    } else if (this.selRole == 'All') {
      this.allfilterdata = [];
      _.filter(this.providerdisplay, (c) => {

        this.allfilterdata.push(c);
        this.displaygeneralrecord = true;
        this.displayrecord = true;
        this.selectedtitle = "Dr. Kyriakides Christopher , Initial evaluation,1/27/2020";
      }
      );
    } else if (this.selRole == 'Verifier') {
      this.allfilterdata = [];
      _.filter(this.providerdisplay, (c) => {
        if (c.targetroledisplay === this.selRole) {
          this.allfilterdata.push(c);
        }
      }
      );
    }
    else if (this.selRole == 'Front Desk') {
      this.allfilterdata = [];
      _.filter(this.providerdisplay, (c) => {
        if (c.targetroledisplay === this.selRole) {
          this.allfilterdata.push(c);
        }
      }
      );
    }
    else if (this.selRole == 'Legal') {
      this.allfilterdata = [];
      _.filter(this.providerdisplay, (c) => {
        if (c.targetroledisplay === this.selRole) {
          this.allfilterdata.push(c);
        }
      }
      );
    }
    else {

    }

  }
  replyitem: any;
  display: boolean;
  display1: boolean;
  tagdisplay: boolean;

  reminderdisplay: boolean;
  remindersearch: boolean;
  replysearch: boolean;
  taskdisplay: boolean;
  searchtaskdisplay: boolean;
  dateObj: number = Date.now();
  arr1: SearchDisplay[];
  arr2: SearchDisplay[];
  arr3: SearchDisplay[];
  arr4: SearchDisplay[];
  arr5: Searchepisode[];
  showDialog(value) {
    this.selectedaddcheck1 = false;
    this.dataadmin = value.who;
    this.display = true;
    this.table = false;
    this.showTextBox = false;
    // this.name="";
  }
  showReply(value) {
    this.table1 = false;
    this.selectedreplycheck1 = false;
    this.showTextBox = false;
    this.data = value.who;
    this.adminrole = value.Role;
    this.admintargetrole = value.targetroledisplay;
    console.log(this.adminrole);
    this.general = value.general;
    this.targetroledisplay = value.targetroledisplay;
    this.display1 = true;
    this.replysearch = false;
    this.replysearcheck = [];

  }
  showTag(selecteditemrow) {
    console.log('selecteditemrow', selecteditemrow);
    this.selectedItem = selecteditemrow;
    this.tagselectedcheck1 = false;
    this.tagdisplay = true;
    this.table = false;
    this.showTextBox = false;
    this.tagsearchcheck = [];
    this.caseForm.controls.tagselectedcheck2.reset();
  }

  showReminder(value) {
    console.log(value);
    this.table = false;
    this.remindersearcharray = [];
    this.showTextBox = false;
    this.reminderselectedcheck1 = false;
    this.reminderdisplay = true;
    this.Notes = value.Notes;
    this.remindersearch = false;
    this.caseForm.controls.remindertime.reset();
    this.caseForm.patchValue({
      Notes: value.Notes
    })
  }
  showTask() {
    this.taskdisplay = true;
    this.caseForm.controls.Assignto.reset();
    this.caseForm.controls.tasksubject.reset();
    this.caseForm.controls.taskdescription.reset();
    this.caseForm.controls.taskduedate.reset();
    this.caseForm.controls.tasktype.reset();
    this.caseForm.controls.taskstatustype.reset();
    this.caseForm.controls.doccategory.reset();
    this.caseForm.controls.documenttype.reset();
    this.caseForm.controls.providercontrol.reset();
    this.caseForm.controls.taskterminatedate.reset();
  }
  showTaskSearch() {
    this.searchtaskdisplay = true;
  }
  closeadd() {
    this.addsearcheck = [];
    this.display = false;
  }
  closereplay() {
    this.replysearcheck = [];
    this.display1 = false;
    this.replysearch = false;
  }
  closetag() {
    this.tagdisplay = false;
    this.tagsearchcheck = [];
  }
  closereminder() {
    this.reminderdisplay = false;
    this.remindersearcharray = [];
    this.remindersearch = false;
  }
  closetask() {
    this.taskdisplay = false;
  }
  closesearchtask() {
    this.searchtaskdisplay = false;
  }

  saveComments() {
    if (this.caseForm.value.comment === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'mandatory fields required'
      });
      return;
    }
    else if (this.caseForm.value.targetrole === null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'mandatory fields required'
      });
      return;
    }
    else {
      if (this.caseForm.value.Generalepisode === "Dr. Kyriakides Christopher , Initial evaluation,1/27/2020") {
        let req;
        if (this.addsearcheck.length > 0) {
          req = {
            id: 3,
            general: this.caseForm.value.Generalepisode,
            who: "Admin YourDrs",
            when: "1/31/2020 at 12:30 pm",
            Role: "Tool Admin",
            targetroledisplay: this.caseForm.value.targetrole,
            Notes: this.caseForm.value.comment,
            taggedmembers: this.addsearcheck[0].name
          }
          this.allfilterdata.push(req);
        } else {
          req = {
            id: 3,
            general: this.caseForm.value.Generalepisode,
            who: "Admin YourDrs",
            when: "1/31/2020 at 12:30 pm",
            Role: "Tool Admin",
            targetroledisplay: this.caseForm.value.targetrole,
            Notes: this.caseForm.value.comment

          }
        }

        this.allfilterdata.push(req);
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: 'Added Sucessfully'
        });
      }

      else if (this.caseForm.value.Generalepisode === "General Episode") {
        let req;
        if (this.addsearcheck.length > 0) {
          req = {
            id: 3,
            general: this.caseForm.value.Generalepisode,
            who: "Admin YourDrs",
            when: "1/31/2020 at 12:30 pm",
            Role: "Tool Admin",
            targetroledisplay: this.caseForm.value.targetrole,
            Notes: this.caseForm.value.comment,
            taggedmembers: this.addsearcheck[0].name
          }
          this.casedisplay.push(req);

        } else {

          req = {
            id: 3,
            general: this.caseForm.value.Generalepisode,
            who: "Admin YourDrs",
            when: "1/31/2020 at 12:30 pm",
            Role: "Tool Admin",
            targetroledisplay: this.caseForm.value.targetrole,
            Notes: this.caseForm.value.comment

          }
          this.casedisplay.push(req);
        }


        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: 'Added Sucessfully'
        });
      }
      else {
        this.caseForm.value.Generalepisode === "General Episode";
        let req;
        if (this.addsearcheck.length > 0) {
          req = {
            id: 3,
            general: this.caseForm.value.Generalepisode,
            who: "Admin YourDrs",
            when: "1/31/2020 at 12:30 pm",
            Role: "Tool Admin",
            targetroledisplay: this.caseForm.value.targetrole,
            Notes: this.caseForm.value.comment,
            taggedmembers: this.addsearcheck[0].name
          }
          this.casedisplay.push(req);

        } else {

          req = {
            id: 3,
            general: this.caseForm.value.Generalepisode,
            who: "Admin YourDrs",
            when: "1/31/2020 at 12:30 pm",
            Role: "Tool Admin",
            targetroledisplay: this.caseForm.value.targetrole,
            Notes: this.caseForm.value.comment

          }
          this.casedisplay.push(req);
        }


        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: 'Added Sucessfully'
        });

      }
      this.caseForm.reset();
      this.display = false;
      this.addsearcheck = [];
    }


  }
  saveReply() {
    if (this.replyForm.value.Notes === null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Reply field is required'
      });
    }
    else {
      this.selectedadmin = this.data;
      this.selectedRole = this.adminrole;
      this.selectedtargetroledisplay = this.admintargetrole;
      let req;
      if (this.replysearcheck.length > 0) {
        req = {
          id: 1,
          general: "General",
          who: "Admin YourDrs",
          when: "1/31/2020 at 12:30 pm",
          Role: "Tool Admin",
          targetroledisplay: "All",
          Notes: this.replyForm.value.Notes,
          taggedmembers: this.replysearcheck[0].name
        }
      } else {
        req = {
          id: 1,
          general: "General",
          who: "Admin YourDrs",
          when: "1/31/2020 at 12:30 pm",
          Role: "Tool Admin",
          targetroledisplay: "All",
          Notes: this.replyForm.value.Notes
        }
      }
      this.replydisplayarray.push(req);
      this.messageService.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Added Sucessfully'
      });
      console.log(this.replydisplayarray);
      this.display1 = false;
    }
    this.replyForm.reset();
  }
  onSearchClick() {
    this.search = true;
    this.table = true;
    console.log(this.caseForm.value.searchmember);
    if (this.caseForm.value.searchmember !== null) {
      this.searchdata = _.filter(this.searchdata, (s) => {
        return s.name === this.caseForm.value.searchmember;
      });
    } else {
      this.dataService.getcasenotesearchdata().subscribe(
        (data: any[]) => {
          this.searchdata = data;
          console.log(this.searchdata);
        }
      );
    }
  }
  onSearchreplyClick() {
    this.search1 = true;
    this.table1 = true;
    console.log(this.replyForm.value.replysearch);
    if (this.replyForm.value.replysearch !== null) {
      this.searchdata = _.filter(this.searchdata, (s) => {
        return s.name === this.replyForm.value.replysearch;
      });
    } else {
      this.dataService.getcasenotesearchdata().subscribe(
        (data: any[]) => {
          this.searchdata = data;
          console.log(this.searchdata);
        }
      );
    }

  }
  onSearchtagClick() {
    this.search = true;
    console.log(this.caseForm.value.tagsearch);
    if (this.caseForm.value.tagsearch !== null) {
      this.searchdata = _.filter(this.searchdata, (s) => {
        return s.name === this.caseForm.value.remindersearch;
      });
    } else {
      this.table = true;
      this.dataService.getcasenotesearchdata().subscribe(
        (data: any[]) => {
          this.searchdata = data;
          console.log(this.searchdata);
        }
      );
    }

  }

  //reminder search
  onSearchreminderClick() {
    this.search = true;
    console.log(this.caseForm.value.remindersearch);
    if (this.caseForm.value.remindersearch !== null) {
      this.searchdata = _.filter(this.searchdata, (s) => {
        return s.name === this.caseForm.value.remindersearch;
      });
    } else {
      this.table = true;
      this.dataService.getcasenotesearchdata().subscribe(
        (data: any[]) => {
          this.searchdata = data;
          console.log(this.searchdata);
        }
      );
    }

  }
  selectedadd(selectedvalue) {
    console.log(selectedvalue);
    this.adddropdown.push(selectedvalue.value.label)
  }

  selectedappointment(selvalue) {
    this.selappointment = selvalue.value.label;

    console.log(this.selappointment);
    if (this.selappointment === 'General Episode') {
      this.displayrecord = false;
      this.selectedtitle = "General";
      this.displaygeneralrecord = true;
    } else {
      this.displaygeneralrecord = true;
      this.displayrecord = true;
      this.selectedtitle = "Dr. Kyriakides Christopher , Initial evaluation,1/27/2020";
    }
  }
  selectedaddcheck(event, item) {
    if (event == true) {
      this.addsearcheck.push(item);
      this.showTextBox = true;
    }
    else {
      this.addsearcheck.splice(item, 1);
    }
  }

  selectedcheck(event, item, i) {
    console.log(item);
    this.replyitem = item;
    if (event == true) {
      this.replysearcheck.push(item);
      this.showTextBox = true;
    }
    else {
      this.replysearcheck.splice(item, 1);
    }
  }
  selectedtagcheck(event, item) {
    if (event == true) {
      this.tagsearchcheck.push(item);
      this.showTextBox = true;
    }
    else {
      this.tagsearchcheck.splice(item, 1);
    }

  }
  selectedremindercheck(event, item) {
    if (event == true) {
      this.remindersearcharray.push(item);
      this.showTextBox = true;
    }
    else {
      this.remindersearcharray.splice(item, 1);
    }

  }
  saveTag() {
    if (this.caseForm.value.tagselectedcheck2 === null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Member is mandatory'
      });
    }
    else {
      this.messageService.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Added Sucessfully'
      });
      console.log(this.selectedItem);
      this.tagdisplay = false;
      return this.selectedItem.taggedmembers = this.selectedItem.taggedmembers + ',' + this.tagsearchcheck[0].name;
    }
    this.tagsearchcheck = [];
  }


  saveReminder() {
    if (this.caseForm.value.reminderdate === null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Reminder date is required'
      });
    }
    else if (this.caseForm.value.remindertime === null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Reminder time required'
      });
    }
    else {
      this.remindersavearray = [];
      this.remindersavearray.push(this.caseForm.value);

      this.messageService.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Added Sucessfully'
      });
      console.log(this.remindersavearray);
      this.reminderdisplay = false;
    }
    // this.caseForm.reset();
  }
  saveTask() {
    if (this.caseForm.value.Assignto === null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please select Assign to Members'
      });
    }
    else if (this.caseForm.value.taskdescription === null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please select task description'
      });
    }
    else if (this.caseForm.value.tasktype === null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please select task type'
      });
    }
    else if (this.caseForm.value.doccategory === null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please select document category'
      });
    }
    else if (this.caseForm.value.documenttype === null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please select document type'
      });
    }
    else {

      localStorage.setItem(this.caseForm.value.addnewattachment, 'addnewattachment');
      this.myItem = localStorage.getItem(this.caseForm.value.addnewattachment);
      this.createtaskarray = [];
      this.createtaskarray.push(this.caseForm.value);
      console.log(this.createtaskarray);
      this.messageService.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Added Sucessfully'
      });
      this.taskdisplay = false;
    }

  }


  closereplaytag(name) {
    this.replysearcheck.splice(name, 1);
  }

  closeremindertag(value) {
    this.remindersearcharray.splice(value.name, 1);
  }
  closetagnote(value) {
    this.tagsearchcheck.splice(value.name, 1);
  }

  // auto search card start
  filterSourceToMember(event) {
    const filterQuery = event.query;
    this.filteredSourceToMember = this.getFilterSourceToMember(filterQuery, searchArr);

  }

  getFilterSourceToMember(filterQuery, sourceMembers: any): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < sourceMembers.length; i++) {
      const sourceMember = sourceMembers[i];
      if (sourceMember.Name.toLowerCase().indexOf(filterQuery.toLowerCase()) === 0) {
        filtered.push(sourceMember);
      }
    }
    return filtered;
  }
  getMemberDetails(memberDetail) {
    this.memberDetailsArr = [];
    if (this.caseForm.value.ReferralSourceToMember !== "") {
      const data = {
        Title: 'Mr',
        first_Name: memberDetail.Name,
        middle_Name: "",
        last_Name: "",
        gender: memberDetail.Gender,
        DOB: "",
        location: memberDetail.City,
        state: "",
        email: ""
      };
      if (this.memberDetailsArr.length === 0) {
        this.memberDetailsArr.push(data);
      }
    }
    console.log(this.memberDetailsArr);
  }
  selectFromSource(event) {
    this.getMemberDetails(event);
    this.selectedFromSource = event.Name;
  }

  selectSearchItem(seletedItem) {
    this.selectFromSource(seletedItem);
    console.log(seletedItem);
    this.caseForm.patchValue({
      Assignto: seletedItem.Name
    });
    console.log(this.caseForm.value);
  }
  closeTag(checkTag) {
    if (checkTag === 'removeReferralSourceFromTag') {
      this.selectedFromSource = undefined;
    }
    this.selectedToSource = undefined;
  }
  // auto search card end

  // Task Episode Task Start

  selectSearch(searchedData) {
    this.selectedVal = searchedData.episodename;
    this.episodesearchdata = searchedData;
    this.patientdata = this.selectedVal;
    this.caseForm.patchValue({
      taskepisode: searchedData.episodename
    });
    this.searchtaskdisplay = false;
    this.selectvalue = false;
  }

  showDataContaint() {
    this.search = true;
    console.log(this.searchTaskForm.value.Search1);
    if (this.searchTaskForm.value.Search1 !== null) {
      this.episodesearchdata = _.filter(this.episodesearchdata, (s) => {
        return s.episodename === this.searchTaskForm.value.Search1;
      });
    } else {
      this.dataService.gettaskEpisode().subscribe(
        (data: any[]) => {
          this.episodesearchdata = data;
          console.log(this.episodesearchdata);
        }
      );
    }
  }


  showContaint() {
    this.dataService.gettaskEpisode().subscribe(
      (data: any[]) => {
        this.episodesearchdata = data;
        console.log(this.episodesearchdata);
      }
    );
  }
  // Task Episode Task End
}
