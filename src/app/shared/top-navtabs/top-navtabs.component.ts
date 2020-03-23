import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
@Component({
  selector: 'app-top-navtabs',
  templateUrl: './top-navtabs.component.html',
  styleUrls: ['./top-navtabs.component.scss'],

})
export class TopNavtabsComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  constructor() { }

  ngOnInit() {
  }
  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }
}
