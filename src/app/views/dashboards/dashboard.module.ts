import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing';
import {DropdownModule} from 'primeng/primeng';
import {ToolbarModule} from 'primeng/toolbar';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';
import { CalendarModule, AccordionModule } from 'primeng/primeng';
import {PaginatorModule} from 'primeng/paginator';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import { BsDatepickerModule, DatepickerModule, BsDropdownModule, PaginationModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { ExternalDocUploadModule } from './ExternalDocUpload/ExternalDoc.module';
import { ProviderDashboardModule } from './providerdashboard/ProviderDash.module';


@NgModule({
  declarations: [
  ],

  imports: [
    CommonModule,
    DashboardRoutingModule,
    ExternalDocUploadModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
   ToolbarModule,
   CheckboxModule,
   InputTextModule,
   ButtonModule,
   DialogModule,
   PaginatorModule,
   FileUploadModule,
    PaginationModule.forRoot(),
   CalendarModule,
   AccordionModule,
   FormsModule,
   ReactiveFormsModule,
   ToastModule,
   FileUploadModule,
   TableModule,
   BsDatepickerModule.forRoot(),
   BsDropdownModule,
   DatepickerModule.forRoot(),
   SortableModule.forRoot(),
   ProviderDashboardModule

  ],

  providers: [DatePipe,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
    // DraggableItemService
  ],

})
export class DashboardModule { }
