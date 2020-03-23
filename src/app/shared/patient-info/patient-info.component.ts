import { MainService } from './../../services/appservices/main.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/appservices/shared.service';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';

export interface Patientinfo {
      Name: string;
      Account: string;
      Case: string;
      Contactnumber: string;
      DOB: Date;
      Casetype: string;
      Address1: string;
      Address2: string;
      City: string;
      State: Date;
      Role: string;
      Age: number;
      Gender: string;
      Phonenumber: number;
      InjuryDate: Date;
      QBProvider: string;
}

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss'],

})
export class PatientInfoComponent implements OnInit {
  config: any;
  collection = [];
  item: any;
  Queryvalue: any;
  filterdData: any[];
  filterdDataLength;
  PatientDetails: Patientinfo[];
  detailedInfo: any;
  disableTab: boolean = false;
  secondtabactive: boolean = false;
  firsttabactive: boolean = true;
  messageDialog = false;
  dialogClose = false;
  originatedpractise: any[];
  selectorName = 'Episode Activity Statement';
  selectorId = 1;
  viewMode = 'Episode Activity Statement';
  alertMessage: any;
  @ViewChild('tabset', { static: false }) tabset: TabsetComponent;

  items2: any[];
  activeItem: any;

  constructor(private data: SharedService, private route: ActivatedRoute, private messageService: MessageService,
    private router: Router, private _route: ActivatedRoute, private mainService: MainService) {
      this.mainService.getAlertMsg().subscribe(
        (msg: any) => {
          this.alertMessage = msg;
          console.log('Message' , msg);
        });
    this.config = {
      currentPage: 1,
      itemsPerPage: 6
    };
    this.route.queryParamMap
      .pipe(map(params => params.get('page'))).subscribe(
        (pageInfo) => {
          this.config.currentPage = pageInfo;
          // this.config.keyValue =
          this.closeItem(Event, '1', 0);
        }
      );
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }

    this.items2 = [
      { label: 'Search Results', icon: 'fa fa-tachometer', color: 'background: #19aa8d !important;' }
    ];
    this.activeItem = this.items2[0];
  }

  closeItem(event, i, optional) {

    const req = {
      label: 'Search Results',
      icon: 'fa fa-tachometer'
    };
    this.items2 = [];
    this.items2.push(req);
    this.secondtabactive = false;
    this.firsttabactive = true;
    this.activeItem = this.items2[0];
    if (optional === 1) {
      event.preventDefault();
    }
    // event.preventDefault();
  }

  addTab(i, item) {

    if (this.items2.length < 2) {
      this.activeItem = this.items2[i];
      const req = {
        label: item.Name,
        icon: 'fa fa-info-circle'
      };
      this.items2.push(req);
    } else {
      const req = {
        label: item.Name,
        icon: 'fa fa-info-circle'
      };
      this.items2[1] = req;
    }
    this.firsttabactive = false;
    this.secondtabactive = true;
    this.detailedInfo = item;
    this.activeItem = this.items2[1];

  }

    // this.tabset.tabs[1].disabled = false;



  ngOnInit() {
    this.getPatient();
  }
  getPatient() {
    this.data.getPatientDetails().subscribe(
      (data: Patientinfo[]) => {
        this.PatientDetails = data;

        this.route.queryParamMap.subscribe((params: any) => {
          this.Queryvalue = params.params.Value;
          this.filterdData = _.filter(this.PatientDetails, (v) => {
       return (v.Name == this.Queryvalue || v.Account == this.Queryvalue || v.Case == this.Queryvalue || v.Contactnumber == this.Queryvalue || v.DOB == this.Queryvalue || v.Casetype == this.Queryvalue || v.Address1 == this.Queryvalue || v.Address2 == this.Queryvalue || v.City == this.Queryvalue || v.State == this.Queryvalue || v.Role == this.Queryvalue || v.Age == this.Queryvalue || v.Gender == this.Queryvalue || v.Phonenumber == this.Queryvalue || v.InjuryDate == this.Queryvalue || v.QBProvider == this.Queryvalue);
          });
          this.detailedInfo = this.filterdData[0];
        });
      }
    );
  }
  pageChange(newPage: number) {
    this.router.navigate(['dashboard/patientinfo'], { queryParams: { page: newPage, Value: this.Queryvalue} });
  }

  printPage() {
    window.print();
  }
  origisePractice($event) {

  }
  goto(index, item) {
    this.disableTab = true;
    this.detailedInfo = item;
    this.tabset.tabs[index].active = true;
  }
  onactivatefirsttab(index) {
    if (index === 0) {
      this.firsttabactive = true;
      this.secondtabactive = false;
    } else {
      this.firsttabactive = false;
      this.secondtabactive = true;
    }

  }

  activateTab(tabid, tabName) {
    this.selectorName = tabName;
    this.selectorId = tabid;
  }
  openDialog() {
    this.messageDialog = true;
  }
  closeDialog() {
    this.messageDialog = false;
  }
  onclickofcheckbox() {
    this.messageService.add({
      severity: 'success',
      summary: 'Added',
      detail: 'Successfully Created'
   });
  }
}
