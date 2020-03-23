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
import { DropdownModule } from 'primeng/primeng';
import { SurgeryComponent } from '../surgery/surgery.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
     DropdownModule,
    AccordionModule,
    AutoCompleteModule,
    CheckboxModule,
    DropDownListModule,
    ConfirmDialogModule,
   ],

  declarations: [
    SurgeryComponent

    ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  exports: [SurgeryComponent]
})
export class SurgeryModule { }
