import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { CasenoteComponent } from './casenote/casenote.component';

const routes: Routes = [
  {
    path : 'casenote',
  component: CasenoteComponent 
 },
  // {
  //   path : '',
  //   component :AppointmentsComponent
  // },
  // // {
  // //  path : '',
  // //  component :DashboardComponent
  // // },
  // {
  //   path:'generalRequest',
  //   component : GeneralRequestComponent
  // },
  // {
  //   path:'scheduler',
  //   component : SchedulerComponent
  // },
  // {
  //   path:'workcalander',
  //   component : WorkCalanderComponent
  // },
  // {
  //   path: '',
  //   component :AppointmentsComponent,
  //   data: {
  //     title: 'Appointment Dashboard'
  //   },
  //   children: [
  //     // {
  //     //   path: '',
  //     //   redirectTo: 'dashboard'
  //     // },
  //     {
  //       path: '',
  //       component: DashboardComponent
  //     },
  //     {
  //       path: 'dashboard',
  //       component: DashboardComponent
  //     },
  //     {
  //       path: 'generalRequest',
  //       component: GeneralRequestComponent
  //     },
  //     {
  //       path: 'scheduler',
  //       component: SchedulerComponent
  //     },
  //     {
  //       path: 'workcalander',
  //       component: WorkCalanderComponent
  //     }
  //   ]
  // }
  {
    path:'patientinfo',
    component:PatientInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule {  }
