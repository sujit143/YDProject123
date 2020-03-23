import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { DoctordetailsService } from './doctordetails.service';
import { Router, Params } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { Bdata } from './bodydata';
import { MainService } from '../../services/appservices/main.service';

@Component({
  selector: 'app-ankle',
  templateUrl: './ankle.component.html',
  styleUrls: ['./ankle.component.scss']
})
export class AnkleComponent implements OnInit {
  spinnerdisplay:boolean=false;

  @ViewChild('largeModal', {static: true}) public largeModal: ModalDirective;
  public queryparams: any;
  private _subscriptions = new Subscription();
  arr:any;
  bodyParts:any;
  id:number;
  name:string;
  specialities:string;
  locations:string;
  education:string;
  image:string;
  doctorsarr:any;
  display: boolean = false;
  displayrequest:boolean = false;
  longitude = 20.728218;
  latitude = 52.128973;
  long: any;
  iconpath = 'assets/img/avatars/32.ico';
  selectedLocation: any;
  tempId = '1';
  bodyparts_json: any;
  bodyparts_name: any;
  bodyparts_json_clone: any;
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
    var item = _.filter(this.doctorsarr, (f) => {
      return (f.tempId == this.tempId);
    });
    var scrolldiv = localStorage.getItem('scroll');
    if(scrolldiv == 'true' ) {
      if (! _.isEmpty(item)) {
        this.onMouseHover(item[0]);
      }
    }
  }

  constructor(private _data: DoctordetailsService, private _router: Router, private mainService: MainService) {

    this._subscriptions.add(
      this._router.routerState.root.queryParams.subscribe(
        (params: Params) => {
          this.queryparams = params['BodyPartId'];
          this.getBodyDrs();
          const parts = _.filter(this.bodyparts_json, (b) => {
            return(b.Id == this.queryparams );
          });
          if (parts.length !== 0) {
            this.bodyparts_name = parts[0];
          }
        }
      )
    );
   }

   getbodypartsjson() {
    this._data.bodypartsjson().then(data => {
      if(data != null) {
        this.bodyparts_json = _.cloneDeep(data);
        const parts = _.filter(this.bodyparts_json, (b) => {
          return(b.Id == this.queryparams );
        });
        if (parts.length !== 0) {
          this.bodyparts_name = parts[0];
        }

      }
    },
    error =>{
    }
    );
   }
  ngOnInit() {
    //this.getDoctors();
    this.getbodypartsjson();
    this.getBodyParts();
    this.getBodyDrs();
    }
    getBodyDrs() {
      this.spinnerdisplay=true;
      this.doctorsarr = [];
      this._subscriptions.add(this._data.getBodyPartDrs(this.queryparams).subscribe((bodyDrs: any) => {
              var test = JSON.parse(bodyDrs);
              this.doctorsarr = _.forEach(test, (m, index) => {
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
          )
        );
    }

    dropdownParts(id){
      this._router.navigate(['/BodyParts'], { queryParams: { BodyPartId: id }});
     }

    getBodyParts(){
      this._data.getAllParts().subscribe((data: Bdata[]) => {
        this.arr = data;
        this.bodyParts = this.arr["ChiefComplaintBodyPartsList"];

    });
    }

  onclick(doctorsarr){
    this.display = true;

    this.id=doctorsarr.Id;
    this.name=doctorsarr.DisplayName;
    this.specialities=doctorsarr.Specialities;
    this.locations=doctorsarr.tempLocation;
    this.education=doctorsarr.Educations;
    this.image=doctorsarr.ProfilePhoto;
  }


  learnAbout() {
    this._router.navigate(['/doctors/doctorsprofile'], { queryParams: { MemberId: this.id }});
  }

  onMouseHover(item) {
    _.forEach(this.doctorsarr, (s) => {
      s.isSelected = false;
    });
    item.isSelected = true;
    this.longitude = item.MemberLocations[0].Longitude;
    this.latitude = item.MemberLocations[0].Lattitude;
    this.selectedLocation = item.MemberLocations;
  }

  onClick(item){
    this._router.navigate(['/BodyParts'], { queryParams: { BodyPartId: item.Id}});
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
   }

   Request(){
     this.display=false;
     this.displayrequest=true;
     this.mainService.sendMessage(true);
   }

   closeDialog() {
    this.displayrequest = false;
    this.mainService.sendMessage(false);
  }

}

