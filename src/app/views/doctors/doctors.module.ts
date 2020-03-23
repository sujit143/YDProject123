import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, TabsModule } from 'ngx-bootstrap';

import { DoctorsComponent } from './doctors.component';
import { DoctorsprofileComponent } from './doctorsprofile/doctorsprofile.component';
import { DoctorsRoutingModule } from './doctors-routing';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DoctordataService } from './doctordata.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonHttpService } from '../../shared/common-http.service';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';

// import { ReqappointmentComponent } from '../reqappointment/reqappointment.component';
import { CalendarModule, ProgressSpinnerModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { SharedModuleModule } from '../../shared/shared.module';
// import { ReqappointmentComponent } from '../../shared/component/reqappointment/reqappointment.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {InputMaskModule} from 'primeng/inputmask';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    DoctorsRoutingModule,
    DialogModule,
    HttpClientModule,
    HttpModule,
    CalendarModule,
    ToastModule,
    SharedModuleModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkvWV8ogPGFLdoO21uu_El7fJL7h7G_Gs'
    }),
    InputMaskModule,
    ProgressSpinnerModule

  ],
  declarations: [
    DoctorsComponent,
    DoctorsprofileComponent

  ],
  providers: [
    DoctordataService,
    CommonHttpService
   ],
  //  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  exports: [
    DoctorsComponent
  ]
})
export class DoctorsModule { }
