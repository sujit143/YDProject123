import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ExternalDocUploadComponent } from './externaldocupload.component';
import { DropdownModule, CheckboxModule, DialogModule, PaginatorModule, MessageService } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ExternalDocUploadRoutingModule } from './ExternalDoc.routing.module';
@NgModule({
  declarations: [
    ExternalDocUploadComponent,
   ],
   imports: [
    CommonModule,
    HttpModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ExternalDocUploadRoutingModule,
    CheckboxModule,
   DialogModule,
   PaginatorModule,
   FormsModule,
   ReactiveFormsModule,
   ToastModule,
   TableModule,
   BsDatepickerModule.forRoot(),
    ],

  providers: [DatePipe, MessageService, ]

})
export class ExternalDocUploadModule { }
