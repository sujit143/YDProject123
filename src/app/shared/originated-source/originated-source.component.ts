import { OriginatedSourceList } from './../../models/originatedsource';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { SharedService } from '../../services/appservices/shared.service';
import { OriginatedSource } from '../../models/originatedsource';

@Component({
  selector: 'app-originated-source',
  templateUrl: './originated-source.component.html',
  styleUrls: ['./originated-source.component.scss']
})
export class OriginatedSourceComponent implements OnInit {
  OriginatedSourceOpt: OriginatedSourceList[];
  message: boolean = true;
  checkbox: boolean = false;
  selectedOpt: string;
  originatedform: FormGroup;

  constructor(private _data: SharedService, private messageService: MessageService, private fb: FormBuilder ) { }

  ngOnInit() {
    this.originatedform = this.fb.group({
      Source: new FormControl(null),
      checkboxin : new FormControl(null)
        });
    this.getOriginatedSource();
  }
  getOriginatedSource() {
    this._data.getDropDownOriginatedSource().subscribe(
      (data: OriginatedSourceList[]) => {
        this.OriginatedSourceOpt = data;
      }
    );
  }

  saveSource() {
    if (this.originatedform.value.Source === null) {
      this.messageService.add({
        severity: 'error',
        detail: 'Please Select single Source 1'
      });
    } else if (this.originatedform.value.checkboxin === null) {
      this.messageService.add({
        severity: 'error',
        detail: 'Please Select atleast single Source 2'
      });
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'OriginatedSource saved successfully',
      });
    }

  }
  selectedOriginatedSource(event) {
    this.message = false;
    this.checkbox = true;
    this.selectedOpt = event.value.Source2;
  }
}
