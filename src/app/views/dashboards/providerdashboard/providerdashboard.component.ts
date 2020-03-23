import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboadService } from '../dashboards.service';
import * as _ from 'lodash'; // interface SelectItem {
import { Dropdown } from 'primeng/dropdown';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SharedService } from '../../../services/appservices/shared.service';
import { MasterService } from '../../../services/master.service';
import { ProviderData, Practice, Location, Favfilter, Starttime, Endtime, Speciality, State, Mop, ApptMemo, POSPractice, POSLocation,
  Provider, ApmtType, ApmtStatus, DicStatus, AsstStatus, BillStatus, CaseType, DicType, EpiStatus, AutStatus, VerStatus, SuperBillStatus
} from '../../../models/providerdashboard';

@Component({
  selector: 'app-providerdashboard',
  templateUrl: './providerdashboard.component.html',
  styleUrls: ['./providerdashboard.component.scss']
})
export class ProviderDashboardComponent implements OnInit {
  index: number = -1;
  favoriteFilter: any;
  itemFilterFieldsStringsLeft: any;
  showMemoFeilds: boolean = false;
  dateTime = new Date();
  searchClicked: boolean = false;
  selectedCar: string;
  SelectPractice: any;
  practiceDRP: boolean = false;
  ShowTab: boolean = false;
  selectedColumns = [];
  Editapptdisplay: boolean = false;
  editapptForm: FormGroup;
  editData: any;
  Searchprodisplay: boolean = false;
  serprovider: any;
  Newepisodedisplay: boolean = false;
  Casemangdisplay: boolean = false;
  Addmopdisplay: boolean = false;
  Memodisplay: boolean = false;
  apptmemo: ApptMemo[] = [];
  appt_memo: string = '';
  who_added: string = '';
  when_added: string = '';
  Tagdisplay: boolean = false;
  membertag: any;
  searchtagmember: boolean = false;
  filterdColoumn: any = [];
  filterdFields: any = [];
  deletePopup: boolean = false;
  tableDataLength;
  your: ProviderData[];

  // Filter Column Boolean

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

  // Filter Field Boolean

  Practicerow: boolean = true;
  Locationrow: boolean = true;
  POSPracticerow: boolean = true;
  POSLocationrow: boolean = true;
  Providerrow: boolean = true;
  PatientNamerow: boolean = true;
  Accountrow: boolean = true;
  Caserow: boolean = true;
  AppointmentFromDaterow: boolean = true;
  AppointmentToDaterow: boolean = true;
  AppointmentTyperow: boolean = true;
  AppointmentStatusrow: boolean = true;
  DictationStatusrow: boolean = true;
  AssessmentStatusrow: boolean = true;
  BillingStatusrow: boolean = true;
  CaseTyperow: boolean = true;
  DictationTyperow: boolean = true;
  EpisodeStatusrow: boolean = true;
  FavouriteFiltersrow: boolean = true;
  AuthorizationStatusrow: boolean = true;
  VerificationStatusow: boolean = true;
  AppCreatedFromDaterow: boolean = true;
  AppCreatedToDaterow: boolean = true;
  SuperBillStatusrow: boolean = true;
  IsStatFilerow: boolean = true;

  practice: Practice [];
  location: Location [];
  pos_practice: POSPractice [];
  pos_location: POSLocation [];
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

  constructor(
    private http: HttpClient,
    private _data: DashboadService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private _data1: SharedService,
    private masterService: MasterService
  ) {
    this.your = [];
    this.tableDataLength = '0';
    this.itemFilterFieldsStringsLeft = [];
    this.favoriteFilter = [];
  }

  ngOnInit() {
    const pra= {
      label: 'select',
      value: 1
    };
    const prov= {
      label: 'select',
      value: 1
    };

    this.editapptForm = this.fb.group({
      practice: new FormControl(pra, null),
      location: new FormControl(null),
      pos_practice: new FormControl(null),
      pos_location: new FormControl(null),
      provider: new FormControl(prov, null),
      patient_name: new FormControl(null),
      account: new FormControl(null),
      case: new FormControl(null),
      appt_from_date: new FormControl(null),
      appt_to_date: new FormControl(null),
      appt_type: new FormControl(null),
      appt_status: new FormControl(null),
      dic_ststus: new FormControl(null),
      asse_ststus: new FormControl(null),
      bill_status: new FormControl(null),
      case_type: new FormControl(null),
      dic_type: new FormControl(null),
      epi_status: new FormControl(null),
      fav_fil: new FormControl(null),
      aut_status: new FormControl(null),
      ver_status: new FormControl(null),
      app_cre_from_date: new FormControl(null),
      app_cre_to_date: new FormControl(null),
      sup_bill_staus: new FormControl(null)
    });

    this.Searchprovider();
    this.apptmemotable();
    this.tagmemtable();
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
  getyourtable() {
    this._data.getyourdrs().subscribe((data: ProviderData[]) => {
      console.log(data);
      this.your = data;
      console.log(this.your);

      if(this.editapptForm.value.practice == null || this.editapptForm.value.location == null) {
        const pra = {
          label: 'select',
          value: 1
        };
        const prov = {
          label: 'select',
          value: 1
        };
      }

      let listData = this.your;
        this.your = [];
        var filterData = _.filter(listData, v => {
          if (v.location === this.editapptForm.value.practice.label || v.provider === this.editapptForm.value.provider.label) {
            this.your.push(v);
            console.log('list data', this.your);
            this.tableDataLength = this.your.length;
          }
          if (this.editapptForm.value.practice.label === 'select' && this.editapptForm.value.provider.label === 'select') {
            this.your.push(v);
            this.tableDataLength = this.your.length;
          }
        });
    });
  }

  closeEditAppt() {
    this.Editapptdisplay = false;
  }

  searcResult($event) {
    console.log('for', this.editapptForm.value);
    this.index = (this.index <= 0) ? 3 : this.index - 1;
    this.getyourtable();
    this.ShowTab = true;
  }
  showMemo(selectedDate) {
    this.showMemoFeilds = true;
  }
  Send(SelectedPractice) {
    console.log('SelectedPractice', SelectedPractice.value);
    this.SelectPractice = SelectedPractice.value;
  }
  Change() {
    this.practiceDRP = true;
  }
  clearFilter(dropdown: Dropdown) {
    alert('HI');
    dropdown.resetFilter();
  }
  setColumnsDefaultValue() {
    this.selectedColumns = this.practice;
  }

  Editappt(item: any) {
    this.editData = item;
    this.editapptForm.patchValue({
      appt_type: this.editData.appt_type,
      location: this.editData.location
    });
    console.log(this.editapptForm);
    this.Editapptdisplay = true;
  }
  SearchProvider() {
    this.Searchprodisplay = true;
  }
  onsearchProvider() {
    this.searchClicked = true;
  }
  closeSearchPro() {
    this.Searchprodisplay = false;
  }
  Searchprovider() {
    this._data.getserprovider().subscribe(data => {
      console.log(data);
      this.serprovider = data;
      console.log(this.serprovider);
    });
  }
  Newepisode() {
    this.Newepisodedisplay = true;
  }
  closeNewEpisode() {
    this.Newepisodedisplay = false;
  }
  Casemang() {
    this.Casemangdisplay = true;
  }
  closeCaseMang() {
    this.Casemangdisplay = false;
  }
  Addmop() {
    this.Addmopdisplay = true;
  }
  closeAddmop() {
    this.Addmopdisplay = false;
  }
  viewSuperBill() {
    window.print();
  }
  moreInfo(item: any) {
  }
  Apptmemo() {
    this.Memodisplay = true;
  }
  closeMemo() {
    this.Memodisplay = false;
  }
  apptmemotable() {
    this._data.getapptmemo().subscribe((data: ApptMemo[]) => {
      this.apptmemo = data;
      console.log('memodetails', this.apptmemo);
    });
  }
  onSaveMemo(f) {
    this.apptmemo.push(
      new ApptMemo(this.appt_memo, this.who_added, this.when_added)
    );
  }
  memotag() {
    this.Tagdisplay = true;
  }
  closeTagmem() {
    this.Tagdisplay = false;
  }
  tagmemtable() {
    this._data.gettagmem().subscribe(data => {
      console.log(data);
      this.membertag = data;
      console.log(this.membertag);
    });
  }
  ontagmember() {
    this.searchtagmember = true;
  }
  filterColoumn($event) {
    this.filterdColoumn = $event;

    if (this.filterdColoumn.length !== 0) {
    for (let i = 0; i <= this.filterdColoumn.length; i++) {
      if (this.filterdColoumn[i] === 'Location') {
        this.Location = false;
      } else if (this.filterdColoumn[i] === 'Provider') {
        this.Provider = false;
      } else if (this.filterdColoumn[i] === 'Patient Name') {
        this.PatientName = false;
      } else if (this.filterdColoumn[i] === 'Case #') {
        this.Case = false;
      } else if (this.filterdColoumn[i] === 'Appointment From Date') {
        this.AppointmentFromDate = false;
      } else if (this.filterdColoumn[i] === 'Authorization Status') {
        this.AuthorizationStatus = false;
      } else if (this.filterdColoumn[i] === 'MOP') {
        this.MOP = false;
      } else if (this.filterdColoumn[i] === 'Super Bill Status') {
        this.SuperBillStatus = false;
      } else if (this.filterdColoumn[i] === 'Checked In Time') {
        this.CheckedInTime = false;
      } else if (this.filterdColoumn[i] === 'Appointment Created From Date') {
        this.AppointmentCreatedFromDate = false;
      } else if (this.filterdColoumn[i] === 'Verification Status') {
        this.VerificationStatus = false;
      } else if (this.filterdColoumn[i] === 'Case Details') {
        this.CaseDetails = false;
      } else if (this.filterdColoumn[i] === 'Appointment Status') {
        this.AppointmentStatus = false;
      } else if (this.filterdColoumn[i] === 'Dictation Type') {
        this.DictationType = false;
      } else if (this.filterdColoumn[i] === 'Assessment Status') {
        this.AssessmentStatus = false;
      } else if (this.filterdColoumn[i] === 'POS Location') {
        this.POSLocation = false;
      } else if (this.filterdColoumn[i] === 'Video Session') {
        this.VideoSession = false;
      } else if (this.filterdColoumn[i] === 'Dictation Status') {
        this.DictationStatus = false;
      } else if (this.filterdColoumn[i] === 'Billing Status') {
        this.BillingStatus = false;
      } else if (this.filterdColoumn[i] === 'Appointment Type') {
        this.AppointmentType = false;
      }
    }
}
 else {
 this.Location = true;
 this.Provider = true;
 this.PatientName = true;
 this.Case = true;
 this.AppointmentFromDate = true;
 this.AuthorizationStatus = true;
 this.MOP = true;
 this.SuperBillStatus = true;
 this.CheckedInTime = true;
 this.AppointmentCreatedFromDate = true;
 this.VerificationStatus = true;
 this.CaseDetails = true;
 this.AppointmentStatus = true;
 this.DictationType = true;
 this.AssessmentStatus = true;
 this.POSLocation = true;
 this.VideoSession = true;
 this.DictationStatus = true;
 this.BillingStatus = true;
 this.AppointmentType = true;
 }

}
  filterFields($event) {
    this.itemFilterFieldsStringsLeft = $event;
  }
  reset($event) {
    this.editapptForm.reset();
  }


  delete(id: number) {
    this.myFilter.splice(id, 1);
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'deleted successfully'
      });
    }, 1000);
    console.log(this.myFilter);
    this.deletePopup = false;
  }
  deletepopup() {
    this.deletePopup = true;
  }
  closeDeletePopup() {
    this.deletePopup = false;
  }
  saveFilter(Data) {
    this.itemFilterFieldsStringsLeft = Data;
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
