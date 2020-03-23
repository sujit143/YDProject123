import { AddHealthInsuranceInfoModule } from './../dialog/add-health-insurance-info/add-health-insurance-info.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleAppointmentComponent } from './schedule-appointment.component';
import { SchInsuranceComponent } from './sch-insurance/sch-insurance.component';
import { SchAppointmentsComponent } from './sch-appointments/sch-appointments.component';
import { SchReferralsourceComponent } from './sch-referralsource/sch-referralsource.component';
import { SchDocumentsComponent } from './sch-documents/sch-documents.component';
import { SchCareTeamComponent } from './sch-care-team/sch-care-team.component';
import { SchAppointmemtmemoComponent } from './sch-appointmemtmemo/sch-appointmemtmemo.component';
import { PhoneMaskDirective } from './phone-mask.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule, InputMaskModule, RadioButtonModule, DropdownModule, CheckboxModule } from 'primeng/primeng';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ToastModule } from 'primeng/toast';
import { SharedModuleModule } from '../shared.module';
import { ReferralSourceComponent } from '../referral-source/referral-source.component';
import { ReferralSourceModule } from '../referral-source/referral-source.module';
import { LegalRepresentativeModule } from '../legal-representative/legal-representative.module';



@NgModule({
  declarations: [
    ScheduleAppointmentComponent,
    SchInsuranceComponent,
    SchAppointmentsComponent,
    SchReferralsourceComponent,
    SchDocumentsComponent,
    SchCareTeamComponent,
    SchAppointmemtmemoComponent,
    PhoneMaskDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatepickerModule.forRoot(),
    CalendarModule,
    DialogModule,
    InputMaskModule,
    RadioButtonModule,
    BsDatepickerModule.forRoot(),
    DropdownModule,
    CheckboxModule,
    DropDownListModule,
    ToastModule,
    ReferralSourceModule,
    AddHealthInsuranceInfoModule,
    LegalRepresentativeModule
  ],

  exports : [
    // PhoneMaskDirective,
    ScheduleAppointmentComponent,
    SchReferralsourceComponent,
    SchDocumentsComponent,
    SchAppointmemtmemoComponent,
  ]
})
export class ScheduleapptModule { }
