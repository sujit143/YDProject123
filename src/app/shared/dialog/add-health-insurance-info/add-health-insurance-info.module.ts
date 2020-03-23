import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule, CheckboxModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/dialog';
import { AddHealthInsuranceInfoComponent } from './add-health-insurance-info.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule, BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';
import { ToastModule } from 'primeng/toast';




@NgModule({
  declarations: [AddHealthInsuranceInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    DropdownModule,
    CheckboxModule,
    ToastModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [AddHealthInsuranceInfoComponent]
})
export class AddHealthInsuranceInfoModule {}
