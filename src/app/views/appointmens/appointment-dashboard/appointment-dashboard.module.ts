import { NgModule } from '@angular/core';
import { InputMaskModule, MessageService, ConfirmationService } from 'primeng/primeng';
import {DropdownModule} from 'primeng/dropdown';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ToastModule } from 'primeng/toast';
import {CheckboxModule} from 'primeng/checkbox';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToolbarModule} from 'primeng/toolbar';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import {RadioButtonModule} from 'primeng/radiobutton';
import { DashboardComponent } from './appointment-dashboard.component';
import { DashboardRoutingModule } from './appointment-dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DatepickerModule, BsDatepickerModule  } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DropdownModule,
    ReactiveFormsModule,
    InputMaskModule,
    ToastModule,
    // EJAngular2Module,
    CheckboxModule,
    RadioButtonModule,
    CalendarModule,
    FormsModule,
    DropDownListModule,
    GridModule,
    TabsModule.forRoot(),
    DatePickerModule,
    ConfirmDialogModule,
    ToolbarModule,
    DialogModule, DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule

  ],

  providers: [
    MessageService,
    ConfirmationService
    // ScheduleResourceDirective
  ],

})



export class DashboardModule { }
