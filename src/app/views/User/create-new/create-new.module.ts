import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { PopoverModule } from 'ngx-bootstrap';
import { InputMaskModule } from 'primeng/inputmask';
import { TabsModule, BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateNewComponent } from './create-new.component';
import { ManageUserComponent } from '../manage-user/manage-user.component';



@NgModule({
  declarations: [
    CreateNewComponent,
 ManageUserComponent,
  ],
  imports: [
    CommonModule,
    MultiSelectModule,
    ReactiveFormsModule,
    FormsModule,
    PopoverModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DropdownModule,
    InputMaskModule,
    ToastModule,
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    CheckboxModule,
    DropdownModule,
    ToastModule,
    FileUploadModule,
    DialogModule,
    TableModule,
    NgxPaginationModule
  ]
})
export class CreateNewModule { }
