import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialityComponent } from './speciality.component';

const routes: Routes = [
  {
    path: '',
    component: SpecialityComponent,
    data: {
      title: 'Speciality'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialityRoutingModule {}
