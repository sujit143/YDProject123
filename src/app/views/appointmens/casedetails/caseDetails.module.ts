import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CasedetailsComponent } from './casedetails.component';
import { CasedetailsRoutingModule } from './caseDetails-routing.module';
import { PatientInfoModule } from '../../../shared/patient-info/patient-info.module';


@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    CasedetailsRoutingModule,
    PatientInfoModule,
  ],

  declarations: [
    CasedetailsComponent
  ],

  providers: [
  ]
})
export class CaseDetailsModule { }
