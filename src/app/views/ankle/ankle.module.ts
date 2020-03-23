// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AnkleComponent } from './ankle.component';
import { AnkleRoutingModule } from './ankle.routing';
import { AgmCoreModule } from '@agm/core';
import { ModalModule } from "ngx-bootstrap";
import { BsDropdownModule } from 'ngx-bootstrap';
import { DialogModule } from 'primeng/dialog';
import { SharedModuleModule } from '../../shared/shared.module';
import { ProgressSpinnerModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AnkleRoutingModule,
    DialogModule,
    BsDropdownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkvWV8ogPGFLdoO21uu_El7fJL7h7G_Gs'
    }),
    ModalModule.forRoot(),
    SharedModuleModule,
    ProgressSpinnerModule

  ],
  declarations: [
    AnkleComponent
    ]
})
export class AnkleModule { }
