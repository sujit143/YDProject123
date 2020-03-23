import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-yourdrs-privacy',
  templateUrl: './yourdrs-privacy.component.html',
  styleUrls: ['./yourdrs-privacy.component.scss']
})
export class YourdrsPrivacyComponent implements OnInit {
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
