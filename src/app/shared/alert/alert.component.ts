import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { SharedService } from './../../services/appservices/shared.service';
import { MainService } from './../../services/appservices/main.service';
import { MasterService } from './../../services/master.service';
import { Alert } from '../../models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(private fb: FormBuilder, private messageService: MessageService, private masterService: MasterService,
    private mainService: MainService, private sharedService: SharedService) { }
  alertRecords: Alert[] = [];
  alertDialog;
  dialogClose;
  alertsLength;
  alertForm: FormGroup;
  ngOnInit() {
    this.getAllAlerts();
    this.getFormControls();
  }
  getAllAlerts() {
    this.sharedService.getAllALerts().subscribe(
      (data: Alert[]) => {
        this.alertRecords = data;
        this.alertsLength = this.alertRecords.length;
      }
    );
  }

  getFormControls() {
    this.alertForm = this.fb.group({
      Id: [Number],
      Message: ['', Validators.required],
      IsEpisodeSpecific: [false]
    });
  }

  openDialog(alert?: Alert) {
    this.alertDialog = true;
    if (alert !== undefined) {
      this.alertForm.patchValue({
        Id: alert.Id,
        Message: alert.Message,
        IsEpisodeSpecific: alert.IsEpisodeSpecific
      });
    } else {
      this.alertForm.reset();
    }
  }

  closeDialog() {
    this.alertDialog = false;
  }
  getFormCustomMessage(formControls?) {
    const ErrorObj = {
      Message: { required: 'Please Enter Message' }
    };
    return ErrorObj;
  }
  onSubmit() {
    const validateForm = this.masterService.getFormErrorMessage(this.alertForm, this.getFormCustomMessage());
    if (validateForm !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Mandatory Fields',
        detail: validateForm
      });
    } else {
      if (this.alertForm.value.Id === null) {
        this.alertForm.value.Id = this.alertRecords.length + 1;
        this.alertRecords.push(this.alertForm.value);
        if (Array.isArray(this.alertRecords) && this.alertRecords.length) {
        }
        console.log(this.alertRecords);
        this.messageService.add({
          severity: 'success',
          detail: 'Alert Saved Successfully'
        });
      } else {
        for (let i = 0; i < this.alertRecords.length; i++) {
          if (this.alertRecords[i].Id === this.alertForm.value.Id) {
            this.alertRecords[i].Message = this.alertForm.value.Message;
            this.alertRecords[i].IsEpisodeSpecific = this.alertForm.value.IsEpisodeSpecific;
          }
        }

        this.messageService.add({
          severity: 'success',
          detail: 'Alert Saved Successfully'
        });
      }
      this.alertDialog = false;
    }
    this.mainService.sendAlertMsg(this.alertRecords);
    this.alertsLength = this.alertRecords.length;
  }

  removeItem(removingItem) {
    this.alertRecords.splice(removingItem, 1);
    this.messageService.add({
      severity: 'success',
      detail: 'Alert Deleted Successfully'
    });
    this.alertsLength = this.alertRecords.length;
  }
}
