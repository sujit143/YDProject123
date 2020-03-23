import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-virtualvisit',
  templateUrl: './virtualvisit.component.html',
  styleUrls: ['./virtualvisit.component.scss']
})
export class VirtualvisitComponent implements OnInit {
  private _subscriptions = new Subscription();
  showVirtual: boolean = true;
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
      document.getElementById('logo').setAttribute( 'src', 'assets/img/virtualvisit/logo-vv.png' );
    }
  }

  constructor() {

   }

  ngOnInit() {
  }

}
