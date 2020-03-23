import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService, Message } from 'primeng/primeng';
import * as _ from 'lodash';
import { SelectedItem } from '@syncfusion/ej2-angular-buttons';
import { SharedService } from '../../../services/appservices/shared.service';

@Component({
  selector: 'app-sch-documents',
  templateUrl: './sch-documents.component.html',
  styleUrls: ['./sch-documents.component.scss']
})
export class SchDocumentsComponent implements OnInit {


    addnewfolder:boolean=false;
    UploadDoc = false;
    AddNewDoc = false;
    IsPrivate = false;
    DocAccMembersDisp = false;
    NoDisp = false;

    provider:SelectItem[];
    providerforAddnewDoc:SelectItem[];
    documentType : SelectItem[];
    roles : SelectItem[];
    taskTypes : SelectItem[];
    documentCategory:SelectItem[];
    Treatmentate:SelectItem[];

    NewFolderArray :any = [] ;
    deleteconfirmation = false;

    groupDoc_form:FormGroup;
    AddNewDoc_Form:FormGroup;

    folderName:any;
    fname:any = [];
    createbtn = true;
    updatebtn = false;
    providerSelected = false;

    providerSelected2 = false;

    AddNewDocRow:any = [];
    AttachDocArray:any = [];

    DocAccMembers : DocumentAccessMembers[];
    Filtered_DocAccMembers : any;
    DocAccessRole;
    tagged_Members=[];
    taggedMembers_Cont = false;

  constructor( private messageService:MessageService,
              private fb:FormBuilder,
              private data:SharedService) {

    this.provider = [
      {label: 'Select', value: ''},
      {label: 'N Mahesh', value: '1'}
    ];

    this.providerforAddnewDoc = [
      {label: 'Select', value: ''},
      {label: 'Scilaris Thomas', value: '1'}
    ];

    this.Treatmentate = [
      {label: 'Select', value: ''},
      {label: 'Consultation - 12/13/2020 - 08.00 AM - 08.15 AM', value: '1'},
      {label: 'Other', value: '2'}
    ];

    this.documentType = [
      {label: 'Select', value: ''},
      {label: 'Accident Report', value: '8'},
      {label: 'Assignment of Benefits', value: '2'},
      {label: 'Consult Sheet', value: '304'},
      {label: 'Demographics (patient info)', value: '3'},
      {label: 'Emergency Room Report', value: '9'},
      {label: 'Insurance Card', value: '1'},
      {label: 'Medical History Sheet', value: '308'},
      {label: 'Medical Record Release', value: '4'},
      {label: 'Medication List', value: '57'},
      {label: 'Notice of Privacy Practice', value: '5'},
      {label: 'Out of Network Disclosure and Consent', value: '305'},
      {label: 'Patient photo for file', value: '7'},
      {label: 'Photo ID', value: '6'},
      {label: 'Registration Packet', value: '309'},
      {label: 'Statement Or Account Balance', value: '283'},
      {label: 'Surgical Location Consent', value: '84'},
      {label: 'Text Messaging Consent Form', value: '137'}
    ];
this.roles = [
  {label: 'Select', value: ''},
  {label: 'Provider', value: '2'},
  {label: 'Care Team', value: 'Care Team'},
  {label: 'Case Manager', value: '11'},
  {label: 'Facility', value: '3'},

];
this.taskTypes = [
  {label: 'Select', value: ''},
  {label: 'Authorization Request', value: '4'},
  {label: 'Appointment Request', value: '5'},
  {label: 'General', value: '6'},
  {label: 'Diagnostic Request', value: '7'},
  {label: 'Billing', value: '8'},
  {label: 'Collection', value: '9'}
];

this.documentCategory = [
  {label: 'Select', value: ''},
  {label: 'Intake', value: '2'},
  {label: 'Billing', value: ''},
  {label: 'Diagnostic Testing', value: '2'},
  {label: 'Insurance Correspondence', value: ''},
  {label: 'Medical Records ', value: '2'},
  {label: 'Plan of Action', value: ''},
  {label: 'Referrals (Rx)', value: '2'},
  {label: 'Pre - Surgical Charts', value: ''},
  {label: 'WC Correspondance', value: '2'},
  {label: 'WC Correspondance', value: '3514'},
  {label: 'Surgical Chart', value: '12758'},
  {label: 'Attorney Correspondence', value: '20300'},
  {label: 'Internal Chart Documents', value: '20311'},
  {label: 'External Medical File', value: '22575'},
  {label: 'Intra office Records', value: '21787'},
  {label: 'dfgfdgff', value: '22576'},
  {label: 'Authorization Documents', value: '21790'}

];
   }

  ngOnInit() {
    this.groupDoc_form = this.fb.group({
      selectSurgery: new FormControl(null,Validators.required),
      selectPage: new FormControl(null,Validators.required),
      docCategory: new FormControl(null,Validators.required),
      docType: new FormControl(null,Validators.required),
      providerSelect: new FormControl(null,Validators.required),
      refferedBy: new FormControl(null,Validators.required),
      treatmentDate: new FormControl(null,Validators.required),
      Description: new FormControl(null,Validators.required),
      fileName: new FormControl(null,Validators.required),

      selectSurgery2: new FormControl(null,Validators.required),
      selectPage2: new FormControl(null,Validators.required),
      docCategory2: new FormControl(null,Validators.required),
      docType2: new FormControl(null,Validators.required),
      providerSelect2: new FormControl(null,Validators.required),
      refferedBy2: new FormControl(null,Validators.required),
      treatmentDate2: new FormControl(null,Validators.required),
      Description2: new FormControl(null,Validators.required),
      fileName2: new FormControl(null,Validators.required)

  });

  this.AddNewDoc_Form = this.fb.group({
    providerDropdown:new FormControl(),
    doctypeDropdown:new FormControl(null,Validators.required),
    treatementDateDropdown:new FormControl(),
    treatementDate:new FormControl(),

    providerDropdown2:new FormControl(),
    doctypeDropdown2:new FormControl(null,Validators.required),
    treatementDateDropdown2:new FormControl(),
    treatementDate2:new FormControl(),
  })
  }

  openDialog(checkDialog){
    if (checkDialog === 'addnewfolder') {
    this.addnewfolder = true;
    this.createbtn = true;
    this.updatebtn = false;
}
  }

  closeDialog(checkDialog) {
    if (checkDialog === 'addnewfolder') {
      this.addnewfolder = false;
      this.folderName = '';
    }
  }

  OnOpenUploadGroupDOC(){
    this.UploadDoc = true;
}
OnCloseDocUpload(){
  this.UploadDoc = false;
  this.groupDoc_form.reset();
  this.AddNewDocRow = [];


}
OnAddNewDocs(){
    this.AddNewDoc = true;
}
OnCloseAddNewDoc(){
  this.AddNewDoc = false;
  this.AddNewDoc_Form.reset();
  this.AttachDocArray = [];

}

OnIsPrivateClick(event){

  if(event){
      this.IsPrivate = true;
  }
  else {
      this.IsPrivate = false;
  }
}

OnIsPublicClick(event){
  if(event){
      this.IsPrivate = false;
  }
  else {
      this.IsPrivate = true;
  }
}

OnCreateNewFolder(){

 let req = {
     name:this.folderName
  };
  if(this.folderName){
    this.NewFolderArray.push(req);
    console.log("Folder Name:", this.NewFolderArray);
    this.addnewfolder = false;
    this.folderName = '';
  }else{
    this.messageService.add({
      severity: 'error',
      summary: 'Mandatory Fields',
      detail: 'The Name field is required.'
     });
  }
}

OnUpdate(){




  if(this.folderName){
    // _.forEach(this.NewFolderArray, (data, i) => {
    //           data.name = this.folderName;
    //           console.log("Edit:",this.NewFolderArray);
    // });
    const targetIdx = this.NewFolderArray.map(item => item.name).indexOf(this.fname.name);
    this.NewFolderArray[targetIdx] = this.fname;
    this.addnewfolder = false;
    this.folderName = '';
    console.log("update:",this.fname.name);
  }else{
    this.messageService.add({
      severity: 'error',
      summary: 'Mandatory Fields',
      detail: 'The Name field is required.'
     });
  }




}

OnFolderEditClick(i){
  this.folderName = this.NewFolderArray[i].name;

  this.addnewfolder = true;
  this.createbtn = false;
  this.updatebtn = true;
}
OnFolderDeleteClick(item){
  this.NewFolderArray.splice(item,1)
  // this.deleteconfirmation = true;
 //this.OnDeleteConfirm(item);

}
OnCloseconfirmation(){
  this.deleteconfirmation = false;
}

OnDeleteConfirm(value){
  this.deleteconfirmation = false;
  this.NewFolderArray.splice(value,1);
}

OnAddnewClick(){
  if(this.groupDoc_form.value.selectPage &&
    this.groupDoc_form.value.docCategory &&
    this.groupDoc_form.value.docType &&
    this.groupDoc_form.value.providerSelect &&
    this.groupDoc_form.value.treatmentDate &&
    this.groupDoc_form.value.Description &&
    this.groupDoc_form.value.fileName ){

      let req = {
        selectPage : '',
        docCategory : '',
        docType : '',
        providerSelect : '',
        refferedBy : '',
        treatmentDate : '',
        Description : '',
        fileName : ''
      }

      this.AddNewDocRow.push(req);


  }else{
    this.messageService.add({
      severity: 'error',
      summary: 'alert',
      detail: ' Please complete the existing empty fields to add new'
     });
  }


}

OnAddnewClick2(){
  if(this.groupDoc_form.value.selectPage2 && this.groupDoc_form.value.docCategory2 &&
    this.groupDoc_form.value.docType2 && this.groupDoc_form.value.providerSelect2 &&
    this.groupDoc_form.value.treatmentDate2 &&  this.groupDoc_form.value.Description2
    && this.groupDoc_form.value.fileName2 ){

      let req = {
        selectPage : '',
        docCategory : '',
        docType : '',
        providerSelect : '',
        refferedBy : '',
        treatmentDate : '',
        Description : '',
        fileName : ''
      }

      this.AddNewDocRow.push(req);

  }else{
    this.messageService.add({
      severity: 'error',
      summary: 'alert',
      detail: ' Please complete the existing empty fields to add new'
     });
  }

}

OnRemoveClick(item){
  this.AddNewDocRow.splice(item,1);
}

OnSubmitGroupDocs(){

}



//AddNewDoc_Form

OnProviderSelect(event){
  if(event.value.value == 1){
    this.providerSelected = true;
  }else{
    this.providerSelected = false;
  }
  }

  OnProviderSelect2(event){
    if(event.value.value == 1){
      this.providerSelected2 = true;
    }else{
      this.providerSelected2 = false;
    }
  }


OnAddSymbolClick(){
if(this.AddNewDoc_Form.value.doctypeDropdown){

  let req = {
    providerDropdown : '',
    doctypeDropdown : '',
    treatementDateDropdown : '',
    treatementDate : ''
   }
   this.AttachDocArray.push(req);

  //  if(this.AddNewDoc_Form.value.providerDropdown.value === 1){
  //   this.providerSelected = true;
  //  }else{
  //   this.providerSelected = false;
  //  }

}else{
  this.messageService.add({
    severity: 'error',
    summary: 'alert',
    detail: ' Please complete the existing empty fields to add new'
   });
}

}

OnAddSymbolClick2(){
  if(this.AddNewDoc_Form.value.doctypeDropdown2){

    let req = {
      providerDropdown : '',
      doctypeDropdown : '',
      treatementDateDropdown : '',
      treatementDate : ''
     }

     this.AttachDocArray.push(req);
     if(this.AddNewDoc_Form.value.providerDropdown2.value === 1){
      this.providerSelected2 = true;
     }else{
      this.providerSelected2 = false;
     }
  }else{
    this.messageService.add({
      severity: 'error',
      summary: 'alert',
      detail: ' Please complete the existing empty fields to add new'
     });
  }

}
OnRemoveSymbolClick(value){
  this.AttachDocArray.splice(value,1);
}

OnAddNewFormSubmit(){

}
OnSelectDocAccessMem(event){
this.DocAccessRole = event.value.label;
}

OnRoleSearchClick(){
  if(this.DocAccessRole){
    this.data.getproviderDetails().subscribe(
      (data :DocumentAccessMembers[]) =>{
        this.DocAccMembers = data;
      });
      this.Filtered_DocAccMembers = this.DocAccMembers.filter(x => x.Role.indexOf(this.DocAccessRole) != -1);
      console.log("Data:",this.Filtered_DocAccMembers);
      this.DocAccMembersDisp = true;
    this.NoDisp = false;
  }else{
    this.NoDisp = true;
  }
}

selectedtagcheck(event,item){
  if(event==true){
    this.tagged_Members.push(item);
    this.taggedMembers_Cont = true;
    }
  else{
    this.tagged_Members.splice(item.name,1);
    if(this.tagged_Members.length === 0){
      this.taggedMembers_Cont = false;
    }else{
      true;

    }

  }

}

closetagnote(value){
  this.tagged_Members.splice(value.name,1);
  if(this.tagged_Members.length === 0){
    this.taggedMembers_Cont = false;
  }else{
    true;

  }
  }

//AddNewDoc_Form

}


export class DocumentAccessMembers {
  constructor(
   public Name:string,
   public City:string,
   public State:string,
   public Role:string
  ){}
}
