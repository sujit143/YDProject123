import {Component, HostListener, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { navItems } from '../../_nav';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { SharedService } from '../../services/appservices/shared.service';
import * as _ from 'lodash';
import { from } from 'rxjs';
// import '../../../assets/js/Bundle-Layout';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: [
    '../../../assets/CSS/Bundle-Layout.css',
  '../../../assets/CSS/plugins.css',
  '../../../assets/CSS/YDStyle.css',
  '../../../scss/afterLogin.scss'

]
})
export class DefaultLayoutComponent implements OnInit, AfterViewChecked, AfterViewInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  value: string;
  patientdata: any;
  filterdData: any;
 isSidebartoggle:boolean=true;
//   patientdata:any =[
//     {

//     "Name":"Abhishek",
//     "Account#":"Y191116546",
//     "Case#":"Y193336546_8",
//     "Contactnumber":"",
//     "DOB": "15/02/1995",
//     "Casetype": "Commercial",
//     "Address1": "test address",
//     "Address2":"",
//     "City":"Freehold",
//     "State":"Newyork",
//     "Role":"Patient / Episode",
//     "Age":25,
//     "Gender":"Male",
//     "Phonenumber":9464658650,
//     "InjuryDate":"8/2/2016",
//     "QBProvider":"Baynes Jason"
// },



// ];
  constructor(private router: Router, private _data: SharedService) {
  }
  toggleMinimize() {
    // this.sidebarMinimized = e;
if (this.isSidebartoggle){
  $('.CaseManagementDashboard').addClass('mini-navbar');
  this.isSidebartoggle = false;
} else {
  $('.CaseManagementDashboard').removeClass('mini-navbar');
  this.isSidebartoggle = true;
}

  }

  ngOnInit() {
    $.getScript('../../../assets/js/Bundle-Layout.js');
     $.getScript('assets/js/Bundle-Layout.js');


  }
  ngAfterViewInit() {
  }

  ngAfterViewChecked() {
    // this.toggleMinimize();
  }
  Navigate() {
    this.router.navigate(['/PracticeLocation/ManagePracticeLocation']);
  }
  onSearch() {
    this.router.navigate(['dashboard/demographics']);
  }
  keyDownFunction(value: any) {
    console.log(value);
// this._data.getPatientDetails().subscribe((data: any) => {
//                 this.patientdata = data;
//             this.filterdData = _.filter(this.patientdata, (v) => {
//                   return (v.Name == value);
//               });
//                 console.log(this.filterdData);
//             });

    this.router.navigate(['dashboard/Shared/patientinfo'], { queryParams: { Value: value}});

          // this.router.navigate(['']) ;

          // console.log('value Exists');
        // }
    // }


          }
          logout() {
            this.router.navigate(['/home']);
          }
        }
// }
