import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/primeng';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MainService } from '../../services/appservices/main.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  animations: [
    trigger('dialogstate', [
      state('show', style({
        opacity: 1
      })),
      state('hide',   style({
        opacity: 0
      })),
      transition('show => hide', animate('600ms bounceOutRight')),
      transition('hide => show', animate('1000ms bounceInRight'))
    ])
  ]
})
export class LogComponent implements OnInit {
  show = false;
  submitted: boolean = false;
  display: boolean = true;
  forget: boolean = false;
  nuser: boolean = false;
  transitionoption = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  constructor(private router: Router, private fb: FormBuilder, private messageService: MessageService, private mainService: MainService) { }
  login: FormGroup;
  ForgotPwdForm: FormGroup;
  newuser: FormGroup;

  ngOnInit() {
    // this.mainService.getMessage().subscribe(message => {
    //   this.display = message;
    //   if (this.display === false) {
    //     this.forget = true;
    //     console.log('reqappoint', this.forget);
    //   }
    // });
    this.login = this.fb.group({
      user_name: new FormControl(null, Validators.required),
      user_password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(null)
    });
    this.ForgotPwdForm = this.fb.group({
      Email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]))
    });

    this.newuser = this.fb.group({
      role: new FormControl(),
      fname: new FormControl(null, Validators.required),
      dob: new FormControl(null),
      gender: new FormControl(null, Validators.required),
      cell: new FormControl(null),
      speciality: new FormControl(),
      email: new FormControl(null, Validators.required),
      practice: new FormControl(null),
      wphone: new FormControl(null),
      address: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      zip: new FormControl(null)

    });
  }

  onLoginSubmit() {
    console.log(this.login.value.user_name);
    if (this.login.status === 'INVALID') {
      setTimeout(() => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Username and password' });

      }, 100);
    } else {
      {
        const reqData = {
            'username': this.login.value.user_name,
            'password': this.login.value.user_password
        };
        this.mainService.login(reqData).then((data: any) => {
          if (data.Header.Status !== 'Unauthorized') {
           const test = data;
           this.router.navigate(['/dashboard']);
           this.messageService.add({ severity: 'success', summary: 'success message', detail: 'Logged in Successfully' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter the valid Username and Password' });
          }
        },
        error => {
          console.log('error', error);
        }
        );
      }
    }
  }

  onforgetpassword(ForgotPwdForm) {

    console.log(this.ForgotPwdForm);
    if (this.ForgotPwdForm.status === 'INVALID') {
      setTimeout(() => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Enter Correct Registerd Email Adrress' });

      }, 100);
    } else {
      {
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Error Message',
            detail: 'I am sorry, the email address does not exist in our records.'
          }
        );
      }
    }

    // body part
  }

  onNewUserSubmit(newuser) {
console.log(this.newuser.value.fname);
    if (this.newuser.value.fname == null) {
      setTimeout(() => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Full Name feild is required ' });

      }, 100);
    } else if (this.newuser.value.email == null) {
      setTimeout(() => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: ' email is required' });

      }, 100);
    } else {
      {
        this.messageService.add({ severity: 'success', summary: 'success message', detail: 'Registered successfully' });
      }
    }

    // body part
  }

  showDialog() {
    this.display = true;
  }

  forgetpassword() {
   // this.display = false;
    this.forget = true;
    // this.display = false;
    // this.mainService.sendlogindialog(false);
    // return (this.show ? 'show' : 'hide');
  }

  signin() {
    this.forget = false;
    this.nuser = true;
  }

  closeForgetDialog() {
    this.forget = false;
    this.mainService.sendlogindialog(false);
  }
  closeregisterDialog() {
    this.nuser = false;
    this.mainService.sendlogindialog(false);
  }


}
