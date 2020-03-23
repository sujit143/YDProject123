import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';

import { ViewDetails } from './../../models/viewdetails';
import { MainService } from './../../services/appservices/main.service';
import { SharedService } from '../../services/appservices/shared.service';
import { MasterService } from './../../services/master.service';
import { ViewDetailsComponent } from '../dialog/view-details/view-details.component';
import { ReferralSource } from '../../models/referralsource';

@Component({
  selector: 'app-referral-source',
  templateUrl: './referral-source.component.html',
  styleUrls: ['./referral-source.component.scss']
})
export class ReferralSourceComponent implements OnInit {
  @ViewChild(ViewDetailsComponent, {static: false}) viewDetailsChild: ViewDetailsComponent;
  referralArr: ReferralSource[] = [];
  searchedRecords: any[] = [];
  providerRecords = [];
  filteredSourceToMember: any[];
  searchedRecordLength;
  searchDialogTitle;
  showMemberDetails = false;
  referralSourceDialog;
  dialogClose;
  memberDetailsDialog = false;
  searchContactDialog;
  // memberDetailsArr: ViewDetails[] = [];
  referralForm: FormGroup;
  selectedFromSource: any;
  selectedToSource: any;
  statesOpt;
  fromReferralOpt;
  toReferralOpt;
  whereDidYouHearAboutUsOpt;
  showSelfValues = false;
  showFromDetailsbtn = true;
  showToDetailsbtn = true;
  constructor
    (
      private messageService: MessageService,
      private masterService: MasterService,
      private fb: FormBuilder,
      private dataService: SharedService,
      private mainService: MainService,
      private confirmationService: ConfirmationService
    ) {
      this.mainService.getSelectedSearchItem().subscribe(
        (seletedItem: any) => {
          console.log('SelectedItem' , seletedItem);
          this.selectFromSource(seletedItem);
          this.selectToSource(seletedItem);
          this.viewDetailsChild.getViewDetails(seletedItem);
          console.log(seletedItem);
          this.getFormControlsPatched(seletedItem);
          this.searchContactDialog = false;
          console.log(this.referralForm.value);
        });
     }

  ngOnInit() {
    this.getAllReferralRecords();
    this.getFormControls();
  }

  getAllReferralRecords() {
    this.dataService.getReferralSourceRecords().subscribe(
      (data: ReferralSource[]) => {
        this.referralArr = data;
      }
    );
  }
  selectFromSource(event) {
    this.viewDetailsChild.getViewDetails(event);
    this.selectedFromSource = event.Name;
  }
  selectToSource(event) {
    this.viewDetailsChild.getViewDetails(event);
    this.selectedToSource = event.Name;
  }

  closeTag(checkTag) {
    if (checkTag === 'removeReferralSourceFromTag') {
      this.selectedFromSource = undefined;
    }
    this.selectedToSource = undefined;
  }
  getFormControls() {
    this.referralForm = this.fb.group({
      Id: [],
      SelectFromReferralSource: ['', Validators.required],
      ReferralSourceFromMember: ['', Validators.required],
      SelectToReferralSource: ['', Validators.required],
      ReferralSourceToMember: ['', Validators.required],
      ReferredDate: ['', Validators.required]
    });
  }

  selectedOption(optionVal) {
    this.searchDialogTitle = optionVal;
  }

  getDropdownStates() {
    this.dataService.getDropDownStates().subscribe(
      (data) => {
        this.statesOpt = data;
      }
    );
  }
  getDropdownFromReferral() {
    this.dataService.getDropDownFromReferral().subscribe(
      (data) => {
        this.fromReferralOpt = this.masterService.formatDataforDropdown(
          'Name',
          data,
          'Select',
          'Name'
        );
    });
  }
  getDropdownToReferral() {
    this.dataService.getDropDownToReferral().subscribe(
      (data) => {
        this.toReferralOpt = this.masterService.formatDataforDropdown(
          'Name',
          data,
          'Select',
          'Name'
        );
      }
    );
  }
  getDropdownWhereDidYouHearAboutUs() {
    this.dataService.getDropDownWhereDidYouHearAboutUs().subscribe(
      (data) => {
        this.whereDidYouHearAboutUsOpt = this.masterService.formatDataforDropdown(
          'Name',
          data,
          'Select',
          'Name'
        );
      }
    );
  }
  onSelectedFromSource(selectedVal) {
    if (selectedVal.value === 'Self(Patient)') {
      this.showSelfValues = true;
      this.referralForm.get('ReferralSourceFromMember').clearValidators();
      this.referralForm.get('ReferralSourceFromMember').updateValueAndValidity();
      this.showFromDetailsbtn = true;
    } else if (selectedVal.value === 'Patient') {
      this.showSelfValues = false;
      this.showFromDetailsbtn = false;
    } else {
      this.searchDialogTitle = selectedVal.value;
      this.showSelfValues = false;
      this.showFromDetailsbtn = true;
    }
  }

  onSelectedToSource(selectedVal) {
    if (selectedVal.value === 'Self(Patient)') {
      this.showSelfValues = true;
      this.showToDetailsbtn = true;
    } else if (selectedVal.value === 'Patient') {
      this.showSelfValues = false;
      this.showToDetailsbtn = false;
    } else {
      this.showToDetailsbtn = true;
    }
  }
  openDialog(checkDialog, patchReferral?) {
    if (checkDialog === 'referralSourceDialog') {
      this.getDropdownFromReferral();
      this.getDropdownToReferral();
      this.getDropdownWhereDidYouHearAboutUs();
      this.referralSourceDialog = true;
      if (patchReferral !== undefined) {
        this.getFormControlsPatched(patchReferral);
      } else {
        this.referralForm.reset();
      }
    } else if (checkDialog === 'memberDetailsDialog' ) {
      if (this.referralForm.value.ReferralSourceFromMember !== '') {
        this.memberDetailsDialog = true;
        this.showMemberDetails = true;
        // console.log(this.memberDetailsArr);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'alert',
          detail: 'Select Member'
        });
      }

    } else if (checkDialog === 'searchContactDialog') {
      this.getDropdownStates();
      this.searchedRecords = [];
      this.searchedRecordLength = this.searchedRecords.length;
      this.searchContactDialog = true;
    }
  }

  filterSourceToMember(event) {
    this.dataService.getAllProviderRecords().subscribe(
      (data: any) => {
        this.providerRecords = data;
      }
    );
    const filterQuery = event.query;
    this.filteredSourceToMember = this.getFilterSourceToMember(filterQuery, this.providerRecords);
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

  closeDialog(checkDialog) {
    if (checkDialog === 'referralSourceDialog') {
      this.referralSourceDialog = false;
    } else if (checkDialog === 'memberDetailsDialog') {
      this.showMemberDetails = false;
      this.memberDetailsDialog = false;
    } else if (checkDialog === 'searchContactDialog') {
      this.searchContactDialog = false;
    }
  }
  getFormControlsPatched(patchData) {
    this.referralForm.patchValue({
      ReferralSourceFromMember: patchData.Name,
      ReferralSourceToMember: patchData.Name,
      ReferredDate: patchData.ReferredDate,
      SelectToReferralSource: patchData.SelectToReferralSource,
      SelectFromReferralSource: patchData.SelectFromReferralSource
    });
  }
  onSubmit() {
    const validateForm = this.masterService.getFormErrorMessage(this.referralForm, this.referralForm);
    if (validateForm !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: validateForm
      });
    } else {
      if (this.referralForm.value.Id === null || undefined) {
        this.referralForm.value.Id = this.referralArr.length + 1;
        if (this.showSelfValues === true) {
          this.referralForm.value.ReferralSourceFromMember = this.referralForm.value.ReferralSourceFromMember.Name;
        }
        this.referralForm.value.ReferralSourceToMember = this.referralForm.value.ReferralSourceToMember.Name;
        this.referralArr.push(this.referralForm.value);

        if (Array.isArray(this.referralArr) && this.referralArr.length) {
        }
      } else {
        for (let i = 0; i < this.referralArr.length; i++) {
          if (this.referralArr[i].Id === this.referralForm.value.Id) {
            this.referralArr[i].ReferralSourceFromMember = this.referralForm.value.ReferralSourceFromMember.Name;
            this.referralArr[i].ReferralSourceToMember = this.referralForm.value.ReferralSourceToMember.Name;
            this.referralArr[i].ReferredDate = this.referralForm.value.ReferredDate;
            this.referralArr[i].FromReferralSource = this.referralForm.value.SelectFromReferralSource;
            this.referralArr[i].ToReferralSource = this.referralForm.value.SelectToReferralSource;
          }
        }
      }
      this.messageService.add({
        severity: 'success',
        summary: '',
        detail: 'Referral Source Saved Successfully'
      });
      this.selectedFromSource = null;
      this.selectedToSource = null;
      this.referralSourceDialog = false;
      // this.memberDetailsArr = [];
    }

  }
  confirmDelete(refferalItem, index) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.removeReferralItem(refferalItem, index);
      },
      reject: () => {
      }
    });
  }
  removeReferralItem(removingReferralItem, index) {
    this.referralArr.splice(index, 1);
    this.messageService.add({
      severity: 'success',
      summary: '',
      detail:  'Referral Source Removed Successfully'
    });
  }
}
