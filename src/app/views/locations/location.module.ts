
import { NgModule } from '@angular/core';
import { LocationRoutingModule } from './location-routing.module';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from './locations.component';
import { AgmCoreModule } from '@agm/core';
import { DialogModule } from 'primeng/dialog';
import { SharedModuleModule } from '../../shared/shared.module';

@NgModule({
    imports: [
     LocationRoutingModule,
     CommonModule,
     AgmCoreModule.forRoot({
        apiKey: 'AIzaSyAkvWV8ogPGFLdoO21uu_El7fJL7h7G_Gs'


      }),
      DialogModule,
      SharedModuleModule
    ],
    declarations: [
        LocationsComponent
    ]
  })
  export class LocationModule { }
