import { CommonSearchComponent } from './common-search.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/primeng';



@NgModule({
  declarations: [CommonSearchComponent],
  imports: [
    CommonModule,
    DropdownModule
  ], exports: [CommonSearchComponent]
})
export class CommonSearchModule { }
