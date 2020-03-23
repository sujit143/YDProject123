import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderDashboardComponent } from './providerdashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ProviderDashboardComponent,
    data: {
      title: 'Providerdashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderDashboardRoutingModule {}
