import { CommonSearchModule } from './../dialog/common-search/common-search.module';
import { ViewDetailsModule } from '../dialog/view-details/view-details.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferralSourceComponent } from './referral-source.component';
import { DialogModule } from 'primeng/dialog';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';
import { AutoCompleteModule, ConfirmDialogModule, DropdownModule } from 'primeng/primeng';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ReferralSourceComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    AutoCompleteModule,
    DropdownModule,
    ViewDetailsModule,
    CommonSearchModule
  ],
  exports: [ReferralSourceComponent]
})
export class ReferralSourceModule { }
