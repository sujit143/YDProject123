import { NgModule } from '@angular/core';
import {AutoCompleteModule, InputMaskModule, MessageService, ConfirmationService, } from 'primeng/primeng';
import {DropdownModule} from 'primeng/dropdown';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ToastModule } from 'primeng/toast';
import {CheckboxModule} from 'primeng/checkbox';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToolbarModule} from 'primeng/toolbar';

import {RadioButtonModule} from 'primeng/radiobutton';

import { CommonModule, DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DatepickerModule, BsDatepickerModule  } from 'ngx-bootstrap';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { SharedModuleModule } from '../../../shared/shared.module';
import { ScheduleapptModule } from '../../../shared/schedule-appointment/scheduleappt.module';
import { AddHealthInsuranceInfoModule } from '../../../shared/dialog/add-health-insurance-info/add-health-insurance-info.module';
import { ReferralSourceModule } from '../../../shared/referral-source/referral-source.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';



@NgModule({
  declarations: [AppointmentsComponent],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    DropdownModule,
    ReactiveFormsModule,
    InputMaskModule,
    ToastModule,
    TooltipModule,
    // EJAngular2Module,
    CheckboxModule,
    RadioButtonModule,
    FormsModule,
    TabsModule.forRoot(),
    ConfirmDialogModule,
    ToolbarModule,
    DialogModule, DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SharedModuleModule,
    ScheduleapptModule,
    AddHealthInsuranceInfoModule,
    ReferralSourceModule,
    AutoCompleteModule
  ],

  providers: [
    MessageService,
    ConfirmationService,
     DatePipe
    // ScheduleResourceDirective
  ],

})



export class AppointmentsModule {}
