import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-yourdrs-terms-conditions',
  templateUrl: './yourdrs-terms-conditions.component.html',
  styleUrls: ['./yourdrs-terms-conditions.component.scss']
})
export class YourdrsTermsConditionsComponent implements OnInit {


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
  constructor() { }

  ngOnInit() {
  }

}
