import { AddHealthInsuranceInfoModule } from './../../shared/dialog/add-health-insurance-info/add-health-insurance-info.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { GeneralRequestComponent } from './general-request/general-request.component';
import { WorkCalanderComponent } from './work-calander/work-calander.component';
import { AppointmensRoutingModule } from './appointmens-routing.module';
import { SharedModuleModule } from '../../shared/shared.module';
import { AppointmentsComponent } from './appointments/appointments.component';
import { FilterPipe } from './filter.pipe';
import { ScheduleModule, DayService, WeekService , WorkWeekService, MonthService, AgendaService} from '@syncfusion/ej2-angular-schedule';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from 'primeng/dialog';
import {  DragAndDropService } from '@syncfusion/ej2-angular-schedule';
import {  MonthAgendaService } from '@syncfusion/ej2-angular-schedule';


import { InputMaskModule, MessageService, ConfirmationService } from 'primeng/primeng';

import {DropdownModule} from 'primeng/dropdown';
import { DatepickerModule, BsDatepickerModule  } from 'ngx-bootstrap';
import { DropDownListModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { GridModule } from '@syncfusion/ej2-angular-grids';

// import { EJAngular2Module } from 'ej-angular2';
// import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import {TabMenuModule} from 'primeng/tabmenu';
// import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
// import {CalendarModule} from 'primeng/calendar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ToastModule } from 'primeng/toast';
import {CheckboxModule} from 'primeng/checkbox';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
// import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import {ToolbarModule} from 'primeng/toolbar';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { ScheduleapptModule } from '../../shared/schedule-appointment/scheduleappt.module';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ReferralSourceModule } from '../../shared/referral-source/referral-source.module';
import { WorkCalanderModule } from './work-calander/work-calender.module';
import { DashboardModule } from './appointment-dashboard/appointment-dashboard.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { CaseDetailsModule } from './casedetails/caseDetails.module';




@NgModule({
  declarations: [
    GeneralRequestComponent,
    FilterPipe
  ],
  imports: [
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CommonModule,
    AppointmensRoutingModule,
    SharedModuleModule,
    ScheduleModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    InputMaskModule,
    ToastModule,
    // EJAngular2Module,
    CheckboxModule,
    RadioButtonModule,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    DropDownListModule,
    DropdownModule,
    GridModule,
    TabsModule.forRoot(),
    DatePickerModule,
    ConfirmDialogModule,
    ToolbarModule,
    ScheduleapptModule,
    MultiSelectModule,
    ReferralSourceModule,
    WorkCalanderModule,
    SchedulerModule,
    AddHealthInsuranceInfoModule,
    DashboardModule,
    AppointmentsModule,
    CaseDetailsModule
  ],

  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    DragAndDropService,
    // GroupService
    DragAndDropService,
    MessageService,
    ConfirmationService
    // ScheduleResourceDirective
  ],

})
export class AppointmensModule { }
