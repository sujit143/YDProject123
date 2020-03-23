import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PatientInfoComponent} from './patient-info.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TabsModule} from 'ngx-bootstrap';
import {TabMenuModule} from 'primeng/tabmenu';
import { DropdownModule, DialogModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/inputmask';
import { DemographicsModule } from '../demographics/demographics.module';
import { CasenoteModule } from '../casenote/casenote.module';
import { SurgeryModule } from '../surgery/surgery.module';
import {  CheckboxModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
@NgModule({
    declarations: [PatientInfoComponent],
    imports: [
      CommonModule,
      TabsModule.forRoot(),
      NgxPaginationModule,
      TabMenuModule,
      DropdownModule,
      DemographicsModule,
      InputMaskModule,
      CasenoteModule,
      SurgeryModule,
      CheckboxModule,
      ToastModule,
      DialogModule
    ],

    exports: [
      PatientInfoComponent
    ]
  })
  export class PatientInfoModule { }
