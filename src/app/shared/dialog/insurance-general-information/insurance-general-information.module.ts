import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceGeneralInformationComponent } from './insurance-general-information.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/primeng';
import { BsDatepickerModule,DatepickerModule } from 'ngx-bootstrap';
import {InputMaskModule} from 'primeng/inputmask';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {CheckboxModule} from 'primeng/checkbox';
import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [InsuranceGeneralInformationComponent],
  imports: [
    CommonModule,
    PopoverModule.forRoot(),
    BsDropdownModule,
    DialogModule,
    DropdownModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    InputMaskModule,
    RadioButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    AccordionModule,
    AutoCompleteModule,
    NgxPaginationModule
  ],
  exports: [InsuranceGeneralInformationComponent]
})
export class InsuranceGeneralInformationModule { }
