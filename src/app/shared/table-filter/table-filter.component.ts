import { Component, OnInit, Output,EventEmitter } from '@angular/core';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit {
  bsValue = new Date();
  selectedCountry: any;
  public fields: Object = { text: 'name', value: 'id' };
@Output() emit1 = new EventEmitter();
  cities:any = {};

  Locations = [{
    id: 1, name: '54 Dean'
  },
  {
    id: 2, name: 'HEMA'
  },
  ];
  Doctors = [{
    id: 1, name: 'Levine Pamela'
  },
  {
    id: 2, name: 'David Capiola'
  },
  {
    id: 3, name: 'Miguel Coba'
  },
  {
    id: 4, name: 'Yitzchak Cohen'
  },
  ];


  constructor() { }

  ngOnInit() {
  }
  onChange(deviceValue) {
    // this.cities = this.countries.filter(x => x.id == deviceValue)[0].cities;
  }
  Location(id:any) {
      this.cities = this.Locations.filter(x => x.id == id)[0];
      console.log(this.cities);
  this.emit1.emit(this.cities.name);

  }
  Doctor(id:any) {
    this.cities = this.Doctors.filter(x => x.id == id)[0];
    console.log(this.cities);
this.emit1.emit(this.cities.name);

}
}
