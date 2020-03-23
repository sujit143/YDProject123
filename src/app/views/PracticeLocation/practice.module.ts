import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagePracticeLocationComponent } from './manage-practice-location/manage-practice-location.component';
import { ManagePracticeReferralComponent } from './manage-practice-referral/manage-practice-referral.component';
import { ManagePracticeSubscriptionComponent } from './manage-practice-subscription/manage-practice-subscription.component';
import { PracticeRoutingModule } from './practice.routing';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ToastModule } from 'primeng/toast';
import { ModalModule, TabsModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    ManagePracticeLocationComponent,
    ManagePracticeReferralComponent,
    ManagePracticeSubscriptionComponent
  ],

  imports: [ToastModule,
    DatepickerModule,
    BsDatepickerModule,
    DialogModule,
    CommonModule,
    ReactiveFormsModule,
    PracticeRoutingModule,
    TabsModule,
    FormsModule,
    DialogModule,
    ModalModule,
    DropdownModule
  ]
})
export class PracticeModule { }
