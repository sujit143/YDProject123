import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LegalRepresentativeComponent} from './legal-representative.component';
import { DropdownModule, InputMaskModule, DialogModule } from 'primeng/primeng';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LegalRepresentativeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    DropdownModule,
    InputMaskModule
  ],
  exports: [LegalRepresentativeComponent]
})
export class LegalRepresentativeModule { }
