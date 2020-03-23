import { Component, OnInit } from '@angular/core';
import { DashboadService } from '../dashboards.service';
import { Router } from '@angular/router';
import { Checkstatus} from '../../../models/extenaldoc';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MasterService } from '../../../services/master.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';

@Component({
  selector: 'app-externaldocupload',
  templateUrl: './externaldocupload.component.html',
  styleUrls: ['./externaldocupload.component.scss'],
})
export class ExternalDocUploadComponent implements OnInit {
  imagePath: any;
  form: FormGroup;
  docUpload: FormArray;
  practiceData: any[];
  locationData: any[];
  providerData: any[];
  documentData: any[];
  minDate: any;
  maxDate: any;
  documentDisplay: boolean = false;
  ListOfData: any[];
  rows: number;
  SelectPractice: any;
  key: any;
  myItem: any;
  constructor(private _data: DashboadService,
    private _router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private masterService: MasterService,
    private datePipe: DatePipe,
    ) {
      this.form = this.fb.group({
        docDetails: this.fb.array([]),
    });
    this.docUpload  = this.form.controls.docDetails as FormArray;
     this.docUpload.push(this.fb.group({
      practice:  new FormControl(null),
      location: new FormControl(null),
      provider: new FormControl(null),
      docDesc: '',
      docType: new FormControl(null, Validators.required),
      addAttachment: new FormControl(null, Validators.required),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      patientDOB: new FormControl(null),
      emgAddon: new FormControl(null)
    }));


          }
    checkstatus: Checkstatus[] = [
      new Checkstatus(1, 'In process'),
      new Checkstatus(2, 'Completed')
    ];

  ngOnInit(
  ) {
    this.getExternalDocument();
    this.getOriginatedPractices();
    this.getOriginatedLocations();
    this.getTreatingProviders();
    this.getDocumentType();
  }
  onUpload() {
    this.documentDisplay = true;
  }
  getOriginatedPractices() {
  this._data.getOriginPractices().subscribe(
    (data: any) => {
      this.practiceData = data;
    });
  }
  getOriginatedLocations() {
    this._data.getOriginLocations().subscribe((data: any) => {
      this.locationData = data;
    });
  }
  getTreatingProviders() {
  this._data.getTreatProviders().subscribe((data: any) => {
    this.providerData = data;
  });
  }
  getDocumentType() {
    this._data.getDocuments().subscribe((data: any) => {
    this.documentData = data;
    });
  }
  getExternalDocument() {
  this._data.getDocumentList().subscribe(
    (data: any) => {
    this.ListOfData = data;

    let listData = this.ListOfData;
    if (this.SelectPractice.name != null) {
      this.ListOfData = [];
    var filterData = _.filter(listData, (v) => {
      if (v.originatedpractise === this.SelectPractice.name) {
        this.ListOfData.push(v);
        }
      });
    }
    });
}
origisePractice(SelectedPractice) {
  this.SelectPractice = SelectedPractice.value;
}

searchDocuments() {
  this.getExternalDocument();
}
changestatus(emp_data) {
  if (emp_data.status.name !== 'In process') {
      emp_data.status = emp_data.status.name;
      let bindData = 'actionId_' + emp_data.id;
      var formElement = <HTMLFormElement>document.getElementById(bindData);
    formElement.style.display = 'none';

  } else {
    emp_data.status = emp_data.status.name;
  }
  {
    this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Status Updated Sucessfully' });
  } 1000;
}
   onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
       reader.onload = (event: any) => {
        this.imagePath = event.target.result;
      };
    }
  }
onSubmit(form) {
  this.form.value.docDetails[0].addAttachment = this.imagePath;
  if (this.form.value.docDetails[0].docType === 'Select' || this.form.value.docDetails[0].docType == null) {

      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please select Document type'
      });

} else if (this.form.value.docDetails[0].addAttachment === '' || this.form.value.docDetails[0].addAttachment == null) {
  this.messageService.add({
    severity: 'error',
    summary: 'Error Message',
    detail: 'Please Add the Attachment'
  });
} else {

    let incrementId = this.ListOfData.length;
    const req = {
      id: incrementId + 1,
      originatedpractise: this.form.value.docDetails[0].practice.name,
      originatedlocation: this.form.value.docDetails[0].location.Name,
      treatingprovider: this.form.value.docDetails[0].provider.name,
      patientname: this.form.value.docDetails[0].firstName,
      PatientLastName: this.form.value.docDetails[0].lastName,
      patientdob: this.datePipe.transform(this.form.value.docDetails[0].patientDOB, 'MM-dd-yyyy'),
      isemergencyaddon: 'Yes',
      externaldocumenttype: this.form.value.docDetails[0].docType.name,
      documentdescription: this.form.value.docDetails[0].docDesc,
      status: 'Pending',
      createdby: 'Dr K',
      createddate: '01/01/2020',
      mode: 'Mobile',
      addnewattachment: this.form.value.docDetails[0].addAttachment
    };
    localStorage.setItem( this.form.value.docDetails[0].addAttachment, 'addnewattachment');
    this.myItem = localStorage.getItem(this.form.value.docDetails[0].addAttachment);
    this.ListOfData.push(req);
    setTimeout(() => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Added Sucessfully' });
    }, 1000);
    this.documentDisplay = false;
    this.form.reset();
    $('#test').val('');

   }
}
closeDocumentpop() {
  this.documentDisplay = false;
}


}
