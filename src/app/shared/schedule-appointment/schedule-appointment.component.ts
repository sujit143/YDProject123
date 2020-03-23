import { Component, OnInit, EventEmitter, Output,Renderer } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MessageService, Message } from 'primeng/primeng';
import {SelectItem} from 'primeng/api';
//import { ENGINE_METHOD_STORE } from 'constants';
import { Patient } from './patient';
import { DataService } from './data.service';
import { SharedService } from '../../services/appservices/shared.service';
import { ExistingPatients } from './ExistingEpisodes';


@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss']
})
export class ScheduleAppointmentComponent implements OnInit {


    @Output() InsurenceTabTrue = new EventEmitter();

    searchPatient : ExistingPatients[] = [];

  selectedEntry;
  existEpisofdes: Patient[] = [];
  msgs: Message[] = [];
  Relationshiptopat: SelectItem[];
  Gender : SelectItem[];
  SexualOrientation: SelectItem[];
  GenderIdentity: SelectItem[];
  Race:SelectItem[];
  Ethnicity:SelectItem[];
  StatesDrop:SelectItem[];
  PreferredLanguage:SelectItem[];
  PreferredModeofContact:SelectItem[];

  //Tags
  selectedrace = [];
  selectedethnicity = [];
  showRace = false;
  showEthnicity = false;


  memo:boolean=false;
  demo:boolean=true;
  Exist:boolean=false;
  notexist:boolean=false;
  checked: boolean = false;
  debouncer: any;
  DemographicsTab:boolean =true;
  InsuranceTab:boolean =true;
  appntmns : boolean = false;
  reffsource:boolean = false;
  documents:boolean = false;
  careteam:boolean = false;
  apptmemo:boolean = false;

  radiotab: FormGroup;
  details: FormGroup;
  callerdetails: FormGroup;
  general: FormGroup;
  contact: FormGroup;
  other:FormGroup;
  address:FormGroup;

  constructor( private fb: FormBuilder,
               private _data: DataService,
               private data:SharedService,
               private render: Renderer,
               private messageService:MessageService)
                {
                    // this.searchPatient = [];
                    // this.searchPatient = ExistingPatients[0];

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
                this.Relationshiptopat = [
                    {label: 'Child', value: '3'},
                    {label: 'Parent', value: '124'},
                    {label: 'Self', value: '1'},
                    {label: 'Spouse', value: '7'},
                    {label: 'Aunt', value: '8'},
                    {label: 'Cousin', value: '9'},
                    {label: 'Former spouse', value: '10'},
                    {label: 'Grandchild', value: '11'},
                    {label: 'Inlaw', value: '12'},
                    {label: 'Niece/nephew', value: '13'}
                ];
               this.Gender = [
                {label: 'Select', value: ''},
                {label: 'Male', value: '1'},
                {label: 'Female', value: '2'},
                {label: 'Unknown', value: '3'},
               ];

          this.SexualOrientation = [
            {label: 'Select', value: ''},
            {label: 'Lesbian, gay or homosexual', value: '1'},
            {label: 'Straight or heterosexual', value: '2'},
            {label: 'Bisexual', value: '3'},
            {label: 'Something else, please describe', value: '4'},
            {label: 'Don’t know', value: '5'},
            {label: 'Choose not to disclose', value: '6'},
          ];

          this.GenderIdentity = [
            {label: 'Select', value: ''},
            {label: 'Male', value: '1'},
            {label: 'Female', value: '2'},
            {label: 'Female-to-Male (FTM)/Transgender Male/Trans Man', value: '3'},
            {label: 'Male-to-Female (MTF)/Transgender Female/Trans Woman', value: '4'},
            {label: 'Genderqueer, neither exclusively male nor female', value: '5'},
            {label: 'Additional gender category or other, please specify', value: '6'},
            {label: 'Choose not to disclose', value: '7'}
          ];

          this.Race = [
            {label: 'Select', value: ''},
            {label: 'American Indian or Alaska Native', value: '1'},
            {label: 'Asian', value: '2'},
            {label: 'Black or African American', value: '3'},
            {label: 'Native Hawaiian or Other Pacific Islander', value: '4'},
            {label: 'White', value: '5'},
            {label: 'Other Race', value: '6'},
            {label: 'White Mountain Apache', value: '7'},
            {label: 'Unknown', value: '8'},
            {label: 'Agdaagux', value: '9'},
            {label: 'Absentee Shawnee', value: '10'}

          ];
          this.Ethnicity = [
            {label: 'Select', value: ''},
            {label: 'Hispanic or Latino', value: '1'},
            {label: 'Not Hispanic or Latino', value: '2'},
            {label: 'Unknown', value: '3'},
            {label: 'Andalusian ', value: '4'},
            {label: 'Argentinean', value: '5'},
            {label: 'Asturian', value: '6'},
            {label: 'Belearic Islander', value: '7'},
            {label: 'Bolivian', value: '8'},
            {label: 'Canal Zone', value: '9'},
            {label: 'Canarian', value: '10'},
            {label: 'Castillian', value: '11'},
            {label: 'Catalonian', value: '12'},
            {label: 'Central American', value: '13'},
            {label: 'Central American Indian', value: '14'},
            {label: 'Chicano', value: '15'},
            {label: 'Chilean', value: '16'},
            {label: 'Colombian', value: '17'},
            {label: 'Costa Rican', value: '18'},
            {label: 'Criollo', value: '19'},
            {label: 'Cuban', value: '20'},
            {label: 'Dominican', value: '21'},
            {label: 'Ecuadorian', value: '22'},
            {label: 'Gallego', value: '23'},
            {label: 'Guatemalan', value: '24'},
            {label: 'Honduran', value: '25'},
            {label: 'La Raza', value: '26'},
            {label: 'Latin American', value: '27'},
            {label: 'Mexican', value: '28'},
            {label: 'Mexican American', value: '29'},
            {label: 'Mexican American Indian', value: '30   '}
          ];

          this.PreferredLanguage = [
            {label: 'Select', value: ''},
            {label: 'Abkhazian', value: 'Abkhazian'},
            {label: 'Achinese', value: 'Achinese'},
            {label: 'Acoli', value: 'Acoli'},
            {label: 'Adangme', value: 'Adangme'},
            {label: 'Adyghe; Adygei', value: 'Adyghe; Adygei'},
            {label: 'Afar', value: 'Afar'},
            {label: 'Afrihili', value: 'Afrihili'},
            {label: 'Afrikaans', value: 'Afrikaans'},
            {label: 'Afro-Asiatic languages', value: 'Afro-Asiatic languages'},
            {label: 'Ainu', value: 'Ainu'},
            {label: 'Akan', value: 'Akan'},
            {label: 'Akkadian', value: 'Akkadian'},
            {label: 'Albanian', value: 'Albanian'},
            {label: 'Aleut', value: 'Aleut'},
            {label: 'Algonquian languages', value: 'Algonquian languages'},
            {label: 'Altaic languages', value: 'Altaic languages'},
            {label: 'Amharic', value: 'Amharic'},
            {label: 'Angika', value: 'Angika'},
            {label: 'Apache languages', value: 'Apache languages'},
            {label: 'Arabic', value: 'Arabic'},
            {label: 'Arabic', value: 'Arabic'},
            {label: 'Aragonese', value: 'Aragonese'},
            {label: 'Arapaho', value: 'Arapaho'},
            {label: 'Arawak', value: 'Arawak'},
            {label: 'Armenian', value: 'Armenian'},
            {label: 'Aromanian Arumanian Macedo-Romanian', value: 'Aromanian Arumanian Macedo-Romanian'},
            {label: 'Upper Sorbian', value: 'Upper Sorbian'},
            {label: 'Uighur Uyghur', value: 'Uighur Uyghur'},
            {label: 'Turkish, Ottoman (1500-1928)', value: 'Turkish, Ottoman (1500-1928)'},
            {label: 'Turkmen', value: 'Turkmen'},
            {label: 'Swiss German; Alemannic; Alsatian', value: 'Swiss German; Alemannic; Alsatian'},
            {label: 'Swati', value: 'Swati'},
            {label: 'Sumerian', value: 'Sumerian'},
            {label: 'Slovenian', value: 'Slovenian'},
            {label: 'Russian', value: 'Russian'},
            {label: 'Romance languages', value: 'Romance languages'},
            {label: 'Portuguese', value: 'Portuguese'},
            {label: 'Palauan', value: 'Palauan'},
            {label: 'Otomian languages', value: 'Otomian languages'},
            {label: 'Oriya', value: 'Oriya'},
            {label: 'Inuktitut', value: 'Inuktitut'},
            {label: 'Nyoro', value: 'Nyoro'},
            {label: 'Nubian languages', value: 'Nubian languages'},
            {label: 'Mikmaq Micmac', value: 'Mikmaq Micmac'},
            {label: 'Marshallese', value: 'Marshallese'},
            {label: 'Luxembourgish; Letzeburgesch', value: 'Luxembourgish; Letzeburgesch'},
            {label: 'Kuanyama; Kwanyama', value: 'Kuanyama; Kwanyama'}

          ];

          this.PreferredModeofContact = [
            {label: 'Select', value: ''},
            {label: 'Email', value: 'Email'},
            {label: 'Phone', value: 'Phone'},
            {label: 'Text', value: 'Text'}
          ];

               }



  ngOnInit() {
    this.radiotab = this.fb.group({
        radiogroup: new FormControl()
    });
    this.details = this.fb.group({
        patientname: new FormControl(
            null,
            Validators.required,
            // this.validatePatient.bind(this)
        ),
        patientDOB: new FormControl(null),
        phone: new FormControl("", [
            Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
        ]),
        email: new FormControl(null, [
            Validators.required,
            Validators.email
        ])
    });


    this.callerdetails = this.fb.group({
        callername: new FormControl(null, Validators.required),
        phoneno: new FormControl("", [
            Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/),
            Validators.required
        ]),
        relation: new FormControl(null)
    });

    this.general = this.fb.group({
        firstname: new FormControl(null, Validators.required),
        middlename: new FormControl(null),
        lastname: new FormControl(null, Validators.required),
        dob: new FormControl(null),
        sexualorientation: new FormControl(null,Validators.required),
        gender: new FormControl(null, Validators.required),
        sexualOrientation : new FormControl(null,Validators.required),
        genderIdentity: new FormControl(null,Validators.required),
        race:new FormControl(null,Validators.required),
        ethnicity:new FormControl(null,Validators.required)
    });


    this.address = this.fb.group({
        address1: new FormControl(null),
        address2: new FormControl(null),
        zip: new FormControl(null),
        city: new FormControl(null),
        state: new FormControl(null)
    });
    this.contact = this.fb.group({
        home: new FormControl("", [
            Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
        ]),
        cell: new FormControl("", [
            Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
        ]),
        workphone: new FormControl("", [
            Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
        ]),
        email: new FormControl(null, [
            Validators.required,
            Validators.email
        ]),
        mode: new FormControl(null)
    });
    this.other = this.fb.group({
        ssn: new FormControl("",[
            Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
        ]),
        language: new FormControl(null)
    });

    this.getPatient();

  }


//   Tabs Click Events----------------------------------------------------------------------------------->
  Demo(){
    //    let oldClass = event.target.getAttribute('class');
    //    if (oldClass == null) {
    //     oldClass = '';
    //     this.render.setElementAttribute(event.target, "class", oldClass + 'tabActive h3');
    //   } else {
    //     oldClass = oldClass.replace('tabActive h3', '')
    //     this.render.setElementAttribute(event.target, "class", oldClass);
    //   }
    this.demo=true;
    this.memo=false;
    this.appntmns = false;
    this.reffsource = false;
    this.careteam = false;
    this.apptmemo = false;
    this.documents = false;

  }

  Ins(){
    this.memo=true;

    this.demo=false;
    //this.DemographicsTab = !this.DemographicsTab;
    this.appntmns = false;
    this.reffsource = false;
    //this.InsuranceTab = ! this.InsuranceTab;
    this.documents = false;
    this.careteam = false;
    this.Exist = false;
    this.apptmemo = false;
    this.notexist = false;
  }

  AppointmentsTab(){
      this.appntmns = true;

      this.DemographicsTab =false;
      this.memo = false;
      this.demo = false;
      this.reffsource = false;
      this.documents = false;
      this.careteam = false;
      this.apptmemo = false;
      this.notexist = false;
  }

  ReferralSourceTab(){
      this.reffsource = true;

      this.memo =false;
      this.demo =false;
      this.Exist =false;
      this.notexist =false;
      this.checked = false;
      this.DemographicsTab =false;
      this.InsuranceTab =false;
      this.appntmns = false;
      this.documents = false;
      this.careteam = false;
      this.apptmemo = false;
  }

  DocumentsTab(){
      this.documents = true;

      this.reffsource = false;
      this.memo =false;
      this.demo =false;
      this.Exist =false;
      this.notexist =false;
      this.checked = false;
      this.DemographicsTab =false;
      this.InsuranceTab =false;
      this.appntmns = false;
      this.careteam = false;
      this.apptmemo = false;
  }
  CareTeamTab(){
      this.careteam = true;

      this.documents = false;
      this.reffsource = false;
      this.memo =false;
      this.demo =false;
      this.Exist =false;
      this.notexist =false;
      this.checked = false;
      this.DemographicsTab =false;
      this.InsuranceTab =false;
      this.appntmns = false;
      this.apptmemo = false;

  }

  AppointmentmemoTab(){
      this.apptmemo = true;

      this.careteam = false;
      this.documents = false;
      this.reffsource = false;
      this.memo =false;
      this.demo =false;
      this.Exist =false;
      this.notexist =false;
      this.checked = false;
      this.DemographicsTab =false;
      this.InsuranceTab =false;
      this.appntmns = false;
  }
  //   Tabs Click Events----------------------------------------------------------------------------------->

  onclickprev(){
    this.demo = true;
    this.Exist = false;
  }

  openCallerDetails(){
    if (this.details.value.patientname){
        if(this.details.value.phone){
            if(this.callerdetails.value.callername && this.callerdetails.value.phoneno && this.callerdetails.value.relation)
            {
                  this.checked=false;
                  this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Successfuly saved'
                 });
            }else{
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error Message',
                  detail: 'Please enter caller detailes empty fields'
                 });
            }
        }else{
            this.messageService.add({
              severity: 'error',
              summary: 'Error Message',
              detail: 'Please enter patient phone number'
             });
        }
    }
    else{
        this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: 'Please enter patient name'
         });
    }
}

  onclickcontinue(){
    if(this.radiotab.value.radiogroup){
        this.Exist = false;
        this.notexist = true;
        this.general.patchValue({
            firstname: this.selectedEntry.Name,
            // lastname: this.selectedEntry.lastName,
            // gender: this.selectedEntry.Gender,
            dob: this.selectedEntry.Dob
        });
        this.contact.patchValue({
            home: this.selectedEntry.Telephone
        });
        this.address.patchValue({
            zip: this.selectedEntry.Zip,
            city: this.selectedEntry.City
        });
    }else{
        this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: 'Please select any episode to continue'
         });
    }
  }

  onclicknewcase(){
    this.Exist = false;
    this.notexist = true;
    if(this.radiotab.value.radiogroup){
        this.general.patchValue({
            firstname: this.selectedEntry.Name,
            // lastname: this.selectedEntry.lastName,
            // gender: this.selectedEntry.Gender,
            dob: this.selectedEntry.Dob
        });
        this.contact.patchValue({
            home: this.selectedEntry.Telephone
        });
        this.address.patchValue({
            zip: this.selectedEntry.Zip,
            city: this.selectedEntry.City
        });
  }
  }

  onclicknewpatient(){
    this.Exist = false;
    this.notexist = true;
    this.general.patchValue({
        firstname: this.selectedEntry.Name
        // lastname: this.selectedEntry.lastName
    });
  }

  onSelectionChange(item){
    this.selectedEntry = item;
    console.log("Selected Entry:", this.selectedEntry);
  }

  arr1: any;
  arr2:any;

  getPatient() {
    this.data.getsearchpatient().subscribe(
        (data:any) => {
            console.log(data);
        this.arr1 = data;
        console.log("ARRAY1",this.arr1);
      });
  }

SearchPatient(value) {
    if(this.details.controls.patientname.value){
      if (value != "") {
        this.arr2 = this.arr1.filter(x => x.Name.indexOf(value) != -1);
        console.log(this.arr2);
        if(this.arr2.length == 0){
              this.demo = false;
              this.Exist = false;
              this.notexist = true;
              this.memo = false;
        }else{
            this.demo = false;
              this.Exist = true;
              this.notexist = false;
              this.memo = false;
        }
      }
      else {

      }
  }else{
    this.messageService.add({
                  severity: 'error',
                  summary: 'Error Message',
                  detail: 'Please Enter Patient Name to continue'
                 });
  }
  this.general.patchValue({
    firstname: this.details.value.patientname
});


}


//   SearchPatient() {
//     if (this.details.value.patientname) {
//         // this._data.getPatient(this.details.value.patientname)
//         //     .subscribe((data: any) => {
//         //         this.existEpisofdes = data;
//         //         console.log("Patient Details:", data);
//         //     });
//         // this.data.getsearchpatient().subscribe((data:any) => {
//         //   this.searchPatient = data;
//         this.data.searchpatientByName(this.details.value.patientname).subscribe((data:ExistingPatients) => {
//           this.searchPatient[0] = data;
//           console.log("Existing Pat:",this.searchPatient[0]);

//       });
//       let index = this.searchPatient.indexOf(this.details.value.patientname);
//       console.log("index of",index);
//         if (index === -1 )
//         // if( this.details.value.patientname == this.searchPatient[0].Name)
//          {
//             this.demo = false;
//             this.Exist = true;
//             this.notexist = false;
//             this.memo = false;

//             console.log(this.Exist);
//         } else {
//         // if( this.details.value.patientname != this.searchPatient[0].Name){
//             this.demo = false;
//             this.Exist = false;
//             this.notexist = true;
//             this.memo = false;
//         }
//       } else {
//         this.messageService.add({
//           severity: 'error',
//           summary: 'Error Message',
//           detail: 'Please Enter Patient Name to continue'
//          });
//     }
//     this.general.patchValue({
//         firstname: this.details.value.patientname
//     });

//   // this.demo = false;
//   // this.Exist = true;
//   // this.notexist = false;
//   // this.memo = false;
// }

// validatePatient(control: AbstractControl): any {
//     clearTimeout(this.debouncer);
//     return new Promise(resolve => {
//         this.debouncer = setTimeout(() => {
//             this._data
//                 .getPatient(control.value)
//                 .subscribe((res: Patient[]) => {
//                     if (res.length === 1) {
//                         resolve({ nameInUse: true });
//                     }
//                     resolve(null);
//                     console.log("value doesn't exists!");
//                 });
//         }, 3000);
//     });
// }

OnPatCheckbox(e) {
    if (e.target.checked) {
        this.checked = true;
    } else {
        this.checked = false;
    }
}

OnPreviousclick(){
    this.notexist = false;
    if(this.arr2.length == 0){

        this.demo = true;
        this.Exist = false;
    }else{
      this.Exist = true;
      this.demo = false;

    }

}

OnSchNextClick(){
    if(this.general.value.firstname){

        if(this.general.value.lastname){

            if(this.general.value.gender){

                if(this.general.value.race){

                    if(this.general.value.ethnicity){

                        if(this.contact.value.home){

                            this.memo = true;
                            this.demo=false;
                            this.Exist=false;
                            this.notexist=false;

                            this.messageService.add({
                              severity: 'success',
                              summary: 'Success',
                              detail: 'Submitted Successfully!'
                             });

                        }else{
                              this.messageService.add({
                              severity: 'error',
                              summary: 'Error Message',
                              detail: 'Patient Home or Cell Number is Required'
                             });
                        }

                    }else{
                          this.messageService.add({
                          severity: 'error',
                          summary: 'Error Message',
                          detail: 'Patient Ethnicity is Required'
                         });
                    }

                }else{
                      this.messageService.add({
                      severity: 'error',
                      summary: 'Error Message',
                      detail: 'Patient Race is Required'
                     });
                }

            }else{
                  this.messageService.add({
                  severity: 'error',
                  summary: 'Error Message',
                  detail: 'Patient Gender is Required'
                 });
            }

        }else{
              this.messageService.add({
              severity: 'error',
              summary: 'Error Message',
              detail: 'Please provide lastname to continue'
             });
        }

    }else{
         this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: 'Please provide firstname to continue'
         });
    }
    console.log("Date Format: ",this.general.value.dob);

}

//tags
selectedRace(selectedvalue){
  this.selectedrace.push(selectedvalue.value.label);
  this.showRace = true;
}

unSelectRace(value) {
  this.selectedrace.splice(value, 1);
  if(this.selectedrace.length == 0){
      this.showRace = false;
  }
}

selectedEthnicity(selectedvalue){
  this.selectedethnicity.push(selectedvalue.value.label);
  this.showEthnicity = true;
}

unSelectEthnicity(value) {
  this.selectedethnicity.splice(value, 1);
  if(this.selectedethnicity.length == 0){
      this.showEthnicity = false;
  }
}


}


