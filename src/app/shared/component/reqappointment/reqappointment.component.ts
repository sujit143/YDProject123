import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/primeng';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { AboutService } from '../../../views/about-us/about.service';
import { Subscription } from 'rxjs';
import { MainService } from '../../../services/appservices/main.service';
import { DoctordataService } from '../../../views/doctors/doctordata.service';
import { location } from '../../../models/location';
import { MasterService } from '../../../services/master.service';


@Component({
  selector: 'app-reqappointment',
  templateUrl: './reqappointment.component.html',
  styleUrls: ['./reqappointment.component.scss']
})
export class ReqappointmentComponent implements OnInit {

  subscription: Subscription;
  display: boolean = false;
  appointmentModal: boolean = false;
  closend: boolean = false;
  reqForm: FormGroup;
  date4: Date;
  minDate: Date;
  maxDate: Date;
  bodyparts: any;
  selectedParts: any;
  confirmDialog: boolean = false;
  details: FormGroup;
  Timing: any[];
  responsiveOptions;
  locationLists: location[];
  displayreq: boolean = false;
  selectedBodyPartId :any;
  FormErrorObj : any;
  timeSchedule: any[];
  carouselData: any[];



  constructor(private router: Router, private messageService: MessageService, private fb: FormBuilder, private route: Router,
    private doctorsdata: DoctordataService, private masterService: MasterService,
    private aboutService: AboutService, private mainService: MainService) {
     this.timeSchedule = [
        {
          'month': 'Mon',
          'date': 'Dec 23',
        },
        {
          'month': 'Tue',
          'date': 'Dec 24',

        },
        {
          'month': 'Wed',
          'date': '25',

        },
        {
          'month': 'Thu',
          'date': 'Dec 26',

        },
        {
          'month': 'Fri',
          'date': 'Dec 27',

        },
        {
          'month': 'Sat',
          'date': 'Dec 28',

        },
        {
          'month': 'Mon',


        },
        {
          'month': 'Tue',
          'date': 'Dec 31',

        },
        {
          'month': 'Wed',
          'date': 'Jan 01',

        },
        {
          'month': 'Thu',
          'date': 'Jan 02',

        },
        {
          'month': 'Fri',
          'date': 'Jan 03',

        },
        {
          'month': 'Sat',
          'date': 'Jan 04',

        },
        {
          'month': 'Mon',


        },
        {
          'month': 'Tue',
          'date': 'Jan 06',

        },
        {
          'month': 'Wed',
          'date': 'Jan 07',

        }, {
          'month': 'Thu',
          'date': 'Jan 08',

        },
        {
          'month': 'Fri',
          'date': 'Jan 09',

        }, {
          'month': 'sat',
          'date': 'Jan 10',

        },
        {
          'month': 'Mon',


        },
        {
          'month': 'Tue',
          'date': 'Jan 11',

        },
        {
          'month': 'Wed',
          'date': 'Jan 12',

        },
        {
          'month': 'Thu',
          'date': 'Jan 13',

        },
        {
          'month': 'Fri',
          'date': 'Jan 14',

        },
        {
          'month': 'sat',
          'date': 'Jan 15',

        },
        {
          'month': 'Mon',


        },
        {
          'month': 'Tue',
          'date': 'Jan 17',

        },
      ];
      console.log("dataaaaa", this.timeSchedule);
    this.carouselData = this.timeSchedule;
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 3
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 3
      }
    ];

  }


  ngOnInit() {
    this.getbodyparts();
    this.getLocation();
    this.subscription = this.mainService.getMessage().subscribe(message => {
      this.display = message;
      if (this.display === false) {
        this.confirmDialog = false;
        this.getbodyparts();
        _.forEach(this.bodyparts, (b) => {
          b.isSelected = false;
        });
        console.log('reqappoint', this.confirmDialog);
      }

    });
    this.reqForm = this.fb.group({
      UserName: new FormControl(null, [Validators.required,Validators.pattern('[a-zA-z]*')]),
      PhoneNumber: new FormControl(null, [Validators.required,Validators.pattern('[0-9]*')] ),
      Email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      comment: new FormControl(null),
      locations: new FormControl(null)
    });
    this.FormErrorObj = {
      UserName: { required: "User Name can not be empty"},
      PhoneNumber: { required: "Phone Number can not be empty"},
      Email: { required: "Email can not be empty",pattern:"Please enter valid email address"},
      };
  }

  get f() { return this.reqForm.controls; }
  showDialog() {
    this.display = true;
    this.confirmDialog = false;
  }


  nextModal(selectedParts) {
    // this.selectedParts = _.cloneDeep(selectedParts);
    const test = _.filter(selectedParts, (s) => {
      return (s.isSelected === true);
    });
    if (!_.isEmpty(test)) {
      this.display = false;
      this.confirmDialog = true;
      this.mainService.sendMessage(true);
    }  else {
      this.messageService.add({ severity: 'error', summary: 'Alert Message', detail: 'please Select atleast one bodypart' });
    }
  }

 onSubmit(item) {
   console.log(item);
 var req ={
  'Id': null,
  'PatientEmail': item.Email,
  'AppointmentDateTimeList': [ {
    'StartDateTime':null,
    'EndDateTime': null
  }],
  'PatientId': null,
  'SpecialityIds': null,
  'BodyPartIds': this.selectedBodyPartId,
  'EpisodeId': null,
  'LocationId': item.location,
  'Contact': item.PhoneNumber,
  'ChiefComplaint': null,
  'CreatedDate': null,
  'CreatedBy': null,
  'ModifiedDate': null,
  'ModifiedBy': null,
  'PatienFirstName': item.UserName,
  'PatientLastName': null,
  'Header': null
};

   const isValid = this.masterService.getFormErrorMessage(this.reqForm, this.FormErrorObj);
   if (isValid != undefined) {
    this.messageService.add({severity: 'error', summary: 'Warning', detail: isValid});
   }   else {
    this.doctorsdata.getSaveRequest(req).then(
      (x) => {

        setTimeout(() => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully Submitted...'});

        }, 1000);

      }
      );
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully Submitted...'});
      setTimeout(() => {
        this.mainService.sendMessage(false);

      }, 1000);



    }

  //  this.router.navigate(['/home']);
  }

  getbodyparts() {
    this.aboutService.getbodyparts('').then(
      res => {
        if (res) {
          this.bodyparts = res;
          this.selectedParts = this.bodyparts[0];
          _.forEach(this.bodyparts, (b) => {
            b.isSelected = false;
          });
        }
      },
      error => {
      }
    );
  }

  selectParts(parts) {
    console.log(parts);
    console.log(parts.id);
    this.selectedBodyPartId=parts.id;
    parts.isSelected = (parts.isSelected === true ? false : true);
    console.log(parts.isSelected);
  }
  getLocation() {
    this.doctorsdata.getDoctorsLocation().then(
      (x: location[]) => {
        this.locationLists = x;
        console.log('locationList:', this.locationLists);
      }
    );
  }
  closeDialog() {
    this.reqForm.reset();
    this.displayreq = false;
    this.mainService.sendMessage(false);
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
