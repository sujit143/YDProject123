import { InsuranceModule } from './../insurance/insurance.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { BsDatepickerModule, DatepickerModule, CarouselModule  } from 'ngx-bootstrap';
import { WebcamModule } from 'ngx-webcam';
import { AutoCompleteModule, AccordionModule, DropdownModule, CheckboxModule, ConfirmDialogModule, InputMaskModule, RadioButtonModule } from 'primeng/primeng';

import { DemographicsComponent } from './demographics.component';
import { ReferralSourceModule } from '../referral-source/referral-source.module';
import { EmergencyContactsModule } from '../emergency-contacts/emergency-contacts.module';
import { OriginatedSourceModule } from '../originated-source/originated-source.module';
import { LegalRepresentativeModule } from '../legal-representative/legal-representative.module';
import { OrganizationModule } from '../organization/organization.module';
import { InsuranceGeneralInformationModule } from './../dialog/insurance-general-information/insurance-general-information.module';
import { AlertModule } from '../alert/alert.module';
import { PastSurgicalHistoryModule } from '../past-surgical-history/past-surgical-history.module';
@NgModule({
  declarations: [
    DemographicsComponent,
  ],
  imports: [
    CommonModule,
    PastSurgicalHistoryModule,
    ReactiveFormsModule,
    ToastModule,
    DialogModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    WebcamModule,
    CarouselModule,
    AutoCompleteModule,
    AccordionModule,
    DropdownModule,
    CheckboxModule,
    ConfirmDialogModule,
    InputMaskModule,
    ReferralSourceModule,
    EmergencyContactsModule,
    OriginatedSourceModule,
    LegalRepresentativeModule,
    OrganizationModule,
    AlertModule,
    InsuranceGeneralInformationModule,
    InsuranceModule,
    RadioButtonModule
  ],
  exports: [DemographicsComponent]
})
export class DemographicsModule { }
