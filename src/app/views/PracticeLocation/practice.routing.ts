import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePracticeLocationComponent } from './manage-practice-location/manage-practice-location.component';
import { ManagePracticeReferralComponent } from './manage-practice-referral/manage-practice-referral.component';
import { ManagePracticeSubscriptionComponent } from './manage-practice-subscription/manage-practice-subscription.component';

const routes: Routes = [
{path : 'ManagePracticeLocation' , component : ManagePracticeLocationComponent},
{path : 'ManagePracticeReferral' , component : ManagePracticeReferralComponent},
{path : 'ManagePracticeSubscription' , component : ManagePracticeSubscriptionComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticeRoutingModule { }