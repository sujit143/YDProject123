import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
   {
    path: 'externaldocumentupload',
    loadChildren: () => import('./ExternalDocUpload/ExternalDoc.module').then(m => m.ExternalDocUploadModule)
  },
  {
    path: 'providerDashBoard',
    loadChildren: () => import('./providerdashboard/ProviderDash.module').then(m => m.ProviderDashboardModule)
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
