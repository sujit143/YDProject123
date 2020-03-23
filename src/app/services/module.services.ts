import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { LocalStorageService } from '../shared/local-storage.service';
import { AppConstant } from '../app.constant';
import { CommonUtilityService } from '../services/common-utility.service';
import { Router } from '@angular/router';
import { Params } from '@angular/router';
/**
 * central module service
 * @export
 * @class ModuleService
 */
@Injectable()
export class ModuleService {
 
  public zoomsize = 85;
  userinfo: any = {};
  isIE11: boolean = false;
  
  constructor(private messageService: MessageService,
    private LocalStorageService: LocalStorageService, 
    public Router: Router, private CommonUtilityService: CommonUtilityService) {
    
  }
}