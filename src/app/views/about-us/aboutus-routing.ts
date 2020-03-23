import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us.component';

const routes: Routes = [
  {
    path: '',
    component: AboutUsComponent,
    data: {
      title: 'About Us'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutusRoutingModule {}
