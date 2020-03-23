import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchedulerComponent } from './scheduler.component';



const routes: Routes = [
  {
    path: '',
    component: SchedulerComponent,
    data: {
      title: 'Scheduler'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulerRoutingModule {
}
