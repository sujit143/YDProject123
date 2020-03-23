import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-manage-practice-location',
  templateUrl: './manage-practice-location.component.html',
  styleUrls: ['./manage-practice-location.component.scss']
})
export class ManagePracticeLocationComponent implements OnInit {
  marked = false;
  theCheckbox = false;
  display: boolean = false;
  isShow: boolean;
  manageEPayer: boolean = false;
  viewDetDilog: boolean = false;
  addLocationDilog: boolean = false;
  addMemberDilog: boolean = false;
  editPracticeDilog: boolean = false;
  deletePracticeDilog: boolean = false;
  myDateValue: Date;
  arr: any = [];
  topPosToStartShowing = 100;
  bsValue = new Date();

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
  constructor() { }

  ngOnInit() {
    this.myDateValue = new Date();
  }
  toggleVisibility(e){
    this.marked= e.target.checked;
  }
  openDoctorProfilePopup() {
    // this.arr = item;
    this.display = true;
  }
  manageEPayers(){
    // this.arr = item;
    this.manageEPayer = true;
  }
  viewDetail(){
    // this.arr = item;
    this.viewDetDilog = true;
  }
  addlocation(){
    // this.arr = item;
    this.addLocationDilog = true;
  }
  addMember(){
    // this.arr = item;
    this.addMemberDilog = true;
  }
  editPractice(){
    // this.arr = item;
    this.editPracticeDilog = true;
  }
  deletePractice(){
    // this.arr = item;
    this.deletePracticeDilog = true;
  }
  closeDialog() {
    this.manageEPayer = false;
    this.viewDetDilog = false;
    this.addLocationDilog = false;
    this.addMemberDilog = false;
    this.editPracticeDilog = false;
    this.deletePracticeDilog = false;
    this.display=false;
  }
}
