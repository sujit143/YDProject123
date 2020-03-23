import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { CreateNewComponent } from './create-new/create-new.component';
import { ManageLicenceAgreementComponent } from './manage-licence-agreement/manage-licence-agreement.component';
// import { ManageUserComponent } from './manage-user/manage-user.component';
import { ProviderWorkScheduleComponent } from './provider-work-schedule/provider-work-schedule.component';
import { UserRoutingModule } from './User.routing';
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
import { CreateNewModule } from './create-new/create-new.module';



@NgModule({
  declarations: [
    // CreateNewComponent,
    ManageLicenceAgreementComponent,
    // ManageUserComponent,
    ProviderWorkScheduleComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
    NgxPaginationModule,
    CreateNewModule
  ]
})
export class UsersModule { }
