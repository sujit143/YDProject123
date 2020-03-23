import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { DropdownModule, CheckboxModule, PaginatorModule, MessageService, CalendarModule,
  AccordionModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';
import { ProviderDashboardComponent } from './providerdashboard.component';
import { Providerdashboard1Component } from './providerdashboard1/providerdashboard1.component';
import { SortableModule } from 'ngx-bootstrap/sortable';
import {DialogModule} from 'primeng/dialog';
import {ToolbarModule} from 'primeng/toolbar';
import { ProviderDashboardRoutingModule } from './ProviderDash.routing.module';

@NgModule({
  declarations: [
    ProviderDashboardComponent,
    Providerdashboard1Component
  ],

  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpModule,
    DropdownModule,
    CheckboxModule,
    DialogModule,
    PaginatorModule,
    ToastModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    SortableModule.forRoot(),
    CalendarModule,
    AccordionModule,
    ToolbarModule,
    ProviderDashboardRoutingModule
  ],

  providers: [DatePipe, MessageService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],

})
export class ProviderDashboardModule { }
