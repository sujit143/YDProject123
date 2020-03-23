import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SharedService } from '../../../../services/appservices/shared.service';
import { MasterService } from '../../../../services/master.service';
import { Practice, Location, Favfilter, Starttime, Endtime, Speciality, State, Mop, POSPractice, POSLocation, Provider, ApmtType,
  ApmtStatus, DicStatus, AsstStatus, BillStatus, CaseType, DicType, EpiStatus, AutStatus, VerStatus, SuperBillStatus
} from '../../../../models/providerdashboard';

@Component({
  selector: 'app-providerdashboard1',
  templateUrl: './providerdashboard1.component.html',
  styleUrls: ['./providerdashboard1.component.scss']
})
export class Providerdashboard1Component implements OnInit {
  filterInput: any;
  saveEditFilter: boolean = false;
  editDisplayColumns: boolean = false;
  editFilterFields: boolean = false;
  displaycolumns: any;
  fielterfields: any;
  Location: boolean = true;
  Provider: boolean = true;
  PatientName: boolean = true;
  Case: boolean = true;
  AppointmentFromDate: boolean = true;
  AuthorizationStatus: boolean = true;
  MOP: boolean = true;
  SuperBillStatus: boolean = true;
  CheckedInTime: boolean = true;
  AppointmentCreatedFromDate: boolean = true;
  VerificationStatus: boolean = true;
  CaseDetails: boolean = true;
  AppointmentStatus: boolean = true;
  DictationType: boolean = true;
  AssessmentStatus: boolean = true;
  POSLocation: boolean = true;
  VideoSession: boolean = true;
  DictationStatus: boolean = true;
  BillingStatus: boolean = true;
  AppointmentType: boolean = true;
  favoritename: FormGroup;
  fname: string;

  myFilter1: any = [];

   @Output() searcResult = new EventEmitter();
   @Output() filterColumns = new EventEmitter();
   @Output() filterFields = new EventEmitter();
   @Output() reset = new EventEmitter();
   @Output() saveFilter = new EventEmitter();

   itemDisplayColumnsStringsLeft: any[] = [
    'Appointment From Date',
    'Authorization Status',
    'Case #',
    'MOP',
    'Super Bill Status',
    'Checked In Time',
    'Patient Name',
    'Appointment Created From Date',
    'Provider',
    'Verification Status',
    'Location',
    'Case Details',
    'Appointment Status',
    'Dictation Type',
    'Assessment Status',
    'POS Location',
    'Video Session',
    'Dictation Status',
    'Billing Status',
    'Appointment Type'
  ];

  itemDisplayColumnsStringsRight: any[] = [];

  practice: Practice [];
  location: Location [];
  pos_practice: POSPractice [];
  pos_location: POSLocation[];
  provider: Provider[];
  appt_type: ApmtType[];
  appt_status: ApmtStatus[];
  dic_ststus: DicStatus[];
  asse_ststus: AsstStatus[];
  bill_status: BillStatus[];
  case_type: CaseType[];
  dic_type: DicType[];
  epi_status: EpiStatus[];
  fav_fil: Favfilter[] = [
    new Favfilter('sujit'),
    new Favfilter('vinay'),
    new Favfilter('shivu')
  ];
  aut_status: AutStatus[];
  ver_status: VerStatus[];
  sup_bill_staus: SuperBillStatus[];
  start_time: Starttime[] = [
    new Starttime('04:00 AM'),
    new Starttime('04:15 AM'),
    new Starttime('04:30 AM'),
    new Starttime('04:45 AM')
  ];
  end_time: Endtime[] = [
    new Endtime('10:00 PM'),
    new Endtime('10:15 PM'),
    new Endtime('10:30 PM'),
    new Endtime('10:45 PM')
  ];
  speciality: Speciality[] = [
    new Speciality('Spine Care'),
    new Speciality('GN/OBG'),
    new Speciality('Spine Surgery')
  ];
  state: State[] = [new State('NY'), new State('NJ'), new State('AK')];
  mop: Mop[] = [new Mop('Insurance'), new Mop('Lien'), new Mop('Self-Pay')];
  myFilter: any[];
  itemFilterFieldsStringsLeft: any[] =  [];

  itemFilterFieldsStringsRight: any[] = [];

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private _data1: SharedService,
    private masterService: MasterService
  ) {

   }

  ngOnInit() {
    this.favoritename = this.fb.group({
      fname: new FormControl('', Validators.required)
    });

    this.getPracticedetails();
    this.getLocationdetails();
    this.getPOSPracticedetails();
    this.getPOSLocationdetails();
    this.getProviderdetails();
    this.getApmtTypedetails();
    this.getApmtStatusdetails();
    this.getDicStatusdetails();
    this.getAsstStatusdetails();
    this.getBillStatusdetails();
    this.getCaseTypedetails();
    this.getDicTypedetails();
    this.getEpiStatusdetails();
    this.getAutStatusdetails();
    this.getVerStatusdetails();
    this.getSupBillStatusdetails();
    this.getFavFilterdetails();
    setTimeout(() => {
      this.getListControls();
    }, 500);
  }
  getListControls() {
  this.itemFilterFieldsStringsLeft = [
    {
      Id: 1,
      visible: true,
      fieldName: 'Practice',
      position: 1,
      type: 'dropdown',
      isVisible: true,
      options: this.practice,
      controlname: 'practice'
    },
    {
      Id: 2,
      visible: true,
      fieldName: 'Location',
      position: 2,
      type: 'dropdown',
      isVisible: true,
      options: this.location,
      controlname: 'location'
    },
    {
      Id: 3,
      visible: true,
      fieldName: 'Provider',
      position: 3,
      type: 'dropdown',
      isVisible: true,
      options: this.provider,
      controlname: 'provider'
    },
    {
      Id: 4,
      visible: true,
      fieldName: 'POS Location',
      position: 4,
      type: 'dropdown',
      isVisible: true,
      options: this.pos_location,
      controlname: 'pos_location'
    },
    {
      Id: 5,
      visible: true,
      fieldName: 'POS Practice',
      position: 5,
      type: 'dropdown',
      isVisible: true,
      options: this.pos_practice,
      controlname: 'pos_practice'
    },
    {
      Id: 6,
      visible: true,
      fieldName: 'Case #',
      position: 6,
      type: 'inputbox',
      isVisible: true,
      controlname: 'case'
    },
    {
      Id: 7,
      visible: true,
      fieldName: 'Account #',
      position: 7,
      type: 'inputbox',
      isVisible: true,
      controlname: 'account'
    },
    {
      Id: 8,
      visible: true,
      fieldName: 'Patient Name',
      position: 8,
      type: 'inputbox',
      isVisible: true,
      controlname: 'patient_name'
    },
    {
      Id: 9,
      visible: true,
      fieldName: 'Dictation Status',
      position: 9,
      type: 'dropdown',
      isVisible: true,
      options: this.dic_ststus,
      controlname: 'dic_ststus'
    },
    {
      Id: 10,
      visible: true,
      fieldName: 'Super Bill Status',
      position: 10,
      type: 'dropdown',
      isVisible: true,
      options: this.sup_bill_staus,
      controlname: 'sup_bill_staus'
    },
    {
      Id: 11,
      visible: true,
      fieldName: 'Billing Status',
      position: 11,
      type: 'dropdown',
      isVisible: true,
      options: this.bill_status,
      controlname: 'bill_status'
    },
    {
      Id: 12,
      visible: true,
      fieldName: 'Dictation Type',
      position: 12,
      type: 'dropdown',
      isVisible: true,
      options: this.dic_type,
      controlname: 'dic_type'
    },
    {
      Id: 13,
      visible: true,
      fieldName: 'Case Type',
      position: 13,
      type: 'dropdown',
      isVisible: true,
      options: this.case_type,
      controlname: 'case_type'
    },
    {
      Id: 14,
      visible: true,
      fieldName: 'Assessment Status',
      position: 14,
      type: 'dropdown',
      isVisible: true,
      options: this.asse_ststus,
      controlname: 'asse_ststus'
    },
    {
      Id: 15,
      visible: true,
      fieldName: 'Apmt Created To Date',
      position: 15,
      type: 'datepicker',
      isVisible: true,
      controlname: 'app_cre_to_date'
    },
    {
      Id: 16,
      visible: true,
      fieldName: 'Appointment Status',
      position: 16,
      type: 'dropdown',
      isVisible: true,
      options: this.appt_status,
      controlname: 'appt_status'
    },
    {
      Id: 17,
      visible: true,
      fieldName: 'Episode Status',
      position: 17,
      type: 'dropdown',
      isVisible: true,
      options: this.epi_status,
      controlname: 'epi_status'
    },
    {
      Id: 18,
      visible: true,
      fieldName: 'Authorization Status',
      position: 18,
      type: 'dropdown',
      isVisible: true,
      options: this.aut_status,
      controlname: 'aut_status'
    },
    {
      Id: 19,
      visible: true,
      fieldName: 'Apmt Created From Date',
      position: 19,
      type: 'datepicker',
      isVisible: true,
      controlname: 'app_cre_from_date'
    },
    {
      Id: 20,
      visible: true,
      fieldName: 'Verification Status',
      position: 20,
      type: 'dropdown',
      isVisible: true,
      options: this.ver_status,
      controlname: 'ver_status'
    },
    {
      Id: 21,
      visible: true,
      fieldName: 'Appointment Type',
      position: 21,
      type: 'dropdown',
      isVisible: true,
      options: this.appt_type,
      controlname: 'appt_type'
    },
    {
      Id: 22,
      visible: true,
      fieldName: 'Appointment To Date',
      position: 22,
      type: 'datepicker',
      isVisible: true,
      controlname: 'appt_to_date'
    },
    {
      Id: 23,
      visible: true,
      fieldName: 'Appointment From Date',
      position: 23,
      type: 'datepicker',
      isVisible: true,
      controlname: 'appt_from_date'
    },
    {
      Id: 24,
      visible: true,
      fieldName: 'Favourite Filters',
      position: 24,
      type: 'dropdown',
      isVisible: true,
      options: this.myFilter,
      controlname: 'fav_fil',
      icon: 'fa fa-trash'
    },
    {
      Id: 25,
      visible: true,
      fieldName: 'Is Stat File',
      position: 25,
      type: 'chekbox',
      isVisible: true,
    }
  ];
}
saveeditfilter() {
  this.saveEditFilter = true;
}
editdisplaycolumns() {
  this.editDisplayColumns = true;
}
editfilterfields() {
  this.editFilterFields = true;
}
closeDisplayColum() {
  this.editDisplayColumns = false;
}
closeSaveEditFilter() {
  this.saveEditFilter = false;
}
closeEditFilterFields() {
  this.editFilterFields = false;
}
printPage() {
  window.print();
}
Search() {
  this.searcResult.emit('HI');
}
onSave() {
this.filterColumns.emit(this.itemDisplayColumnsStringsRight);
this.closeEditFilterFields();
this.editDisplayColumns = false;

}
onSave1() {
    this.filterFields.emit(this.itemFilterFieldsStringsLeft);
    this.editFilterFields = false;
}
clear() {
  this.reset.emit('hi');
}

onSavefilter() {
  if (this.favoritename.value.fname  === '') {
    this.messageService.add({
      severity: 'error',
      summary: 'Warning',
      detail: 'Select Fname'
    });
    return;
  }
  else {
  const ItemLength = this.myFilter.length + 1;
  const favoritename1 = {
    label: this.favoritename.value.fname,
    value: ItemLength
   };

   this.myFilter.push(favoritename1);
  this.messageService.add({
       severity: 'success',
       summary: 'Added',
       detail: 'Successfully Created'
    });

  this.saveFilter.emit(this.itemFilterFieldsStringsLeft);
  this.saveEditFilter = false;
  this.favoritename.reset();
 }
}
getPracticedetails() {
    this._data1.getdataPractice().subscribe(
      (data: Practice[]) => {
        this.practice = this.masterService.formatDataforDropdown('Practice', data, 'select', 'Id');
        console.log('test', this.practice);
      }
    );
  }
  getLocationdetails() {
    this._data1.getdataLocation().subscribe(
      (data: Location[]) => {
        this.location = this.masterService.formatDataforDropdown('Location', data, 'select', 'Id');
        console.log('test', this.location);
      }
    );
  }
  getPOSPracticedetails() {
    this._data1.getdataPosPractice().subscribe(
      (data: POSPractice[]) => {
        this.pos_practice = this.masterService.formatDataforDropdown('PosPractice', data, 'select', 'Id');
        console.log('test', this.pos_practice);
      }
    );
  }
  getPOSLocationdetails() {
    this._data1.getdataPosLocation().subscribe(
      (data: POSLocation[]) => {
        this.pos_location = this.masterService.formatDataforDropdown('PosLocation', data, 'select', 'Id');
        console.log('test', this.pos_location);
      }
    );
  }
  getProviderdetails() {
    this._data1.getdataProvider().subscribe(
      (data: Provider[]) => {
        this.provider = this.masterService.formatDataforDropdown('Provider', data, 'select', 'Id');
        console.log('test', this.provider);
      }
    );
  }
  getApmtTypedetails() {
    this._data1.getdataApmttype().subscribe(
      (data: ApmtType[]) => {
        this.appt_type = this.masterService.formatDataforDropdown('AppmtType', data, 'select', 'Id');
        console.log('test', this.appt_type);
      }
    );
  }
  getApmtStatusdetails() {
    this._data1.getdataApmtstatus().subscribe(
      (data: ApmtStatus[]) => {
        this.appt_status = this.masterService.formatDataforDropdown('AppmtStatus', data, 'select', 'Id');
        console.log('test', this.appt_status);
      }
    );
  }
  getDicStatusdetails() {
    this._data1.getdataDicstatus().subscribe(
      (data: DicStatus[]) => {
        this.dic_ststus = this.masterService.formatDataforDropdown('DicStatus', data, 'select', 'Id');
        console.log('test', this.dic_ststus);
      }
    );
  }
  getAsstStatusdetails() {
    this._data1.getdataAsststatus().subscribe(
      (data: AsstStatus[]) => {
        this.asse_ststus = this.masterService.formatDataforDropdown('AsstStatus', data, 'select', 'Id');
        console.log('test', this.asse_ststus);
      }
    );
  }
  getBillStatusdetails() {
    this._data1.getdataBillstatus().subscribe(
      (data: BillStatus[]) => {
        this.bill_status = this.masterService.formatDataforDropdown('Billstatus', data, 'select', 'Id');
        console.log('test', this.bill_status);
      }
    );
  }
  getCaseTypedetails() {
    this._data1.getdataCasetype().subscribe(
      (data: CaseType[]) => {
        this.case_type = this.masterService.formatDataforDropdown('CaseType', data, 'select', 'Id');
        console.log('test', this.case_type);
      }
    );
  }
  getDicTypedetails() {
    this._data1.getdataDictype().subscribe(
      (data: DicType[]) => {
        this.dic_type = this.masterService.formatDataforDropdown('DicType', data, 'select', 'Id');
        console.log('test', this.dic_type);
      }
    );
  }
  getEpiStatusdetails() {
    this._data1.getdataEpistatus().subscribe(
      (data: EpiStatus[]) => {
        this.epi_status = this.masterService.formatDataforDropdown('EpiStatus', data, 'select', 'Id');
        console.log('test', this.epi_status);
      }
    );
  }
  getAutStatusdetails() {
    this._data1.getdataAutstatus().subscribe(
      (data: AutStatus[]) => {
        this.aut_status = this.masterService.formatDataforDropdown('AutStatus', data, 'select', 'Id');
        console.log('test', this.aut_status);
      }
    );
  }
  getVerStatusdetails() {
    this._data1.getdataVerstatus().subscribe(
      (data: VerStatus[]) => {
        this.ver_status = this.masterService.formatDataforDropdown('VerStatus', data, 'select', 'Id');
        console.log('test', this.ver_status);
      }
    );
  }
  getSupBillStatusdetails() {
    this._data1.getdataSuperbillstatus().subscribe(
      (data: SuperBillStatus[]) => {
        this.sup_bill_staus = this.masterService.formatDataforDropdown('SuperBillStatus', data, 'select', 'Id');
        console.log('test', this.sup_bill_staus);
      }
    );
  }
  getFavFilterdetails() {
    this._data1.getdataFavfil().subscribe(
      (data: Practice[]) => {
        this.myFilter = this.masterService.formatDataforDropdown('FavFil', data, 'select', 'Id');
        console.log('test', this.myFilter);
      }
    );
  }
}
