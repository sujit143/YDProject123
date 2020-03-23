import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule, InputMaskModule, DialogModule } from 'primeng/primeng';
import { EmergencyContactsComponent } from './emergency-contacts.component';

@NgModule({
  declarations: [EmergencyContactsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    DropdownModule,
    InputMaskModule
  ],
  exports: [EmergencyContactsComponent]
})
export class EmergencyContactsModule { }
