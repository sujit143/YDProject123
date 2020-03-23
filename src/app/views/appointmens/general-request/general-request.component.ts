import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/appservices/shared.service';

@Component({
  selector: 'app-general-request',
  templateUrl: './general-request.component.html',
  styleUrls: ['./general-request.component.scss',
  '../../../../assets/CSS/common.css',
]
})
export class GeneralRequestComponent implements OnInit {
  t_data:any;
  t_Data:any;
  filter1="";
  constructor(private http:SharedService) { }

  ngOnInit() {
    this.generalRequests();
  }
  generalRequests(){

    this.http.getGeneralRequests().subscribe(data =>{
     this.t_data=  data;
    //  this.t_Data=JSON.parse(this.t_data);
     console.log("Hello Hello");
     console.log('json data',this.t_data);

    })
  }
  filterdata(Name:string){
this.filter1 = Name;
  }
}
