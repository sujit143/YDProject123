import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import {SelectItemGroup} from 'primeng/api';
import { SharedService } from '../../services/appservices/shared.service';
import { Height, Procedure, BodyPart, Side, Level1, Level2, Time, Provider, Practice,Location, Weight, DocCategory, DocType, DocProvider, DocRole } from './surgery';
import { MessageService } from 'primeng/primeng';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MasterService } from '../../services/master.service';

// import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-surgery',
  templateUrl: './surgery.component.html',
  styleUrls: ['./surgery.component.scss']
})
export class SurgeryComponent implements OnInit {
  listofAccordeon = [];
  inputTxt = '';
  surgeryformData: FormGroup;
  name = 'Angular 5';
  filteredSurgeons: any[];
  app: string;
  text: string;
  pro: string;
  pro1: String;
  pro2: string;
  selectedVal: any;
  selectedApp: any;
  selectedPro: any;
  selectedPro1: any;
  selectedService: any;
  selectedLegend: any;
  showTabs;
  SurgeryData: any;
  ListOfData: any;
  submitted = false;
  ProcedureData: any;
  ServiceData:any;
  Pro1Data: any;
  LegendData:any;
  addSurgery: boolean = false;
  searchSurgery:boolean = false;
  searchProcedure:boolean=false;
  searchLegend:boolean=false;
  Procedure:boolean=false;
  Procedure1:boolean=false;
  Procedure2:boolean=false;
  Procedure3:boolean=false;
  Service:boolean=false;
  Legend:boolean=false;
  viewSurgery:boolean=false;
  Location:boolean=false;
  showTable:boolean=false;
  showProcedure:boolean=false;
  showService:boolean=false;
  showPro1:boolean=false;
  showPro2: boolean=false;
  showPro3: boolean=false;
  showLegend:boolean=false;
  myDropDown : string;
  surgery1:boolean=false;
  book:boolean=false;
  presurgical:boolean=false;
  registration:boolean=false;
  surg:boolean=false;
  anasthesia:boolean=false;
  Intraop:boolean=false;
  Postop:boolean=false;
  billing:boolean=false;
  operative:boolean=false;
  applocation:boolean=false;
  toggledoc:boolean=false;
  value = '';
  model: any;
  ngmodel:any;
  myDateValue: Date;
  surgery:string[];
  items: SelectItem[];
  item: string;
  display: boolean = false;
  display1: boolean = false;

  uploadedFiles: any[] = [];
  originatedheight: Height[];
  originatedweight: Procedure[];
  originatedpro: Procedure[];
  BodyPart: any;
  Side: Side[];
  Level1: any;
  Level2: Level2[];
  Time: Time[];
  Provider: Provider[];
  Practice: Practice[];
  originatedBodyPart: BodyPart[];
  originatedSide: Side[];
  originatedLevel1: Level1[];
  originatedLevel2: Level2[];
  originatedTime: Time[];
  originatedProvider: Provider[];
  originatedPractice: Practice[];
  originatedLocation: Location[];
  selectedPro2: any;
  selectedPro3: any;
  searchPro3: boolean;
  filteredProcedure: any[];
  filteredProcedure1: any[];
  filteredProcedure2: any;
  filteredProcedure3: any[];
  filteredLegend: any;
  pro3: any;
  Pro2Data: any;
  Pro3Data: any;
  leg: any;
  searchSurgery1: boolean;
  AppData: any;
  filteredApp: any[];
  showAppointment: boolean;
  documentCategory: any[];
  documentType: any[];
  documentProvider: any[];
  selectedValue: string;
  documentRole: any[];
  formDataArr:any=[];
  formData: any;
  memberDetailsData: any;


  constructor(private _data:SharedService, private messageService: MessageService,private fb : FormBuilder) {
    this.memberDetailsData = [];


  this.originatedheight= [
    new Height ('03'),
    new Height ('04'),

    new Height ( "05"),
    new Height ("06"),
    new Height ("07"),
    new Height ("08"),
    new Height ("10"),
    new Height ("09"),

    new Height ( "20"),
    new Height ("25"),
    new Height ("30"),
    new Height ("35"),
    new Height ( "40"),
    new Height ("45"),
    new Height ("50"),
    new Height ("55"),
    new Height ( "60"),
    new Height ("65"),
    new Height ("70"),
    new Height ("75")

    ];

    this.originatedweight  = [
      new Weight ("10"),
      new Weight ("15"),

      new Weight ( "20"),
      new Weight ("25"),
      new Weight ("30"),
      new Weight ("35"),
      new Weight ( "40"),
      new Weight ("45"),
      new Weight ("50"),
      new Weight ("55"),
      new Weight ( "60"),
      new Weight ("65"),
      new Weight ("70"),
      new Weight ("75")

      ];


    this.originatedpro = [
      new Procedure("Pain"),
      new Procedure( "Spine"),
      new Procedure( "Podiatry"),
      new Procedure( "Ortho"),
      new Procedure("Other")
      ];


      this.originatedBodyPart= [
        new BodyPart("Abdominal"),
        new BodyPart( "Ancle"),
        new BodyPart( "Arm"),
        new BodyPart( "Back bone"),
        new BodyPart("Bicep"),
        new BodyPart( "Caudal"),
        new BodyPart( "Cervical"),
        new BodyPart( "Elbow"),
        new BodyPart("Foot")
        ];

        this.originatedSide= [
          new Side("Left"),
          new Side( "Right"),
          new Side( "Both"),
          new Side( "NA"),
          new Side("Bilateral")
          ];

          this.originatedLevel1 = [
            new Level1("C1"),
            new Level1("C2"),
            new Level1("C3"),
            new Level1("C4"),
            new Level1("C5"),
            new Level1("C6"),
            new Level1("C7"),
            new Level1("T1"),
            new Level1("T2"),
            new Level1("T3")
            ];

            this.originatedLevel2= [
            new Level2("C1"),
            new Level2("C2"),
            new Level2("C3"),
            new Level2("C4"),
            new Level2("C5"),
            new Level2("C6"),
            new Level2("C7"),
            new Level2("T1"),
            new Level2("T2"),
            new Level2("T3")
              ];


        this.originatedTime= [
          new Time("04:00 AM"),
          new Time("04:15 AM"),
          new Time("04:30 AM"),
          new Time("04:45 AM"),
          new Time("05:00 AM"),
          new Time("05:15 AM"),
          new Time("05:30 AM"),
          new Time("05:45 AM"),
          new Time("06:00 AM"),
          new Time("06:15 AM")
          ];


        // this.Side= [
        //   new Side("Left"),
        //   new Side( "Right"),
        //   new Side( "Both"),
        //   new Side( "NA"),
        //   new Side("Bilateral")
        //   ];



        this.originatedProvider= [
          new Provider("aaaa aggy"),
          new Provider( "Dr Abdulla Heba"),
          new Provider( "Abraham Yvette"),
          new Provider( "Dr Adin David"),
          new Provider("admin billing"),
          new Provider( "Dr Alfonso Joann"),
          new Provider( "Dr Alias Steven"),
          new Provider("aloji prabhu"),
          ];


        this.originatedPractice= [
          new Practice("Englewood Hospital"),
          new Practice( "Valley Health Medical Center"),
          new Practice( "Health East Ambulatory Surgical Center"),
          new Practice( "Holy Name Medical Center"),
          new Practice("Mount Sinai Beth Israel"),
          new Practice( "New Horizons ASC"),
          new Practice("NewYork Methodist Hospital")
          ];

          this.originatedLocation= [
            new Location("Hospital"),
            new Location( "Valley Health Medical Center @ Valley Health Medical Center, Teaneck, NJ"),
            new Location( "Both"),
            new Location( "NA"),
            new Location("Bilateral")
            ];



        this.documentCategory=[
          new DocCategory("Intake"),
          new DocCategory( "Billing"),
          new DocCategory( "Diagnostic Testing"),
          new DocCategory( "Insurance Correspondence"),
          new DocCategory("Medical Records"),
          new DocCategory( "Plan of Action"),
          new DocCategory( "Referrals (Rx)"),
          new DocCategory( "Pre - Surgical Charts"),
          new DocCategory("WC Correspondance")
        ];

        this.documentType=[
          new DocType("Admission Records"),
          new DocType( "Anasthesia Consent"),
          new DocType( "Anasthesia Form"),
          new DocType( "Anasthesia Intra op Form"),
          new DocType("Anasthesia Super Bill"),
          new DocType( "Appeal"),
          new DocType( "Assignments of Benefits"),
          new DocType( "Brief op notes"),
          new DocType("Cardiac Benefit")
        ];

        this.documentProvider=[
          new DocProvider("augustine Samson"),
          new DocProvider( "Kyriakides Crystopher")

        ];

        this.documentRole=[
          new DocRole("Admission Records"),
          new DocRole( "Anasthesia Consent"),
          new DocRole( "Anasthesia Form"),
          new DocRole( "Anasthesia Intra op Form"),
          new DocRole("Anasthesia Super Bill"),
          new DocRole( "Appeal"),
          new DocRole( "Assignments of Benefits"),
          new DocRole( "Brief op notes"),
          new DocRole("Cardiac Benefit")
        ]


  this.items = [];
      for (let i = 0; i < 10000; i++) {
          this.items.push({label: 'Item ' + i, value: 'Item ' + i});
      }
   }

  ngOnInit() {
    this.surgeryformData= this.fb.group({

      height: new FormControl(null),
      weight: new FormControl(null),
      bmi: new FormControl(null),
      surgeon: new FormControl(null),
      procedure: new FormControl(null),
      procedure_type : new FormControl(null),
      place_of_service: new FormControl(null),
      secondary_procedure_1: new FormControl(null),
      secondary_procedure_2: new FormControl(null),
      secondary_procedure_3: new FormControl(null),
      body_part : new FormControl(null),
      side: new FormControl(null),
      level_1: new FormControl(null),
      level_2: new FormControl(null),
      suggested_date_1: new FormControl(null),
      time: new FormControl(null),
      suggested_date_2: new FormControl(null),
      notes: new FormControl(null),
      assistant_legend: new FormControl(null),
      special_surgical_instruction: new FormControl(null),
      booking_sheet: new FormControl(null),
      provider: new FormControl(null),
      practice: new FormControl(null),
      location: new FormControl(null),
    });


    this.getManageUserData();
    this. getProcedureData();
    this. getServiceData();
    this. getPro1Data();
    this. getLegendData();
    this.myDateValue = new Date();
    this.showTabs = {
      "one": true,
      "two": true,
      "three": true,
      "four":true,
      "five":true,
      "six":true,
      "seven":true,
      "eight":true,
      "nine":true,
      "ten":true
    };

  }
  closeMemberDetails(){
    this.viewSurgery = false;
  }
  searchAuto(event) {
    this.filteredSurgeons = [];
    console.log("SurgeryData", this.SurgeryData);
    for(let i = 0; i < this.SurgeryData.length; i++) {
        let brand = this.SurgeryData[i].name;
        if(brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.filteredSurgeons.push(brand +" , " + this.SurgeryData[i].location);
        }
    }
}

searchPro(pro) {
  this.filteredProcedure = [];
  console.log("ProcedureData", this.ProcedureData);

  for(let i = 0; i < this.ProcedureData.length; i++) {
      let pr = this.ProcedureData[i].name;
      if(pr.toLowerCase().indexOf(pro.query.toLowerCase()) == 0) {
          this.filteredProcedure.push(pr);
      }
    }
  }


searchApp(app) {
  this.filteredApp = [];
  console.log("AppData", this.AppData);

  for(let i = 0; i < this.AppData.length; i++) {
      let ap = this.AppData[i].name;
      if(ap.toLowerCase().indexOf(app.query.toLowerCase()) == 0) {
          this.filteredProcedure.push(ap);
      }
    }
  }

searchProc1(pro1) {
  this.filteredProcedure1 = [];
  console.log("Pro1Data", this.Pro1Data);
  for(let i = 0; i < this.Pro1Data.length; i++) {
      let pr1 = this.Pro1Data[i].name;
      if(pr1.toLowerCase().indexOf(pro1.query.toLowerCase()) == 0) {
          this.filteredProcedure1.push(pr1);
      }
  }
}

searchProc2(pro2) {
  this.filteredProcedure2 = [];
  console.log("Pro2Data", this.Pro2Data);
  for(let i = 0; i < this.Pro2Data.length; i++) {
      let pr2 = this.Pro2Data[i].name;
      if(pr2.toLowerCase().indexOf(pro2.query.toLowerCase()) == 0) {
          this.filteredProcedure2.push(pr2);
      }
  }
}

searchProc3(pro3) {
  this.filteredProcedure3 = [];
  console.log("Pro3Data", this.Pro3Data);
  for(let i = 0; i < this.Pro3Data.length; i++) {
      let pr3 = this.Pro3Data[i].name;
      if(pr3.toLowerCase().indexOf(pro3.query.toLowerCase()) == 0) {
          this.filteredProcedure3.push(pr3);
      }
  }
}

searchLeg(leg) {
  this.filteredLegend = [];
  console.log("LegendData", this.LegendData);
  for(let i = 0; i < this.LegendData.length; i++) {
      let legend = this.LegendData[i].name;
      if(legend.toLowerCase().indexOf(leg.query.toLowerCase()) == 0) {
          this.filteredLegend.push(legend);
      }
  }
}
origiseLocation(orgLoc){

}




selectedSugestion(){
  this.selectedVal = this.text;

  this.text = null;
}

selectedApplication(){
  this.selectedApp = this.app;
  this.app = null;
}


selectedProc(){
  this.selectedPro = this.pro;
  this.pro = null;
}

selectedProc1(){
  this.selectedPro1 = this.pro1;
  this.pro1 = null;
}

selectedProc2(){
  this.selectedPro2 = this.pro2;
  this.pro2 = null;
}

selectedProc3(){
  this.selectedPro3 = this.pro3;
  this.pro3 = null;
}

selectedLeg(){
  this.selectedLegend = this.leg;
  this.leg = null;
}



  addSurgerypop(){
    this.addSurgery = true;
    //if(this.inputTxt != ''){
      this.listofAccordeon.push(this.inputTxt);
    //}
  }

  searchSurgerypop(){
    this. searchSurgery = true;
  }






  searchSurgeryClose() {
    this. searchSurgery = false;
  }

  Servicepop(){
    this.Service=true;
  }

  ServiceClose(){
    this.Service=false;
  }

  Procedurepop(){
    this.Procedure=true;
  }

  ProcedureClose(){
    this.Procedure=false;
  }



  Procedure1Close(){
    this.Procedure1=false;
  }


  Procedure2Close(){
    this.Procedure2=false;
  }


  Procedure3Close(){
    this.Procedure3=false;
  }

  Legendpop(){
    this.Legend=true;
  }

  LegendClose(){
    this.Legend=false;
  }

  Onsearch(){
    if(this.selectedVal == undefined){
      alert("Please select Surgeon");
     // this.messageService.add({severity: 'alert', summary: 'Warning', detail: "detai"});
    }else{
      this.Procedure=true;
    }
  }



  Procedurepop1(){
    if(this.selectedPro == undefined){
      alert("Please select Procedure");
     // this.messageService.add({severity: 'alert', summary: 'Warning', detail: "detai"});
    }else{
      this.Procedure1=true;
    }
  }

  Procedurepop2(){
    if(this.selectedPro1 == undefined){
      alert("Please select Procedure");
     // this.messageService.add({severity: 'alert', summary: 'Warning', detail: "detai"});
    }else{
      this.Procedure2=true;
    }
  }

  Procedurepop3(){
    if(this.selectedPro2 == undefined){
      alert("Please select Procedure");
     // this.messageService.add({severity: 'alert', summary: 'Warning', detail: "detai"});
    }else{
      this.Procedure3=true;
    }
  }

  viewSurgerypop(){
    this.viewSurgery=true;
  }

  searchLocationpop(){
    this.Location=true;
  }

  LocationClose(){
    this.Location=false;
  }

  viewLocationpop(){
    this.viewSurgery=true;
  }




  onChangeofOptions(newGov) {
}

onDateChange(newDate: Date) {
}

ShowData(){
  this.showTable=true;
}
ShowProcedureData(){
  this.showProcedure=true;
}

ShowServiceData(){
  this.showService=true;
}

ShowPro2Data(){
  this.showPro2=true;
}

ShowPro3Data(){
  this.showPro3=true;
}

ShowPro1Data(){
  this.showPro1=true;
}
ShowLegendData(){
  this.showLegend=true;
}

ShowAppData(){
  this.showAppointment=true;
}





getManageUserData() {
  this._data.getSurgery().subscribe(
  (data: any) => {
  this.SurgeryData = data;

  console.log(this.SurgeryData);
  });
  }

  getProcedureData() {
    this._data.getprocedure().subscribe(
    (data: any) => {
    this.ProcedureData = data;

    console.log(this.ProcedureData);
    });
    }

    getServiceData() {
      this._data.getservice().subscribe(
      (data: any) => {
      this.ServiceData = data;

      console.log(this.ServiceData);
      });
      }

      getPro1Data() {
        this._data.getpro1().subscribe(
        (data: any) => {
        this.Pro1Data = data;

        console.log(this.Pro1Data);
        });
        }


        getLegendData() {
          this._data.getlegend().subscribe(
          (data: any) => {
          this.LegendData = data;

          console.log(this.LegendData);
          });
          }

          selectSearch(searchedData){
            this.memberDetailsData = [];
            this.memberDetailsData = searchedData;
            this.selectedVal = searchedData.name + searchedData.location;
            this.surgeryformData.value.surgeon = this.selectedVal;
            this.searchSurgery = false;

          }

          selectProcedure(searchedProcedure){
            this.selectedPro = searchedProcedure.name;
            this.surgeryformData.value.procedure = this.selectedPro;
            this.Procedure = false;
          }

          selectService(searchedService){
            this.selectedService = searchedService.practice +' @ '+ searchedService.location;
            this.surgeryformData.value.place_of_service = this.selectedService;
            this.Service = false;
          }

          selectPro1(searchedPro1){
            this.selectedPro1 = searchedPro1.name;
            this.surgeryformData.value.secondary_procedure_1 = this.selectedPro1;
            this.Procedure1 = false;

          }

          selectPro2(searchedPro2){
            this.selectedPro2 = searchedPro2.name;
            this.surgeryformData.value.secondary_procedure_2 = this.selectedPro2;
            this.Procedure2=false;

          }

          selectPro3(searchedPro3){
            this.selectedPro3 = searchedPro3.name;
            this.surgeryformData.value.secondary_procedure_3 = this.selectedPro3;
            this.Procedure3=false;

          }

          selectLoc(searchedAppData){
            this.selectedVal = searchedAppData.name;
            this.searchSurgery = false;
          }



          selectLegend(searchedLegend){
            this.selectedLegend = searchedLegend.name;
            this.surgeryformData.value.assistant_legend = this.selectedLegend;
            this.Legend = false;
          }

          closeSpan(){
            this.selectedVal = undefined;
          }

          closeApp(){
            this.selectedApp = undefined;
          }

          closePro(){
            this.selectedPro = undefined;
          }

          closePro1(){
            this.selectedPro1 = undefined;
          }

          closePro2(){
            this.selectedPro2 = undefined;
          }

          closePro3(){
            this.selectedPro3 = undefined;
          }

          closeService(){
            this.selectedService = undefined;
          }

          closeLegend(){
            this.selectedLegend = undefined;
          }

          origiseHeight($event){
            console.log($event);
            // this.originatedheight=true;
          }
          closeAddNewDoc(){
            this.book = false;
          }
          origiseWeight($event){
            console.log($event);
          }

          origisePro($event){
            console.log($event);
          }

          origiseBodyPart($event){
            console.log($event);
          }

          origiseSide($event){
            console.log($event);
          }

          origiseLevel1($event){
            console.log($event);
          }

          origiseLevel2($event){
            console.log($event);
          }

          origiseTime($event){
            console.log($event);
          }

          origiseProvider($event){
            console.log($event);
          }


          origisePractice($event){
            console.log($event);
          }


          surgerydoc(){
            this.surgery1=true;
          }

          bookdoc(){
            this.book=true;
          }

          presurgicaldoc(){
            this.book=true;
          }

          registrationdoc(){
            this.book=true;
          }

          surgdoc(){
            this.book=true;
          }

          anasthesiadoc(){
            this.book=true;
          }

          Intraopdoc(){
            this.book=true;
          }

          Postopdoc(){
            this.book=true;
          }

          billingdoc(){
            this.book=true;
          }

          operativedoc(){
            this.book=true;
          }

          appointmentloc(){
            this.applocation=true;
          }

          onSubmit(formData) {
            this.formDataArr.push(formData);
            console.log('formDataArrtdcvyubhj:', this.formDataArr);
            this.surgeryformData.patchValue({
              height:this.formDataArr[0].height,
              weight:this.formDataArr[0].weight,
              bmi:this.formDataArr[0].bmi,
              surgeon:this.formDataArr[0].surgeon,
              procedure:this.formDataArr[0].procedure,
              procedure_type:this.formDataArr[0].procedure_type,
              place_of_service:this.formDataArr[0].place_of_service,
              secondary_procedure_1:this.formDataArr[0].secondary_procedure_1,
              secondary_procedure_2:this.formDataArr[0].secondary_procedure_2,
              secondary_procedure_3:this.formDataArr[0].secondary_procedure_3,
              body_part:this.formDataArr[0].body_part,
              side:this.formDataArr[0].side,
              level_1:this.formDataArr[0].level_1,
              level_2:this.formDataArr[0].level_2,
              suggested_date_1:this.formDataArr[0].suggested_date_1,
              time:this.formDataArr[0].time,
              suggested_date_2:this.formDataArr[0].suggested_date_2,
              assistant_legend:this.formDataArr[0].assistant_legend,
              special_surgical_instruction:this.formDataArr[0].special_surgical_instruction,
              booking_sheet:this.formDataArr[0].booking_sheet,
              provider:this.formDataArr[0].provider,
              practice:this.formDataArr[0].practice,
              location:this.formDataArr[0].location

            });
            //this.addSurgery=false;


            // const addMore = this.surgeryformData;
            //   addMore.push(this.fb.group());

          }

  closeAddsurgery(){
    this.addSurgery = false;
  }


}



