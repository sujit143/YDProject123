import { Component, OnInit,HostListener} from '@angular/core';
import { DoctordataService } from '../doctors/doctordata.service';
import { Speciality } from '../../models/speciality';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})
export class SpecialityComponent implements OnInit {
  arrSpeciality: Speciality[];
  specialityList: Speciality[];
  spinnerdisplay:boolean = false;
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
  constructor(
    private _data: DoctordataService,
    private _route: Router
  ) { }

  ngOnInit() {
    this.getSpeciality();
  }
  getSpeciality() {
    this.spinnerdisplay=true;
    this._data.getDoctorsSpeciality().then(
      (x: Speciality[]) => {
        this.arrSpeciality = x;
        this.specialityList = this.arrSpeciality['SpecialityList'];
        this.spinnerdisplay = false;
      }
    );
  }
  getSpecDoc(item) {
    console.log(item);
    this._route.navigate(['/doctors'], { queryParams: { SpecialityId: item.Id}});
  }
}
