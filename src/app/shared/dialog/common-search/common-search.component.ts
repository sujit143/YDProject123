import { State } from './../../../models/demographics';
import { MainService } from './../../../services/appservices/main.service';
import { MasterService } from './../../../services/master.service';
import { SharedService } from './../../../services/appservices/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewDetailsComponent } from '../view-details/view-details.component';
import { Search } from '../../../models/search';

@Component({
  selector: 'app-common-search',
  templateUrl: './common-search.component.html',
  styleUrls: ['./common-search.component.scss']
})
export class CommonSearchComponent implements OnInit {
  @ViewChild(ViewDetailsComponent, {static: false}) memberDetailsChild: ViewDetailsComponent;

  constructor(private dataService: SharedService, private masterService: MasterService, private mainService: MainService) { }
  statesOpt: State[];
  recordForSearch;
  searchedRecords: Search[] = [];
  searchedRecordLength;
  ngOnInit() {
    this.getDropdownStates();
    this.searchedRecords = [];
  }

  getDropdownStates() {
    this.dataService.getDropDownStates().subscribe(
      (data) => {
        this.statesOpt = this.masterService.formatDataforDropdown(
          'Name',
          data,
          'Select',
          'Name'
        );
      }
    );
  }
  filterSelectedRefferalSource(name, city, selectedstate) {
    this.dataService.getAllProviderRecords().subscribe(
      (data: Search[]) => {
        this.searchedRecords = data;
      }
    );
    console.log(selectedstate);
    // this.searchedRecords = [];
    this.searchedRecordLength = this.searchedRecords.length;
    for (let i = 0; i < this.recordForSearch.length; i++) {
      if (this.recordForSearch[i].Name === name) {
        switch (this.recordForSearch[i].State) {
          case selectedstate:
            this.searchedRecords.push(this.recordForSearch[i]);
            break;
          default:
            this.searchedRecords.push(this.recordForSearch[i]);
            break;
        }
        this.searchedRecords.push(this.recordForSearch[i]);
        this.searchedRecordLength = this.searchedRecords.length;
        // console.log(this.searchedRecords);
      } else if (this.recordForSearch[i].State === selectedstate && this.recordForSearch[i].Name === name) {
        this.searchedRecords.push(this.recordForSearch[i]);
        this.searchedRecordLength = this.searchedRecords.length;
      } else {
        this.searchedRecords.push(this.recordForSearch[i]);
        this.searchedRecordLength = this.searchedRecords.length;
      }
    }
  }
  selectSearchItem(seletedItem) {
    // this.selectFromSource(seletedItem);
    // this.selectToSource(seletedItem);
    // this.memberDetailsChild.getMemberDetails(seletedItem);
    this.mainService.sendViewDetail(seletedItem);
    // this.slectedFromReferralArr.push(seletedItem);
    console.log(seletedItem);
    this.mainService.sendSelectedSearchItem(seletedItem);
    // this.referralForm.patchValue({
    //   ReferralSourceToMember: seletedItem.Name,
    //   ReferralSourceFromMember: seletedItem.Name
    // });
    // this.searchContactDialog = false;
    // console.log(this.referralForm.value);
  }
}
