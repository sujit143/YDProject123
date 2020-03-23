import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastSurgicalHistoryComponent } from './past-surgical-history.component';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoCompleteModule, InputMaskModule, DropdownModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    PastSurgicalHistoryComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    ConfirmDialogModule,
    AutoCompleteModule,
    InputMaskModule,
    DropdownModule
  ],
  exports: [
    PastSurgicalHistoryComponent
  ]
})
export class PastSurgicalHistoryModule { }
