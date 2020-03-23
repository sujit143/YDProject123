import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Speciality } from '../../models/speciality';
import { Language } from '../../models/language';
import { location } from '../../models/location';
import { DoctordataService } from './doctordata.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { MainService } from '../../services/appservices/main.service';


@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})

export class DoctorsComponent implements OnInit, OnDestroy {
  zoom: number = 8;
  spinnerdisplay:boolean=false;
  public queryparams: any;
  private _subscriptions = new Subscription();
  doctors: FormGroup;
  doctorsList: any;
  arrSpeciality: Speciality[];
  specialityList: Speciality[];
  languageList: Language[];
  locationLists: location[];
  arr: any = [];
  display: boolean = false;
  id: number;
  optionSelected: any;
  value: string = '';
  selectedspec: any;
  selId: any;
  name: any ;
  desc: any ;
  longitude = 20.728218;
  latitude = 52.128973;
  long: any;
  iconpath = 'assets/img/avatars/32.ico';
  selectedLocation: any;
  tempId = '1';
  displayreq1: boolean = false;
  officeHours: any;
  locationList: any;
  myDateValue: Date;
  lengthOfDocRec: number;
  @HostListener('window:scroll', ['$event'])
  scrollMe(event) {
    var scrollPosition = $(window).scrollTop();
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
    $('.section').each(function() {
		  var sectionTop = $(this).offset().top - 150;
      var id = $(this).attr('id');

      if (scrollPosition >= sectionTop) {
        $('#navigation > div').removeClass('selectedDoc');
        $('#' + id ).addClass('selectedDoc');
        localStorage.setItem('tempId', id);
        localStorage.setItem('scroll', 'true');
      } else {
        $('#' + id ).removeClass('selectedDoc');
      }
    });
    this.tempId = localStorage.getItem('tempId');
    var item = _.filter(this.doctorsList, (f) => {
      return (f.tempId == this.tempId);
    });
    var scrolldiv = localStorage.getItem('scroll');
    if(scrolldiv == 'true' ) {
      if (! _.isEmpty(item)) {
        this.onMouseHover(item[0]);
      }
    }
  }


  constructor(
    private fb: FormBuilder,
    private doctorsdata: DoctordataService,
    private router: Router,
    private _act: ActivatedRoute,
    private mainService: MainService
  ) {
    this._subscriptions.add(
      this.router.routerState.root.queryParams.subscribe(
        (params: Params) => {
          // console.log(params);
          this.queryparams = params['SpecialityId'];
          console.log('id:',this.queryparams);
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        }
      )
    );
  }

  ngOnInit() {
    this.myDateValue = new Date();
    this.doctors = this.fb.group({
      speciality: new FormControl(),
      gender: new FormControl(),
      languages: new FormControl(),
      schedule_date: new FormControl(),
      locations: new FormControl()
    });
    this.getAllDoctors();
    this.getSpeciality();
    this.getLanguage();
    this.getLocation();

  }

  getAllDoctors() {

    if(this.queryparams == undefined){
      this.spinnerdisplay=true;
      this.doctorsdata.getDoctorsData().then(
        (x) => {
          var test = JSON.parse(x);
          this.doctorsList = _.forEach(test, (m, index) => {
            m.tempLocation = '';
            m.tempId = index + 1;
            if (m.tempId === 1) {
              m.isSelected = true;
            } else {
              m.isSelected = false;
            }
            if (! _.isEmpty(m.MemberLocations)) {
              _.forEach(m.MemberLocations, (t) => {
                m.tempLocation = m.tempLocation + '|' + t.Name;
              });

            }
          });
          // console.log('doctorsList:', this.doctorsList);
          this.locationList = this.doctorsList.OfficeHours;
          // console.log('locationList:', this.locationList);
          this.spinnerdisplay=false;

        }
      );
    } else {
      this.getDoctorsById();
    }


  }
  getDoctorsById() {
    this.spinnerdisplay=true;
    this.doctorsdata.getDoctorBySpecId(this.queryparams).then(
      (x: any) => {
        this.doctors.patchValue({
          speciality: this.queryparams
        });
        var specData = JSON.parse(x);
        this.lengthOfDocRec=specData.length;
        console.log(specData.length);
        this.doctorsList = _.forEach(specData, (m, index) => {
          m.tempLocation = '';
          m.tempId = index + 1;
          if (m.tempId === 1) {
            m.isSelected = true;
          } else {
            m.isSelected = false;
          }
          if (! _.isEmpty(m.MemberLocations)) {
            _.forEach(m.MemberLocations, (t) => {
              m.tempLocation = m.tempLocation + '|' + t.Name;
            });

          }
        });
        this.spinnerdisplay=false;
      }
    );
  }

  getSpeciality() {
    this.doctorsdata.getDoctorsSpeciality().then(
      (x: Speciality[]) => {
        this.arrSpeciality = x;
        this.specialityList = this.arrSpeciality['SpecialityList'];
        // console.log(this.specialityList);
        // console.log('params', this.queryparams);
        if(this.queryparams){
          this.selId = _.filter(this.specialityList, (s) => {
            return s.Id == this.queryparams;
          });
          // console.log('testing', this.selId);
          this.name = this.selId[0].Name;
          this.desc = this.selId[0].Description;
        }
      }
    );
  }

  getLanguage() {
    this.doctorsdata.getDoctorsLanguage().then(
      (x: Language[]) => {
        this.languageList = x;
      }
    );
  }

  getLocation() {
    this.doctorsdata.getDoctorsLocation().then(
      (x: location[]) => {
        this.locationLists = x;
        console.log('locationList:', this.locationLists);
      }
    );
  }

  openDoctorProfile(item) {
    this.router.navigate(['/doctors/doctorsprofile'], { queryParams: { MemberId: item.Id }});
  }

  openDoctorProfilePopup(item) {
    this.arr = item;
    this.display = true;
  }

  onSearchDoctor(item) {
    // console.log(item);
    this.value = item;
    if (item !== null) {
      this.doctorsdata.getDoctorsAfterSearch(item).subscribe(
        (data: any) => {
          var test = JSON.parse(data);
          this.lengthOfDocRec=test.length;
          this.doctorsList = _.forEach(test, (m, index) => {
            m.tempLocation = '';
            m.tempId = index + 1;
            if (m.tempId === 1) {
              m.isSelected = true;
            } else {
              m.isSelected = false;
            }
            if (! _.isEmpty(m.MemberLocations)) {
              _.forEach(m.MemberLocations, (t) => {
                m.tempLocation = m.tempLocation + '|' + t.Name;
              });

            }
          });
        }
      );
    } else {
      if (item === 'Speciality') {
        this.getAllDoctors();
      }
    }
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  onMouseHover(item) {
    _.forEach(this.doctorsList, (s) => {
      s.isSelected = false;
    });
    item.isSelected = true;
    this.longitude = item.OfficeHours[0].Longitude;
    this.latitude = item.OfficeHours[0].Lattitude;
    this.selectedLocation = item.OfficeHours;
    this.officeHours = item.OfficeHours;
    // console.log('selectedLocation', this.officeHours);
  }

  openReqPopup() {
    this.display = false;
    this.displayreq1 = true;
    this.mainService.sendMessage(true);
  }
  functionToCloseDialog() {
    this.display = false;
  }
  closeDialog() {
    this.displayreq1 = false;
    this.mainService.sendMessage(false);
  }
}
