import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnkleComponent } from './ankle.component';


const routes: Routes = [
  {
    path: '',
    component: AnkleComponent,
    data: {
      title: 'Ankle'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnkleRoutingModule {}
