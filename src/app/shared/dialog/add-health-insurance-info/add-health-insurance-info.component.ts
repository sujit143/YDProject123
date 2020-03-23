import { Component, OnInit } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { SharedService } from '../../../services/appservices/shared.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-health-insurance-info',
  templateUrl: './add-health-insurance-info.component.html',
  styleUrls: ['./add-health-insurance-info.component.scss']
})
export class AddHealthInsuranceInfoComponent implements OnInit {


  NewAdjusterForm : FormGroup;

  fillInsurancePop = false;
  policyAmt: number;
  ApproxAmt: number;
  Commercialins = false;
  LiabilityINS = false;
  WorkercompINS = false;
  NJPipINS = false;
  AutoAccidentINS = false;
  SelfINS = false;
  nonself = false;
  ComplExpInfo = false;
  //balance: number = this.policyAmt - this.ApproxAmt;

  //Dialog-box
  searchpayer: boolean = false;
  adjsearch = false;
  addAdj = false;
  memDetails = false;
  searchOrg = false;
  addnewOrg = false;
  Orgdetails = false;
  searchSupervisor = false;
  AddNewSupervisor = false;
  AddNewHR = false;
  searchHR = false;
  Supervisordetails = false;
  Searchpayertrue = false;
  ShowSearchedCont = false;
  searchicon = false;
  addicon = false;


  RelationshipDrop: SelectItem[];
  StatusDrop: SelectItem[];
  GenderDrop:SelectItem[];
  StatesDrop:SelectItem[];
  stateName: SelectItem[];
  OrganizationType: SelectItem[];
  Practice: SelectItem[];
  Location: SelectItem[];
  isEdit: boolean=true;

  payerArray : PayerList[];
  selectedPayerarr : any = [];

  //adjuster Popup--------------
  adjusterContactsArray : any = [];
  selectedAdjContactArray : any = [];
  AdjformaddedArray : MemberDeatils[] = [];
  Title : string;
  firstName : string;
  lastName :string;
  middleName : string;
  gender : string;
  dob : string;
  city : string;
  state : string;
  Email : string;
  //adjuster Popup--------------



  constructor(
    private data:SharedService,
    private fb : FormBuilder,
    private messageService:MessageService

  ) {
    this.RelationshipDrop = [
      {label: 'Select', value: ''},
      {label: 'Child', value: '1'},
      {label: 'Parent', value: '2'},
      {label: 'Self', value: '3'},
      {label: 'Spouse', value: '4'},
      {label: 'Aunt', value: '5'},
      {label: 'Cousin', value: '6'},
      {label: 'Former spouse', value: '7'},
      {label: 'Grandchild', value: '8'},
      {label: 'Niece/nephew', value: '9'},
      {label: 'Sibling', value: '10'},
      {label: 'Uncle', value: '11'},
      {label: 'Other', value: '12'},

  ];
  this.StatusDrop = [
    {label: 'Select', value: ''},
    {label: 'Active', value: '1'},
    {label: 'Denied', value: '2'}
  ];
 this.GenderDrop = [
    {label: 'Select', value: ''},
    {label: 'Male', value: '1'},
    {label: 'Female', value: '2'},
    {label: 'Other', value: '3'}
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


   }

  ngOnInit() {
    this.NewAdjusterForm = this.fb.group({
      title: new FormControl(),
      fName: new FormControl(null, Validators.required),
      MName: new FormControl(),
      lName: new FormControl(null, Validators.required),
      suffix: new FormControl(),
      homeno: new FormControl(null, Validators.required),
      exten: new FormControl(),
      cellno: new FormControl(null, Validators.required),
      email: new FormControl(),
      fax: new FormControl(),
      addres1: new FormControl(),
      addrs2: new FormControl(),
      zip: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      coments: new FormControl()

  });
  }


  closePopUp() {
    this.fillInsurancePop = false;
  }

  OnCommercialClick(){
    this.Commercialins = true;

    this.LiabilityINS = false;
    this.WorkercompINS = false;
    this.NJPipINS = false;
    this.AutoAccidentINS = false;
    this.SelfINS = false;
}

OnCLiabilityClick(){
  this.LiabilityINS = true;

  this.Commercialins = false;
  this.WorkercompINS = false;
  this.NJPipINS = false;
  this.AutoAccidentINS = false;
  this.SelfINS = false;
}

OnWorkerCompClick(){
    this.WorkercompINS = true;

  this.Commercialins = false;
  this.LiabilityINS = false;
  this.NJPipINS = false;
  this.AutoAccidentINS = false;
  this.SelfINS = false;
}

OnNJpipClick(){
   this.NJPipINS = true;

  this.Commercialins = false;
  this.LiabilityINS = false;
  this.AutoAccidentINS = false;
  this.WorkercompINS = false;
  this.SelfINS = false;
}

OnAutoAccdntClick(){
  this.AutoAccidentINS = true;

  this.Commercialins = false;
  this.LiabilityINS = false;
  this.WorkercompINS = false;
  this.NJPipINS = false;
  this.SelfINS = false;

}

OnSelfPayClick(){
  this.SelfINS = true;

  this.AutoAccidentINS = false;
  this.Commercialins = false;
  this.LiabilityINS = false;
  this.WorkercompINS = false;
  this.NJPipINS = false;
}



// popup Events----------------------------------------------------------------------------------------------------------->

opensearch1(){
  this.searchpayer = true;
}

closesearch1popup(){
  this.searchpayer = false;
}

adjSearchPop() {
  this.adjsearch = true;
}
closeAdjsearchpopup() {
  this.adjsearch = false;
}

OnAddAdjPop() {
  this.addAdj = true;
  this.NewAdjusterForm.reset();
}
  oncloseAddAdjpop() {
    this.addAdj = false;
}

OnAddadjDetailView() {
  if(this.firstName){
    this.memDetails = true;
  }else{
    this.messageService.add({
      severity: 'error',
      summary: 'alert',
      detail: 'Select Member'
     });
  }


}
OnCloseAdjMemDetail() {
    this.memDetails = false;
}

OnsearchOrg() {
    this.searchOrg = true;
}
OnCloseOrg() {
    this.searchOrg = false;
}

OnAddOrgPop() {
    this.addnewOrg = true;
}
OnCloseAddOrg() {
    this.addnewOrg = false;
}

OnOpenOrgDetails() {
  this.Orgdetails = true;
}
OnCloseOrgDetails() {
  this.Orgdetails = false;
}

OnSearchSupervisor() {
  this.searchSupervisor = true;
}
OnCloseSupervisorSearch() {
  this.searchSupervisor = false;
}

OnAddNewSupervisor() {
  this.AddNewSupervisor = true;
}
OnCloseAddSupervisor() {
  this.AddNewSupervisor = false;
}

OnSearchNewHR() {
this.searchHR = true;
}
OnCloseHRSearch() {
  this.searchHR = false;
}

OnAddNewHR() {
this.AddNewHR = true;
}
OnCloseAddHR() {
  this.AddNewHR = false;
}


// END OF popup Events----------------------------------------------------------------------------------------------------------->


onChange(event) {
  if(event.value.value == 3){
    this.nonself = false;
  }else{
      this.nonself = true;
  }

}
sendSelectedData( value) {
  if (value === 'edit') {

    this.isEdit = true;
  } else {
    this.isEdit = false;

  }
}
handleData(event) {
  if (event) {
      this.ComplExpInfo = true;
  } else {
      this.ComplExpInfo = false;
  }
console.log('oncheck', event);
}

OnSearchPayerClick(){
this.data.getPayer().subscribe((data: PayerList[]) => {
this.payerArray = data;
console.log("Data_P",this.payerArray);
});

this.Searchpayertrue = true;
}

OnSelectPayer(item){

this.selectedPayerarr.push(item);
this.searchpayer = false;
}

closepayertags(item){
  this.selectedPayerarr.splice(item,1);


}

OnSearchAdjusterContact(){
  this.ShowSearchedCont = true;
  this.data.getmembercontacts().subscribe((data:any) =>
  {
    this.adjusterContactsArray = data;
  })

}

OnSelectContact(item){
this.selectedAdjContactArray.push(item)
this.adjsearch = false;
this.firstName = item.name;
this.city = item.city;
this.state = item.state;
 this.searchicon = true;
// this.addicon = false;
console.log("searh selected Value:",this.selectedAdjContactArray);
}

closeadjSearchContactags(firstName){
  this.selectedAdjContactArray = [];
  this.searchicon = false;
  this.AdjformaddedArray = [];
  this.firstName = "";
  this.lastName  = "" ;
  this.middleName = "";
  this.gender = "";
  this.dob = "";
  this.city = "";
  this.state = "";
  this.Email = "";
}

OnSubmitAdjusterContact(){
if(this.NewAdjusterForm.value.fName && this.NewAdjusterForm.value.lName)
{
  if(this.NewAdjusterForm.value.homeno && this.NewAdjusterForm.value.cellno){

    this.AdjformaddedArray.push(this.NewAdjusterForm.value);
    console.log("Form Value:",this.AdjformaddedArray);
    this.addAdj = false;
    this.Title = this.NewAdjusterForm.value.title;
    this.firstName = this.NewAdjusterForm.value.fName;
    this.lastName = this.NewAdjusterForm.value.lName;
    this.middleName = this.NewAdjusterForm.value.MName;
    this.gender = this.NewAdjusterForm.value.gender;
    this.dob = this.NewAdjusterForm.value.dob;
    this.city = this.NewAdjusterForm.value.city;
    this.state = this.NewAdjusterForm.value.state;
    this.Email = this.NewAdjusterForm.value.email;
    // this.addicon = true;
    this.searchicon = true;

  }else{
    this.messageService.add({
      severity: 'error',
      summary: 'Mandatory Fields',
      detail: 'Please fill in either Home # or Cell # !'
     });
  }

}else{
  this.messageService.add({
    severity: 'error',
    summary: 'Mandatory Fields',
    detail: 'Please fill in First and Last Name'
   });
}


}



}

export class PayerList {
  constructor(
    public id:number,
    public PayerName : string,
    public Phone : string,
    public Fax : string,
    public Address1 : string,
    public Address2 : string,
    public City : string,
    public State : string,
    public Zip : string,
  ){}
}

export interface MemberDeatils {
  FirstName : string ,
  LastName : string,
  MiddleName : string ,
  Email : string,
  Fax : number ,
  City : string,
  State : string ,
  PostalCode : number,
  PhoneNumber : number ,
  CellNumber : number,
  Title : string ,
  AddressLine1 : string,
  AddressLine2 : string ,
  Comments : string,
  RoleId : number ,
  Sufix : string
}
