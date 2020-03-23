import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { DialogModule } from 'primeng/primeng';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule
  ],
  exports: [AlertComponent]
})
export class AlertModule { }
