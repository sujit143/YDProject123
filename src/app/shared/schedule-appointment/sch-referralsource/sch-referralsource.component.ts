import { Component, OnInit } from '@angular/core';
import { SelectedItem } from '@syncfusion/ej2-angular-buttons';
import { SelectItem } from 'primeng/api';
import { Tree } from 'primeng/primeng';

@Component({
  selector: 'app-sch-referralsource',
  templateUrl: './sch-referralsource.component.html',
  styleUrls: ['./sch-referralsource.component.scss']
})
export class SchReferralsourceComponent implements OnInit {


    sourceofreferral: SelectItem[];
    hearaboutyourDrs:SelectItem[];
    StatesDrop:SelectItem[];

    nonSelfref:boolean = true;
    selref:boolean =false;
  isEdit: boolean=false;

     //Popup
     reffSearch = false;
     reffDetails = false;

  constructor() {

    this.sourceofreferral = [
        {label: 'Select', value: ''},
        {label: 'Self(Patient)', value: '1'},
        {label: 'Employer', value: '3'},
        {label: 'Representative', value: '4'},
        {label: 'Provider', value: '5'},
        {label: 'Insurance Carrier', value: '7'},
        {label: 'Office', value: '8'},
        {label: 'Hospital', value: '9'},
        {label: 'School', value: '10'},
        {label: 'Patient', value: '11'},
        {label: 'UnKnown', value: '12'},
        {label: 'Physician Assistant', value: '13'}
    ];
    this.hearaboutyourDrs = [
        {label: 'TV Ads', value: '1'},
        {label: 'Newspaper Ads', value: '2'},
        {label: 'Trade Shows', value: '3'},
        {label: 'Conference', value: '4'},
        {label: 'Internet', value: '5'},
        {label: 'Other', value: '6'}
        ];
        this.StatesDrop = [
          {label: 'Select', value: ''},
          {label: 'AE', value: 'AE'},
          {label: 'AK', value: 'AK'},
          {label: 'AL', value: 'AL'},
          {label: 'AR', value: 'AR'},
          {label: 'AS', value: 'AS'},
          {label: 'AZ', value: 'AZ'},
          {label: 'CA', value: 'CA'},
          {label: 'CO', value: 'CO'},
          {label: 'CT', value: 'CT'},
          {label: 'DC', value: 'DC'},
          {label: 'DE', value: 'DE'},
          {label: 'FL', value: 'FL'},
          {label: 'FM', value: 'FM'},
          {label: 'GA', value: 'GA'},
          {label: 'GU', value: 'GU'},
          {label: 'HI', value: 'HI'},
          {label: 'IA', value: 'IA'},
          {label: 'ID', value: 'ID'},
          {label: 'IL', value: 'IL'},
          {label: 'IN', value: 'IN'},
          {label: 'KS', value: 'KS'}

        ];
  }

  ngOnInit() {
  }

  onChange(event) {
      if(event.value.value == 1){
         this.selref =true;
         this.nonSelfref = false;
      }else{
          this.selref = false;
          this.nonSelfref = true;
      }
    console.log('event :' + event);
    console.log(event.value.value);
}
sendSelectedData( value) {
  if (value === 'edit') {

    this.isEdit = true;
  } else {
    this.isEdit = false;

  }
}
OnReff_SearchPop() {
  this.reffSearch = true;
}
OncloseReff_searchpopup() {
  this.reffSearch = false;
}

OnAddReff_MemDetail() {
  this.reffDetails = true;
}
OnCloseReff_MemDetail() {
  this.reffDetails = false;
}
}
