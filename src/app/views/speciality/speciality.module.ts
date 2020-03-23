import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { SpecialityComponent } from './speciality.component';
import { SpecialityRoutingModule } from './speciality-routing.module';
import { CommonModule } from '@angular/common';
import { CommonHttpService } from '../../shared/common-http.service';
import { HttpModule } from '@angular/http';
import { ProgressSpinnerModule } from 'primeng/primeng';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SpecialityRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    HttpModule,
    ProgressSpinnerModule
  ],
  declarations: [ SpecialityComponent ],
  providers:[CommonHttpService]
})
export class SpecialityModule { }
