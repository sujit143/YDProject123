import { Component, OnInit, OnDestroy, HostListener, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MainService } from '../../services/appservices/main.service';
import { Subscription, from } from 'rxjs';
import * as $ from 'jquery';
import * as jquery from 'image-map-resizer';
import { location } from '../../models/location';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


import * as _ from 'lodash';
import { LocationdataService } from '../locations/locationdata.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide',   style({
        opacity: 0
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  spinnerdisplayforpopup: boolean = false;
  doctorsListForPopup: any;
  ListOfBodyParts: any;
  selBodyPartDetail: any;
  spinnerdisplay: boolean = false;
  zoom: number = 8;
  locationList: any;
  Lattitude: number = 40.8104;
  Longitude: number = -74.0029;
  Locations: location[];
  selectedLocation: any = {
  Lattitude: 40.8104,
  Longitude: -74.0029
 };
  iconpath = 'assets/img/Locationimages/32.ico';
  officehours: any[] = [];
  test = '../../../assets/images/specialitydetails/noresult.jpg';
  show = false;
  panelOpenState = false;
  view: string = 'back';
  Data: any;
  responsiveOptions: any;
  display: boolean = false;
  private _subscription = new Subscription ();
  isSidebar: boolean = false;
  Header = 'The head is one of the most important parts of the body. It houses our brain and other sensory organs, which controls the functioning of the whole body.';
  displayDoctors: boolean = false;
 docterDetails: any;
docterId: number;
selectedDocter: boolean = false;
filterdDoctors: any;
d_Data: any;
Data1: any;
docterData: any;
requestAppointment: boolean = false;
displayreq1: boolean = false;

bodyparts_json: any;
bodyparts_name: any;
bodyparts_content: any;
bodyparts_imagepath: any;
bodyparts_json_clone: any;
  display1: boolean = false;

  @HostListener('window:scroll', [])
  scrolling() {
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
   constructor(private locationdata:LocationdataService,private http: MainService, private router: Router,private mainService: MainService) {
     this.responsiveOptions = [
       {
           breakpoint: '1024px',
           numVisible: 3,
           numScroll: 3
       },
       {
           breakpoint: '768px',
           numVisible: 2,
           numScroll: 2
       },
       {
           breakpoint: '560px',
           numVisible: 1,
           numScroll: 1
       }
   ];
    }

    ngAfterViewInit(){
      jquery("map").imageMapResize();
    }
   ngOnInit() {
    this.getDoctor();
    this.getallLocations();
    this.getAllBodyPartsDetails();

   }

   get stateName() {
    return this.show ? 'show' : 'hide'
  }

   getDoctor() {
     this.spinnerdisplay=true;
    this._subscription.add(this.http.getDocter().subscribe(data => {

    this.d_Data=data;
      this.docterData = JSON.parse(this.d_Data);
      this.filterdDoctors = this.docterData[0];
      this.spinnerdisplay=false;
      }));

   }
   getAllBodyPartsDetails() {
    this.mainService.getBodyPartDetails().then(
      data => {
        this.ListOfBodyParts = data['ChiefComplaintBodyPartsList'];
      }
    );
  }
   bodypartDialog(bodyPartId: any) {

     if (bodyPartId) {
       this.selBodyPartDetail = _.filter(this.ListOfBodyParts, (s) => {
         return s.Id == bodyPartId;
       });
       if (this.selBodyPartDetail.length !== 0) {
              this.bodyparts_name = this.selBodyPartDetail[0].Name;
              this.bodyparts_imagepath = this.selBodyPartDetail[0].Image;
              this.display = true;
              this.http.getDocter().subscribe(
                (data: any) => {
                  this.doctorsListForPopup = JSON.parse(data);
                }

              );
            }
     }

   }

   ngOnDestroy() {
    this._subscription.unsubscribe();
   }

   openSidebar()
   {
     this.isSidebar = true;
   }

  browseAllDoctors() {
    this.router.navigate(['/doctors']);
  }

  switchVisible() {
    if (document.getElementById('front-1')) {

        if (document.getElementById('front-1').style.display == 'none') {
          this.view='back';
            document.getElementById('front-1').style.display = 'block';
            document.getElementById('back-1').style.display = 'none';
        }
          else{
          this.view='front';
            document.getElementById('front-1').style.display = 'none';
            document.getElementById('back-1').style.display = 'block';
            }
    }
}

getdocterDetails(Id:number){

    this.docterDetails = _.filter(this.docterData, item => item.Id === Id);
    this.filterdDoctors = this.docterDetails[0];
  this.router.navigate(['/doctors/doctorsprofile'], { queryParams: { MemberId: this.filterdDoctors.Id }});
}

Learnmore(Id:number){
  this.router.navigate(['/doctors/doctorsprofile'], { queryParams: { MemberId: Id }});
}
openReqPopup(){

  this.requestAppointment=true;
  this.display = false;
}
openReqApp(){
   this.displayreq1 = true;
   this.mainService.sendMessage(true);

 }
 closeDialog() {
  this.displayreq1 = false;
  this.mainService.sendMessage(false);
 }
 closegetbodypartdetailPopup(){
  this.display=false;
 }

getallLocations(){
  this.spinnerdisplay=true;
  this.locationdata.getLocationsData().subscribe((data: any) => {
  var test = JSON.parse(data);
  this.locationList = test;
  var location = _.forEach(test, (l)=>{
  if (l.OfficeHours.length > 0){
  var loc = _.each(l.OfficeHours,(m)=>{
  m.iconUrl = this.iconpath;
  this.officehours.push(m);
  })
  }
  return this.officehours;
  });
  this.officehours = _.uniqBy(this.officehours, "Location");
  this.spinnerdisplay=false;
  });

  }
  showDialog1(location: location) {
    this.selectedLocation = null;
    this.selectedLocation = location;
    this.display1 = true;
}
functionToCloseDialog() {
  this.display1 = false;
}

}
