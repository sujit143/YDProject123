import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { SharedService } from '../../../services/appservices/shared.service';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sch-insurance',
  templateUrl: './sch-insurance.component.html',
  styleUrls: ['./sch-insurance.component.scss']
})
export class SchInsuranceComponent implements OnInit {

  addnewins = false;
  insurence = true;

  GeneralAccidentinfo : FormGroup;

  groupname = null;

  //popup
  SearchLegalRepresentative = false;
  AddNewOrgMember = false;
  searchOrg1 = false;
  addnewOrg = false;
  Orgdetails = false;
  OrgMemberDetails = false;

  selecthospital:boolean = false;
  searchHealthcare: boolean = false;
  addOrg: boolean = false;
  EmergencyRoom = false;

  //DropDowns
  StatesDrop:SelectItem[];
  OrganizationType:SelectItem[];
  Practice:SelectItem[];
  Location:SelectItem[];
  stateName:SelectItem[];

  //Json array
  SearchHealthcarefacilityArray: any = [];
  SearchEmergencyRoomArray: any = [];

  healthFacilities = false;
  hosp = true;
  eyehosp = false;




  constructor(private sharedService: SharedService,
              private fb:FormBuilder) {

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

    this.OrganizationType = [
      {label: 'Select', value: ''},
      {label: 'Insurance Company', value: '2'},
      {label: 'Representative', value: '3'},
      {label: 'Employer', value: '4'},
      {label: 'Third Party Administrator', value: '5'},
      {label: 'Hospital', value: '6'},
      {label: 'Medical Practice', value: '7'},
      {label: 'Urgent Care', value: '8'},
      {label: 'Surgical Facilities', value: '9'},
      {label: 'Management Company', value: '10'},
      {label: 'Sports', value: '11'},
      {label: 'NYC LAW', value: '12'},
      {label: 'Church', value: '13'},
      {label: 'Firemans Insurance Co', value: '14'},
      {label: 'Normandy Insurance', value: '15'}
  ];

  this.Practice = [
      {label: 'Select Practice', value: ''},
      {label: 'Advanced Pain care', value: '434'},
      {label: 'Apple Pain Management and Rehab ', value: '77'},
      {label: 'Baynes Ortho', value: '83'},
      {label: 'Bronx', value: '385'},
      {label: 'Edison Rehab and Acupuncture PC', value: '333'},
      {label: 'Electrodiagnostics and Physical Medicine', value: '321'},
      {label: 'First Practice', value: '474'},
      {label: 'Flushing Office', value: '383'},
      {label: 'Foot and Ankle Surgical Associates', value: '102'},
      {label: 'Gaon Pain Clinic', value: '384'},
      {label: 'HEMA', value: '81'},
      {label: 'HEMG', value: '82'},
      {label: 'magnacarepractice', value: '415'},
      {label: 'Montefiore New Rochelle Hospital', value: '458'},
      {label: 'New Century Spine And Outpatient Surgical Institute', value: '461'},
      {label: 'New York Hand Surgery', value: '451'},
      {label: 'New York Orthopaedic Surgery and Rehabilitation', value: '169'},
      {label: 'New York Spine and Pain Care', value: '91'},
      {label: 'NJ Orthopaedic Rehabilitation and Pain Management', value: '88'},
      {label: 'North East Anesthesia and Pain Management', value: '30'},
      {label: 'Park West Medical Group', value: '136'},
      {label: 'Park West Surgical LLC', value: '36'},
      {label: 'PWMG', value: '89'},
      {label: 'QA Test Office Practice', value: '456'},
      {label: 'RehabilitationMedicine Center of New York', value: '316'},
      {label: 'Second Practice', value: '475'},
      {label: 'South Dean', value: '85'},
      {label: 'Spine and Orthopedic Rehabilitation', value: '46'},
      {label: 'University Spine Center', value: '74'},
      {label: 'Wilson Orthopaedics PLLC', value: '43'}
  ];

  this.Location = [
      {label: 'Select Location', value: ''},
          {label: ' Baarn Rehab & Pain Clinic, Flushing, NY', value: '449'},
          {label: ' Flemington Neuro', value: '237'},
          {label: ' New Brunswick', value: '446'},
          {label: ' Rehabilitation Medicine Center of New York, New York, NY', value: '445'},
          {label: '100A Liv, Brooklyn', value: '610'},
          {label: '209- 35 Northern Blvd', value: '537'},
          {label: '23967 Brandon Parkway Trace', value: '751'},
          {label: '330 9th Street, Brooklyn NY 11215', value: '686'},
          {label: '347 Agustin Parks Fork', value: '749'},
          {label: '3656 Becker Corners Landing', value: '750'},
          {label: '38 Astoria', value: '611'},
          {label: '384 Evans Rapid Club', value: '747'},
          {label: '39 East 69th Street', value: '690'},
          {label: '4892 Yundt Ville Cliffs', value: '745'},
          {label: '54 DEAN', value: '165'}
      ];

      this.stateName = [
          {label: 'Select', value: ''},
          {label: 'Armed Forces Europe', value: '1'},
          {label: 'Alaska', value: '2'},
          {label: 'Alabama', value: '3'},
          {label: 'Arkansas', value: '4'},
          {label: 'American Samoa', value: '5'},
          {label: 'Arizona', value: '6'},
          {label: 'California', value: '7'},
          {label: 'Colorado', value: '8'},
          {label: 'Connecticut', value: '9'},
          {label: 'District of Columbia', value: '10'},
          {label: 'Delaware', value: '11'},
          {label: 'Florida', value: '12'},
          {label: 'Federated States of Micronesia', value: '13'},
          {label: 'Georgia', value: '14'},
          {label: 'Guam', value: '15'},
          {label: 'Hawaii', value: '16'},
          {label: 'Iowa', value: '17'},
          {label: 'Idaho', value: '18'}
      ];
  }

  ngOnInit() {

    this.GeneralAccidentinfo = this.fb.group({
      Hosp_Yes : new FormControl (null),
      Hosp_No : new FormControl(null),
      Emerg_Yes : new FormControl(null),
      Emerg_No : new FormControl(null),
      HospitalName:  new FormControl(null),
      EmergencyRoomName : new FormControl(null)
    });
  }


  OnPreviousClick(){

  }

  OnNextClick(){

  }

  OnAddNewInsurence_Click(){
    this.addnewins = true;
     this.insurence = false;
  }


  //Popup

  OnSearchLegalReprtClick(){
    this.SearchLegalRepresentative = true;
}
OnCloseSearchLegalRepresentative(){
    this.SearchLegalRepresentative = false;
}

OnAddNewOrgMember(){
    this.AddNewOrgMember = true;
}
OnCloseAddNewOrgMember(){
  this.AddNewOrgMember = false;
}

OnsearchOrg() {
  this.searchOrg1 = true;
}
OnCloseOrg() {
  this.searchOrg1 = false;
}

OnAddOrgPop() {
  this.addnewOrg = true;
}
OnCloseAddOrg() {
  this.addnewOrg = false;
}

OnOpenOrgDetails(value) {
if(value == 'Hospital'){
  this.eyehosp = true;
}else{
  this.eyehosp = false;
}
  this.Orgdetails = true;
}
OnCloseOrgDetails() {
this.Orgdetails = false;
}

OnOpenOrgMemDetails(){
  this.OrgMemberDetails = true;
}
OnClose_OrgMemDetails(){
  this.OrgMemberDetails = false;
}

OnClickSearchHfacilities(name){
  console.log("Search_Name : ",name);
  this.healthFacilities = true;
  this.LoadHospitals();
  if (name) {
    this.SearchHealthcarefacilityArray = _.filter(this.SearchHealthcarefacilityArray , (s) => {
      return s.First_Name === name;
    });
  } else {
      this.LoadHospitals();
  }
  name = '';
}



LoadHospitals(){
  this.sharedService.getSearchfacilities().subscribe(
    (data: any[]) => {
      this.SearchHealthcarefacilityArray = data;
      console.log(this.SearchHealthcarefacilityArray);
    });
}

selectSearch(searchedData, value){
  if(value === 'Hospital' ){
    this.GeneralAccidentinfo.value.HospitalName = searchedData.First_Name;
    this.SearchHealthcarefacilityArray = searchedData;
    this.hosp = true;
  }
  else{
    this.GeneralAccidentinfo.value.EmergencyRoomName = searchedData.First_Name;
   this.SearchEmergencyRoomArray = searchedData;
   this.hosp = false;
  }
  this.searchHealthcare = false;
  this.healthFacilities = false;

}


//radio
selectHospital(){
  this.selecthospital = true;
}

unSelectHospital(){
  this.selecthospital = false;
}

OnOpenHealthsearch(value){

  if(value == 'Hospital'){
    this.hosp = true;
  }else{
    this.hosp = false;
  }
  this.searchHealthcare = true;
}
OnCloseHealthsearch(){
  this.searchHealthcare = false;
  this.healthFacilities = false;
}

selectEmergencyRoom(){
this.EmergencyRoom = true;
}
unSelectEmergencyRoom(){
this.EmergencyRoom = false;
}

OnHospClear(){
  this.GeneralAccidentinfo.controls.Hosp_Yes.reset();
  this.GeneralAccidentinfo.controls.Hosp_No.reset();
  this.selecthospital = false;
}

OnEmergClear(){
  this.GeneralAccidentinfo.controls.Emerg_Yes.reset();
  this.GeneralAccidentinfo.controls.Emerg_No.reset();
  this.EmergencyRoom = false;

}


}
