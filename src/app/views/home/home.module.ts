import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselModule, SharedModule, ProgressSpinnerModule } from 'primeng/primeng';
import { HttpClientModule } from '@angular/common/http';
import { VirtualvisitComponent } from './virtualvisit/virtualvisit.component';
import { YourdrsEhrComponent } from './yourdrs-ehr/yourdrs-ehr.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {DialogModule} from 'primeng/dialog';
// import {SidebarModule} from 'primeng/sidebar';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { YourdrsTermsConditionsComponent } from './yourdrs-terms-conditions/yourdrs-terms-conditions.component';
import { YourdrsPrivacyComponent } from './yourdrs-privacy/yourdrs-privacy.component';
import { SharedModuleModule } from '../../shared/shared.module';
import { AgmCoreModule } from '@agm/core';




// const appRoute:Routes=[
//   // {
//   //   path: '',
//   //   component: HomeComponent
//   // },
//   {
//     path : 'virtualvisits',
//   component : VirtualvisitComponent
//   },
//   {
//    path : 'Yourdrs-ehr',
//    component : YourdrsEhrComponent
//   }
// ];


@NgModule({
  declarations: [HomeComponent, VirtualvisitComponent, YourdrsEhrComponent,YourdrsTermsConditionsComponent, YourdrsPrivacyComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkvWV8ogPGFLdoO21uu_El7fJL7h7G_Gs'


    }),
    CarouselModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    DialogModule,
    HomeRoutingModule,
  SharedModuleModule,
  ProgressSpinnerModule
  //  RouterModule.forRoot(appRoute)
    // SidebarModule,

      ],

  exports: [RouterModule]
})
export class HomeModule { }
