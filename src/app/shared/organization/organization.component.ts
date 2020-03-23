
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/primeng';

import * as moment from 'moment';
import { AppConstant } from '../../app.constant';
import { SharedService } from './../../services/appservices/shared.service';
import { Organization, OrganizationList } from '../../models/organization';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  organizationOpt: OrganizationList[];
  OrganizationForm: FormGroup;
  showOrganization: boolean;
  organizationData: Organization[] = [];
  organizationDataLength;
  selectOrganization: any[] = [];
  displayValues: boolean = false;

  constructor(
    private dataService: SharedService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {

  }

  ngOnInit() {
    this.getOrganizationRecords();
    this.getDropdownOrganization();
    this.getFormControls();
  }
  getFormControls() {
    this.OrganizationForm = this.fb.group({
      Name: new FormControl(null),
      WhoCreated: new FormControl(null),
      CreatedDate: new FormControl(null)
    });
  }
  getDropdownOrganization() {
    this.dataService.getDropDownOrganisation().subscribe(
      (data: any) => {
        this.organizationOpt = data;
      }
    );
  }
  getOrganizationRecords() {
   this.dataService.getOrganizationRecords().subscribe(
     (data: Organization[]) => {
      this.organizationData = data;
      this.organizationDataLength = this.organizationData.length;
     }
   );
  }
  selectedOrganization(selectedValue) {
    if (this.selectOrganization.length === 0) {
      this.selectOrganization.push(selectedValue.value);
    } else {
      for (let i = 0; i < this.selectOrganization.length;) {
        if (selectedValue.value.Id === this.selectOrganization[i].Id) {
            i = this.selectOrganization.length;
          this.messageService.add({
            severity: 'warn',
            summary: '',
            detail: selectedValue.value.Name + ' ' + 'Already Selected'
          });
        } else if (selectedValue.value.Id !== this.selectOrganization[i].Id) {
          i = i + 1;
          if (this.selectOrganization.length !== i ) {
          } else {
            this.selectOrganization.push(selectedValue.value);
            i = this.selectOrganization.length;
          }
        }
      }
    }
    this.showOrganization = true;
  }
  unSelectOrganization(value, index) {
    this.selectOrganization.splice(index, 1);
    this.organizationDataLength = this.organizationData.length;
  }
  onSubmit(drop) {
    this.displayValues = true;
    for (let i = 0; i < this.selectOrganization.length; i++) {
      const organizationItem = this.selectOrganization[i];

      const today = new Date();

      const reqOrg = {
        Id: this.selectOrganization[i].Id,
        Name: this.selectOrganization[i].Name,
        WhoCreated: 'Admin',
        CreatedDate: moment(today).format(AppConstant.API_CONFIG.DATE.dotnetDateFormat)
      };
      this.organizationData.push(reqOrg);
    }
    this.organizationDataLength = this.organizationData.length;
    this.showOrganization = false;
    this.messageService.add({
      severity: 'success',
      summary: '',
      detail: 'Organization Saved Successfully'
    });
    this.selectOrganization = [];
    this.organizationData.forEach(item => {
      const index = this.organizationOpt.findIndex(arrItem => arrItem === item);
      this.organizationOpt.splice(index, 1);
      drop.options = this.organizationOpt;
      console.log(this.organizationOpt);
    });
  }
  removeSelected(id, removeItem, drop) {
    this.organizationData.splice(id, 1);
    this.messageService.add({
      severity: 'success',
      summary: '',
      detail: removeItem.Name + ' ' + 'Removed Successfully'
    });
    this.organizationOpt.push(removeItem);
    drop.options = this.organizationOpt;
    this.organizationDataLength = this.organizationData.length;
  }
}
