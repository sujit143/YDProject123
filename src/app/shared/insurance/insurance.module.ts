import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/primeng';
import { InsuranceGeneralInformationModule } from './../dialog/insurance-general-information/insurance-general-information.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceComponent } from './insurance.component';
import { BsDropdownModule, PopoverModule } from 'ngx-bootstrap';



@NgModule({
  declarations: [InsuranceComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InsuranceGeneralInformationModule,
    DialogModule,
    BsDropdownModule,
    PopoverModule.forRoot(),
  ], exports: [InsuranceComponent]
})
export class InsuranceModule { }
