import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewComponent } from './create-new/create-new.component';
import { ManageLicenceAgreementComponent } from './manage-licence-agreement/manage-licence-agreement.component';
import { ProviderWorkScheduleComponent } from './provider-work-schedule/provider-work-schedule.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

const routes: Routes = [
{path: 'createNew' , component:CreateNewComponent },
{path : 'ManageLicenceAgreement' , component:ManageLicenceAgreementComponent },
{path : 'ProviderWorkSchedule' , component : ProviderWorkScheduleComponent},
{path : 'ManageUser', component : ManageUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }