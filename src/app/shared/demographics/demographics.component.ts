import { Gender } from './../../models/gender';
import { PhoneType } from './../../models/phone';
import { SexualOrientation, GenderIdentity, MaritalStatus, State, Language, Race, Ethnicity, SmokingStatus, Alcohol } from './../../models/demographics';
import { MasterService } from './../../services/master.service';
import { AppConstant } from './../../app.constant';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/appservices/shared.service';
import * as moment from 'moment';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Phone } from '../../models/phone';
import { PatientRecord } from '../../models/demographics';

@Component({
  selector: 'app-demographics',
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.scss'],
})
export class DemographicsComponent implements OnInit {
  today = new Date();
  restrictDobDate;
  selIndexdel: number = null;
  selectedIndexForEdit: number = null;
  btnTitle: string = 'Add';
  showanother: boolean = false;
  NewRecordAddForPhone: Phone[] = [];
  patientData: PatientRecord;
  patientPhone: Phone [] = [];
  genderOpt: Gender[];
  sexualOrientationOpt: SexualOrientation[];
  genderIdentityOpt: GenderIdentity[];
  maritalStatusOpt: MaritalStatus[];
  statesOpt: State[];
  languageOpt: Language[];
  raceOpt: Race[];
  ethinicityOpt: Ethnicity[];
  smokingStatusOpt: SmokingStatus[];
  alcoholOpt: Alcohol[];
  phoneOpt: PhoneType[];
  selectedRace: any[] = [];
  selectedGranularRace: any[] = [];
  selectedEthnicity: any[] = [];
  selectedGranularEthnicity: any[] = [];
  showselectedGranularEthnicity = false;
  showselectedEthnicity = false;
  showselectedGranularRace = false;
  showselectedRace = false;
  showExtensionControl = false;
  showOtherPhoneType = false;
  showOtherGenderIdentity = false;
  showSmokeControls = false;

  constructor(
    private dataService: SharedService,
    private fb: FormBuilder,
    private masterService: MasterService,
    private messageService: MessageService
  ) { }
  patientFormRecord: FormGroup;
  ContactInformationForm: FormGroup;
  EditDisplayDialog;
  capturePhotoDialog;
  haltEscapeDialogClose;
  uploadedImage;
  imageUrl: any = '';

  // WebCam
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public webcamImage: WebcamImage = null;
  public errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
      console.warn('Camera access was not allowed by user!');
    }
    this.errors.push(error);
    console.log(this.errors);
  }

  public handleImage(webcamImage: WebcamImage): void {
    if (this.errors.length === 0) {
      console.info('received webcam image', webcamImage);
      // this.pictureTaken.emit(webcamImage);
      this.webcamImage = webcamImage;
      this.patientData.ContactInformation.ProfilePicture = webcamImage;
      this.uploadedImage = false;
      console.log(this.webcamImage.imageAsDataUrl);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Captured Photo Successfully'
      });
    }
    this.messageService.add({
      severity: 'error',
      // summary: 'success',
      detail: 'Sorry Camera Didn"t Enabled'
    });
    this.capturePhotoDialog = false;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  ngOnInit() {
    this.getPatientRecords();
    this.getFormControls();
  }

  getFormControls() {
    this.patientFormRecord = this.fb.group({
      Id: [],
      FirstName: [null, [Validators.required]],
      LastName: [null, [Validators.required]],
      MiddleName: [null],
      PatientDOB: [null, [Validators.required]],
      BirthGender: [null, [Validators.required]],
      SexualOrientation: [null, [Validators.required]],
      GenderIdentity: [null],
      OtherGenderIdentity: [null],
      MaritalStatus: [null],
      Email: [null, [Validators.email]],
      SSN: [null],
      AddressLine1: [null],
      AddressLine2: [null],
      Zip: [null],
      City: [null],
      State: [null],
      PreferredLanguage: [null],
      Race: [null],
      GranularRace: [null],
      Ethnicity: [null],
      GranularEthnicity: [null],
      Suffix: [null],
      PreviousName: [null],
      SmokingStatus: [null],
      Alcohol: [null],
      Drug: [null],
      HeightFt: [null],
      HeightIn: [null],
      Weight: [null],
      AuthPhone: [true],
      AuthEmail: [true],
      AuthText: [true],
      StartDate: [null],
      EndDate:  [null],
      Comments: [null],
      ContactInformation: this.fb.group({
        Comments: [null, [Validators.required]],
      })
    });
    this.ContactInformationForm = this.fb.group({
      Id: [null],
      PhoneType: [null, [Validators.required]],
      PhoneNumber: [null, [Validators.required]],
      Primary: [true],
      OtherPhoneType: [''],
      Extension: ['']
    });
  }
  getPatientRecords() {
    this.dataService.getPatientDemographicsData().subscribe(
      (data) => {
        this.patientData = data[0];
        const PhoneArr = this.patientData.ContactInformation.Phone;
        this.patientPhone = PhoneArr;
        console.log(this.patientData);
      }
    );
  }

  getDropdownGender() {
    this.dataService.getDropDownGender().subscribe(
      (data) => {
        this.genderOpt = this.masterService.formatDataforDropdown(
          'Name',
          data,
          'Select',
          'Name'
        );
      }
    );
  }
  getDropdownSexualOrientation() {
    this.dataService.getDropDownSexualOrientation().subscribe(
      (data) => {
        this.sexualOrientationOpt = this.masterService.formatDataforDropdown(
          'Name',
          data,
          'Select',
          'Name'
        );
      }
    );
  }
  getDropdownGenderIdentity() {
    this.dataService.getDropDownGenderIdentity().subscribe(
      (data) => {
        this.genderIdentityOpt = this.masterService.formatDataforDropdown(
          'Name',
          data,
          'Select',
          'Name'
        );
      }
    );
  }
  getDropdownMaritalStatus() {
    this.dataService.getDropDownMaritalStatus().subscribe(
      (data) => {
        this.maritalStatusOpt = this.masterService.formatDataforDropdown(
          'Name',
          data,
          'Select',
          'Name'
        );
      }
    );
  }
  getDropdownStates() {
    this.dataService.getDropDownStates().subscribe(
      (data) => {
        this.statesOpt = this.masterService.formatDataforDropdown(
          'Name',
          data,
          'Select',
          'Name'
        );
      }
    );
  }
  getDropdownLanguage() {
    this.dataService.getDropDownLanguages().subscribe(
      (data) => {
        this.languageOpt = this.masterService.formatDataforDropdown(
          'Name',
          data,
          'Select',
          'Name'
        );
      }
    );
  }
  getDropdownRace() {
    this.dataService.getDropDownRace().subscribe(
      (data) => {
        this.raceOpt = this.masterService.formatDataforDropdown(
          'Name',
          data,
          'Select',
          'Name'
        );
      }
    );
  }
  getDropdownEthnicity() {
    this.dataService.getDropDownEthnicity().subscribe(
      (data) => {
        this.ethinicityOpt = this.masterService.formatDataforDropdown(
          'Name',
          data,
          'Select',
          'Name'
        );
      }
    );
  }
  getDropdownSmokingStatus() {
    this.dataService.getDropDownSmokingStatus().subscribe(
      (data) => {
        this.smokingStatusOpt = this.masterService.formatDataforDropdown(
          'Name',
          data,
          'Select',
          'Name'
        );
      }
    );
  }
  getDropdownAlcohol() {
    this.dataService.getDropDownAlcoholStatus().subscribe(
      (data) => {
        this.alcoholOpt = this.masterService.formatDataforDropdown(
          'Name',
          data,
          'Select',
          'Name'
        );
      }
    );
  }
  getDropDownPhoneType() {
    this.dataService.getDropDownPhoneTypes().subscribe(
      (data) => {
        this.phoneOpt = this.masterService.formatDataforDropdown(
          'Name',
          data,
          'Select',
          'Name'
        );
      }
    );
  }
  onSelectPhoneType(selectedVal) {
    if (selectedVal.value === 'Work') {
      this.showExtensionControl = true;
      this.showOtherPhoneType = false;
    } else if (selectedVal.value === 'Other') {
      this.showOtherPhoneType = true;
      this.showExtensionControl = false;
    } else {
      this.showExtensionControl = false;
      this.showOtherPhoneType = false;
    }
  }
  onSelectGender(selectedVal) {
    if (selectedVal.value === 'Additional gender category or other, please specify') {
      this.showOtherGenderIdentity = true;
    } else {
      this.showOtherGenderIdentity = false;
    }
  }
  onSelectedRace(selectedValue) {
    if (this.selectedRace.length === 0) {
      this.selectedRace.push(selectedValue.value);
    } else {
      for (let i = 0; i < this.selectedRace.length;) {
        if (selectedValue.value === this.selectedRace[i]) {
          i = this.selectedRace.length;
          this.messageService.add({
            severity: 'warn',
            summary: '',
            detail: selectedValue.value + ' ' + 'Already Selected'
          });
        } else if (selectedValue.value.id !== this.selectedRace[i]) {
          i = i + 1;
          if (this.selectedRace.length !== i) {
          } else {
            this.selectedRace.push(selectedValue.value);
            i = this.selectedRace.length;
          }
        }
      }
    }
    this.showselectedRace = true;
  }
  unSelectedRace(i) {
    this.selectedRace.splice(i, 1);
    if (this.selectedRace.length === 0) {
      this.showselectedRace = false;
    }
  }
  onSelectedGranularRace(selectedValue) {
    if (this.selectedGranularRace.length === 0) {
      this.selectedGranularRace.push(selectedValue.value);
    } else {
      for (let i = 0; i < this.selectedGranularRace.length;) {
        if (selectedValue.value === this.selectedGranularRace[i]) {
          i = this.selectedGranularRace.length;
          this.messageService.add({
            severity: 'warn',
            summary: '',
            detail: selectedValue.value + ' ' + 'Already Selected'
          });
        } else if (selectedValue.value.id !== this.selectedGranularRace[i]) {
          i = i + 1;
          if (this.selectedGranularRace.length !== i) {
          } else {
            this.selectedGranularRace.push(selectedValue.value);
            i = this.selectedGranularRace.length;
          }
        }
      }
    }
    this.showselectedGranularRace = true;
  }
  unSelectedGranularRace(i) {
    this.selectedGranularRace.splice(i, 1);
    if (this.selectedGranularRace.length === 0) {
      this.showselectedGranularRace = false;
    }
  }
  onSelectedEthnicity(selectedValue) {
    if (this.selectedEthnicity.length === 0) {
      this.selectedEthnicity.push(selectedValue.value);
    } else {
      for (let i = 0; i < this.selectedEthnicity.length;) {
        if (selectedValue.value === this.selectedEthnicity[i]) {
          i = this.selectedEthnicity.length;
          this.messageService.add({
            severity: 'warn',
            summary: '',
            detail: selectedValue.value + ' ' + 'Already Selected'
          });
        } else if (selectedValue.value.id !== this.selectedEthnicity[i]) {
          i = i + 1;
          if (this.selectedEthnicity.length !== i) {
          } else {
            this.selectedEthnicity.push(selectedValue.value);
            i = this.selectedEthnicity.length;
          }
        }
      }
    }
    this.showselectedEthnicity = true;
  }
  unSelectedEthnicity(index) {
    this.selectedEthnicity.splice(index, 1);
    if (this.selectedEthnicity.length === 0) {
      this.showselectedEthnicity = false;
    }
  }
  onSelectedGranularEthnicity(selectedValue) {
    if (this.selectedGranularEthnicity.length === 0) {
      this.selectedGranularEthnicity.push(selectedValue.value);
    } else {
      for (let i = 0; i < this.selectedGranularEthnicity.length;) {
        if (selectedValue.value === this.selectedGranularEthnicity[i]) {
          i = this.selectedGranularEthnicity.length;
          this.messageService.add({
            severity: 'warn',
            summary: '',
            detail: selectedValue.value + ' ' + 'Already Selected'
          });
        } else if (selectedValue.value.id !== this.selectedGranularEthnicity[i]) {
          i = i + 1;
          if (this.selectedGranularEthnicity.length !== i) {
          } else {
            this.selectedGranularEthnicity.push(selectedValue.value);
            i = this.selectedGranularEthnicity.length;
          }
        }
      }
    }
    this.showselectedGranularEthnicity = true;
  }
  onSelectedSmoke(selectedVal) {
    if (selectedVal.value !== null) {
      this.showSmokeControls = true;
      this.patientFormRecord.get('StartDate').setValidators(Validators.required);
      this.patientFormRecord.get('EndDate').setValidators(Validators.required);
      this.patientFormRecord.get('Comments').setValidators(Validators.required);
    } else {
      this.showSmokeControls = false;
      this.patientFormRecord.get('StartDate').setErrors(null);
      this.patientFormRecord.get('EndDate').setErrors(null);
      this.patientFormRecord.get('Comments').setErrors(null);
      this.patientFormRecord.get('StartDate').clearValidators();
      this.patientFormRecord.get('EndDate').clearValidators();
      this.patientFormRecord.get('Comments').clearValidators();
    }
  }
  unSelectedGranularEthnicity(index) {
    this.selectedGranularEthnicity.splice(index, 1);
    if (this.selectedGranularEthnicity.length === 0) {
      this.showselectedGranularEthnicity = false;
    }
  }
  onPrintDemographics() {
    window.print();
  }
  onChangePhoto() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
    this.capturePhotoDialog = true;
  }
  uploadFile(event) {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      if(event.target.files[0].type === (('image/jpeg') || ('image/png'))) {
        reader.onload = () => {
              this.uploadedImage = true;
              this.imageUrl = reader.result;
              this.patientData.ContactInformation.ProfilePicture = reader.result;
              // this.registrationForm.patchValue({
              //   file: reader.result
              // });
              // this.editFile = false;
              // this.removeUpload = true;
            };
            // // ChangeDetectorRef since file is loading outside the zone
            // this.cd.markForCheck();
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: 'Photo Saved Successfully'
            });
      } else {
        this.messageService.add({
          severity: 'warn',
          detail: 'jpeg or png are Allowed!'
        });
      }
    }
  }

  onEditPatientInfo() {
    this.getDropDownPhoneType();
    this.getDropdownMaritalStatus();
    this.getDropdownAlcohol();
    this.getDropdownSmokingStatus();
    this.getDropdownEthnicity();
    this.getDropdownRace();
    this.getDropdownLanguage();
    this.getDropdownStates();
    this.getDropdownGenderIdentity();
    this.getDropdownSexualOrientation();
    this.getDropdownGender();
    this.PatchFormData();
    this.EditDisplayDialog = true;
  }
  closeDialog() {
    if (this.capturePhotoDialog) {
      this.capturePhotoDialog = false;
    } else {
      this.selectedRace = [];
      this.selectedEthnicity = [];
      this.selectedGranularEthnicity = [];
      this.selectedGranularRace = [];
      this.EditDisplayDialog = false;
    }
  }
  PatchFormData() {
    this.patientFormRecord.patchValue({
      Id: this.patientData.Id,
      FirstName: this.patientData.FirstName,
      LastName: this.patientData.LastName,
      MiddleName: this.patientData.MiddleName,
      PatientDOB: this.patientData.DateOfBirth,
      BirthGender: this.patientData.BirthGender,
      SexualOrientation: this.patientData.SexualOrientation,
      GenderIdentity: this.patientData.GenderIdentity,
      MaritalStatus: this.patientData.MaritalStatus,
      Email: this.patientData.Email,
      SSN: this.patientData.SSN,
      AddressLine1: this.patientData.Address1,
      AddressLine2: this.patientData.Address2,
      Zip: this.patientData.Zip,
      City: this.patientData.City,
      State: this.patientData.State,
      PreferredLanguage: this.patientData.Language,
      Ethnicity: this.patientData.Ethnicity,
      GranularEthnicity: this.patientData.GranularEthnicity,
      Suffix: this.patientData.Suffix,
      PreviousName: this.patientData.PreviousName,
      SmokingStatus: this.patientData.SmokingStatus,
      Alcohol: this.patientData.Alcohol,
      Drug: this.patientData.Drug,
      HeightFt: this.patientData.HeightFt,
      HeightIn: this.patientData.HeightIn,
      Weight: this.patientData.Weight,
      AuthEmail: this.patientData.ContactInformation.AuthorisationToContactPatient.Email,
      AuthText: this.patientData.ContactInformation.AuthorisationToContactPatient.Phone,
      AuthPhone: this.patientData.ContactInformation.AuthorisationToContactPatient.Text,
      Comments: this.patientData.Comments,
      StartDate: this.patientData.StartDate,
      EndDate: this.patientData.EndDate,
      ContactInformation: {
        Comments: this.patientData.ContactInformation.Comments
      }
    });
    for (let i = 0; i < this.patientData.Race.length; i++) {
      const raceElement = this.patientData.Race[i];
      this.selectedRace.push(raceElement);
      this.showselectedRace = true;
    }
    for (let i = 0; i < this.patientData.GranularRace.length; i++) {
      const raceElement = this.patientData.GranularRace[i];
      this.selectedGranularRace.push(raceElement);
      this.showselectedGranularRace = true;
    }
    for (let i = 0; i < this.patientData.Ethnicity.length; i++) {
      const raceElement = this.patientData.Ethnicity[i];
      this.selectedEthnicity.push(raceElement);
      this.showselectedEthnicity = true;
    }
    for (let i = 0; i < this.patientData.GranularEthnicity.length; i++) {
      const raceElement = this.patientData.GranularEthnicity[i];
      this.selectedGranularEthnicity.push(raceElement);
      this.showselectedGranularEthnicity = true;
    }
  }
  onFormEdit(formItem: Phone, value: string, selIndex) {
    console.log(selIndex);
    this.selIndexdel = formItem.Id;
    console.log(formItem);
    if (formItem.Extension !== '') {
      this.showExtensionControl = true;
      this.showOtherPhoneType = false;
    } else if (formItem.OtherPhoneType !== '') {
      this.showExtensionControl = false;
      this.showOtherPhoneType = true;
    } else {
      this.showExtensionControl = false;
      this.showOtherPhoneType = false;
    }
    this.btnTitle = value;
    this.ContactInformationForm.patchValue({
      PhoneType: formItem.PhoneType,
      Primary: formItem.Primary,
      PhoneNumber: formItem.PhoneNumber,
      OtherPhoneType: formItem.OtherPhoneType,
      Extension: formItem.Extension
    });
  }
  onFormDelete(formItem, index) {
    // tslint:disable-next-line: no-shadowed-variable
    const removeIndex = this.patientPhone.map(function (formItem) { return formItem.Id; }).indexOf(0);
    this.patientPhone.splice(index, 1);
  }

  onClickEdit(item, value: string, selectedindex) {
    this.selectedIndexForEdit = selectedindex;
    console.log(selectedindex);
    this.btnTitle = value;
    console.log(item);
    this.ContactInformationForm.patchValue({
      PhoneType: item.PhoneType,
      Primary: item.Primary,
      PhoneNumber: item.PhoneNumber,
      OtherPhoneType: item.OtherPhoneType,
      Extension: item.Extension
    });
  }
  onClickDelete(item, index) {
    console.log(item);
    console.log(index);
    this.NewRecordAddForPhone.splice(index, 1);
  }
  addNewContactInfo(item) {
    const validateForm = this.masterService.getFormErrorMessage(this.ContactInformationForm, this.ContactInformationForm);
    if (validateForm !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Manadatory Fields',
        detail: validateForm
      });
    } else {
      if (this.NewRecordAddForPhone.length === 0) {
          // this.ContactInformationForm.value.Id = this.patientPhone.length + 1;
          this.ContactInformationForm.value.Id = item.Id;
          this.NewRecordAddForPhone.push(this.ContactInformationForm.value);
      } else {
        for (let i = 0; i < this.NewRecordAddForPhone.length;) {
          const element = this.NewRecordAddForPhone[i];
          if (element.Id === item.Id) {
            element.PhoneType = item.PhoneType;
            element.PhoneNumber = item.PhoneNumber;
            element.Primary = item.Primary;
            element.OtherPhoneType = item.OtherPhoneType;
            element.Extension = item.Extension;
            i = this.NewRecordAddForPhone.length;
          } else if (element.Id !== item.Id) {
            this.ContactInformationForm.value.Id = this.patientPhone.length + 1;
            this.NewRecordAddForPhone.push(this.ContactInformationForm.value);
            i = this.NewRecordAddForPhone.length;
          } else {
          }
        }
      }
    }
    console.log(this.ContactInformationForm.value);
    this.showanother = item;
    console.log(this.showanother);
    console.log(this.NewRecordAddForPhone);
    if (this.selectedIndexForEdit !== null) {
      // this.NewRecordAddForPhone.splice(this.selectedIndexForEdit, 1);
    }
    for (let i = 0; i < this.patientPhone.length; i++) {
      // const element = this.patientData.ContactInformation.Phone[i];
      if (this.selIndexdel !== null && this.selIndexdel === this.patientPhone[i].Id) {
        this.patientPhone.splice(this.selIndexdel, 1);
      }

    }
    this.ContactInformationForm.patchValue({
      PhoneType: null, PhoneNumber: null, OtherPhoneType: '', Extension: ''
    });
    this.btnTitle = 'Add';
    this.showExtensionControl = false;
    this.showOtherPhoneType = false;
  }
  resetForm() {
    this.ContactInformationForm.patchValue({
      PhoneType: null, PhoneNumber: null
    });
    this.btnTitle = 'Add';
    this.showExtensionControl = false;
    this.showOtherPhoneType = false;
  }
  getNestedFormErrorMessage(formGroupObj: FormGroup, errorObj: any) {
    // tslint:disable-next-line: forin
    for (const i in formGroupObj.controls) {
      const formControlObj = formGroupObj.controls[i];
      if (formControlObj instanceof FormControl) {
        if (formControlObj.errors) {
          // console.log(formControlObj.errors);
          if (errorObj[i]) {
            const errormsg = errorObj[i][Object.keys(formControlObj.errors)[0]];
            if (errormsg) {
              return errormsg;
            } else {
              // return i + ' is ' + Object.keys(formControlObj.errors)[0];
            }
          } else {
            return i + ' is ' + Object.keys(formControlObj.errors)[0];
          }
          //  return errorObj[i][Object.keys(formControlObj.errors)[0]];
        }
      } else if (formControlObj instanceof FormGroup) {
        const nestedformGroupObj = formControlObj;
        // tslint:disable-next-line: forin
        for (const controlIndex in nestedformGroupObj.controls) {
          const formControlObjs = nestedformGroupObj.controls[controlIndex];
          if (formControlObjs instanceof FormControl) {
            if (formControlObjs.errors) {
              if (errorObj[controlIndex]) {
                const errorMsg = errorObj[controlIndex][Object.keys(formControlObjs.errors)[0]];
                if (errorMsg) {
                  return errorMsg;
                } else { return controlIndex + 'is' + Object.keys(formControlObjs.errors)[0]; }
              } else {
                return i + ' is ' + Object.keys(formControlObjs.errors)[0];
              }
            }
          }
        }
      }
    }
  }
  onUpdate() {
    console.log('triggered');
    const validateForm = this.getNestedFormErrorMessage(this.patientFormRecord, this.patientFormRecord);
    if (validateForm !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Manadatory Fields',
        detail: validateForm
      });
    } else {
      this.patientData.FirstName = this.patientFormRecord.value.FirstName;
      this.patientData.MiddleName = this.patientFormRecord.value.MiddleName;
      this.patientData.LastName = this.patientFormRecord.value.LastName;
      this.patientData.BirthGender = this.patientFormRecord.value.BirthGender;
      this.patientData.Address1 = this.patientFormRecord.value.AddressLine1;
      this.patientData.Address2 = this.patientFormRecord.value.AddressLine2;
      this.patientData.SexualOrientation = this.patientFormRecord.value.SexualOrientation;
      this.patientData.GenderIdentity = this.patientFormRecord.value.GenderIdentity;
      this.patientData.DateOfBirth = moment(this.patientFormRecord.value.PatientDOB).format(AppConstant.API_CONFIG.DATE.dotnetDateFormat);
      this.patientData.MaritalStatus = this.patientFormRecord.value.MaritalStatus;
      this.patientData.Address1 = this.patientFormRecord.value.Address1;
      this.patientData.Address2 = this.patientFormRecord.value.Address2;
      this.patientData.Zip = this.patientFormRecord.value.Zip;
      this.patientData.City = this.patientFormRecord.value.City;
      this.patientData.State = this.patientFormRecord.value.State;
      this.patientData.Language = this.patientFormRecord.value.PreferredLanguage;
      this.patientData.Email = this.patientFormRecord.value.Email;
      this.patientData.SSN = this.patientFormRecord.value.SSN;
      this.patientData.Suffix = this.patientFormRecord.value.Suffix;
      this.patientData.PreviousName = this.patientFormRecord.value.PreviousName;
      this.patientData.SmokingStatus = this.patientFormRecord.value.SmokingStatus;
      if (this.showSmokeControls === true) {
        this.patientData.StartDate = moment(this.patientFormRecord.value.StartDate).format(AppConstant.API_CONFIG.DATE.dotnetDateFormat);
        this.patientData.EndDate = moment(this.patientFormRecord.value.EndDate).format(AppConstant.API_CONFIG.DATE.dotnetDateFormat);
      }
      this.patientData.Comments = this.patientFormRecord.value.Comments;
      this.patientData.ContactInformation.Comments = this.patientFormRecord.controls['ContactInformation'].value.Comments;
      this.patientData.Alcohol = this.patientFormRecord.value.Alcohol;
      this.patientData.Drug = this.patientFormRecord.value.Drug;
      this.patientData.HeightFt = this.patientFormRecord.value.HeightFt;
      this.patientData.HeightIn = this.patientFormRecord.value.HeightIn;
      this.patientData.Weight = this.patientFormRecord.value.Weight;
      this.patientData.ContactInformation.AuthorisationToContactPatient.Phone = this.patientFormRecord.value.AuthPhone;
      this.patientData.ContactInformation.AuthorisationToContactPatient.Text = this.patientFormRecord.value.AuthText;
      this.patientData.ContactInformation.AuthorisationToContactPatient.Email = this.patientFormRecord.value.AuthEmail;
      this.patientData.ContactInformation.ModifiedDate = moment(Date()).format('M/DD/YYYY');
      if (this.selectedRace.length !== 0) {
        for (let i = 0; i < this.selectedRace.length; i++) {
          const raceElement = this.selectedRace[i];
          if (raceElement !== this.patientData.Race[i]) {
            this.patientData.Race.push(raceElement);
          }
        }
      } else {
        this.patientData.Race = [];
      }

      if (this.selectedGranularRace.length !== 0) {
        for (let i = 0; i < this.selectedGranularRace.length; i++) {
          const granularRaceElement = this.selectedGranularRace[i];
          if (granularRaceElement !== this.patientData.GranularRace[i]) {
            this.patientData.GranularRace.push(granularRaceElement);
          }
        }
      } else {
        this.patientData.GranularRace = [];
      }
       if (this.selectedEthnicity.length !== 0 ) {
         for (let i = 0; i < this.selectedEthnicity.length; i++) {
           const ethnicityElement = this.selectedEthnicity[i];
           if (ethnicityElement !== this.patientData.Ethnicity[i]) {
             this.patientData.Ethnicity.push(ethnicityElement);
           }
         }
       } else {
        this.patientData.Ethnicity = [];
       }

       if (this.selectedGranularEthnicity.length !== 0) {
         for (let i = 0; i < this.selectedGranularEthnicity.length; i++) {
           const granularEthnicityElement = this.selectedGranularEthnicity[i];
           if (granularEthnicityElement !== this.patientData.GranularEthnicity[i]) {
             this.patientData.GranularEthnicity.push(granularEthnicityElement);
           }
         }
       } else {
        this.patientData.GranularEthnicity = [];
       }
      for (let i = 0; i < this.NewRecordAddForPhone.length;) {
        console.log(this.NewRecordAddForPhone[i].PhoneNumber);
        const req = {
          Id: this.patientData.ContactInformation.Phone.length + 1,
          PhoneType: this.NewRecordAddForPhone[i].PhoneType,
          PhoneNumber: this.NewRecordAddForPhone[i].PhoneNumber,
          Primary: this.NewRecordAddForPhone[i].Primary,
          OtherPhoneType: this.NewRecordAddForPhone[i].OtherPhoneType,
          Extension: this.NewRecordAddForPhone[i].Extension
        };
        if (this.patientData.ContactInformation.Phone.length < i) {
          if (this.patientData.ContactInformation.Phone[i].Id === this.NewRecordAddForPhone[i].Id) {
            const PhoneElement = this.patientData.ContactInformation.Phone[i];
            const formPhoneElement = this.NewRecordAddForPhone[i];
            PhoneElement.PhoneType = formPhoneElement.PhoneType;
            PhoneElement.PhoneNumber = formPhoneElement.PhoneNumber;
            PhoneElement.Primary = formPhoneElement.Primary;
            PhoneElement.OtherPhoneType = formPhoneElement.OtherPhoneType;
            PhoneElement.Extension = formPhoneElement.Extension;
        } else if (this.patientData.ContactInformation.Phone[i].Id !== this.NewRecordAddForPhone[i].Id) {
          i = i + 1;
          if (this.NewRecordAddForPhone.length !== i) {

          } else {
            this.patientData.ContactInformation.Phone.push(req);
            i = i + 1;
          }
        }
        } else {
          this.patientData.ContactInformation.Phone.push(req);
          i = i + 1;
        }
      }
      this.NewRecordAddForPhone = [];
      this.EditDisplayDialog = false;
      this.messageService.add({
        severity: 'success',
        summary: '',
        detail: 'Demographics Saved Successfully'
      });
      this.selectedRace = [];
      this.selectedEthnicity = [];
      this.selectedGranularEthnicity = [];
      this.selectedGranularRace = [];
    }
  }
}
