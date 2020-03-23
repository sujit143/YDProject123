import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DoctordataService } from '../../doctors/doctordata.service';

@Component({
  selector: 'app-manage-practice-referral',
  templateUrl: './manage-practice-referral.component.html',
  styleUrls: ['./manage-practice-referral.component.scss']
})
export class ManagePracticeReferralComponent implements OnInit {

  add1: boolean = false;
  edit: boolean = false;
  delete: boolean = false;
  myDateValue: Date;
  addpractice: FormGroup;
  editpractice: FormGroup;
  search1: boolean = false;
  search2: boolean = false;
  add2: boolean = false;

  // --------------------
  add3: boolean = false;
  orgnisationList: any[];
  stateList: any[];
  practiceList: any[];
  LocationList: any[];
  // --------------------

  constructor(private fb: FormBuilder,
              private doctordataService: DoctordataService
            ) { }

  ngOnInit() {
    this.myDateValue = new Date();
    this.addpractice = this.fb.group({
      Practice : new FormControl(null, Validators.required),
      Location : new FormControl(null, Validators.required),
      Status  : new FormControl(null, Validators.required),
      Substartdate : new FormControl(null, Validators.required),
      Subenddate: new FormControl(null)
    });
    this.editpractice = this.fb.group({
      Practice : new FormControl(null, Validators.required),
      Location : new FormControl(null, Validators.required),
      Status  : new FormControl(null, Validators.required),
      Substartdate : new FormControl(null, Validators.required),
      Subenddate: new FormControl(null)
    });
    this.getOraganisation();
    this.getState();
    this.getPractice();
    this.getLocation();
  }

  openAdd1popup() {
    this.add1 = true;
  }
  closeadd1() {
    this.add1 = false;
  }
  opensearch1popup() {
    this.search1 = true;
  }
  closesearch1popup() {
    this.search1 = false;
  }
  openadd2popup() {
    this.add2 = true;
  }
  closeadd2popup(){
    this.add2 = false;
  }
  opensearch2popup() {
    this.search2 = true;
  }
  closesearch2popup() {
    this.search2 = false;
  }
  openEditpopup() {
    this.edit = true;
  }
  closeedit() {
    this.edit = false;
  }
  opendeletepopup() {
    this.delete = true;
  }
  closedelete() {
    this.delete = false;
  }
  addnewpractice(addpractice) {

  }
  deletepractice() {

  }
  // --------------------
  openadd3popup() {
    this.add3 = true;
  }
  getOraganisation() {
    this.doctordataService.getOrganisationData().then(
      res => {
        this.orgnisationList = res;
      }
    );
  }
  getState() {
    this.doctordataService.getStatenData().then(
      res => {
        this.stateList = res;
      }
    );
  }
  getPractice() {
    this.doctordataService.getPracticeData().then(
      res => {
        this.practiceList = res;
      }
    );
  }
  getLocation() {
    this.doctordataService.getLocationData().then(
      res => {
        this.LocationList = res;
      }
    );
  }
  closeadd3popup() {
    this.add3 = false;
  }
  // --------------------
}
