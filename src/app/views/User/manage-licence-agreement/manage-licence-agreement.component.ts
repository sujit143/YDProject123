import { Component, OnInit } from '@angular/core';
import { DoctordataService } from '../../doctors/doctordata.service';

@Component({
  selector: 'app-manage-licence-agreement',
  templateUrl: './manage-licence-agreement.component.html',
  styleUrls: ['./manage-licence-agreement.component.scss']
})
export class ManageLicenceAgreementComponent implements OnInit {

  licenceArr: any;
  firstvalue: number;
  secondvalue: number;
  list: number[] = [1, 2, 3, 4, 5, 6];

  constructor(private doctordataService: DoctordataService) { }

  ngOnInit() {
    this.getManageLicenceAgreement();
  }
  getManageLicenceAgreement() {
    this.doctordataService.getManageLicenceAgreementData().then(
      res => {
        if (res) {
          this.licenceArr = res;
          this.firstvalue = 1;
          this.secondvalue = 10;
        }
      },
      error => {
      }
    );
  }
  getpage(item) {
    console.log(item);
  }
  changeStatus() {

  }

}
