import { RelationshipType } from './../../models/patientcontact';
import { State } from './../../models/demographics';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { MasterService } from './../../services/master.service';
import { SharedService } from './../../services/appservices/shared.service';
import { Phone } from '../../models/phone';
import { PatientContact } from '../../models/patientcontact';

@Component({
  selector: 'app-emergency-contacts',
  templateUrl: './emergency-contacts.component.html',
  styleUrls: ['./emergency-contacts.component.scss']
})
export class EmergencyContactsComponent implements OnInit {
  emergencyContact = false;
  showExtensionControl = false;
  showOtherPhoneType = false;
  haltEscapeDialogClose;
  contactInfoId;
  Phone: Phone[] = [];
  contactFormInfoArr: Phone[] = [];
  contactForm: FormGroup;
  ContactInfoForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dataService: SharedService,
    private masterService: MasterService,
    private messageService: MessageService
  ) { }
  contactsData: PatientContact[] = [];
  contactDataLength;
  statesOpt: State[];
  relationOpt: RelationshipType[];
  phoneOpt;
  btnTitle = 'Add';

  ngOnInit() {
    this.getAllContacts();
    this.getFormControls();
  }

  getFormControls() {
    this.contactForm = this.fb.group({
      Id: [null],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      AddressLine1: [''],
      AddressLine2: [''],
      Zip: [Number],
      City: [''],
      State: [''],
      Email: ['', [Validators.email, Validators.required]],
      RelationshipType: ['', Validators.required],
      Comments: ['']
    });
    this.ContactInfoForm = this.fb.group({
      Id: [null],
      PhoneType: ['', [Validators.required]],
      PhoneNumber: [null, [Validators.required]],
      OtherPhoneType: [''],
      Extension: [''],
    });
  }

  getAllContacts() {
    this.dataService.getPatientPatientContactsData().subscribe(
      (data: any) => {
        this.contactsData = data;
        this.contactDataLength = this.contactsData.length;
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
  getDropdownRelationTypes() {
    this.dataService.getDropDownRelationShipTypes().subscribe(
      (data) => {
        this.relationOpt = this.masterService.formatDataforDropdown(
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
      this.ContactInfoForm.patchValue({
        OtherPhoneType: ''
      });
    } else if (selectedVal.value === 'Other') {
      this.showOtherPhoneType = true;
      this.showExtensionControl = false;
      this.ContactInfoForm.patchValue({
        Extension: ''
      });
    } else {
      this.ContactInfoForm.patchValue({
        OtherPhoneType: '',
        Extension: '',
      });
      this.showExtensionControl = false;
      this.showOtherPhoneType = false;
    }
  }
  onFormEdit(formItem: Phone, value: string, selIndex) {
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
      this.contactInfoId = formItem.Id;
      this.ContactInfoForm.patchValue({
        Id: formItem.Id,
        PhoneType: formItem.PhoneType,
        primary: true,
        PhoneNumber: formItem.PhoneNumber,
        OtherPhoneType: formItem.OtherPhoneType,
        Extension: formItem.Extension
      });
      this.btnTitle = 'Update';
  }
  onFormDelete(item, Id) {
    this.contactFormInfoArr.splice(Id, 1);
  }
  addNewContactInfo() {
    const validateForm = this.masterService.getFormErrorMessage(this.ContactInfoForm, this.ContactInfoForm);
    if (validateForm !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Manadatory Fields',
        detail: validateForm
      });
    } else {
      if (this.ContactInfoForm.value.Id != null) {
        for (let i = 0; i < this.contactFormInfoArr.length; i++) {
          const element = this.contactFormInfoArr[i];
          if (element.Id === this.contactInfoId) {
            element.PhoneNumber = this.ContactInfoForm.value.PhoneNumber;
            element.PhoneType = this.ContactInfoForm.value.PhoneType;
            element.OtherPhoneType = this.ContactInfoForm.value.OtherPhoneType;
            element.Extension = this.ContactInfoForm.value.Extension;
          }
        }
        this.btnTitle = 'Add';
      } else {
        this.ContactInfoForm.value.Id = this.contactFormInfoArr.length + 1;
        this.contactFormInfoArr.push(this.ContactInfoForm.value);
      }
    }
    this.ContactInfoForm.reset();
    this.showExtensionControl = false;
    this.showOtherPhoneType = false;
  }
  resetForm() {
    this.ContactInfoForm.patchValue({
      PhoneType: null, PhoneNumber: null, OtherPhoneType: null, Extension: null
    });
    this.showExtensionControl = false;
    this.showOtherPhoneType = false;
    this.btnTitle = 'Add';
  }
  openDialog(checkDialog, contact?) {
    this.getDropdownRelationTypes();
    this.getDropDownPhoneType();
    this.getDropdownStates();
    if (checkDialog === 'emergencyContact') {
      this.emergencyContact = true;
      if (contact === undefined || null) {
        this.contactForm.reset();
      } else {
        this.contactForm.patchValue({
          Id: contact.Id,
          FirstName: contact.FirstName,
          LastName: contact.LastName,
          AddressLine1: contact.AddressLine1,
          AddressLine2: contact.AddressLine2,
          Zip: contact.Zip,
          City: contact.City,
          State: contact.State,
          Email: contact.Email,
          RelationshipType: contact.RelationshipType,
          Comments: contact.Comments,
        });
        for (let i = 0; i < this.contactsData.length; i++) {
          const element = this.contactsData[i].Phone;
          for (let j = 0; j < element.length; j++) {
            if (contact.Id === this.contactsData[i].Id) {
              this.contactFormInfoArr.push(element[j]);
            }
          }
        }
      }
    }
  }

  onSubmit() {
    const validateForm = this.masterService.getFormErrorMessage(this.contactForm, this.contactForm);
    if (validateForm !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: validateForm
      });
    } else {
      if (this.contactForm.value.Id === null) {
        this.contactForm.value.Id = this.contactsData.length + 1;
        const data = {
          Id: this.contactForm.value.Id,
          FirstName: this.contactForm.value.FirstName,
          LastName: this.contactForm.value.LastName,
          AddressLine1: this.contactForm.value.AddressLine1,
          AddressLine2: this.contactForm.value.AddressLine2,
          Zip: this.contactForm.value.Zip,
          City: this.contactForm.value.City,
          State: this.contactForm.value.State,
          Email: this.contactForm.value.Email,
          RelationshipType: this.contactForm.value.RelationshipType,
          Comments: this.contactForm.value.Comments,
          Phone: []
        };
        this.contactsData.push(data);
        for (let i = 0; i < this.contactFormInfoArr.length; i++) {
          this.contactsData[this.contactsData.length - 1].Phone.push(this.contactFormInfoArr[i]);
        }
      } else {
        for (let i = 0; i < this.contactsData.length; i++) {
          if (this.contactForm.value.Id === this.contactsData[i].Id) {
            this.contactsData[i].FirstName = this.contactForm.value.FirstName;
            this.contactsData[i].LastName = this.contactForm.value.LastName;
            this.contactsData[i].AddressLine1 = this.contactForm.value.AddressLine1;
            this.contactsData[i].AddressLine2 = this.contactForm.value.AddressLine2;
            this.contactsData[i].Zip = this.contactForm.value.Zip;
            this.contactsData[i].City = this.contactForm.value.City;
            this.contactsData[i].State = this.contactForm.value.State;
            this.contactsData[i].Email = this.contactForm.value.Email;
            this.contactsData[i].RelationshipType = this.contactForm.value.RelationshipType;
            this.contactsData[i].Comments = this.contactForm.value.Comments;
            if (this.contactFormInfoArr.length === 0) {
              this.contactsData[i].Phone = [];

            } else {
              for (let j = 0; j < this.contactFormInfoArr.length; j++) {
                const itemIndex = this.contactFormInfoArr[j];
                if (this.contactsData[i].Phone.length === 0) {
                  this.contactsData[i].Phone.push(itemIndex);
                } else if (this.contactsData[i].Phone.length < j) {
                  if (itemIndex.Id === this.contactsData[i].Phone[j].Id) {
                    if (Object.keys(this.contactsData[i].Phone[j].Id).length) {
                    }
                    for (let k = 0; k < this.contactsData[i].Phone.length; k++) {
                      const phoneIndex = this.contactsData[i].Phone[k];
                      phoneIndex.Extension = itemIndex.Extension;
                      phoneIndex.OtherPhoneType = itemIndex.OtherPhoneType;
                      phoneIndex.PhoneNumber = itemIndex.PhoneNumber;
                      phoneIndex.PhoneType = itemIndex.PhoneType;
                    }
                  }
                } else {
                  this.contactsData[i].Phone.push(itemIndex);
                }
              }
            }
          }
        }
      }
      if (this.contactFormInfoArr.length === 0) {
        this.addNewContactInfo();
      } else {
        this.emergencyContact = false;
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Contact Saved Successfully'
        });
        this.contactFormInfoArr = [];
      }
      this.showExtensionControl = false;
      this.showOtherPhoneType = false;
      this.contactDataLength = this.contactsData.length;
    }
  }
  closeDialog(checkDialog) {
    if (checkDialog === 'emergencyContact') {
      this.contactFormInfoArr = [];
      this.emergencyContact = false;
    }
  }
}
