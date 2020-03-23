import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { MessageService, ConfirmationService } from 'primeng/api';
import * as moment from 'moment';
import { AppConstant } from './../../app.constant';
import { MasterService } from './../../services/master.service';
import { SharedService } from './../../services/appservices/shared.service';
import { PastSurgicalHistory } from '../../models/pastsurgicalhistory';

@Component({
  selector: 'app-past-surgical-history',
  templateUrl: './past-surgical-history.component.html',
  styleUrls: ['./past-surgical-history.component.scss']
})
export class PastSurgicalHistoryComponent implements OnInit {
  pastSurgicalRecord: PastSurgicalHistory[] = [];
  selectedProcedure: any;
  pastSurgicalArrLength;
  haltEscapeDialogClose;
  statesOpt;
  dialogClose;
  filteredProcedure: any[];
  pastSurgicalAddDialog;
  implantableDeviceDialog;
  pastSurgicalForm: FormGroup;
  constructor
    (
      private fb: FormBuilder,
      private dataService: SharedService,
      private masterService: MasterService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService
    ) { }

  ngOnInit() {
    this.getPastSurgicalRecords();
    this.getFormControls();
  }

  getPastSurgicalRecords() {
    this.dataService.getPastSurgicalHistoryRecords().subscribe(
      (data: PastSurgicalHistory[]) => {
        this.pastSurgicalRecord = data;
        this.pastSurgicalArrLength = this.pastSurgicalRecord.length;
      }
    );
  }
  getFormControls() {
    this.pastSurgicalForm = this.fb.group({
      Id: [Number],
      ProcedureName: ['', [Validators.required]],
      ProcedureDate: [null, [Validators.required]],
      Surgeon: [null, [Validators.required]],
      Zip: [null, [Validators.required]],
      City: [null, [Validators.required]],
      State: ['', [Validators.required]],
      PhoneNumber: [null, [Validators.required]],
      Facility: [null, [Validators.required]]
    });
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
  openDialog(checkDialog) {
    this.pastSurgicalForm.reset();
    this.getDropdownStates();
    if (checkDialog === 'pastSurgicalAddDialog') {
      this.pastSurgicalAddDialog = true;
    } else if (checkDialog === 'implantableDeviceDialog') {
      this.implantableDeviceDialog = true;
    }
  }
  filterProcedure(event) {
    const filterQuery = event.query;
    this.dataService.getprocedure().subscribe(procedures => {
      this.filteredProcedure = this.getFilterProcedure(filterQuery, procedures);
    });
  }

  getFilterProcedure(filterQuery, procedures: any): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < procedures.length; i++) {
      const procedure = procedures[i];
      if (procedure.name.toLowerCase().indexOf(filterQuery.toLowerCase()) === 0) {
        filtered.push(procedure);
      }
    }
    return filtered;
  }
  selectProcedure(event) {
    this.selectedProcedure = event.name;

  }
  closeTag() {
    this.selectedProcedure = undefined;
  }
  closeDialog(checkDialog) {
    if (checkDialog === 'pastSurgicalAddDialog') {
      this.pastSurgicalAddDialog = false;
      this.selectedProcedure = undefined;
    } else if (checkDialog === 'implantableDeviceDialog') {
      this.implantableDeviceDialog = false;
    }
  }
  submit() {
    const validateForm = this.masterService.getFormErrorMessage(this.pastSurgicalForm, this.pastSurgicalForm);
    if (validateForm !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: validateForm
      });
    } else {
      this.pastSurgicalForm.value.Id = this.pastSurgicalRecord.length + 1;
      this.pastSurgicalForm.value.ProcedureDate =
      moment(this.pastSurgicalForm.value.ProcedureDate).format(AppConstant.API_CONFIG.DATE.dotnetDateFormat);
      this.pastSurgicalForm.value.ProcedureName = this.pastSurgicalForm.value.ProcedureName.name;
      this.pastSurgicalRecord.push(this.pastSurgicalForm.value);
      console.log(this.pastSurgicalRecord);
      this.pastSurgicalArrLength = this.pastSurgicalRecord.length;
      this.messageService.add({
        severity: 'success',
        summary: '',
        detail: 'Past Surgical History Saved'
      });
      this.pastSurgicalAddDialog = false;
      this.selectedProcedure = undefined;
    }
  }

  confirmDelete(pastSurgicalItem) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.removePastSurgical(pastSurgicalItem);
      },
      reject: () => {
      }
    });
  }
  removePastSurgical(pastSurgicalItem) {
    this.pastSurgicalRecord.splice(pastSurgicalItem, 1);
    this.pastSurgicalArrLength = this.pastSurgicalRecord.length;
    this.messageService.add({
      severity: 'success',
      summary: '',
      detail: 'Past Surgical History Deleted Successfully'
    });
  }
}
