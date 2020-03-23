import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/appservices/shared.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  // t_data:any;
  constructor(private http:SharedService) { }

  ngOnInit() {
  }

}
