import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExternalDocUploadComponent } from './externaldocupload.component';

const routes: Routes = [
  {
    path: '',
    component: ExternalDocUploadComponent,
    data: {
      title: 'ExternalDocUpload'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalDocUploadRoutingModule {}
