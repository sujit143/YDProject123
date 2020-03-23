import { DialogModule } from 'primeng/primeng';
import { ViewDetailsComponent } from './view-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ViewDetailsComponent],
  imports: [
    CommonModule,
  ], exports: [ViewDetailsComponent]
})
export class ViewDetailsModule { }
