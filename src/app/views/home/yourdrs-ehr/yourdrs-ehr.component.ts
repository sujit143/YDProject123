import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-yourdrs-ehr',
  templateUrl: './yourdrs-ehr.component.html',
  styleUrls: ['./yourdrs-ehr.component.scss']
})
export class YourdrsEhrComponent implements OnInit {
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

        sticky.addClass('hactive');
        img.addClass('sticky');
        document.getElementById('imgWrap').setAttribute( 'src', 'assets/img/aboutus/logo-small.png' );

      } else {
        sticky.removeClass('hactive');
        img.removeClass('sticky');
        document.getElementById('logo').setAttribute( 'src', 'assets/img/aboutus/logo.png' );
      }

      if ($('#imgWrap').length > 0) {

        var navWrap = $('#imgWrap'),
            nav = $('.imgWrap-inner'),
            startPosition = navWrap.offset().top,
            stopPosition = $('#stopHere').offset().top - nav.outerHeight();

        $(document).scroll(function () {
            //stick nav to top of page
            var y = $(this).scrollTop();

            if (y > startPosition) {
                nav.addClass('sticky');
                if (y > stopPosition) {
                    nav.css('top', stopPosition - y);
                } else {
                    nav.css('top', 0);
                }
            } else {
                nav.removeClass('sticky');
            }
        });
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
