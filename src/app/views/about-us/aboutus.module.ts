import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { DialogModule } from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import { CalendarModule, MessageService } from 'primeng/primeng';
import { AboutService } from './about.service';
import { AboutusRoutingModule } from './aboutus-routing';
import { CommonHttpService } from '../../shared/common-http.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    DialogModule,
    ToastModule,
    ReactiveFormsModule,
    CalendarModule,
    AboutusRoutingModule,


  ],
  declarations: [AboutUsComponent ],
  providers:[MessageService,AboutService,CommonHttpService]
})
export class AboutusModule { }
