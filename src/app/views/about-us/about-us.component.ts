import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/primeng';
import * as _ from 'lodash';
import { AboutService } from './about.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  display: boolean = false;
  appointmentModal: boolean = false;
  closend: boolean = false;
  reqForm: FormGroup;
  date4: Date;
  minDate: Date;
  maxDate: Date;
  bodyparts: any;
  selectedParts: any;
  confirmDialog: boolean = false;
  details: FormGroup;
  arrloc: Location[] = [];
  arraylocation: Location[] = [];

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
  constructor(private router: Router, private messageService: MessageService, private fb: FormBuilder, private route: Router,
    private aboutService: AboutService) { }

  ngOnInit() {
    this.reqForm = this.fb.group({
      fullName: new FormControl(null),
      phoneno: new FormControl(null),
      ip1: new FormControl(null),
      city: new FormControl(null),
      comment: new FormControl(null)
    });
    this.getbodyparts();
  }

  showDialog() {
    this.display = true;
    this.confirmDialog = false;


  }

  nextModal(selectedParts) {
    const test = _.filter(selectedParts, (s) => {
      return (s.isSelected === true);
    });
    if (!_.isEmpty(test)) {
      this.confirmDialog = true;
      this.display = false;
    }
    else {
      this.messageService.add({ severity: 'info', summary: 'Alert Message', detail: 'please Select atleast one bodypart' });
    }


  }
  onAddArticle() {
    if (this.reqForm.value.fullName == null) {
      setTimeout(() => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });

      }, 100);
    } else {
      this.confirmDialog = false; {
        this.messageService.add({ severity: 'success', summary: 'success message', detail: 'Submitted successfully' })



      }
    }
  }



  getbodyparts() {
    this.aboutService.getbodyparts('').then(
      res => {
        if (res) {
          this.bodyparts = res;
          this.selectedParts = this.bodyparts[0];
        }
      },
      error => {
      }
    );
  }

  selectParts(parts) {
    parts.isSelected = (parts.isSelected === true ? false : true);
  }

  getlocation() {
    this.aboutService.getLocation().subscribe((data: Location[]) => {
      this.arrloc = data;
      this.arraylocation = this.arrloc[' locationList '];
    });
  }

}
