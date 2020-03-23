import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpModule } from '@angular/http';
import { WorkCalanderRoutingModule } from './work-calender-routing.module';
import { WorkCalanderComponent } from './work-calander.component';
import { CommonHttpService } from '../../../shared/common-http.service';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SharedModuleModule } from '../../../shared/shared.module';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule, InputMaskModule, CheckboxModule, RadioButtonModule, CalendarModule, ConfirmDialogModule, ToolbarModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { DropDownListModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TabsModule, DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TimepickerModule } from 'ngx-bootstrap';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';

@NgModule({
  imports: [
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CommonModule,
    FormsModule,
    WorkCalanderRoutingModule,
    HttpModule,
    SharedModuleModule,
    ScheduleModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    InputMaskModule,
    DialogModule,
    ToastModule,
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
    MultiSelectModule,
    TimepickerModule.forRoot()

  ],
  declarations: [ WorkCalanderComponent ],
  providers: [ CommonHttpService,
                DayService,
                WeekService,
                WorkWeekService,
                MonthService,
                AgendaService,
                MonthAgendaService,
                DragAndDropService,
                DragAndDropService,
                MessageService,
                ConfirmationService,
                TimepickerConfig,
                DatePipe
              ]
})
export class WorkCalanderModule { }
