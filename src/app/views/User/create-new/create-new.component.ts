import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/primeng';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { MasterService } from '../../../services/master.service';
import { MainService } from '../../../services/appservices/main.service';
import { DoctordataService } from '../../doctors/doctordata.service';
import { ManageuserService } from '../manage-user/manageuser.service';
import * as _ from 'lodash';
import { CreateNew } from './createuser';
import { Gender } from '../../../models/gender';
import { AvailableMemberRoles } from '../../../models/availablememberroles';
import { Pracices } from '../../../models/practices';
import { Location } from '../../../models/locations';
import { Languages } from '../../../models/languages';
import { Organizations } from '../../../models/organizations';


@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewComponent implements OnInit {
  checked: boolean = true;
  public rows: {
    institute: string;
    degree: string;
    study: string;
    location: string;
    from: string;
    to: string;
  }[];
  @Output() emit1 = new EventEmitter();
  @Output() emitNewData = new EventEmitter();
  @Output() closebuttonEmit = new EventEmitter();
  @Output() emitMessage = new EventEmitter();
  gender: SelectItem[];
  display: boolean = false;
  id: number;
  enderecoGroup: any;
  cities1: SelectItem[];
  myDateValue: Date;
  selectedCar2: string;
  val4: string;
  newuserform: FormGroup;
  neweducation: FormGroup;
  Passgroup: FormGroup;
  FormErrorObj: any;
  FormErrorObj1: any;
  ListOfPractices: any[];
  ListOfOrgs: any[];
  practiesData: any;
  uploadedPhotos: any[] = [];
  GenderData: Gender[];
  defaultCheck = true;
  genders: any;
  practices: Pracices[];
  locations: Location[];
  languages: Languages[];
  organizations: Organizations[];
  memberroles: AvailableMemberRoles[];
  memberroles1 = [];
  category = [];
  box: boolean = false;
  box1: boolean = false;
  box2: boolean = false;
  AvailableMemberData: any;
  AvailableMemberData1: any;
  selectedRole = [];
  selectearrayvalues = [];
  selectearrayvaluesLocation = [];
  selecteLanguages = [];
  selectLanguage = [];
  selectPractice = [];
  selectoangn = [];
  isEdit: boolean = false;
  showlanguage = false;
  showOang = false;
  showPrcLoctn = false;
  showLanguages: any;
  LocationData: any;
  holdArray: any;
  selectpraclocation: any;
  url = 'assets/dummypic.jpg';
  showlocation = false;
  showPractice = false;
  array: CreateNew[];


  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private masterService: MasterService,
    private mainService: MainService,
    private doctorsdata: DoctordataService,
    private _data: ManageuserService,
    private router: Router
  ) {
    this.holdArray = [];
    this.selectpraclocation = [];
    this.rows = [];
  }

  ngOnInit() {
    this.getLanguages();
    this.getLocations();
    this.getOrganization();
    this.getPractices();
    this.getMemberRoles();
    this.getGenders();
    this.getPractice();
    this.getLocation();
    this.AvailableMemberRole();
    this.myDateValue = new Date();

    this.Passgroup = this.fb.group({
      user_password_group: new FormGroup(
        {
          user_password: new FormControl(null, [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"), Validators.minLength(5)]),
          user_confirm_password: new FormControl(null, Validators.required)
        },
        this.matchPassword.bind(this)
      ),
    });
    this.newuserform = this.fb.group(
      {
        Title: new FormControl(null),
        First_Name: new FormControl(null, [Validators.required]),
        Middle_Name: new FormControl(null),
        Last_Name: new FormControl(null, [Validators.required]),
        DOB: new FormControl(null),
        Gender: new FormControl(null),
        Email: [
          null,
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
          ]
        ],
        Work_Phone: new FormControl(null),
        EXTN: new FormControl(null),
        CellPhone: new FormControl(null),
        Fax: new FormControl(null),
        Secured_email: new FormControl(null),
        Secured_password: new FormControl(null),
        Practice: new FormControl(null),
        Location: new FormControl(null),
        Language_lan: new FormControl(null),
        Organization: new FormControl(null),
        Edit_reason: new FormControl(null),
        Image: new FormControl(null),
      }
    );

    this.FormErrorObj = {
      UserName: { required: "User Name can not be empty" },
      Email: { required: "The Email field is not a valid e-mail address.", pattern: "Please enter valid email address" },

    };

    this.FormErrorObj1 = {
      user_password_group: {
        user_password: { required: "User Name is required" },
        user_confirm_password: { required: "user_confirm_password is required." }
      }
    };
    this.neweducation = this.fb.group({
      institute: new FormControl(null, Validators.required),
      degree: new FormControl(null, Validators.required),
      study: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      from: new FormControl(null, Validators.required),
      to: new FormControl(null, Validators.required)
    });
  }

  checked1() {
    this.box1 = true;
  }

  checked2() {
    this.box2 = true;
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getPractices() {
    this._data.Practice().subscribe((data: Pracices[]) => {
      this.practices = data;
    });
  }

  getLocations() {
    this._data.Location().subscribe((data: Location[]) => {
      this.locations = data;
    });
  }

  getLanguages() {
    this._data.Languages().subscribe((data: Languages[]) => {
      this.languages = data;
    });
  }

  getOrganization() {
    this._data.Organizations().subscribe((data: Organizations[]) => {
      this.organizations = data;
    });
  }

  getMemberRoles() {
    this._data.MemberRoles().subscribe((data: AvailableMemberRoles[]) => {
      this.memberroles = data;
    });
  }

  onPhotoUpload(event) {
    for (let file of event.files) {
      this.uploadedPhotos.push(file);
    }
  }

  OnSubmitForm() {
    const isValid = this.masterService.getFormErrorMessage(
      this.newuserform,
      this.FormErrorObj
    );
    if (isValid !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        detail: isValid
      });
    }

    else if (!this.Passgroup.value.user_password_group.user_password) {
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        detail: "User Password is required"
      });
    }

    else if (!this.Passgroup.value.user_password_group.user_confirm_password) {
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        detail: "User confirm Password is required"
      });
    }

    else if (this.Passgroup.value.user_password_group.user_confirm_password !== this.Passgroup.value.user_password_group.user_password) {
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        detail: "User Password and User confirm Password Both should match"
      });
    }
    else if (this.Passgroup.get('user_password_group').get('user_password').hasError('pattern') &&
      !this.Passgroup.get('user_password_group').get('user_password').pristine) {
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        detail: "User Password field does not meet the rquirement"
      });
    }


    else {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Successfully Submitted...'
      });
      setTimeout(() => {
        this.mainService.sendMessage(false);
      }, 1000);
      this.array = [];
      this.array.push(this.newuserform.value);
      this.array.push(this.Passgroup.value);
      this.array.push(this.neweducation.value);
      console.log(this.array);
      this.box = false;
      this.showlanguage = false;
      this.showOang = false;
      this.showPrcLoctn = false;
      this.rows.pop();
      this.selectLanguage = [];
      this.selectoangn = [];
      this.selectpraclocation = [];
      this.selectedRole = [];
      this.holdArray = [];
      this.selectearrayvaluesLocation = [];
      this.url = 'assets/dummypic.jpg';
      this.getMemberRoles();
      this.newuserform.reset();
      this.Passgroup.reset()
      this.neweducation.reset();

    }

  }


  public onAddRowClick(): void {
    if (
      this.neweducation.value.institute == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please complete the existing empty fields to add new'
      });
    }

    else if (
      this.neweducation.value.degree == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please complete the existing empty fields to add new'
      });
    }
    else if (
      this.neweducation.value.study == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please complete the existing empty fields to add new'
      });
    }
    else if (
      this.neweducation.value.location == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please complete the existing empty fields to add new'
      });
    }

    else {
      this.rows.push({
        institute: '',
        degree: '',
        study: '',
        location: '',
        from: '',
        to: ''
      });
    }
    this.array = [];
    this.array.push(this.neweducation.value);

  }

  public onRemoveRowClick(): void {
    this.rows.pop();
  }

  matchPassword(x: AbstractControl): { [y: string]: boolean } {
    let password = x.get('user_password').value;
    let cnfmpassword = x.get('user_confirm_password').value;
    if (password != cnfmpassword) {
      return { passwordNotMatched: true };
    }
    return null;
  }
  selectedAvailableMemberRoles(index, value) {
    this.box = true;
    this.memberroles.splice(index, 1);
    this.selectedRole.push({
      isChecked: true,
      id: value.id,
      name: value.name
    });
  }

  deselectMemberRole1(index, value) {
    this.selectedRole.splice(index, 1);
    value.isChecked = false;
    this.memberroles.push(value);
    if (this.selectedRole.length === 0) {
      this.box = false;
    }
    this.selectpraclocation = [];
    this.showPrcLoctn = false;

  }


  selectedPractices(selectedValue) {
    this.selectearrayvalues = [];
    this.selectearrayvalues.push(selectedValue.value.name);
    this.showPractice = true;
  }

  selectedLocation(selectedvalue) {
    this.selectearrayvaluesLocation.push(selectedvalue.value.name);
    this.holdArray.push(this.selectearrayvalues);
    this.selectpraclocation.push(
      this.selectearrayvalues + ' ' + selectedvalue.value.name
    );
    this.showPrcLoctn = true;
  }

  selectedLanguage(selectedvalue) {
    this.selecteLanguages.push(selectedvalue.value.languagename);
  }

  sendSelectedData(item, value) {
    if (value === 'edit') {
      this.id = item.id;
      this.isEdit = true;
    } else {
      this.isEdit = false;
      this.id = 0;
    }
    this.enderecoGroup = item;
    this.newuserform.reset();
    this.newuserform.patchValue({
      Title: this.enderecoGroup.title,
      First_Name: this.enderecoGroup.first_Name,
      Middle_Name: this.enderecoGroup.middle_Name,
      Last_Name: this.enderecoGroup.last_Name,
      Email: this.enderecoGroup.email,
      DOB: this.enderecoGroup.DOB,
      Gender: this.enderecoGroup.gender,
      Work_Phone: this.enderecoGroup.work_Phone,
      CellPhone: this.enderecoGroup.cellPhone,
      Fax: this.enderecoGroup.fax,
      Secured_email: this.enderecoGroup.secured_email,
      Secured_password: this.enderecoGroup.secured_password,
      Practice: this.enderecoGroup.practice,
      Location: this.enderecoGroup.location,
      Language_lan: this.enderecoGroup.languagename,
      Organization: this.enderecoGroup.Organization,
      Edit_reason: this.enderecoGroup.edit_reason
    });
    this.showlanguage = true;
    for (let i = 0; i < this.enderecoGroup.languagename.length; i++) {
      this.selectLanguage.push(this.enderecoGroup.languagename[i]);
    }
    this.showOang = true;
    for (let i = 0; i < this.enderecoGroup.Organization.length; i++) {
      this.selectoangn.push(this.enderecoGroup.Organization[i]);
    }
  }
  messageAlert1() {
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Password Reset Done'
      });
    }, 1000);
  }

  closeDialog() {
    this.display = false;
  }

  onFormsubmit(newuserform) {
    const ErrorMsgNotification = this.masterService.getFormErrorMessage(
      this.newuserform,
      this.newuserform
    );
    if (ErrorMsgNotification !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: ErrorMsgNotification
      });
    }
    const test = this.newuserform.value;
    test.id = this.id === undefined || this.id === 0 ? 0 : this.id;
    if (test.id === 0 || null) {
    } else if (test.id !== 0 || null) {
      this.emit1.emit(test);
    }
    if (newuserform.status === 'VALID') {
      this.closebuttonEmit.emit(false);
      this.display = false;
      const successMessage = 'Successfuly Updated';
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: successMessage
      });
    }
    this.newuserform.reset();
  }

  getPractice() {
    this._data.Practice().subscribe((data: any) => {
      this.practiesData = data;
    });
  }

  getLocation() {
    this._data.Location().subscribe((data: any) => {
      this.LocationData = data;
    });
  }

  oranzn(selectedValue) {
    this.selectoangn.push(selectedValue.value.name);
    this.showOang = true;
  }

  unSelectlong(id) {
    this.selectoangn.splice(id, 1);
    if (this.selectoangn.length === 0) {
      this.showOang = false;
    }
  }

  selectedlanguage(selectedValue) {
    this.selectLanguage.push(selectedValue.value.languagename);
    this.showlanguage = true;
  }

  unSelectlanguage(value) {
    this.selectLanguage.splice(value, 1);
    if (this.showPrcLoctn === null) {
      const formElement1 = document.getElementById('lanid');
      formElement1.style.display = 'none';
    }
    if (this.selectLanguage.length === 0) {
      this.showlanguage = false;
    }
  }

  unSelectPractice(value) {
    this.selectPractice.splice(value, 1);
    if (this.showPrcLoctn === null) {
      const formElement1 = document.getElementById('lanid');
      formElement1.style.display = 'none';
    }
  }

  unSelectpractlocation(name, id) {
    this.selectpraclocation.splice(id, 1);
    this.holdArray.splice(id, 1);
    this.selectearrayvaluesLocation.splice(id, 1);
    if (this.showPrcLoctn === null) {
      const formElement = document.getElementById('unseledataid');
      formElement.style.display = 'none';
    }
    if (this.holdArray.length === 0) {
      this.showPrcLoctn = false;
    }
  }

  getGenders() {
    this._data.gender().subscribe((data: Gender[]) => {
      this.GenderData = data;
    });
  }

  AvailableMemberRole() {
    this._data.AvailableMemberRole().subscribe((data: any) => {
      this.AvailableMemberData1 = data;
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }


  selectedAvailableMemberRoles1(index, value) {
    this.AvailableMemberData1.splice(index, 1);
    this.selectedRole.push({
      id: value.id,
      name: value.name,
      isChecked: true
    });
  }

  deselectMemberRole(index, value) {
    this.selectedRole.splice(index, 1);
    value.isChecked = false;
    this.AvailableMemberData1.push(value);
  }

}