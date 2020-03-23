import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/primeng';
import { ReactiveFormsModule } from '@angular/forms';
import { OrganizationComponent } from './organization.component';


@NgModule({
  declarations: [OrganizationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  exports: [OrganizationComponent]
})
export class OrganizationModule { }
