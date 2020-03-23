import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OriginatedSourceComponent } from './originated-source.component';
import { DropdownModule, CheckboxModule } from 'primeng/primeng';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [OriginatedSourceComponent],
  imports: [
    CommonModule,
    DropdownModule,
    CheckboxModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [OriginatedSourceComponent]
})
export class OriginatedSourceModule { }
