import {Component, HostListener } from '@angular/core';
import { navItems } from '../../_nav';
import { DialogModule } from 'primeng/dialog';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainService } from '../../services/appservices/main.service';
import { trigger, state, style, transition, animate } from '@angular/animations';



@Component({
  selector: 'app-base',
  templateUrl: './base-layout.component.html',
  styleUrls: [
              './base-layout.component.scss',

],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('800ms ease-in-out')),
      transition('out => in', animate('600ms ease-in-out'))
    ]),
  ]
})
export class BaseLayoutComponent {
displayLogin:boolean=false;
displayreq: boolean = false;
showVirtual: boolean = false;
subscription: Subscription;
isShow: boolean;
topPosToStartShowing = 100;
@HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;


    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  public sidebarMinimized = false;
  public navItems = navItems;
  isSidebar:boolean = false;
  menuState:string = 'out';
  newMenuState:string;
  private _subscriptions = new Subscription();
  constructor(private router: Router,
    private _act: ActivatedRoute, private mainService: MainService) {
    this._subscriptions.add(
      this.router.events.subscribe((res) => {
        this.showVirtual = ((this.router.url == '/virtualvisits') ? true : false);
    })
    );

    this.subscription = this.mainService.getMessage().subscribe(message => {
      this.displayreq = message;
      if (this.displayreq == false) {
        this.displayreq = false;
      }
      console.log('test', this.displayreq);
    });
    this.subscription = this.mainService.getlogindialog().subscribe(message => {
      this.displayLogin = message;
      // if(this.displayreq==false){
      //   this.displayLogin=false;
      // }
      console.log('test', this.displayLogin);
    });

   }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  openSidebar()
   {
    //  alert("hii");
     this.isSidebar = true;
   }

   openReqApp() {
    console.log('hi');
     this.displayreq = true;
     this.mainService.sendMessage(true);

   }
   openlogin() {
    this.displayLogin = true;
   }
   bodyParts(id){
    this.router.navigate(['/BodyParts'], { queryParams: { BodyPartId: id }});
   }

  //  closeDialog() {
  //   this.displayreq = false;
  //   this.mainService.sendMessage(false);
  //  }

   toggleMenu() {

     this.isSidebar = true;
     if ( this.menuState == 'out'){
       this.menuState = 'in';
     } else if (this.menuState == 'in') {
       this.menuState = 'out';
     }
    // this.newMenuState = this.menuState === 'out' ? 'in' : 'out';
  }
  navigateHome(){
    this.router.navigate(['']);
  }
  dispSelSpecDoc(id: any) {
    this.router.navigate(['/doctors'] , { queryParams: { SpecialityId: id }});
  }
  navigateUrl(id) {
    this.router.navigate(['/doctors'], { queryParams: { doctorId: id }});
  }
  closeLoginDialog() {
    this.displayLogin = false;
  }

}
