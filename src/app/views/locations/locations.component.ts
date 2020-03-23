import { Component, OnInit, HostListener } from '@angular/core';
import { LocationdataService } from './locationdata.service';
import { location } from '../../models/location';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { MainService } from '../../services/appservices/main.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  spinnerdisplay :boolean =false;
 zoom: number = 8;
 display: boolean = false;
 dialogVisible: boolean;
 locationList:any;
 Lattitude:number = 40.8104;
 Longitude:number = -74.0029;
 Locations:location[];
 selectedLocation: any = {
 Lattitude: 40.8104,
 Longitude: -74.0029
};
 iconpath = 'assets/img/Locationimages/32.ico';
 officehours:any[]=[];
 displayreq: boolean = false;

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

  constructor(private locationdata:LocationdataService,private mainService: MainService) {
    this.Lattitude = 40.8104;
    this.Longitude = -74.0029;
  }

  ngOnInit() {
    this.getallLocations();
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
          console.log("second" , this.officehours);
          console.log(this.locationList);
          this.spinnerdisplay=false;
         });

  }

  showDialog1(location: location) {
    this.selectedLocation = null;
    this.selectedLocation = location;
    this.display = true;
}

  openReqPopup() {
    this.display=false;
    this.displayreq = true;
    this.mainService.sendMessage(true);
  }
  functionToCloseDialog(){
    this.display=false;
  }
  closeDialog(){
    this.displayreq = false;
    this.mainService.sendMessage(false);
  }
}


