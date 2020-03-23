import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/primeng';

@Component({
  selector: 'app-manage-practice-subscription',
  templateUrl: './manage-practice-subscription.component.html',
  styleUrls: ['./manage-practice-subscription.component.scss']
})
export class ManagePracticeSubscriptionComponent implements OnInit {

  display: boolean=false;
  edit: boolean=false;
  delete: boolean=false;
  addpractice: FormGroup;
  editpractice: FormGroup;
  myDateValue: Date;

  constructor(private fb:FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.myDateValue = new Date();
    this.addpractice = this.fb.group({
      Practice : new FormControl(null, Validators.required),
      Location : new FormControl(null, Validators.required),
      Status  : new FormControl(null, Validators.required),
      Substartdate : new FormControl(null, Validators.required),
      Subenddate: new FormControl(null)
    });
    this.editpractice = this.fb.group({
      Practice : new FormControl(null, Validators.required),
      Location : new FormControl(null, Validators.required),
      Status  : new FormControl(null, Validators.required),
      Substartdate : new FormControl(null, Validators.required),
      Subenddate: new FormControl(null)
    });
  }
  openAddpopup(){
    this.display=true;
  }
  closeadd(){
    this.display=false;
  }
  openEditpopup(){
    this.edit=true;
  }
  closeedit(){
    this.edit=false;
  }
  opendeletepopup(){
    this.delete=true;
  }
  closedelete(){
    this.delete=false;
  }
  addnewpractice(addpractice){
console.log(this.addpractice.value);
      console.log(this.addpractice.value.Practice);
          if (this.addpractice.value.Practice == null) {
            setTimeout(() => {
              this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Practice feild is required ' });

            }, 100);
          }
        else if (this.addpractice.value.Location == null) {
            setTimeout(() => {
              this.messageService.add({ severity: 'error', summary: 'Error Message', detail: ' Location is required' });

            }, 100);
          }
          else if (this.addpractice.value.Substartdate == null) {
            setTimeout(() => {
              this.messageService.add({ severity: 'error', summary: 'Error Message', detail: ' Subscription start date is required' });

            }, 100);
          }

          else {
            {
              this.messageService.add({ severity: 'success', summary: 'success message', detail: 'Added successfully' });
            }
          }

          // body part
        }

      editnewpractice(editpractice){
          console.log(this.editpractice.value);
                console.log(this.editpractice.value.Practice);
                    if (this.editpractice.value.Practice == null) {
                      setTimeout(() => {
                        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Practice feild is required ' });

                      }, 100);
                    }
                  else if (this.editpractice.value.Location == null) {
                      setTimeout(() => {
                        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: ' Location is required' });

                      }, 100);
                    }
                    else if (this.editpractice.value.Substartdate == null) {
                      setTimeout(() => {
                        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: ' Subscription start date is required' });

                      }, 100);
                    }

                    else {
                      {
                        this.messageService.add({ severity: 'success', summary: 'success message', detail: 'Added successfully' });
                      }
                    }

                    // body part
                  }


  deletepractice(){

  }

}


