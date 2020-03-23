import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkCalanderComponent } from './work-calander.component';

const routes: Routes = [
  {
    path: '',
    component: WorkCalanderComponent,
    data: {
      title: 'WorkCalender'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkCalanderRoutingModule {}
