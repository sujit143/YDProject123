import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, Params } from '@angular/router';
import { DoctordataService } from '../doctordata.service';
import { MessageService } from 'primeng/primeng';
import { SaveAppointement } from '../../../models/saveappointement';
import * as $ from 'jquery';
import { TabsetConfig } from 'ngx-bootstrap/tabs';
import { MainService } from '../../../services/appservices/main.service';
import { MasterService } from '../../../services/master.service';

// export function getTabsetConfig(): TabsetConfig {
//   return Object.assign(new TabsetConfig(), { type: 'pills' });
// }

@Component({
  selector: 'app-doctorsprofile',
  templateUrl: './doctorsprofile.component.html',
  styleUrls: ['./doctorsprofile.component.scss']
  // providers: [{ provide: TabsetConfig, useFactory: getTabsetConfig }]
})
export class DoctorsprofileComponent implements OnInit , OnDestroy {
  zoom: number = 8;
  requestAppointment: FormGroup;
  public queryparams: any;
  doctorsProfList: any;
  officeHours: any;
  providerBio: any;
  educations: any;
  providerFeedBacks: any;
  profilePhoto: any;
  displayName: any;
  specialities: any;
  city: any;
  address: any;
  phoneNumber: any;
  fax: any;
  state: any;
  country: any;

  longitude = 20.728218;
  latitude = 52.128973;
  long: any;
  iconpath = 'assets/img/avatars/32.ico';
  selectedLocation: any;
  displayLocation: boolean = false;
  locationname: string;
  locationList: any = [];
  locdisp: any = [];
  displayreq: boolean = false;
  myDateValue: Date;
  requestAppointmentErrorObj: any;

  private _subscriptions = new Subscription();

  @HostListener('window:scroll', [])
  scrolling() {
    console.log('scrolling');
    var sticky = $('.header');
    var img = $('.imgWrap-inner');
      var scroll = $(window).scrollTop();

      if (scroll >= 100) {
        sticky.addClass('hactive');
        img.addClass('sticky');
        document.getElementById('logo').setAttribute( 'src', 'assets/img/aboutus/logo-small.png' );

      }
      else {
        sticky.removeClass('hactive');
        img.removeClass('sticky');
        document.getElementById('logo').setAttribute( 'src', 'assets/img/aboutus/logo.png' );
      }
  }

  constructor(private router: Router,
              private fb: FormBuilder,
              private messageService: MessageService,
              private doctorsdataService: DoctordataService,
              private mainService: MainService,
              private masterService: MasterService,

              ) {
                this._subscriptions.add(
                  this.router.routerState.root.queryParams.subscribe(
                    (params: Params) => {
                      this.queryparams = params['MemberId'];
                      console.log('id:', this.queryparams);
                    }
                  )
                );
              }

  ngOnInit() {
    this.myDateValue = new Date();
    this.requestAppointment = this.fb.group({
      PatientFirstName: new FormControl(null, [Validators.required,Validators.pattern('[a-zA-z]*')]),
      Contact: new FormControl(null, Validators.required),
      location: new FormControl(null),
      AppointmentDateTimeList: new FormControl(null, Validators.required)
    });
    this.requestAppointmentErrorObj = {
      PatientFirstName: { required: 'Please enter Full Name',pattern:"Please enter characters only"},
      Contact: { required: 'Please enter phone no'},
      AppointmentDateTimeList: { required: 'Please enter date'},
      };
    this.getDoctorById();
  }

  openDoctors() {
    this.router.navigate(['/doctors']);
  }

  getDoctorById() {
    this.doctorsdataService.getDoctorsDataById(this.queryparams).subscribe(
      (data: any) => {
        var test = JSON.parse(data);
        this.doctorsProfList = test;
        this.officeHours = this.doctorsProfList.OfficeHours;
        this.providerBio = this.doctorsProfList.ProviderBio;
        this.educations = this.doctorsProfList.Educations;
        this.providerFeedBacks = this.doctorsProfList.ProviderFeedBacks;
        this.profilePhoto = this.doctorsProfList.ProfilePhoto;
        this.displayName = this.doctorsProfList.DisplayName;
        this.specialities = this.doctorsProfList['Specialities'];
        // console.log('doctorsProfList:', this.doctorsProfList);
      }
    );
  }

  openLocation(item) {
    console.log('dloc:', item);
    this.displayLocation = true;
    this.locationList = item;
    this.longitude = this.locationList.Longitude;
    this.latitude = this.locationList.Lattitude;
    this.city  = this.locationList.City;
    this.address = this.locationList.Address;
    this.phoneNumber = this.locationList.PhoneNumber;
    this.fax = this.locationList.Fax;
    this.country = this.locationList.Country;
    this.state = this.locationList.State;
    // console.log('locationList:', this.locationList);

  }

  saveAppointment(item) {
    console.log(item);
    var req= {
      'Id': null,
      'PatientEmail': null,
      'AppointmentDateTimeList': [ {
      'StartDateTime': item.AppointmentDateTimeList,
      'EndDateTime': null
    }],
    'ProviderId': this.queryparams,
    'PatientId': null,
    'SpecialityIds': null,
    'BodyPartIds':  null,
    'EpisodeId': null,
    'LocationId': item.location,
    'Contact': item.Contact,
    'ChiefComplaint': null,
    'CreatedDate': null,
    'CreatedBy': null,
    'ModifiedDate': null,
    'ModifiedBy': null,
    'PatienFirstName': item.PatientFirstName,
    'PatientLastName': null,
    'Header': null
    };
    const isValid = this.masterService.getFormErrorMessage(this.requestAppointment, this.requestAppointmentErrorObj);
    if (isValid !== undefined) {
      this.messageService.add({severity: 'error', summary: 'Warning', detail: isValid});
    } else {
      this.doctorsdataService.getSaveRequest(req).then(
        (x) => {
          setTimeout(
            () => {
              this.messageService.add(
                {
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Request sent succesfully'
                }
              );
            }, 1000);
          }
        );
      }
  }

  openReqPopup() {
    this.mainService.sendMessage(true);
  }
  functionToCloseDialog() {
    this.displayLocation = false;
  }
  closeDialog() {
    this.displayreq = false;
    this.mainService.sendMessage(false);
  }

  ngOnDestroy() {
     this._subscriptions.unsubscribe();
   }

}
