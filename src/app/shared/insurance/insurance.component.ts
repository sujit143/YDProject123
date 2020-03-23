import { SharedService } from './../../services/appservices/shared.service';
import { MasterService } from './../../services/master.service';
import { MessageService } from 'primeng/primeng';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

const insuraneArr = [
  {id: 1, payerName: 'jimmy', telePhone: 1234567890}
];

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {
  editInsurancePop = false;
  insuranceAssociated = true;
  newInsurancePop = false;
  fillInsurancePop = false;
  insuranceEdit = false;
  payerEligiblity = false;
  insuraneAssociatedArr: any[];
  insuraneDissAssociatedArr: any[];

  insuranceForm: FormGroup;
  constructor
  (
    private fb: FormBuilder,
    private messageService: MessageService,
    private masterService: MasterService,
    private sharedService: SharedService
  ) {
    this.insuraneAssociatedArr = insuraneArr;
  }

  ngOnInit() {

  }

  getInsuranceData() {
    this.sharedService.getPatientInsuranceData().subscribe(
      (insuranceData: any[]) => {
        this.insuraneAssociatedArr = insuranceData;
      }
    );
  }
  getFormControls() {

  }
  opendDialog(checkdialog) {

    if (checkdialog === 'editInsurancePop') {
      this.editInsurancePop = true;
    } else if (checkdialog === 'newInsurancePop') {
      this.newInsurancePop = true;
    } else if (checkdialog === 'insuranceEdit') {
      this.insuranceEdit = true;
    } else if (checkdialog === 'fillInsurancePop') {
      this.fillInsurancePop = true;
    } else if (checkdialog === 'Payer Eligibility') {
      this.payerEligiblity = true;
    }
  }
  closeDialog(checkdialog) {
    if (checkdialog === 'editInsurancePop') {
      this.editInsurancePop = false;
    } else if (checkdialog === 'newInsurancePop') {
      this.newInsurancePop = false;
    } else if (checkdialog === 'insuranceEdit') {
      this.insuranceEdit = false;
    } else if (checkdialog === 'fillInsurancePop') {
      this.fillInsurancePop = false;
    } else if (checkdialog === 'Payer Eligibility') {
      this.payerEligiblity = false;
    }
  }
  editInsurance(editableInsurance) {
    this.messageService.add({
      severity: 'success',
      summary: '',
      detail:   editableInsurance.payerName + 'Payer Data Saved Successfully'
    });
  }
  associateInsurance(insuranceItem) {

  }
  disAssociateInsurance(insuranceItem) {

  }
  SaveInsurance() {
    this.insuranceAssociated = true;
  }
}
// }
