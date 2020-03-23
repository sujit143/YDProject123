
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { BaseLayoutComponent } from './containers/base-layout/base-layout.component';
import { DefaultLayoutComponent } from '../app/containers/default-layout';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { LocationsComponent } from './views/locations/locations.component';

import { HomeComponent } from './views/home/home.component';
import { AnkleComponent } from './views/ankle/ankle.component';
import { SpecialityComponent } from './views/speciality/speciality.component';
import { DoctorsComponent } from './views/doctors/doctors.component';
import { VirtualvisitComponent } from './views/home/virtualvisit/virtualvisit.component';
import { YourdrsEhrComponent } from './views/home/yourdrs-ehr/yourdrs-ehr.component';
import { YourdrsTermsConditionsComponent } from './views/home/yourdrs-terms-conditions/yourdrs-terms-conditions.component';
import { YourdrsPrivacyComponent } from './views/home/yourdrs-privacy/yourdrs-privacy.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { PatientInfoComponent } from './shared/patient-info/patient-info.component';
import { ScheduleAppointmentComponent } from './shared/schedule-appointment/schedule-appointment.component';
import { DummyComponent } from './views/dummy/dummy.component';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
    // component: HomeComponent
  },
  {
    path: 'dummypage',
    component: DummyComponent
  },

  {
    path: '',
    component: BaseLayoutComponent,
    data: {
      title: 'home'
    },
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./views/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'BodyParts',
        loadChildren: () =>
          import('./views/ankle/ankle.module').then(m => m.AnkleModule)
      },
      {
        path: 'speciality',
        loadChildren: () =>
          import('./views/speciality/speciality.module').then(
            m => m.SpecialityModule
          )
      },

      {
        path: 'doctors',
        loadChildren: () =>
          import('./views/doctors/doctors.module').then(m => m.DoctorsModule)
      },
      {
        path: 'aboutus',
        loadChildren: () =>
          import('./views/about-us/aboutus.module').then(m => m.AboutusModule)
      },
      {
        path: 'locations',
        loadChildren: () =>
          import('./views/locations/location.module').then(
            m => m.LocationModule
          )
      },

      {
        path: 'virtualvisits',
        component: VirtualvisitComponent
      },
      {
        path: 'Yourdrs-ehr',
        component: YourdrsEhrComponent
      },
      {
        path: 'Yourdrs-terms',
        component: YourdrsTermsConditionsComponent
      },
      {
        path: 'Yourdrs-privacy',
        component: YourdrsPrivacyComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: DefaultLayoutComponent,
    data: {
      title: 'dashboard'
    },
    children: [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'appointments',
        loadChildren: () =>
          import('./views/appointmens/appointmens.module').then(
            m => m.AppointmensModule
          )
      },
      {
        path: 'Dashboard',
        loadChildren: () =>
          import('./views/dashboards/dashboard.module').then(
            m => m.DashboardModule
          )
      },
      {
        path: 'Shared',
        loadChildren: () =>
          import('./shared/shared.module').then(m => m.SharedModuleModule)
      },

        {
          path: 'Scheduleanappt',
          component : ScheduleAppointmentComponent
         },
      {
        path: 'patientinfo',
        component : PatientInfoComponent
      },

      {
        path: 'users',
        loadChildren: () =>
          import('./views/User/users.module').then(m => m.UsersModule)
      },
      {
        path: 'PracticeLocation',
        loadChildren: () =>
          import('./views/PracticeLocation/practice.module').then(
            m => m.PracticeModule
          )
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
