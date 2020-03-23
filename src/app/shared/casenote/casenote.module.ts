
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabsModule, BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';
import {AutoCompleteModule, CalendarModule, DialogModule, RadioButtonModule, CheckboxModule, MessageService, ConfirmationService } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SharedRoutingModule } from '../shared-routing.module';
import { CasenoteComponent } from './casenote.component';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
  declarations: [

    CasenoteComponent
],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastModule,
    CalendarModule,
    AutoCompleteModule,
    DialogModule,
    TabsModule.forRoot(),
    RadioButtonModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    DropdownModule,
    NgxPaginationModule,
    CheckboxModule,
    ConfirmDialogModule,
    SharedRoutingModule
   ],
   providers: [
    MessageService,
    ConfirmationService
  ],
  exports: [CasenoteComponent]
})
export class CasenoteModule { }