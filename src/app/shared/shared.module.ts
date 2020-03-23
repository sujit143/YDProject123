import { LocalStorageService } from './local-storage.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WebcamModule } from 'ngx-webcam';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';
import { CalendarModule, DialogModule, RadioButtonModule, AccordionModule, AutoCompleteModule, CheckboxModule, MessageService, ConfirmationService } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { CarouselModule } from 'primeng/carousel';
// import { InputMaskModule } from 'primeng/inputmask';
import { TabViewModule } from 'primeng/primeng';
// import { DropdownModule } from 'primeng/primeng';
import { TopNavtabsComponent } from './top-navtabs/top-navtabs.component';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { TableheaderFilterComponent } from './tableheader-filter/tableheader-filter.component';
import { ReqappointmentComponent } from './component/reqappointment/reqappointment.component';
import { SharedRoutingModule } from './shared-routing.module';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ScheduleapptModule } from './schedule-appointment/scheduleappt.module';
import { DemographicsModule } from './demographics/demographics.module';
import { PatientInfoModule } from './patient-info/patient-info.module';
import { MessagesService } from '../services/appservices/messages.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastModule,
    CalendarModule,
    DialogModule,
    CarouselModule,
    // InputMaskModule,
    RadioButtonModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    WebcamModule,
    TabViewModule,
    // DropdownModule,
    AccordionModule,
    SharedRoutingModule,
    AutoCompleteModule,
    CheckboxModule,
    DropDownListModule,
    ConfirmDialogModule,
    ScheduleapptModule,
    DemographicsModule,
    PatientInfoModule
  ],

  declarations: [
    ReqappointmentComponent,
    TopNavtabsComponent,
    TableFilterComponent,
    TableheaderFilterComponent,

    ],
  providers: [
    MessageService,
    ConfirmationService,
    MessagesService,
    LocalStorageService

  ],
  exports:
    [
      ReqappointmentComponent,
      TopNavtabsComponent,
      TableFilterComponent,
      TableheaderFilterComponent,

    ]
})
export class SharedModuleModule { }
