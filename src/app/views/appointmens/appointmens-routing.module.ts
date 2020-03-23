import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './appointment-dashboard/appointment-dashboard.component';
import { GeneralRequestComponent } from './general-request/general-request.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { WorkCalanderComponent } from './work-calander/work-calander.component';
import { AppointmentsComponent } from './appointments/appointments.component';

const routes: Routes = [
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
  {
    path: '',
    component: AppointmentsComponent,
    data: {
      title: 'Appointment Dashboard'
    },
    children: [
      // {
      //   path: '',
      //   redirectTo: 'dashboard'
      // },
      {
        path: '',
        component: DashboardComponent
        // loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)

      },

      {
        path: 'dashboard',
        loadChildren: () => import('./appointment-dashboard/appointment-dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'generalRequest',
        component: GeneralRequestComponent
      },
      {
        path: 'scheduler',
        loadChildren: () => import('./scheduler/scheduler.module').then(m => m.SchedulerModule)
      },
      {
        path: 'workcalander',
        loadChildren: () => import('./work-calander/work-calender.module').then(m => m.WorkCalanderModule)
      },
      {
        path: 'caseDetails',
        loadChildren: () => import('./casedetails/caseDetails.module').then(m => m.CaseDetailsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmensRoutingModule { }
