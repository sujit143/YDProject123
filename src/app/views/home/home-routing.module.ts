import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YourdrsEhrComponent } from './yourdrs-ehr/yourdrs-ehr.component';
import { VirtualvisitComponent } from './virtualvisit/virtualvisit.component';
import { HomeComponent } from './home.component';
import { BaseLayoutComponent } from '../../containers/base-layout/base-layout.component';
import { YourdrsTermsConditionsComponent } from './yourdrs-terms-conditions/yourdrs-terms-conditions.component';
import { YourdrsPrivacyComponent } from './yourdrs-privacy/yourdrs-privacy.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'home'
    }
  },


  // {
  //   path : 'virtualvisits',
  //   component : VirtualvisitComponent
  // },
  // {
  //   path : 'Yourdrs-ehr',
  //   component : YourdrsEhrComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
