import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
// import Scrollbar from 'smooth-scrollbar';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: `
  <!-- <app-appheader></app-appheader> -->
  <router-outlet></router-outlet>
  `,

})
export class AppComponent implements OnInit {
  // Scrollbar = window.scrollbars;
  // Scrollbar = window.Scrollbar;
  //   Scrollbar.init(document.querySelector('#my-scrollbar'));
  constructor(private router: Router) {
    // Scrollbar.init(document.querySelector('#my-scrollbar'));
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0); 
    });
  }
}
