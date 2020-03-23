import { MainService } from './../../../services/appservices/main.service';
import { MasterService } from './../../../services/master.service';
import { ManageuserService } from './manageuser.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { SelectItemGroup } from 'primeng/api';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import * as _ from 'lodash';
interface Gender {
  id: number;
  name: string;
  label: string;
}
import { CreateNewComponent } from '../create-new/create-new.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  selectedRole = [];
  userData: any;
  @ViewChild(CreateNewComponent, { static: false }) child: CreateNewComponent;
  public rows: {
    institute: string;
    degree: string;
    study: string;
    location: string;
    from: string;
    to: string;
  }[];
  password;
  config: any;
  collection = [];
  SelectPractice: any;
  SelectLocation: any;
  ListOfData: any;
  show = false;
  childData: any;
  newArray: any;
  buttonClose: any;
  isShow: boolean;
  addForm: FormGroup;
  deleteReason: FormGroup;
  showTable = false;
  recordNotFound = false;
  showlanguage = false;
  Deletedata: any;
  ManageUserData: any[];
  practiesData: any;
  LocationData: any;
  GenderData: Gender[];
  TypesData: any;
  OrganizationData: any;
  AvailableMemberData: any;
  showLanguages: any;
  errorLog = false;
  selectearrayvalues = [];
  selectearrayvaluesLocation = [];
  selectLanguage = [];
  groupedCars: SelectItemGroup[];
  subscription: Subscription;
  getNewUser: any;
  items: SelectItem[];
  id: number;
  item: string;
  display: boolean = false;
  display1: boolean = false;
  Deletepopup: boolean = false;
  IsEclaimpopup: boolean = false;
  dialogClose;
  deleteId: any;
  constructor(
    private masterService: MasterService,
    private _data: ManageuserService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private mainService: MainService
  ) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 4,
      totalItems:this.collection.length
    };
  }

  ngOnInit() {
    this.password = 'password';
    //this.getManageUserData();
    this.getPractice();
    this.getLocation();
    this.getGenders();
    this.getTypes();
    this.getOrganization();
    this.AvailableMemberRole();
    this.getLanguages();

    this.addForm = this.fb.group({
      First_Name: new FormControl(null, [Validators.required]),
      Middle_Name: new FormControl(null),
      Last_Name: new FormControl(null, [Validators.required]),
      Email: new FormControl(null, [Validators.required]),
      DOB: new FormControl(null, [Validators.required]),
      Gender: new FormControl(null, [Validators.required]),
      Work_Phone: new FormControl(null, [Validators.required]),
      CellPhone: new FormControl(null),
      Fax: new FormControl(null),
      Secured_email: new FormControl(null),
      Secured_password: new FormControl(null),
      Practice: new FormControl(null),
      Location: new FormControl(null),
      Organization: new FormControl(null),
      Edit_reason: new FormControl(null, [Validators.required])
    });
    this.deleteResoan();
  }

  pageChange(event) {
    this.config.currentPage = event;
   }
  deleteResoan() {
    this.deleteReason = this.fb.group({
      DeleteComment: new FormControl(null, [Validators.required])
    });
  }
  showDialog(item: any) {
    this.userData = item;
    this.display = true;

    this.child.sendSelectedData(item, 'edit');
    this.id = item.id;
    this.addForm.patchValue({
      Title: item.first_Name + item.last_Name,
      First_Name: item.first_Name,
      Middle_Name: item.middle_Name,
      Last_Name: item.last_Name,
      Email: item.Email,
      DOB: item.DOB,
      Gender: item.gender,
      Work_Phone: item.work_Phone,
      CellPhone: item.cellPhone,
      Fax: item.fax,
      Secured_email: item.secured_email,
      Secured_password: item.secured_password,
      Practice: item.practice,
      Location: item.location,
      Organization: item.Organization,
      Edit_reason: item.edit_reason
    });
  }
  showDialogDeletePopup(id) {
    this.Deletepopup = true;
    this.deleteId = id;
  }
  onItemDeleted() {
    this.ManageUserData.splice(this.deleteId, 1);
    this.Deletepopup = false;
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'successfully deleted'
      });
    }, 1000);
  }

  showDialogIsEclaimpopup(id) {
    this.IsEclaimpopup = true;
  }
  messageAlertDialog() {
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Password Reset Done Successfully'
      });
    }, 1000);
  }

  unlocakclick() {
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Account Unlocked Successfully'
      });
    }, 1000);
  }

  closeDialog() {
    this.display = false;
    this.Deletepopup = false;
    this.IsEclaimpopup = false;
  }
  resetPasswordNew(item) {
    this.display1 = true;
    this.addForm.patchValue({ Email: item.email });
  }
  resetPasswordNewclose() {
    this.display1 = false;
    this.addForm.reset();
  }


  getManageUserData() {
    this._data.getManageuser().subscribe((data: any) => {
      this.ManageUserData = data;
      let listData = this.ManageUserData;
      if (this.SelectPractice != undefined || this.SelectLocation != undefined) {
         this.ManageUserData = [];
      var filterData = _.filter(listData, (v) => {
        if (v.practice === this.SelectPractice || v.location === this.SelectLocation) {
          this.ManageUserData.push(v);
          this.showTable = true;
          this.recordNotFound = false;
          }
        });
        if(this.ManageUserData.length <= 0){
            this.recordNotFound = true;
        }
      }
      else{
        this.ManageUserData = [];
        this.ManageUserData = data;
        this.recordNotFound = false;
        this.showTable = true;
      }
    });
  }
  getPractice() {
    this._data.Practice().subscribe((data: any) => {
      this.practiesData = data;

      // let listData = this.practiesData;
      // if (this.SelectPractice != null) {
      //   this.ListOfData = [];
      // var filterData = _.filter(listData, (v) => {
      //   if (v.practiesData === this.SelectPractice) {
      //     this.ListOfData.push(v);
      //     }
      //   });
      // }
    });
  }

  filterPractice(SelectedPractice) {
    this.SelectPractice = SelectedPractice.value.name;
  }
  filterLocation(SelectedLocation){
    this.SelectLocation = SelectedLocation.value.name;
  }

  getLocation() {
    this._data.Location().subscribe((data: any) => {
      this.LocationData = data;
    });
  }
  getGenders() {
    this._data.gender().subscribe((data: any) => {
      this.GenderData = data;
    });
  }
  getTypes() {
    this._data.types().subscribe((data: any) => {
      this.TypesData = data;
    });
  }

  getOrganization() {
    this._data.Organizations().subscribe((data: any) => {
      this.OrganizationData = data;
    });
  }

  AvailableMemberRole() {
    this._data.AvailableMemberRole().subscribe((data: any) => {
      this.AvailableMemberData = data;
    });
  }
  getLanguages() {
    this._data.Languages().subscribe((data: any) => {
      this.showLanguages = data;
    });
  }
  showDataContaint() {
    this.getManageUserData();
  }
  showSelectedLanguage() {
    this.showlanguage = true;
  }

  selectedlanguage(selectedValue) {
    this.selectLanguage.push(selectedValue.value.languagename);
    this.showlanguage = true;
  }
  unSelectlanguage(value) {
    this.selectLanguage.splice(value.languagename, 1);
  }

  selectedPractices(selectedValue) {
    this.selectearrayvalues.push(selectedValue.value.name);
  }

  selectedLocation(selectedvalue) {
    this.selectearrayvaluesLocation.push(selectedvalue.value.name);
  }

  selectedAvailableMemberRoles(value) {
    this.AvailableMemberData.splice(value.name, 1);
    this.selectedRole.push({
      name: value.name
    });
  }
  deselectMemberRole(value) {
    this.selectedRole.splice(value, 1);
    this.AvailableMemberData.push(value);
  }
  public onAddRowClick(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error Message',
      detail: 'Please complete the existing empty fields to add new'
    });

    this.rows.push({
      institute: '',
      degree: '',
      study: '',
      location: '',
      from: '',
      to: ''
    });
  }
  postnewData(event) {
    this.newArray = event;
  }
  updatedForm($event) {
    window.scroll(0, 0);
    this.childData = $event;
    if (this.childData.id === 0) {
      this.ManageUserData.push(this.newArray);
    } else {
      _.forEach(this.ManageUserData, e => {
        if (e.id === $event.id) {
          e.title = $event.Title;
          e.first_Name = $event.First_Name;
          e.middle_Name = $event.Middle_Name;
          e.last_Name = $event.Last_Name;
          e.email = $event.Email;
          e.DOB = $event.DOB;
          e.gender = $event.Gender;
          e.work_Phone = $event.Work_Phone;
          e.cellPhone = $event.CellPhone;
          e.fax = $event.Fax;
          e.secured_email = $event.Secured_email;
          e.secured_password = $event.Secured_password;
          e.practice = $event.Practice;
          e.location = $event.Location;

          e.edit_reason = $event.Edit_reason;
        }
      });
    }
  }
  closebutton($event) {
    this.display = $event;
  }

  showpassword() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  val1: string;

  val2: string;

  val3: string;

  val4: string;

  val5: string;

  val6: string;
}
