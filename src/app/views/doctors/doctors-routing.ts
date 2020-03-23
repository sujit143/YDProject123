import { Routes, RouterModule } from '@angular/router';
import { DoctorsComponent } from './doctors.component';
import { DoctorsprofileComponent } from './doctorsprofile/doctorsprofile.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: DoctorsComponent },
  { path: 'doctorsprofile', component: DoctorsprofileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule {}
