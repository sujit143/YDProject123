import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ScheduleModule,
  DayService,
  WeekService ,
  WorkWeekService,
  MonthService,
  AgendaService,
  MonthAgendaService,
  DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { DropDownListModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule, MessageService, ConfirmationService } from 'primeng/primeng';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatepickerModule, BsDatepickerModule  } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SchedulerComponent } from './scheduler.component';
import { CommonHttpService } from '../../../shared/common-http.service';
import { SharedModuleModule } from '../../../shared/shared.module';
import { ScheduleapptModule } from '../../../shared/schedule-appointment/scheduleappt.module';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';



@NgModule({
  imports: [
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CommonModule,
    SharedModuleModule,
    ScheduleModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule,
    InputMaskModule,
    ToastModule,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    DropDownListModule,
    GridModule,
    TabsModule.forRoot(),
    DatePickerModule,
    ConfirmDialogModule,
    ToolbarModule,
    ScheduleapptModule,
    MultiSelectModule,
    SchedulerRoutingModule,
    CheckBoxModule
  ],

  declarations: [
    SchedulerComponent
  ],

  providers: [
    CommonHttpService,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    DragAndDropService,
    MessageService,
    ConfirmationService
  ]
})
export class SchedulerModule { }
