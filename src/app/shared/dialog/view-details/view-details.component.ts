import { ViewDetails } from '../../../models/viewdetails';
import { MainService } from '../../../services/appservices/main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-details',
  templateUrl: './View-details.component.html',
  styleUrls: ['./View-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  constructor(private mainService: MainService) {
    this.mainService.getViewDetail().subscribe(
      (ViewDetails) => {
        this.getViewDetails(ViewDetails);
      }
    );
  }
  showViewDetails = false;
  ViewDetailsArr: ViewDetails[] = [];

  ngOnInit() {
  }

  getViewDetails(ViewDetail: ViewDetails) {
    this.ViewDetailsArr = [];
    if (ViewDetail !== null || undefined) {
      const data = {
        Id: ViewDetail.Id,
        Title: ViewDetail.Title,
        Name: ViewDetail.Name,
        MiddleName: ViewDetail.MiddleName,
        LastName: ViewDetail.LastName,
        FirstName: ViewDetail.FirstName,
        Gender: ViewDetail.Gender,
        DateOfBirth: ViewDetail.DateOfBirth,
        Location: ViewDetail.City,
        State: ViewDetail.State,
        Email: ViewDetail.Email,
        ProfileImage: ''
      };
      if (this.ViewDetailsArr.length === 0) {
        this.ViewDetailsArr.push(data);
        this.showViewDetails = true;
      }
    }
    console.log(this.ViewDetailsArr);
  }

}
