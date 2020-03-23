import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { BaseLayoutComponent } from './containers/base-layout/base-layout.component';
import { DefaultLayoutComponent } from './../app/containers/default-layout';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';


const APP_CONTAINERS = [
  BaseLayoutComponent,
  DefaultLayoutComponent

];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,

} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';
import { CommonModule } from '@angular/common';
// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { LocationModule } from './views/locations/location.module';
import { HomeModule } from './views/home/home.module';



import { HttpClientModule } from '@angular/common/http';
import { CommonHttpService } from './shared/common-http.service';
import { HttpModule } from '@angular/http';



import { AnkleModule } from './views/ankle/ankle.module';
import { SpecialityModule } from './views/speciality/speciality.module';
import { DoctorsModule } from './views/doctors/doctors.module';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { CalendarModule, MessageService } from 'primeng/primeng';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModuleModule } from './shared/shared.module';
import { MainService } from './services/appservices/main.service';
// import { ReqappointmentComponent } from './views/reqappointment/reqappointment.component';
import { LogComponent } from './views/log/log.component';
import { MasterService } from './services/master.service';
import { UsersModule } from './views/User/users.module';
import { PracticeModule } from './views/PracticeLocation/practice.module';
import { HomePageComponent } from './views/home-page/home-page.component';
import { DashboadComponent } from './views/dashboards/dashboards.component';
import { ScheduleapptModule } from './shared/schedule-appointment/scheduleappt.module';
import { PhoneMaskDirective } from './shared/schedule-appointment/phone-mask.directive';
import { DummyComponent } from './views/dummy/dummy.component';
// import { ScheduleapptModule } from './shared/schedule-appointment/scheduleappt.module';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    SidebarModule,
    HttpClientModule,
    HttpModule,
    ToastModule,
    LocationModule,
    HomeModule,
    AnkleModule,
    SpecialityModule,
    DoctorsModule,
    DialogModule,
    ToastModule,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModuleModule,
    CommonModule,
    UsersModule,
    PracticeModule

  ],
  declarations: [
    // PhoneMaskDirective,
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    LogComponent,
    HomePageComponent,
    DashboadComponent,
    DummyComponent

    // AppheaderComponent,

  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, CommonHttpService , MessageService, MainService, MasterService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
