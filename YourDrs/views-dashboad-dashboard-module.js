(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-dashboad-dashboard-module"],{

/***/ "./node_modules/primeng/button.js":
/*!****************************************!*\
  !*** ./node_modules/primeng/button.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Shorthand */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./components/button/button */ "./node_modules/primeng/components/button/button.js"));

/***/ }),

/***/ "./node_modules/primeng/inputtext.js":
/*!*******************************************!*\
  !*** ./node_modules/primeng/inputtext.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Shorthand */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./components/inputtext/inputtext */ "./node_modules/primeng/components/inputtext/inputtext.js"));

/***/ }),

/***/ "./node_modules/primeng/paginator.js":
/*!*******************************************!*\
  !*** ./node_modules/primeng/paginator.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Shorthand */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./components/paginator/paginator */ "./node_modules/primeng/components/paginator/paginator.js"));

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboad/ExternalDocUpload/externaldocupload.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboad/ExternalDocUpload/externaldocupload.component.html ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p-toast [style]=\"{marginTop: '80px'}\"></p-toast>\n <div>\n   <ul class=\"nav nav-tabs\" >\n     <li class=\"active liTitle\">\n       <a class=\"padTitle\"><i class=\"fa fa-file\"></i> Documents Details </a>\n     </li>\n   </ul>\n </div>\n <div class=\"ui-g ui-fluid\">\n  <!-- <div class=\"\"> -->\n    <div  class=\"ui-g-12 ui-md-6 ui-lg-2\">\n      <span>\n        <label>Originating Practice</label>\n        <p-dropdown id=\"pwsdropdown\"  [options]=\"practiceData\" optionLabel=\"name\"\n\n          filter=\"true\" (onChange)=\"origisePractice($event)\"\n          ></p-dropdown>\n      </span>\n    </div>\n    <div  class=\"ui-g-12 ui-md-6 ui-lg-2\">\n      <span>\n        <label>Originating Location</label>\n        <p-dropdown id=\"pwsdropdown\" [options]=\"locationData\" optionLabel=\"Name\"\n           filter=\"true\"   >\n        </p-dropdown>\n      </span>\n    </div>\n    <div  class=\"ui-g-12 ui-md-6 ui-lg-2\">\n      <span>\n        <label>Treating Provider</label>\n        <p-dropdown id=\"pwsdropdown\" [options]=\"providerData\" optionLabel=\"name\"\n          filter=\"true\"  >\n        </p-dropdown>\n      </span>\n    </div>\n     <div  class=\"ui-g-12 ui-md-6 ui-lg-2\">\n      <label>Patient FirstName</label>\n      <input type=\"text\" id=\"txtPatientfirstnameSearch\" class=\"input-medium form-control textbox-search-onenterkey\"\n        placeholder=\"Patient FirstName\"  maxlength=\"45\">\n    </div>\n    <div  class=\"ui-g-12 ui-md-6 ui-lg-2\">\n      <label>Patient LastName</label>\n      <input type=\"text\" id=\"txtPatientlastnameSearch\" class=\"input-medium form-control textbox-search-onenterkey\"\n        placeholder=\"Patient LastName\"  maxlength=\"45\">\n    </div>\n    <div  class=\"ui-g-12 ui-md-6 ui-lg-2\" id=\"liDOB\" >\n          <span>\n        <label>Patient DOB</label>\n        <input type=\"text\" class=\"form-control\" placeholder=\"mm/dd/yyy\" [minDate]=\"minDate\" [maxDate]=\"maxDate\" #dp=\"bsDatepicker\" bsDatepicker       >\n      </span>\n    </div>\n  <!-- </div> -->\n <!-- </div> -->\n<!--\n  <div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n  <div class=\"row\"> -->\n    <div class=\"ui-g-12 ui-md-6 ui-lg-2 mt-4\">\n      <p-checkbox label=\"Is Emergency addon\"></p-checkbox>\n    </div>\n    <div class=\"ui-g-12 ui-md-6 ui-lg-2\">\n      <span>\n        <label>Document Type</label>\n        <p-dropdown id=\"pwsdropdown\" [options]=\"documentData\"  optionLabel=\"name\"\n           filter=\"true\"\n           >\n        </p-dropdown>\n            </span>\n    </div>\n    <div class=\"ui-g-12 ui-md-6 ui-lg-4\">\n      <a  href=\"javascript:void(0) \" class=\"btn btn-primary \" (click)=\"searchDocuments()\">Search</a>\n      <a   href=\"javascript:void(0) \"  class=\"btn btn-primary \" (click)=\"onUpload()\">Upload External Document</a>\n    </div>\n<!-- </div> -->\n  </div>\n <div class=\"ui-g-12 ui-md-12 ui-lg-12 mt-4\">\n<p-table [value]=\"ListOfData\" [paginator]=\"true\" [rows]=\"8\"  [responsive]=\"true\" [scrollable]=\"true\">\n  <ng-template pTemplate=\"header\" >\n      <tr>\n        <th class=\"tabledHeader\">Originated practise </th>\n        <th class=\"tabledHeader\">Originated Location </th>\n        <th class=\"tabledHeader\">Treating Provider </th>\n        <th class=\"tabledHeader\">Patient Name </th>\n        <th class=\"tabledHeader\"> Patient DOB </th>\n        <th class=\"tabledHeader\"> External Document Type </th>\n        <th class=\"tabledHeader\"> Document Description </th>\n        <th class=\"tabledHeader\"> Status </th>\n        <th class=\"tabledHeader\"> Is Emergency addon </th>\n        <th class=\"tabledHeader\"> Created By </th>\n        <th class=\"tabledHeader\"> Created Date </th>\n        <th class=\"tabledHeader\"> Mode </th>\n        <th class=\"tabledHeader\"> Consolidated Document </th>\n        <th class=\"tabledHeader\"> Actions </th>\n      </tr>\n  </ng-template>\n  <ng-template pTemplate=\"body\" let-upload>\n      <tr >\n          <td class=\"tdLines\"><span class=\"ui-column-title\">Originated practise</span>{{upload.originatedpractise}}</td>\n          <td class=\"tdLines\"><span class=\"ui-column-title\">Originated Location</span>{{upload.originatedlocation}}</td>\n          <td  class=\"tdLines\"><span class=\"ui-column-title\">Treating Provider</span>{{upload.treatingprovider}}</td>\n          <td  class=\"tdLines\"><span class=\"ui-column-title\">Patient Name</span>{{upload.patientname}}</td>\n          <td  class=\"tdLines\"><span class=\"ui-column-title\">Patient DOB </span>{{upload.patientdob}}</td>\n          <td  class=\"tdLines\"><span class=\"ui-column-title\">Document Type</span>{{upload.externaldocumenttype}}</td>\n          <td  class=\"tdLines\"><span class=\"ui-column-title\">Document Description </span>{{upload.documentdescription}}</td>\n          <td  class=\"tdLines\"><span class=\"ui-column-title\">Status</span>{{upload.status}}</td>\n          <td  class=\"tdLines\"><span class=\"ui-column-title\">Is Emergency addon</span>{{upload.isemergencyaddon}}</td>\n          <td  class=\"tdLines\"><span class=\"ui-column-title\">Created By</span>{{upload.createdby}}</td>\n          <td  class=\"tdLines\"><span class=\"ui-column-title\">Created Date</span>{{upload.createddate}}</td>\n          <td  class=\"tdLines\"><span class=\"ui-column-title\">Mode</span>{{upload.mode}}</td>\n          <td  class=\"tdLines text-center\" ><span class=\"ui-column-title\"> Consolidated Document</span>\n            <i class=\"fa fa-file\"  ></i>\n          </td>\n          <td  class=\"tdLines\"><span class=\"ui-column-title\">Actions</span>\n           <p-dropdown\n           id=\"actionId_{{upload.id}}\"\n            [options]=\"checkstatus\"\n            placeholder=\"Actions\"\n            optionLabel=\"name\"\n            [(ngModel)] = 'upload.status'\n            (onChange)='changestatus(upload)'\n            styleClass=\"drop\">\n          </p-dropdown>\n      </td>\n      </tr>\n  </ng-template>\n</p-table>\n</div>\n<p-dialog id=\"addExtDocument\" [closable]=\"false\" [(visible)]=\"documentDisplay\" [modal]=\"true\"\n[draggable]=\"false\" blockScroll =\"false\" [resizable]=\"false\"><br><br>\n<p-header>\n  <div class=\"head\">\n    <a href=\"javascript:void(0)\" class=\"btn btn-danger btn-sm pull-right\"\n      (click)=\"closeDocumentpop()\">close</a>\n    <h5 class=\"popupHeading\">Add External Document</h5>\n  </div>\n</p-header>\n  <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit(form)\" >\n    <div formArrayName=\"docDetails\"  *ngFor=\"let docUpload of form.get('docDetails')['controls']; let i = index\" class=\"ui-g ui-fluid\">\n      <ng-container [formGroupName]=\"i\">\n        <div class=\"ui-g-12 ui-md-6 ui-lg-2\">\n          <span>\n            <label>Originating Practice</label>\n            <p-dropdown formControlName=\"practice\" id=\"pwsdropdown\" [options]=\"practiceData\" optionLabel=\"name\"\n\n              ></p-dropdown>\n          </span>\n        </div>\n        <div class=\"ui-g-12 ui-md-6 ui-lg-2\">\n          <span>\n            <label>Originating Location</label>\n            <p-dropdown formControlName=\"location\" id=\"pwsdropdown\" [options]=\"locationData\" optionLabel=\"Name\"\n             filter=\"true\"   >\n            </p-dropdown>\n          </span>\n        </div>\n        <div class=\"ui-g-12 ui-md-6 ui-lg-2\">\n          <span>\n            <label>Treating Provider</label>\n            <p-dropdown  formControlName=\"provider\" id=\"pwsdropdown\" [options]=\"providerData\" optionLabel=\"name\"\n               filter=\"true\"  >\n            </p-dropdown>\n          </span>\n        </div>\n         <div class=\"ui-g-12 ui-md-6 ui-lg-2\">\n          <label>Patient FirstName</label>\n          <input type=\"text\" formControlName=\"firstName\" id=\"txtPatientfirstnameSearch\" class=\"input-medium form-control textbox-search-onenterkey\"\n            placeholder=\"Patient FirstName\"  maxlength=\"45\">\n        </div>\n        <div class=\"ui-g-12 ui-md-6 ui-lg-2\">\n          <label>Patient LastName</label>\n          <input type=\"text\" formControlName=\"lastName\" id=\"txtPatientlastnameSearch\" class=\"input-medium form-control textbox-search-onenterkey\"\n            placeholder=\"Patient LastName\"  maxlength=\"45\">\n        </div>\n        <div class=\"ui-g-12 ui-md-6 ui-lg-2\" id=\"liDOB\" >\n              <span>\n            <label>Patient DOB</label>\n            <input type=\"text\" formControlName=\"patientDOB\" class=\"form-control\" placeholder=\"mm/dd/yyy\" [minDate]=\"minDate\" [maxDate]=\"maxDate\" #dp=\"bsDatepicker\" bsDatepicker       >\n          </span>\n        </div>\n\n        <div class=\"ui-g-12 ui-md-6 ui-lg-2 mt-4\">\n          <p-checkbox  formControlName=\"emgAddon\"  label=\"Is Emergency addon\"></p-checkbox>\n        </div>\n        <div class=\"ui-g-12 ui-md-6 ui-lg-2\">\n          <span>\n            <label>Document Type<span class=\"text-danger\">*</span></label>\n            <p-dropdown id=\"pwsdropdown\" formControlName=\"docType\" [options]=\"documentData\"  optionLabel=\"name\"\n              filter=\"true\"\n        >\n            </p-dropdown>\n          </span>\n        </div>\n        <div class=\"ui-g-12 ui-md-6 ui-lg-2\">\n          <label>Document Description</label>\n          <input type=\"text\" formControlName=\"docDesc\" id=\"txtPatientlastnameSearch\" class=\"input-medium form-control textbox-search-onenterkey\"\n            placeholder=\"Document Description\" maxlength=\"45\"  >\n        </div>\n        </ng-container>\n    </div>\n\n      <br><br>\n\n      <div class=\"row col-md-12\">\n        <label>Add New Attachment<span class=\"text-danger\">*</span></label>\n      </div>\n           <div class=\"image-upload-wrap\">\n        <input class=\"file-upload-input\" id= \"test\" (input)=\"onSelectFile($event)\" formControlName=\"addAttachment\" type='file'  />\n        <div class=\"drag-text\">\n          <i  class=\"fa fa-cloud-upload\" ></i>\n          <h5 class=\"Drop-files\">Drop files here or click to upload.</h5>\n        </div>\n      </div>\n\n    <p-footer>\n      <div class=\"text-right\">\n        <button type=\"submit\" class=\"btn btn-sm btn-primary\">Save</button>\n\n    </div>\n    </p-footer>\n  </form>\n</p-dialog>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboad/providerdashboard/providerdashboard.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboad/providerdashboard/providerdashboard.component.html ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"panel-heading\">\n  <div class=\"panel-options\">\n    <ul class=\"nav nav-tabs\" style=\"background-color: #969696; height: 40px;\">\n      <li class=\"active liTitle\">\n        <a class=\"ProviderDashboard pdtab\">&nbsp;&nbsp;<i class=\"fa fa-file\"></i> Provider Dashboard</a>\n      </li>\n    </ul>\n  </div>\n</div>\n\n<!-- drop down start -->\n\n<p-accordion [activeIndex]=\"index\">\n  <p-accordionTab header=\"Search Filters\" >\n    <form [formGroup]=\"editapptForm\">\n      <!-- <div class=\"row\">\n        <div class=\"col-lg-12\">\n          <div class=\"wrapper wrapper-content\">\n            <div class=\"ibox-content m-b-sm border-bottom\"> -->\n              <div class=\"row\">\n                <div class=\"col-lg-12\">\n                  <div class=\"row\">\n                    <div\n                      *ngFor=\"let data of itemFilterFieldsStringsLeft\"\n                      class=\"col-lg-2 col-md-4 col-sm-6 col-xs-12 \"\n                      id=\"margin1\">\n                      <span>\n                        <label>{{ data.fieldName }}</label\n                        ><br />\n                        <p-dropdown\n                          *ngIf=\"data.isVisible && data.type == 'dropdown'\"\n                          id=\"pwsdropdown\"\n                          #dd\n                          formControlName=\"{{ data.controlname }}\"\n                          [showClear]=\"practiceDRP\"\n                          (onChange)=\"Send($event)\"\n                          [autoWidth]=\"true\"\n                          [style]=\"{ width: '100%' }\"\n                          #pDropId\n                          [(options)]=\"data.options\"\n                          optionLabel=\"label\"\n                          filter=\"true\"\n                          placeholder=\"select\">\n                        </p-dropdown>\n                        <span class =\"trash\" *ngIf =\"data.fieldName == 'Favourite Filters'\"><i  class=\"{{data.icon}}\" (click)=\"deletepopup()\"></i></span>\n                        <!-- style=\"width:90%  !important\" -->\n                        <div\n                          class=\"ui-inputgroup\"\n                          *ngIf=\"data.isVisible && data.type == 'inputbox'\">\n                          <input\n                            type=\"text\"\n                            formControlName=\"{{data.controlname}}\"\n                            class=\"form-control textbox-search-onenterkey\"\n                            id=\"txtPatientName\"\n                            placeholder=\"First / Last Name\"/>\n                        </div>\n                        <input\n                          *ngIf=\"data.isVisible && data.type == 'datepicker'\"\n                          type=\"text\"\n                          formControlName=\"{{data.controlname}}\"\n                          class=\"form-control\"\n                          placeholder=\" mm/dd/yyy\"\n                          #dp=\"bsDatepicker\"\n                          bsDatepicker/>\n                        <input\n                          *ngIf=\"data.isVisible && data.type == 'chekbox'\"\n                          type=\"checkbox\"\n                          value=\"true\"\n                          id=\"chkIsStatFilePD\"\n                          class=\"\"/>\n                      </span>\n                    </div>\n                  </div>\n                </div>\n              <!-- </div>\n            </div>\n          </div>\n        </div> -->\n        <app-providerdashboard1\n          (searcResult)=\"searcResult($event)\"\n          (filterColumns)=\"filterColoumn($event)\"\n          (filterFields)=\"filterFields($event)\"\n          (reset)=\"reset($event)\"\n          (saveFilter)=\"saveFilter($event)\"\n          style=\"width: 100%;\"\n        ></app-providerdashboard1>\n      </div>\n    </form>\n  </p-accordionTab>\n</p-accordion>\n\n<!-- drop down end -->\n\n<!-- Table Start -->\n\n<div id=\"collapse1\" class=\"tableDiv\">\n  <table\n    class=\"table table-striped table-hover table-condensed tablesorter  text-sm\"\n    *ngIf=\"ShowTab\">\n    <thead>\n      <tr>\n        <th *ngIf=\"AppointmentFromDate\" class=\"thproviderSort headerSort sortIconchange\" title=\"Appointment From Date\">\n          Appointment From Date\n        </th>\n        <th *ngIf=\"AuthorizationStatus\" class=\"thproviderSort headerSort sortIconchange\" title=\"Authorization Status\">\n          Authorization Status\n        </th>\n        <th *ngIf=\"Case\" class=\"thproviderSort headerSort sortIconchange\" title=\"Case #\">\n          Case #\n        </th>\n        <th *ngIf=\"MOP\" class=\"thproviderSort headerSort sortIconchange\" title=\"Sort by MOP\">\n          MOP\n        </th>\n        <th *ngIf=\"SuperBillStatus\" class=\"thproviderSort headerSort sortIconchange\" title=\"Super Bill Status\">\n          Super Bill Status\n        </th>\n        <th *ngIf=\"CheckedInTime\" class=\"thproviderSort headerSort sortIconchange\" title=\"Checked In Time\">\n          Checked In Time\n        </th>\n        <th *ngIf=\"PatientName\" class=\"thproviderSort headerSort sortIconchange\" title=\"Patient Name\">\n          Patient Name\n        </th>\n        <th *ngIf=\"AppointmentCreatedFromDate\" class=\"thproviderSort headerSort sortIconchange\" title=\"Appointment Created From Date\">\n          <span>Appointment Created Date</span>\n        </th>\n        <th *ngIf=\"Provider\" class=\"thproviderSort headerSort sortIconchange\" title=\"Provider\">\n          Provider\n        </th>\n        <th *ngIf=\"VerificationStatus\" class=\"thproviderSort headerSort sortIconchange\" title=\"Verification Status\">\n          Verification Status\n        </th>\n        <th *ngIf=\"Location\" class=\"thproviderSort headerSort sortIconchange\" title=\"Location\">\n          Location\n        </th>\n        <th *ngIf=\"CaseDetails\" class=\"thproviderSort headerSort sortIconchange\" title=\"Case Details\">\n          Case Details\n        </th>\n        <th *ngIf=\"AppointmentStatus\" class=\"thproviderSort headerSort sortIconchange\" title=\"Appointment Status\">\n          Appointment Status\n        </th>\n        <th *ngIf=\"DictationType\" class=\"thproviderSort headerSort sortIconchange\" title=\"Dictation Type\">\n          Dictation Type\n        </th>\n        <th *ngIf=\"AssessmentStatus\" class=\"thproviderSort headerSort sortIconchange\" title=\"Assessment Status\">\n          Assessment Status\n        </th>\n        <th *ngIf=\"POSLocation\" class=\"thproviderSort headerSort sortIconchange\" title=\"POS Location\">\n          POS Location\n        </th>\n        <th *ngIf=\"VideoSession\" class=\"thproviderSort headerSort sortIconchange\" title=\"Video Session\">\n          Video Session\n        </th>\n        <th *ngIf=\"DictationStatus\" class=\"thproviderSort headerSort sortIconchange\" title=\"Dictation Status\">\n          Dictation Status\n        </th>\n        <th *ngIf=\"BillingStatus\" class=\"thproviderSort headerSort sortIconchange\" title=\"Billing Status\">\n          Billing Status\n        </th>\n        <th *ngIf=\"AppointmentType\" class=\"thproviderSort headerSort sortIconchange\" title=\"Appointment Type\">\n          Appointment Type\n        </th>\n        <th>Actions</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let item of your; index as i\">\n        <td *ngIf=\"AppointmentFromDate\" class=\"lnkTratmentEpisode\">\n          <span class=\"tooltipcase\" title=\"27/12/2005\">\n          {{ item.appt_date }}</span>\n        </td>\n        <td *ngIf=\"AuthorizationStatus\" class=\"lnkTratmentEpisode\">\n          <span class=\"badge badge-warning\" title=\"Authorization Pending\">{{ item.auth_status }}</span>\n        </td>\n        <td *ngIf=\"Case\" class=\"lnkTratmentEpisode\">\n          <span class=\"tooltipcase\" title=\"Y18047621_1\">{{ item.case }}</span>\n        </td>\n        <td *ngIf=\"MOP\" class=\"lnkTratmentEpisode\">\n          <span class=\"mop\" title=\"NA\">{{ item.mop }}</span>\n        </td>\n        <td *ngIf=\"SuperBillStatus\" class=\"lnkTratmentEpisode\">\n          <span class=\"super bill\" title=\"pending\">{{ item.sup_bilstatus }}</span>\n        </td>\n        <td *ngIf=\"CheckedInTime\" class=\"lnkTratmentEpisode\">\n          <span class=\"tooltipcase\" title=\"NA\">{{ item.check_in_time }}</span>\n        </td>\n        <td *ngIf=\"PatientName\" class=\"lnkTratmentEpisode\">\n          <span class=\"tooltipcase\" title=\"abc\">{{ item.pat_name }}</span>\n        </td>\n        <td *ngIf=\"AppointmentCreatedFromDate\" class=\"lnkTratmentEpisode\">\n          <span class=\"tooltipcase\" title=\"25/11/2020\">{{ item.appt_cre_date }}</span>\n        </td>\n        <td *ngIf=\"Provider\" class=\"lnkTratmentEpisode\">\n          <span class=\"tooltipcase\" title=\"Dr ky\">{{ item.provider }}</span>\n        </td>\n        <td *ngIf=\"VerificationStatus\" class=\"lnkTratmentEpisode\">\n          <span class=\"badge badge-warning\" title=\"Verification Pending\">{{ item.ver_status }}</span>\n        </td>\n        <td *ngIf=\"Location\" class=\"lnkTratmentEpisode\">\n          <span class=\"tooltipcase\" title=\"HEMA\">{{ item.location }}</span>\n        </td>\n        <td *ngIf=\"CaseDetails\" class=\"lnkTratmentEpisode\">\n          <span class=\"tooltipcase\" title=\"worker com\">{{ item.case_detail }}</span>\n        </td>\n        <td *ngIf=\"AppointmentStatus\" class=\"lnkTratmentEpisode\">\n            <span class=\"tooltipcase\" title=\"Visit Requested\">{{ item.appt_status }}</span>\n        </td>\n        <td *ngIf=\"DictationType\" class=\"lnkTratmentEpisode\">\n          <span class=\"tooltipcase\" title=\"\tmedical record\">{{ item.dic_type }}</span>\n        </td>\n        <td *ngIf=\"AssessmentStatus\" class=\"lnkTratmentEpisode\">\n          <span class=\"assessmentstatus_34428\" title=\"N/A\">{{ item.ass_status }}</span>\n        </td>\n        <td *ngIf=\"POSLocation\" class=\"lnkTratmentEpisode\" (click)=\"moreInfo(item)\">\n          <span class=\"tooltipcase\" title=\"HEMA 54 dean\">{{ item.pos_loc }}</span>\n        </td>\n        <td class=\"lnkTratmentEpisode\" *ngIf=\"VideoSession\">\n          <span class=\"tooltipcase\" title=\"NA\">{{ item.vid_session }}</span>\n        </td>\n        <td class=\"lnkTratmentEpisode\" *ngIf=\"DictationStatus\">\n          <div  title=\"Dictation Completed\" class=\"micupdatecontainer  dictstatus_34428\">\n            <span class=\"tooltipcase\" title=\"Dictation Completed\">{{ item.dic_status }}</span>\n          </div>\n          <input type=\"checkbox\" value=\"true\" id=\"\" class=\"chkIsStatFileUpdate\"/><span>Is Stat File</span> <br />\n        </td>\n        <td *ngIf=\"BillingStatus\" class=\"lnkTratmentEpisode\">\n          <span class=\"tooltipcase\" title=\"pending\">{{item.bill_status}}</span>\n        </td>\n        <td *ngIf=\"AppointmentType\" class=\"lnkTratmentEpisode\">\n          <i class=\"fa fa-check-circle\"></i>\n          <span class=\"tooltipcase\" title=\"PT\">{{item.appt_type}}</span>\n        </td>\n        <td class=\"lnkTratmentEpisode\"\n            style=\"vertical-align: middle;\">\n          <div class=\"btn-group open\" dropdown placement=\"bottom left\">\n            <button\n              id=\"button-basic\"\n              dropdownToggle\n              type=\"button\"\n              class=\"btn btn-xs btn-primary dropdown-toggle\">\n              Actions\n            </button>\n            <ul\n              id=\"dropdown-basic\"\n              *dropdownMenu\n              class=\"dropdown-menu dropdown-menu-left margin\"\n              role=\"menu\"\n              aria-labelledby=\"button-basic\">\n              <li>\n                <a (click)=\"Newepisode()\">&nbsp;&nbsp;<i class=\"fa fa-external-link-square\"></i> Order labs /  Diagnostic Images</a>\n              </li>\n              <hr/>\n              <li>\n                <a>&nbsp;&nbsp;<i class=\"fa fa-info-circle\"></i> Case Details</a>\n              </li>\n              <hr/>\n              <li>\n                <a (click)=\"Editappt(item)\">&nbsp;&nbsp;<i class=\"fa fa-edit\"></i> Edit Appointment</a>\n              </li>\n              <hr/>\n              <li>\n                <a><i class=\"fa fa-file\" title=\"Click For Case Notes\">&nbsp;&nbsp;</i> Case Notes</a>\n              </li>\n              <hr/>\n              <li>\n                <a (click)=\"Apptmemo()\">&nbsp;&nbsp;<i class=\"fa fa-file\"></i> Appointment Memos</a>\n              </li>\n              <hr/>\n              <li>\n                <a (click)=\"Casemang()\">&nbsp;&nbsp;<i class=\"fa fa-file\"></i> Add CaseManagment Memo</a>\n              </li>\n              <hr/>\n              <li>\n                <a>&nbsp;&nbsp;<i class=\"fa fa-file pull-left\"></i> View Super Bill Document</a>\n              </li>\n              <hr/>\n              <li>\n                <a (click)=\"viewSuperBill()\">&nbsp;&nbsp;<i class=\"fa fa-download\"></i> Download Super Bill</a>\n              </li>\n              <hr/>\n              <li>\n                <a (click)=\"Addmop()\">&nbsp;&nbsp;<i class=\"fa fa-plus\"></i> Add MOP</a>\n              </li>\n            </ul>\n          </div>\n        </td>\n      </tr>\n    </tbody>\n    <tr *ngIf=\"your.length ===0\" >\n      <td colspan=\"10\" class=\"alert alert-warning\">\n        No Data Found\n      </td>\n   </tr>\n  </table>\n  <div class=\"custompagination pull-right\">\n    <span class=\"label pagerInfo\">Total Items <strong>{{tableDataLength}}</strong></span>\n  </div>\n</div>\n\n<!-- Favorite Filter Delete Popup Start -->\n\n<p-dialog id=\"deletefavpopup\" [(visible)]=\"deletePopup\" [modal]=\"true\" [draggable]=\"false\" [responsive]=\"true\"\n  [draggable]=\"false\"[positionTop]=\"50\" [closable]=\"false\" [blockScroll]=\"true\">\n  <p-header>\n    <p>Are you sure, You want to delete this favourite filter</p>\n  </p-header>\n  <p-footer>\n    <a (click)=\"delete(index)\" class=\"btn btn-success\">Delete</a>\n    <a class=\"btn btn-small btn-danger pull-right\"(click)=\"closeDeletePopup()\">Close</a>\n  </p-footer>\n</p-dialog>\n\n  <!-- Favorite Filter Delete Popup End -->\n\n\n\n\n<!-- Table End -->\n\n<p-dialog\n  id=\"editAppt\"\n  [(visible)]=\"Editapptdisplay\"\n  [modal]=\"true\"\n  [draggable]=\"false\"\n  [responsive]=\"true\"\n  [draggable]=\"false\"\n  [positionTop]=\"50\"\n  [closable]=\"false\"\n>\n  <p-header>\n    <a\n      href=\"javascript:void(0)\"\n      data-dismiss=\"modal\"\n      class=\"btn btn-small btn-danger pull-right\"\n      (click)=\"closeEditAppt()\"\n      >Close</a\n    >\n    <h3 style=\"text-align: center;\">Appointment</h3>\n  </p-header>\n  <form [formGroup]=\"editapptForm\">\n    <div id=\"dvAddAppointment\">\n      <div class=\"row\" id=\"dvSurgeryPatientDetails\">\n        <div class=\"col-md-12\">\n          <div style=\"background-color: #337ab7;\">\n            <div class=\"row\" style=\"margin-left: 10px;\">\n              <h3 style=\"color: white;\">\n                abc\n\n                <span>(Y18047621_1) </span><span>MRN : Y1804762</span>\n              </h3>\n            </div>\n\n            <div class=\"row\" style=\"font-weight: bold; margin-left: 10px;\">\n              <span style=\"color: white;\"> </span>\n              <span style=\"color: white;\">Worker's Compensation</span>\n            </div>\n          </div>\n        </div>\n      </div>\n      <br />\n      <div class=\"row\">\n        <div class=\"col-md-3\">\n          <label>Appointment Type<span style=\"color: red\">*</span></label>\n          <p-dropdown\n            id=\"pwsdropdown\"\n            #dd\n            [autoWidth]=\"true\"\n            formControlName=\"appt_type\"\n            optionLabel=\"name\"\n            [style]=\"{ width: '100%' }\"\n            [options]=\"appt_type\"\n            filter=\"true\"\n          >\n          </p-dropdown>\n        </div>\n\n        <div class=\"col-md-2 dvAppointmentZipcode\">\n          <label id=\"lblAppointmentZipCode\">ZipCode</label>\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            id=\"txtAppointmentZipCode\"\n            data-req-url=\"/Patient/GetPracticeLocationForZipcode\"\n            data-req-url2=\"/Patient/GetAppointmentLocation\"\n            placeholder=\"xxxxx-xxxx\"\n            data-mask1=\"99999-9999\"\n            maxlength=\"10\"\n            data-update-container=\"#ddlLocationForAppointment\"\n          />\n        </div>\n\n        <div class=\"col-md-3\">\n          <label>Location<span style=\"color: red\">*</span></label>\n          <p-dropdown\n            id=\"pwsdropdown\"\n            #dd\n            [autoWidth]=\"true\"\n            formControlName=\"location\"\n            [style]=\"{ width: '100%' }\"\n            [options]=\"location\"\n            optionLabel=\"name\"\n            filter=\"true\"\n          >\n          </p-dropdown>\n        </div>\n\n        <div class=\"col-md-4\">\n          <label>Provider / Physician Assistant</label>\n          <div class=\"input-group\">\n            <input\n              type=\"text\"\n              value=\"Kyriakides Christopher\"\n              data-mem-id=\"10\"\n              data-locationid=\"149\"\n              data-practiceid=\"81\"\n              class=\"form-control appointmentSectionModified\"\n              id=\"txtprovider\"\n              disabled=\"disabled\"\n              data-practicelocationid=\"149\"\n            />\n            <span class=\"input-group-addon\"\n              ><a\n                href=\"javascript:void(0)\"\n                (click)=\"SearchProvider()\"\n                class=\"fa fa-search\"\n                id=\"btnSearchprovider\"\n                title=\"Search Provider\"\n                data-req-url=\"/Patient/SearchProvider\"\n                data-update-container=\"#dvPopupTopNode\"\n                data-search-updatecontainer=\"#txtprovider\"\n              ></a>\n            </span>\n          </div>\n          <span\n            class=\"hide showprovidermandatorytomovecheckin\"\n            style=\"color: red;\"\n          >\n            select provider to move appointment to check in\n          </span>\n        </div>\n      </div>\n      <br />\n      <br />\n      <br />\n\n      <div class=\"row\">\n        <div\n          class=\"table-responsive white_section\"\n          style=\"overflow-x: inherit !important\"\n        >\n          <label style=\"margin-left: 10px;\"\n            >Appointment Details (Best date(s) and time(s) of appointment)\n          </label>\n          <table class=\"table timetable_big\" id=\"tblAppointmentFileds\">\n            <thead>\n              <tr>\n                <th>Preferred Date <span style=\"color: red;\">*</span></th>\n                <th>Start Time <span style=\"color: red;\">*</span></th>\n                <th>End Time <span style=\"color: red;\">*</span></th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr class=\"trTimeSlots\">\n                <td>\n                  <input\n                    type=\"text\"\n                    class=\"form-control\"\n                    value=\"{{ dateTime | date: 'MM/dd/yyyy' }}\"\n                    placeholder=\"mm/dd/yyyy\"\n                    (bsValueChange)=\"showMemo($event)\"\n                    #dp=\"bsDatepicker\"\n                    bsDatepicker\n                  />\n                </td>\n\n                <td>\n                  <p-dropdown\n                    id=\"pwsdropdown\"\n                    [autoWidth]=\"true\"\n                    [style]=\"{ width: '100%' }\"\n                    [options]=\"start_time\"\n                    optionLabel=\"time\"\n                    filter=\"true\"\n                    placeholder=\"select\"\n                  >\n                  </p-dropdown>\n                </td>\n\n                <td>\n                  <p-dropdown\n                    id=\"pwsdropdown\"\n                    [autoWidth]=\"true\"\n                    [style]=\"{ width: '100%' }\"\n                    [options]=\"end_time\"\n                    optionLabel=\"time\"\n                    filter=\"true\"\n                    placeholder=\"select\"\n                  >\n                  </p-dropdown>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n      <br />\n\n      <div class=\"row col-md-12\">\n        <label>Appointment Memo</label>\n        <textarea\n          id=\"txtAppointmentMemo\"\n          class=\"form-control\"\n          maxlength=\"2000\"\n          disabled=\"\"\n        ></textarea>\n      </div>\n      <br />\n      <br />\n\n      <div\n        id=\"dvAppointmentReschduled\"\n        style=\"margin-top: -15px\"\n        *ngIf=\"showMemoFeilds\"\n      >\n        <div class=\"col-md-6\">\n          <label>Reason<span style=\"color: red\">*</span></label>\n          <p-dropdown\n            id=\"pwsdropdown\"\n            [autoWidth]=\"true\"\n            [style]=\"{ width: '100%' }\"\n            [options]=\"start_time\"\n            optionLabel=\"time\"\n            filter=\"true\"\n            placeholder=\"select\"\n          >\n          </p-dropdown>\n        </div>\n\n        <div class=\"col-md-6\" id=\"dvAppointmentResheduledReasonDesc\">\n          <label\n            >Description<span class=\"reasondesc hide\" style=\"color: red\"\n              >*</span\n            ></label\n          >\n          <textarea\n            class=\"form-control\"\n            placeholder=\"Description\"\n            id=\"txtAppointmentResheduledReasonDesc\"\n            maxlength=\"200\"\n            rows=\"3\"\n            cols=\"20\"\n            style=\"height: 50px;\"\n          ></textarea>\n        </div>\n      </div>\n      <br />\n    </div>\n  </form>\n  <div class=\"modal-footer\">\n    <a\n      href=\"javascript:void(0)\"\n      class=\"btn btn-primary pull-right btnsaveMop\"\n      id=\"btnsaveMop\"\n      data-appointmentid=\"34494\"\n      data-post-url=\"/Billing/InsUpdAppointmentMOP\"\n      >Save</a\n    >\n  </div>\n</p-dialog>\n\n<p-dialog\n  id=\"searchProv\"\n  [(visible)]=\"Searchprodisplay\"\n  [modal]=\"true\"\n  [draggable]=\"false\"\n  [responsive]=\"true\"\n  [draggable]=\"false\"\n  [positionTop]=\"50\"\n  [closable]=\"false\"\n>\n  <p-header>\n    <a\n      href=\"javascript:void(0)\"\n      data-dismiss=\"modal\"\n      class=\"btn btn-small btn-danger pull-right\"\n      (click)=\"closeSearchPro()\"\n      >Close</a\n    >\n    <h3 style=\"text-align: center;\">Search Provider / Physician Assistant</h3>\n  </p-header>\n\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <div class=\"col-md-3\">\n        <label>Name</label>\n        <input\n          type=\"text\"\n          id=\"txtProvider\"\n          class=\"form-control textbox-search-onenterkey\"\n          data-enterkey-pressed=\"#btnSearchProForAppointment\"\n        />\n      </div>\n\n      <div class=\" form-group col-sm-3\">\n        <label>Practice</label>\n        <p-dropdown\n          id=\"pwsdropdown\"\n          #dd\n          [autoWidth]=\"true\"\n          [style]=\"{ width: '100%' }\"\n          [options]=\"practice\"\n          optionLabel=\"name\"\n          filter=\"true\"\n        >\n        </p-dropdown>\n      </div>\n\n      <div class=\"form-group col-md-3\">\n        <label>Location</label>\n        <p-dropdown\n          id=\"pwsdropdown\"\n          #dd\n          [autoWidth]=\"true\"\n          [style]=\"{ width: '100%' }\"\n          [options]=\"location\"\n          optionLabel=\"name\"\n          filter=\"true\"\n        >\n        </p-dropdown>\n      </div>\n\n      <div class=\" form-group col-md-3 dvProviderspe\">\n        <div id=\"dvProviderspe\">\n          <label>Specialty</label>\n          <p-dropdown\n            id=\"pwsdropdown\"\n            #dd\n            [autoWidth]=\"true\"\n            [style]=\"{ width: '100%' }\"\n            [options]=\"speciality\"\n            optionLabel=\"name\"\n            filter=\"true\"\n          >\n          </p-dropdown>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col-md-3\">\n        <label>ZIP</label>\n        <input\n          type=\"text\"\n          class=\"form-control ZipCodeChange\"\n          id=\"txtproviderZip\"\n          data-req-url=\"/Admin/GetCityStateFromZip\"\n          data-mask1=\"99999-9999\"\n          placeholder=\"xxxxx-xxxx\"\n          maxlength=\"10\"\n          data-cityfield=\"#txtproviderCity\"\n          data-statefield=\"#ddlproviderState\"\n        />\n      </div>\n\n      <div class=\"col-md-3\">\n        <label>City</label>\n        <input\n          type=\"text\"\n          class=\"form-control textbox-search-onenterkey\"\n          id=\"txtproviderCity\"\n          data-enterkey-pressed=\"#btnSearchProForAppointment\"\n        />\n      </div>\n\n      <div class=\"col-md-3\">\n        <label>State</label>\n        <p-dropdown\n          id=\"pwsdropdown\"\n          #dd\n          [autoWidth]=\"true\"\n          [style]=\"{ width: '100%' }\"\n          [options]=\"state\"\n          optionLabel=\"name\"\n          filter=\"true\"\n        >\n        </p-dropdown>\n      </div>\n\n      <div class=\"col-md-3\" style=\"margin-top: 20px\">\n        <a\n          href=\"javascript:void(0)\"\n          class=\"btn btn-primary btnSearchProForAppointment\"\n          id=\"btnSearchProForAppointment\"\n          (click)=\"onsearchProvider()\"\n          >Search</a\n        >\n        <a\n          href=\"javascript:void(0)\"\n          class=\"btn btn-primary hide btnSearchProForAddPatient\"\n          >Search</a\n        >\n      </div>\n    </div>\n    <br />\n    <br />\n    <br />\n\n    <div class=\"row\" *ngIf=\"searchClicked\">\n      <div class=\"col-lg-12\">\n        <div class=\"wrapper wrapper-content \">\n          <div id=\"dvSearchProviderResult\">\n            <div class=\"ibox-content m-b-sm border-bottom m-t-n-xl\">\n              <table class=\"table table-striped table-hover table-condensed\">\n                <thead>\n                  <tr style=\"width: 100%;\">\n                    <th style=\"max-width: 10%;\">Name</th>\n                    <th>Practice</th>\n                    <th>Location</th>\n                    <th>Address</th>\n                    <th>Specialty</th>\n                    <th>City</th>\n                    <th>State</th>\n\n                    <th style=\"max-width: 10%; text-align: center\"></th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngFor=\"let item of serprovider\">\n                    <td>{{ item.name }}</td>\n                    <td>{{ item.practice }}</td>\n                    <td>{{ item.location }}</td>\n                    <td>{{ item.address }}</td>\n                    <td>{{ item.speciality }}</td>\n                    <td>{{ item.city }}</td>\n                    <td>{{ item.state }}</td>\n                    <td>\n                      <a\n                        href=\"javascript:void(0)\"\n                        data-mem-id=\"1313\"\n                        data-practaxid=\"81-2024723\"\n                        data-member-name=\"aaaa Aggy\"\n                        class=\"selprovider ChangingClasses\"\n                        data-practiceid=\"81\"\n                        data-locationid=\"149\"\n                        data-locationname=\"54 DEAN\"\n                        data-practiceame=\"HEMA\"\n                        data-post-url=\"/Patient/InsEpisodeCareTeamMembersForNewTreatment\"\n                        data-checkmemberexistsurl=\"/Patient/CheckEpisodeMemberExistsinCareTeam\"\n                        data-update-url=\"/Patient/GetEpisodeCareTeamMembersForTreatment\"\n                        data-update-container=\"#ddlEpisodeProviders\"\n                        data-practicelocationid=\"149\"\n                        data-availableschedule=\"\"\n                        data-getbodyparturl=\"/Patient/GetEpisodeBodyPartsForCheck\"\n                        >Select</a\n                      >\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n\n              <div\n                class=\"custompagination pull-right pagEpisodeAPPSearchMembersList\"\n                style=\"margin-top:-17px\"\n                data-req-url=\"/Patient/SearchProviderForEpisodeAppointments\"\n                data-update-container=\"#dvSearchProviderResult\"\n              >\n                <span class=\"label pagerInfo\"\n                  >Showing <b>1-20</b> of <b>111</b></span\n                >\n                <ul>\n                  <li class=\"disabled\">\n                    <a data-val=\"0\" href=\"javascript:void(0)\">&lt;&lt;</a>\n                  </li>\n                  <li>\n                    <select class=\"pagerSelect input-small\"\n                      ><option selected=\"selected\" value=\"1\">1</option\n                      ><option value=\"2\">2</option\n                      ><option value=\"3\">3</option\n                      ><option value=\"4\">4</option\n                      ><option value=\"5\">5</option\n                      ><option value=\"6\">6</option></select\n                    >\n                  </li>\n                  <li>\n                    <a class=\"pagerItem\" data-val=\"2\" href=\"javascript:void(0)\"\n                      >&gt;&gt;</a\n                    >\n                  </li>\n                </ul>\n              </div>\n              <div\n                class=\"custompagination pull-right pagEpisodeAddPatientSearchMembersList hide\"\n                style=\"margin-top:-17px\"\n                data-get-url=\"/Patient/SearchProviderForAddpatientTagsInput\"\n                data-update-container=\"#dvSearchProviderResult\"\n              >\n                <span class=\"label pagerInfo\"\n                  >Showing <b>1-20</b> of <b>111</b></span\n                >\n                <ul>\n                  <li class=\"disabled\">\n                    <a data-val=\"0\" href=\"javascript:void(0)\">&lt;&lt;</a>\n                  </li>\n                  <li>\n                    <select class=\"pagerSelect input-small\"\n                      ><option selected=\"selected\" value=\"1\">1</option\n                      ><option value=\"2\">2</option\n                      ><option value=\"3\">3</option\n                      ><option value=\"4\">4</option\n                      ><option value=\"5\">5</option\n                      ><option value=\"6\">6</option></select\n                    >\n                  </li>\n                  <li>\n                    <a class=\"pagerItem\" data-val=\"2\" href=\"javascript:void(0)\"\n                      >&gt;&gt;</a\n                    >\n                  </li>\n                </ul>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</p-dialog>\n\n<p-dialog\n  id=\"editEpisode\"\n  [(visible)]=\"Newepisodedisplay\"\n  [modal]=\"true\"\n  [draggable]=\"false\"\n  [responsive]=\"true\"\n  [draggable]=\"false\"\n  [positionTop]=\"50\"\n  [closable]=\"false\"\n>\n  <p-header>\n    <a\n      href=\"javascript:void(0)\"\n      data-dismiss=\"modal\"\n      class=\"btn btn-small btn-danger pull-right\"\n      (click)=\"closeNewEpisode()\"\n      >Close</a\n    >\n    <h3 style=\"text-align: center;\">New Episode Treatment</h3>\n  </p-header>\n  <div class=\"modal-body\">\n    <div id=\"dvNewEpisodeTreatmentDetails\">\n      <div class=\"row appendAssessments\">\n        <div class=\"ibox-content m-b-sm border-bottom dvAssessmentdetails\">\n          <div class=\"row providerdbtreatmnt hide\" style=\"display: none;\">\n            <div class=\"col-md-12\">\n              <label class=\"checkbox-inline i-checks\">\n                <div class=\"icheckbox_square-green\" style=\"position: relative;\">\n                  <input\n                    type=\"checkbox\"\n                    id=\"chkpastappointment\"\n                    style=\"position: absolute; opacity: 0;\"\n                  /><ins\n                    class=\"iCheck-helper\"\n                    style=\"position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;\"\n                  ></ins>\n                </div>\n\n                <b\n                  >This is Past Appointment, I have the medical records already\n                  with me.</b\n                >\n              </label>\n            </div>\n          </div>\n          <br />\n          <div class=\"row\">\n            <div class=\"col-md-12 \" style=\"margin-bottom:10px;\">\n              <label style=\"color: red; text-align: left;\">\n                There are no appointments associated to this Episode. In order\n                to create a new treatment, please select an appointment type. An\n                appointment shall be scheduled for today for the selected\n                provider and a treatment will be created for the new\n                appointment.\n              </label>\n            </div>\n            <div class=\"col-md-12\">\n              <div class=\"col-md-4  hide  \">\n                <label>\n                  Date of Service <span style=\"color: red;\">*</span>\n                </label>\n\n                <select\n                  class=\"form-control chosen-select providerdbtreatmntdisable\"\n                  id=\"ddlDateOfService\"\n                  disabled=\"disabled\"\n                  style=\"display: none;\"\n                >\n                  <option value=\"\">Select</option>\n                </select>\n                <div\n                  class=\"chosen-container chosen-container-single chosen-disabled\"\n                  style=\"width: 100%\"\n                  title=\"\"\n                  id=\"ddlDateOfService_chosen\"\n                >\n                  <a class=\"chosen-single chosen-default\"\n                    ><span>Select an Option</span>\n                    <div><b></b></div\n                  ></a>\n                  <div class=\"chosen-drop\">\n                    <div class=\"chosen-search\">\n                      <input type=\"text\" autocomplete=\"off\" disabled=\"\" />\n                    </div>\n                    <ul class=\"chosen-results\"></ul>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-md-4 \">\n                <!-- style=\"display: \" -->\n                <label>\n                  Appointment Type <span style=\"color: red;\">*</span>\n                </label>\n                <p-dropdown\n                  id=\"pwsdropdown\"\n                  #dd\n                  [autoWidth]=\"true\"\n                  [style]=\"{ width: '100%' }\"\n                  [options]=\"appt_type\"\n                  optionLabel=\"name\"\n                  filter=\"true\"\n                >\n                </p-dropdown>\n              </div>\n\n              <div class=\"col-md-4\">\n                <label> Provider <span style=\"color: red;\">*</span> </label>\n                <p-dropdown\n                  id=\"pwsdropdown\"\n                  #dd\n                  [autoWidth]=\"true\"\n                  [style]=\"{ width: '100%' }\"\n                  [options]=\"provider\"\n                  optionLabel=\"name\"\n                  filter=\"true\"\n                >\n                </p-dropdown>\n              </div>\n            </div>\n\n            <div class=\"col-md-12 trTimeSlots\" style=\"margin-top: 10px;\">\n              <div class=\"col-md-4\">\n                <label>\n                  Appointment Date <span style=\"color: red;\">*</span>\n                </label>\n                <input\n                  type=\"text\"\n                  class=\"form-control\"\n                  placeholder=\" mm/dd/yyy\"\n                  #dp=\"bsDatepicker\"\n                  bsDatepicker\n                />\n              </div>\n\n              <div class=\"col-md-4\">\n                <label> Start Time <span style=\"color: red;\">*</span> </label>\n                <p-dropdown\n                  id=\"pwsdropdown\"\n                  #dd\n                  [autoWidth]=\"true\"\n                  [style]=\"{ width: '100%' }\"\n                  [options]=\"start_time\"\n                  optionLabel=\"time\"\n                  filter=\"true\"\n                >\n                </p-dropdown>\n              </div>\n\n              <div class=\"col-md-4\">\n                <label> End Time <span style=\"color: red;\">*</span> </label>\n                <p-dropdown\n                  id=\"pwsdropdown\"\n                  #dd\n                  [autoWidth]=\"true\"\n                  [style]=\"{ width: '100%' }\"\n                  [options]=\"end_time\"\n                  optionLabel=\"time\"\n                  filter=\"true\"\n                >\n                </p-dropdown>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n    <a\n      href=\"javascript:void(0)\"\n      data-dismiss=\"modal\"\n      class=\"btn btn btn-small btn-danger\"\n      >Cancel</a\n    >\n    <a\n      href=\"javascript:void(0)\"\n      class=\"btn btn-success btnprocessing\"\n      data-checkinitialevaluationisexistsurl=\"/Patient/CheckAppointmentTypeInitialEvaluationIsExists\"\n      data-update-container=\"#dvCreateEpisodeSummaryDetails\"\n      data-appointmentdisplay=\"\"\n      data-episode-id=\"16518\"\n      id=\"btnCreateNewTreatment\"\n      data-post-url=\"/Patient/CreateNewEpisodeTreatment\"\n      data-isfromprodb=\"true\"\n      >Create New Treatment</a\n    >\n    <a\n      href=\"javascript:void(0)\"\n      class=\"btn btn-success btnprocessing hide\"\n      data-checkinitialevaluationisexistsurl=\"/Patient/CheckAppointmentTypeInitialEvaluationIsExists\"\n      data-update-container=\"#dvCreateEpisodeSummaryDetails\"\n      data-episode-id=\"16518\"\n      id=\"btnsubmitpastappointment\"\n      data-insappointmentrequestpost-url=\"/Patient/CreateNewEpisodeTreatment\"\n      data-insupepisodedocurl=\"/Patient/InsEpisodeFolderDocumentFiles\"\n      data-updateappointmentstaus=\"/Patient/UpdateAppointmentStatus\"\n      >Submit</a\n    >\n  </div>\n</p-dialog>\n\n<p-dialog\n  id=\"caseMangmemo\"\n  [(visible)]=\"Casemangdisplay\"\n  [modal]=\"true\"\n  [draggable]=\"false\"\n  [responsive]=\"true\"\n  [draggable]=\"false\"\n  [positionTop]=\"50\"\n  [closable]=\"false\"\n>\n  <p-header>\n    <a\n      href=\"javascript:void(0)\"\n      data-dismiss=\"modal\"\n      class=\"btn btn-small btn-danger pull-right\"\n      (click)=\"closeCaseMang()\"\n      >Close</a\n    >\n    <h3 style=\"text-align: center;\">Add Case Management Memo</h3>\n  </p-header>\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <span>\n          <label>Comment <span style=\"color:red;\">*</span></label>\n          <textarea class=\"form-control\" id=\"txtCaseManagementMemo\"></textarea>\n        </span>\n      </div>\n    </div>\n  </div>\n  <a href=\"javascript:void(0)\" id=\"btnSaveCaseManagementMemo\" class=\"btn btn-success pull-right\" style=\"margin-left:10px\">Submit</a>\n</p-dialog>\n\n<p-dialog\n  id=\"addmop\"\n  [(visible)]=\"Addmopdisplay\"\n  [modal]=\"true\"\n  [draggable]=\"false\"\n  [responsive]=\"true\"\n  [draggable]=\"false\"\n  [positionTop]=\"50\"\n  [closable]=\"false\"\n>\n  <p-header>\n    <a\n      href=\"javascript:void(0)\"\n      data-dismiss=\"modal\"\n      class=\"btn btn-small btn-danger pull-right\"\n      (click)=\"closeAddmop()\"\n      >Close</a\n    >\n    <h3 style=\"text-align: center;\">Add / Edit MOP</h3>\n  </p-header>\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <div class=\"col-md-4\">\n        <label>MOP</label>\n        <p-dropdown\n          id=\"pwsdropdown\"\n          #dd\n          [autoWidth]=\"true\"\n          placeholder=\"select\"\n          [style]=\"{ width: '100%' }\"\n          [options]=\"mop\"\n          optionLabel=\"name\"\n          filter=\"true\"\n        >\n        </p-dropdown>\n      </div>\n    </div>\n    <br />\n  </div>\n  <div class=\"modal-footer\">\n    <a\n      href=\"javascript:void(0)\"\n      class=\"btn btn-primary pull-right btnsaveMop\"\n      id=\"btnsaveMop\"\n      data-appointmentid=\"34494\"\n      data-post-url=\"/Billing/InsUpdAppointmentMOP\"\n      >Save</a\n    >\n  </div>\n</p-dialog>\n\n<!-- app memo start -->\n\n<p-dialog\n  id=\"addmemo\"\n  [(visible)]=\"Memodisplay\"\n  [modal]=\"true\"\n  [responsive]=\"true\"\n  [style]=\"{ width: '1023px', minwidth: '500px' }\"\n  [positionTop]=\"10\"\n  [draggable]=\"false\"\n  [closable]=\"false\"\n>\n  <p-header>\n    <a\n      href=\"javascript:void(0)\"\n      data-dismiss=\"modal\"\n      class=\"btn btn-small btn-danger pull-right\"\n      (click)=\"closeMemo()\"\n      >Close</a\n    >\n    <h3 style=\"text-align: center;\">Appointment Memo</h3>\n  </p-header>\n\n  <div class=\"modal-body\">\n    <div class=\"row ibox-content\">\n      <div class=\"col-md-12\">\n        <div class=\"col-md-12\">\n          <label>Comments<span style=\"color: red\">*</span></label>\n          <textarea\n            ngModel\n            name=\"comments\"\n            style=\"background: #bfd8f1; width: 942px;\"\n            rows=\"5\"\n            cols=\"110\"\n            [(ngModel)]=\"appt_memo\"\n          ></textarea>\n        </div>\n      </div>\n      <br />\n      <div class=\"col-md-12\" style=\"margin-top: 15px\">\n        <div class=\"col-md-12\">\n          <div class=\"col-md-1\">\n            <span>\n              <input\n                type=\"checkbox\"\n                id=\"chkIsUnerversalcomment\"\n                class=\"form-control chkIsUnerversalcomment\"\n              />\n            </span>\n          </div>\n          <div class=\"col-md-2\" style=\"padding: 0px;\">\n            <label>Is Universal Comment ?</label>\n          </div>\n          <div class=\"col-md-2\">\n            <a\n              href=\"javascript:void(0)\"\n              data-get-container=\"#dvPopupTopNode2\"\n              class=\"btnMembersTagAppointmentMemo\"\n              (click)=\"memotag()\"\n              >Tag Members</a\n            >\n          </div>\n          <div class=\"col-md-6\" style=\"margin-left: -35px;\">\n            <label id=\"lblMemberTaggedAppointmentMemo\"></label>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-4\">\n          <button\n            style=\"color: white;margin-left: 793px; border-radius: 0px;width: 50%;background: gray; \"\n            class=\"btn btn-primary\"\n            (click)=\"onSaveMemo('')\"\n          >\n            <b>Save</b>\n          </button>\n        </div>\n      </div>\n    </div>\n    <br />\n    <br />\n\n    <div class=\"container\">\n      <table class=\"table table-striped table-condensed\">\n        <thead style=\"font-size: 9px; color: grey; font-weight: bold;\">\n          <tr>\n            <th>Appointment Memo</th>\n            <th>Who Added</th>\n            <th>When Added</th>\n          </tr>\n        </thead>\n        <tbody style=\"font-size: 10px; font-weight: bolder; color: #80808075;\">\n          <tr *ngFor=\"let item of apptmemo\">\n            <td>{{ item.appt_memo }}</td>\n            <td>{{ item.who_added }}</td>\n            <td>{{ item.when_added }}</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</p-dialog>\n\n<p-dialog\n  id=\"tagmember\"\n  [(visible)]=\"Tagdisplay\"\n  [modal]=\"true\"\n  [responsive]=\"true\"\n  [style]=\"{ width: '1023px', minwidth: '500px' }\"\n  [positionTop]=\"10\"\n  [draggable]=\"false\"\n  [closable]=\"false\"\n>\n  <p-header>\n    <a\n      href=\"javascript:void(0)\"\n      data-dismiss=\"modal\"\n      class=\"btn btn-small btn-danger pull-right\"\n      (click)=\"closeTagmem()\"\n      >Close</a\n    >\n    <h3 style=\"text-align: center;\">Tag Member</h3>\n  </p-header>\n\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <div class=\"col-md-4\">\n        <label>Patient</label>\n        <div>Sai Hong Yeung</div>\n      </div>\n      <div class=\"col-md-4\">\n        <label>Account Number</label>\n        <div>Y1607325</div>\n      </div>\n      <div class=\"col-md-4\">\n        <label>Case #</label>\n        <div>Y1607325_1</div>\n      </div>\n    </div>\n    <br />\n\n    <div class=\"row dvpt\">\n      <br />\n      <div class=\"row\">\n        <div class=\"col-md-10\">\n          <label>Search Tag To Member</label>\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            maxlength=\"100\"\n            id=\"txtReminderSearchString\"\n            placeholder=\"Enter First Name or Last Name\"\n          />\n        </div>\n        <div class=\"col-md-2 m-t-md\">\n          <a\n            href=\"javascript:void(0)\"\n            (click)=\"ontagmember()\"\n            class=\"btn btn-primary btn-sm\"\n            id=\"btnSearchMemberForReminderAlert\"\n            >Search Tag To</a\n          >\n        </div>\n      </div>\n      <br />\n      <br />\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div\n            class=\"divReminderMembersSelected hide\"\n            id=\"divReminderMembersSelected\"\n          >\n            <input\n              type=\"text\"\n              id=\"tags1580898905335\"\n              class=\"selectedReminderMembers\"\n              placeholder=\"Selected members\"\n              autocomplete=\"off\"\n              style=\"display: none;\"\n            />\n            <div\n              id=\"tags1580898905335_tagsinput\"\n              class=\"tagsinput \"\n              style=\"width: 85%; min-height: auto; height: auto;\"\n            >\n              <div id=\"tags1580898905335_addTag\"></div>\n              <div class=\"tags_clear\"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <br />\n      <br />\n      <div class=\"row\" style=\"margin-top: 10px;\">\n        <div class=\"col-md-12\">\n          <div id=\"dvSearchResult\"></div>\n        </div>\n      </div>\n    </div>\n\n    <div id=\"dvSearchResult\">\n      <div class=\"ibox-content m-b-sm border-bottom m-t-n-xl\">\n        <table\n          class=\"table table-striped table-hover table-condensed\"\n          id=\"style\"\n          *ngIf=\"searchtagmember\"\n        >\n          <thead>\n            <tr style=\"width: 100%;\">\n              <th style=\"max-width: 10%;\">Name</th>\n              <th>City</th>\n              <th>State</th>\n              <th>Practice</th>\n              <th>Location</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let item of membertag\">\n              <td>{{ item.name }}</td>\n              <td>{{ item.city }}</td>\n              <td>{{ item.state }}</td>\n              <td>{{ item.practice }}</td>\n              <td>{{ item.location }}</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n</p-dialog>\n\n<!-- app memo end -->\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboad/providerdashboard/providerdashboard1/providerdashboard1.component.html":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboad/providerdashboard/providerdashboard1/providerdashboard1.component.html ***!
  \*********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p-toast [style]=\"{marginTop: '80px'}\"></p-toast>\n\n<p-dialog id=\"editFIlter\" [(visible)]=\"saveEditFilter\" [modal]=\"true\" [draggable]=\"false\" [responsive]=\"true\"\n  [draggable]=\"false\"[positionTop]=\"50\" [closable]=\"false\" [blockScroll]=\"true\">\n  <p-header>\n    <a class=\"btn btn-small btn-danger pull-right\"(click)=\"closeSaveEditFilter()\">Close</a>\n    <h5>Favourite Filter</h5>\n  </p-header>\n  <form [formGroup]=\"favoritename\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n          <label>Filter Name\n            <span class=\"star\">*</span>\n          </label>\n          <input type=\"text\" formControlName=\"fname\" class=\"form-control\">\n        <label *ngIf=\"favoritename.get('fname').hasError('required') && !favoritename.get('fname').pristine\"\n              class=\"text\"><span class=\"star\">Filter Name is required</span></label>\n      </div>\n    </div>\n  </div>\n</form>\n  <p-footer>\n    <a (click)=\"onSavefilter()\" class=\"btn btn-success\"><i class=\"fa fa-pencil\"></i>&nbsp;&nbsp;Save Filter</a>\n  </p-footer>\n</p-dialog>\n\n<p-dialog id=\"displayColum\" [(visible)]=\"editDisplayColumns\" [modal]=\"true\" [draggable]=\"false\" [responsive]=\"true\"\n  [draggable]=\"false\"[positionTop]=\"50\" [closable]=\"false\" [blockScroll]=\"true\">\n  <p-header>\n    <div class=\"row\" >\n      <div class=\"col-lg-12\">\n        <a class=\"btn btn-small btn-danger pull-right\" (click)=\"closeDisplayColum()\">Close</a>\n        <h5>Provider Dashboard Display Fields</h5>\n        <h6>Drag, Drop &amp; Sort your desired filters</h6>\n      </div>\n    </div>\n  </p-header>\n  <ng-template #itemTemplate let-item=\"item\" let-index=\"index\"><span>{{item.value}}</span></ng-template>\n\n<div class=\"container\">\n    <div class=\"row\" >\n        <div class=\"col-lg-6\">\n          <div class=\"ibox \">\n            <div class=\"ibox-title\">\n              <h5>Available Display Fields</h5>\n            </div>\n            <div class=\"ibox-content\">\n              <ul  class=\"sortable-list connectList agile-list ui-sortable\" id=\"selectedlist\">\n                <bs-sortable\n                  class=\"info-element\"\n                  [(ngModel)]=\"itemDisplayColumnsStringsRight\"\n                  itemClass=\"sortable-item\"\n                  itemActiveClass=\"sortable-item-active\"\n                  placeholderItem=\"Drag here\"\n                  placeholderClass=\"placeholderStyle\"\n                  wrapperClass=\"sortable-wrapper\">\n                </bs-sortable>\n              </ul>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-lg-6\">\n          <div class=\"ibox \">\n            <div class=\"ibox-title\">\n              <h5>Selected Filters</h5>\n            </div>\n              <div class=\"ibox-content\">\n                <ul class=\"sortable-list connectList agile-list ui-sortable\" id=\"unselectedlist\">\n                  <bs-sortable\n                    class=\"info-element\"\n                    [(ngModel)]=\"itemDisplayColumnsStringsLeft\"\n                    [itemTemplate]=\"itemTemplate\"\n                    itemClass=\"sortable-item\"\n                    itemActiveClass=\"sortable-item-active\"\n                    placeholderItem=\"Drag here\"\n                    placeholderClass=\"placeholderStyle\"\n                    wrapperClass=\"sortable-wrapper\">\n                  </bs-sortable>\n                </ul>\n              </div>\n            </div>\n          </div>\n      </div>\n    </div>\n    <p-footer>\n    <a class=\"btn btn-success \" (click)=\"onSave()\">Save</a>\n  </p-footer>\n\n  </p-dialog>\n\n  <p-dialog id=\"filterFields\" [(visible)]=\"editFilterFields\" [modal]=\"true\" [draggable]=\"false\" [responsive]=\"true\"\n            [draggable]=\"false\"[positionTop]=\"50\" [closable]=\"false\" [blockScroll]=\"true\">\n      <p-header>\n        <div class=\"row\" >\n         <div class=\"col-lg-12\">\n          <a class=\"btn btn-small btn-danger pull-right\" (click)=\"closeEditFilterFields()\">Close</a>\n          <h5>Provider Dashboard Filter Fields</h5>\n          <h6>Drag, Drop &amp; Sort your desired filters</h6>\n         </div>\n        </div>\n      </p-header>\n      <ng-template #itemTemplate let-item=\"item\" let-index=\"index\"><span>{{item.value}}</span></ng-template>\n\n<div class=\"container\">\n  <div class=\"row\" >\n <div class=\"col-lg-6\">\n   <div class=\"ibox \">\n       <div class=\"ibox-title\">\n           <h5>Available Display Fields</h5>\n       </div>\n       <div class=\"ibox-content\">\n           <ul  class=\"sortable-list connectList agile-list ui-sortable\" id=\"selectedlist\">\n             <bs-sortable\n             class=\"info-element\"\n             [(ngModel)]=\"itemFilterFieldsStringsRight\"\n             itemClass=\"sortable-item\"\n             itemActiveClass=\"sortable-item-active\"\n             placeholderItem=\"Drag here\"\n             placeholderClass=\"placeholderStyle\"\n             wrapperClass=\"sortable-wrapper\"\n           ></bs-sortable>\n           </ul>\n       </div>\n   </div>\n</div>\n<div class=\"col-lg-6\">\n  <div class=\"ibox \">\n    <div class=\"ibox-title\">\n      <h5>Selected Filters</h5>\n    </div>\n      <div class=\"ibox-content\">\n          <ul class=\"sortable-list connectList agile-list ui-sortable\" id=\"unselectedlist\">\n\n            <bs-sortable\n            class=\"info-element\"\n            [(ngModel)]=\"itemFilterFieldsStringsLeft\"\n            [itemTemplate]=\"itemTemplate\"\n            fieldName=\"fieldName\"\n            itemClass=\"sortable-item\"\n            itemActiveClass=\"sortable-item-active\"\n            placeholderItem=\"Drag here\"\n            placeholderClass=\"placeholderStyle\"\n            wrapperClass=\"sortable-wrapper\"\n          ></bs-sortable>\n          </ul>\n      </div>\n  </div>\n</div>\n</div>\n</div>\n<p-footer>\n  <a class=\"btn btn-success\" (click)=\"onSave1()\" >Save</a>\n</p-footer>\n  </p-dialog>\n\n<div class=\"col-xs-8 pull-right\" style=\"padding: 20px;\">\n  <a class=\"btn btn-primary pull-right\" (click)=\"printPage()\">Print</a>\n  <a class=\"btn btn-primary pull-right\" (click)=\"Search()\">Search</a>\n  <a class=\"btn btn-primary pull-right\" (click)=\"editfilterfields()\"><em class=\"fa fa-pencil\"></em> Edit Filter Fields</a>\n  <a class=\"btn btn-primary pull-right\" (click)=\"editdisplaycolumns()\"><em class=\"fa fa-pencil\"></em> Edit Display Columns</a>\n  <a class=\"btn btn-primary pull-right\" (click)=\"saveeditfilter()\"><em class=\"fa fa-pencil\"></em> Save/Edit Filter</a>\n  <a class=\"btn btn-primary pull-right\" (click)=\"clear()\">Clear Filter Fields</a>\n</div>\n");

/***/ }),

/***/ "./src/app/models/extenaldocClass.ts":
/*!*******************************************!*\
  !*** ./src/app/models/extenaldocClass.ts ***!
  \*******************************************/
/*! exports provided: Checkstatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Checkstatus", function() { return Checkstatus; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var Checkstatus = /** @class */ (function () {
    function Checkstatus(id, name) {
        this.id = id;
        this.name = name;
    }
    return Checkstatus;
}());



/***/ }),

/***/ "./src/app/models/providerdashboard.ts":
/*!*********************************************!*\
  !*** ./src/app/models/providerdashboard.ts ***!
  \*********************************************/
/*! exports provided: Endtime, Speciality, State, Mop, ApptMemo, Favfilter, Starttime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Endtime", function() { return Endtime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Speciality", function() { return Speciality; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "State", function() { return State; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mop", function() { return Mop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApptMemo", function() { return ApptMemo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Favfilter", function() { return Favfilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Starttime", function() { return Starttime; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var Endtime = /** @class */ (function () {
    function Endtime(time) {
        this.time = time;
    }
    return Endtime;
}());

var Speciality = /** @class */ (function () {
    function Speciality(name) {
        this.name = name;
    }
    return Speciality;
}());

var State = /** @class */ (function () {
    function State(name) {
        this.name = name;
    }
    return State;
}());

var Mop = /** @class */ (function () {
    function Mop(name) {
        this.name = name;
    }
    return Mop;
}());

var ApptMemo = /** @class */ (function () {
    function ApptMemo(appt_memo, who_added, when_added) {
        this.appt_memo = appt_memo;
        this.who_added = who_added;
        this.when_added = when_added;
    }
    return ApptMemo;
}());

var Favfilter = /** @class */ (function () {
    function Favfilter(name) {
        this.name = name;
    }
    return Favfilter;
}());

var Starttime = /** @class */ (function () {
    function Starttime(time) {
        this.time = time;
    }
    return Starttime;
}());



/***/ }),

/***/ "./src/app/views/dashboad/ExternalDocUpload/ExternalDoc.module.ts":
/*!************************************************************************!*\
  !*** ./src/app/views/dashboad/ExternalDocUpload/ExternalDoc.module.ts ***!
  \************************************************************************/
/*! exports provided: ExternalDocUploadModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExternalDocUploadModule", function() { return ExternalDocUploadModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _externaldocupload_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./externaldocupload.component */ "./src/app/views/dashboad/ExternalDocUpload/externaldocupload.component.ts");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/primeng */ "./node_modules/primeng/primeng.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(primeng_primeng__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/toast */ "./node_modules/primeng/toast.js");
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_toast__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/table */ "./node_modules/primeng/table.js");
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primeng_table__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _ExternalDoc_routing_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ExternalDoc.routing.module */ "./src/app/views/dashboad/ExternalDocUpload/ExternalDoc.routing.module.ts");











var ExternalDocUploadModule = /** @class */ (function () {
    function ExternalDocUploadModule() {
    }
    ExternalDocUploadModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _externaldocupload_component__WEBPACK_IMPORTED_MODULE_5__["ExternalDocUploadComponent"],
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_4__["HttpModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_6__["DropdownModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _ExternalDoc_routing_module__WEBPACK_IMPORTED_MODULE_10__["ExternalDocUploadRoutingModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_6__["CheckboxModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_6__["DialogModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_6__["PaginatorModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                primeng_toast__WEBPACK_IMPORTED_MODULE_7__["ToastModule"],
                primeng_table__WEBPACK_IMPORTED_MODULE_8__["TableModule"],
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_9__["BsDatepickerModule"].forRoot(),
            ],
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"], primeng_primeng__WEBPACK_IMPORTED_MODULE_6__["MessageService"],]
        })
    ], ExternalDocUploadModule);
    return ExternalDocUploadModule;
}());



/***/ }),

/***/ "./src/app/views/dashboad/ExternalDocUpload/ExternalDoc.routing.module.ts":
/*!********************************************************************************!*\
  !*** ./src/app/views/dashboad/ExternalDocUpload/ExternalDoc.routing.module.ts ***!
  \********************************************************************************/
/*! exports provided: ExternalDocUploadRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExternalDocUploadRoutingModule", function() { return ExternalDocUploadRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _externaldocupload_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./externaldocupload.component */ "./src/app/views/dashboad/ExternalDocUpload/externaldocupload.component.ts");




var routes = [
    {
        path: '',
        component: _externaldocupload_component__WEBPACK_IMPORTED_MODULE_3__["ExternalDocUploadComponent"],
        data: {
            title: 'ExternalDocUpload'
        }
    }
];
var ExternalDocUploadRoutingModule = /** @class */ (function () {
    function ExternalDocUploadRoutingModule() {
    }
    ExternalDocUploadRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], ExternalDocUploadRoutingModule);
    return ExternalDocUploadRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/dashboad/ExternalDocUpload/externaldocupload.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/views/dashboad/ExternalDocUpload/externaldocupload.component.scss ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".form-control, .single-line {\n  background-color: #FFFFFF;\n  background-image: none;\n  color: inherit;\n  display: block;\n  padding: 6px 12px;\n  width: 100% !important;\n  font-size: 14px;\n  border-left: 1px solid #CCC !important;\n  border-top: 1px solid #CCC !important;\n  border-right: 1px solid #CCC !important;\n  border-bottom: 2px solid #36cc95 !important;\n  border-radius: 0px !important;\n}\n\n.btn.btn-primary {\n  margin-top: 22px;\n  color: #fff;\n}\n\n:host ::ng-deep .ui-table .ui-table-thead > tr > th {\n  padding: 0.571em 0.857em;\n  border: 1px solid #c8c8c8;\n  font-weight: 700;\n  color: white;\n  background-color: #337ab7;\n}\n\n:host ::ng-deep .ui-paginator {\n  background-color: #f4f4f4;\n  border: 0px solid #c8c8c8 !important;\n  padding: 0;\n}\n\n.image-upload-wrap {\n  margin-top: 20px;\n  border: 3px dashed #1FB264;\n  position: relative;\n}\n\n.file-upload-input {\n  position: absolute;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  height: 100%;\n  outline: none;\n  opacity: 0;\n  cursor: pointer;\n}\n\n.drag-text {\n  text-align: center;\n}\n\n:host ::ng-deep.drop {\n  min-width: 6.5em !important;\n}\n\n:host ::ng-deep #pwsdropdown .ui-dropdown {\n  border-bottom: 2px solid #36cc95 !important;\n  width: 100%;\n}\n\n:host ::ng-deep #addExtDocument .ui-dialog {\n  margin-right: 100px;\n}\n\n:host ::ng-deep .ui-dialog .ui-dialog-titlebar {\n  background-color: white;\n}\n\n@media screen and (min-width: 40em) {\n  :host ::ng-deep #addExtDocument .ui-dialog {\n    width: 85vw !important;\n    top: 40px !important;\n  }\n}\n\n.liTitle {\n  padding-top: 8px;\n  height: 40px;\n  background: #19aa8d !important;\n  width: 180px;\n  color: white;\n}\n\n.padTitle {\n  padding-left: 20px;\n  color: white;\n}\n\n.tdLines {\n  border: 0px !important;\n}\n\n.btn.btn-primary {\n  background-color: grey;\n}\n\n@media screen and (max-width: 70em) {\n  :host ::ng-deep .mv-text-container {\n    white-space: normal !important;\n    text-overflow: initial !important;\n    overflow: auto !important;\n  }\n\n  :host ::ng-deep.ui-table table {\n    width: 99%;\n  }\n\n  :host ::ng-deep .ui-table-responsive .ui-table-thead > tr > th,\n:host .ui-table-responsive .ui-table-tfoot > tr > td {\n    display: none !important;\n  }\n\n  :host ::ng-deep .ui-table-responsive .ui-table-tbody > tr > td {\n    text-align: left !important;\n    display: block !important;\n    border: 0 none !important;\n    width: 100% !important;\n    box-sizing: border-box !important;\n    float: left !important;\n    clear: left !important;\n  }\n\n  :host ::ng-deep .ui-table-responsive .ui-table-tbody > tr > td .ui-column-title {\n    padding: 0.4em !important;\n    min-width: 30% !important;\n    display: inline-block !important;\n    margin: -0.4em 1em -0.4em -0.4em !important;\n    font-weight: bold !important;\n  }\n}\n\n.tabledHeader {\n  border: 0px !important;\n  word-wrap: break-word;\n}\n\n::ng-deep #addExtDocument .ui-dialog .ui-dialog-content {\n  background-color: #ffffff;\n  color: #333333;\n  border: 0px solid #c8c8c8;\n  padding: 0.571em 1em;\n}\n\n@media (max-width: 1024px) and (min-width: 768px) {\n  .col-lg-2 {\n    -webkit-box-flex: 0;\n    flex: 0 0 33.666667%;\n    max-width: 32.666667%;\n  }\n}\n\n.text-center {\n  color: #337ab7;\n}\n\n.popupHeading {\n  text-align: center;\n}\n\n.drag-text {\n  font-size: 70px;\n  color: #36cb94;\n  margin-top: 15px;\n}\n\n.Drop-files {\n  color: black;\n}\n\n:host ::ng-deep .nav-tabs {\n  background-color: #969696 !important;\n}\n\n:host ::ng-deep .my-pagination {\n  margin-right: 50px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvZGFzaGJvYWQvRXh0ZXJuYWxEb2NVcGxvYWQvRDpcXFN1aml0IFNreUNsaWZmSVQgUHJvamVjdHNcXFByb2plY3QxMSBTaXJcXFlvdXJEcnNcXHRydW5rL3NyY1xcYXBwXFx2aWV3c1xcZGFzaGJvYWRcXEV4dGVybmFsRG9jVXBsb2FkXFxleHRlcm5hbGRvY3VwbG9hZC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvdmlld3MvZGFzaGJvYWQvRXh0ZXJuYWxEb2NVcGxvYWQvZXh0ZXJuYWxkb2N1cGxvYWQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0E7RUFDRSx5QkFBQTtFQUNBLHNCQUFBO0VBQ0EsY0FBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZUFBQTtFQUNBLHNDQUFBO0VBQ0EscUNBQUE7RUFDQSx1Q0FBQTtFQUNBLDJDQUFBO0VBQ0EsNkJBQUE7QUNORjs7QURRQTtFQUNFLGdCQUFBO0VBQ0EsV0FBQTtBQ0xGOztBRFFFO0VBQ0Usd0JBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0FDTEo7O0FEU0U7RUFDQSx5QkFBQTtFQUNDLG9DQUFBO0VBQ0QsVUFBQTtBQ05GOztBRFNBO0VBQ0UsZ0JBQUE7RUFDQSwwQkFBQTtFQUNBLGtCQUFBO0FDTkY7O0FEUUE7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsVUFBQTtFQUNBLGVBQUE7QUNMRjs7QURPQTtFQUNFLGtCQUFBO0FDSkY7O0FEU0U7RUFDRSwyQkFBQTtBQ05KOztBRFVDO0VBQ0csMkNBQUE7RUFDQSxXQUFBO0FDUEo7O0FEV0k7RUFDQSxtQkFBQTtBQ1JKOztBRFlJO0VBQ0EsdUJBQUE7QUNUSjs7QURXRTtFQUVJO0lBQ0Esc0JBQUE7SUFDQSxvQkFBQTtFQ1RKO0FBQ0Y7O0FEWUU7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSw4QkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FDVko7O0FEWUU7RUFDRSxrQkFBQTtFQUNBLFlBQUE7QUNUSjs7QURXRTtFQUNFLHNCQUFBO0FDUko7O0FEVUU7RUFDRSxzQkFBQTtBQ1BKOztBRFdBO0VBRUk7SUFDRCw4QkFBQTtJQUNBLGlDQUFBO0lBQ0EseUJBQUE7RUNURDs7RURhQTtJQUNBLFVBQUE7RUNWQTs7RURjQTs7SUFHQSx3QkFBQTtFQ1pBOztFRGVBO0lBRUQsMkJBQUE7SUFDQSx5QkFBQTtJQUNBLHlCQUFBO0lBQ0Esc0JBQUE7SUFHQSxpQ0FBQTtJQUNBLHNCQUFBO0lBQ0Esc0JBQUE7RUNiQzs7RURpQkE7SUFFRCx5QkFBQTtJQUNBLHlCQUFBO0lBQ0EsZ0NBQUE7SUFDQSwyQ0FBQTtJQUNBLDRCQUFBO0VDZkM7QUFDRjs7QURpQkE7RUFDRSxzQkFBQTtFQUNBLHFCQUFBO0FDZkY7O0FEa0JBO0VBQ0UseUJBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7RUFDQSxvQkFBQTtBQ2ZGOztBRGdDQTtFQUNBO0lBQ0ksbUJBQUE7SUFDQSxvQkFBQTtJQUNBLHFCQUFBO0VDN0JGO0FBQ0Y7O0FENkNBO0VBQ0UsY0FBQTtBQzNDRjs7QUQ2Q0E7RUFDRSxrQkFBQTtBQzFDRjs7QUQ0Q0E7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0FDekNGOztBRDJDQTtFQUNFLFlBQUE7QUN4Q0Y7O0FEMENBO0VBR0Usb0NBQUE7QUN6Q0Y7O0FEb0RFO0VBRUUsa0JBQUE7QUNsREoiLCJmaWxlIjoic3JjL2FwcC92aWV3cy9kYXNoYm9hZC9FeHRlcm5hbERvY1VwbG9hZC9leHRlcm5hbGRvY3VwbG9hZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vXG4vLyBsYWJlbCB7XG4vLyAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbi8vICAgbWF4LXdpZHRoOiAxMDAlO1xuLy8gICBtYXJnaW4tYm90dG9tOiA1cHg7XG4vLyB9XG5cbi5mb3JtLWNvbnRyb2wsIC5zaW5nbGUtbGluZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBkaXNwbGF5OiBibG9jaztcbiAgcGFkZGluZzogNnB4IDEycHg7XG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjQ0NDICFpbXBvcnRhbnQ7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjQ0NDICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNDQ0MgIWltcG9ydGFudDtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICMzNmNjOTUgIWltcG9ydGFudDtcbiAgYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XG59XG4uYnRuLmJ0bi1wcmltYXJ5IHsgLy8gc2VhcmNoIGFuZCBzYXZlIGJ1dHRvblxuICBtYXJnaW4tdG9wOiAyMnB4O1xuICBjb2xvcjogI2ZmZjtcbn1cbjpob3N0eyAvLyBwLXRhYmxlIGhlYWRlciBjb2xvclxuICA6Om5nLWRlZXAgLnVpLXRhYmxlIC51aS10YWJsZS10aGVhZCA+IHRyID4gdGgge1xuICAgIHBhZGRpbmc6IDAuNTcxZW0gMC44NTdlbTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjYzhjOGM4O1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzdhYjc7XG4gIH1cbn1cbjpob3N0eyAvLyBwYWdpbmF0aW9uIGJvcmRlclxuICA6Om5nLWRlZXAgIC51aS1wYWdpbmF0b3Ige1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjRmNGY0O1xuICAgYm9yZGVyOiAwcHggc29saWQgI2M4YzhjOCAhaW1wb3J0YW50O1xuICBwYWRkaW5nOiAwO1xufVxufVxuLmltYWdlLXVwbG9hZC13cmFwIHsgLy8gcG9wdXAgaW5wdXQgZmlsZSBib3hcbiAgbWFyZ2luLXRvcDogMjBweDtcbiAgYm9yZGVyOiAzcHggZGFzaGVkICMxRkIyNjQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5maWxlLXVwbG9hZC1pbnB1dCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdXRsaW5lOiBub25lO1xuICBvcGFjaXR5OiAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uZHJhZy10ZXh0IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG59XG5cbjpob3N0eyAvLyBhY3Rpb24gYnV0dG9uIGRyb3Bkb3duIHdpZHRoXG4gIDo6bmctZGVlcC5kcm9we1xuICAgIG1pbi13aWR0aDogNi41ZW0gIWltcG9ydGFudDtcbiAgfVxufVxuOmhvc3R7IC8vIGRyb3Bkb3duIGNvbG9yXG4gOjpuZy1kZWVwICAjcHdzZHJvcGRvd24gLnVpLWRyb3Bkb3duIHtcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzM2Y2M5NSAhaW1wb3J0YW50O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbiAgfVxuICA6aG9zdHsgLy8gcG9wdXAgd2lkdGhcbiAgICA6Om5nLWRlZXAgI2FkZEV4dERvY3VtZW50IC51aS1kaWFsb2d7XG4gICAgbWFyZ2luLXJpZ2h0OiAxMDBweDtcbn1cbiAgfVxuICA6aG9zdHtcbiAgICA6Om5nLWRlZXAgLnVpLWRpYWxvZyAudWktZGlhbG9nLXRpdGxlYmFyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn19XG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pIHsgLy9wb3B1cCBhZGp1c3R0ZWQgd2hlbiBpdCBpcyByZXNwb25zaXZlXG4gICAgOmhvc3R7XG4gICAgICA6Om5nLWRlZXAgI2FkZEV4dERvY3VtZW50IC51aS1kaWFsb2cge1xuICAgICAgd2lkdGg6IDg1dncgIWltcG9ydGFudDtcbiAgICAgIHRvcDogNDBweCAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxuICB9XG4gIC5saVRpdGxleyAvLyBuYXZiYXIgdGl0bGUgY29sb3JcbiAgICBwYWRkaW5nLXRvcDogOHB4O1xuICAgIGhlaWdodDogNDBweDtcbiAgICBiYWNrZ3JvdW5kOiAjMTlhYThkICFpbXBvcnRhbnQ7XG4gICAgd2lkdGg6IDE4MHB4O1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgfVxuICAucGFkVGl0bGV7XG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgfVxuICAudGRMaW5lc3tcbiAgICBib3JkZXI6IDBweCAhaW1wb3J0YW50O1xuICB9XG4gIC5idG4uYnRuLXByaW1hcnkge1xuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG59XG5cbi8vIHByaW1lbmcgdGFibGUgcmVzcG9uc2l2ZVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzBlbSkge1xuICA6aG9zdHtcbiAgICA6Om5nLWRlZXAgLm12LXRleHQtY29udGFpbmVye1xuICAgd2hpdGUtc3BhY2U6IG5vcm1hbCAhaW1wb3J0YW50O1xuICAgdGV4dC1vdmVyZmxvdzogaW5pdGlhbCAhaW1wb3J0YW50O1xuICAgb3ZlcmZsb3c6IGF1dG8gIWltcG9ydGFudDtcbiB9XG59XG46aG9zdHtcbiAgOjpuZy1kZWVwLnVpLXRhYmxlIHRhYmxlIHtcbiAgd2lkdGg6IDk5JTtcbn1cbn1cbjpob3N0e1xuICA6Om5nLWRlZXBcbi51aS10YWJsZS1yZXNwb25zaXZlIC51aS10YWJsZS10aGVhZCA+IHRyID4gdGgsXG4udWktdGFibGUtcmVzcG9uc2l2ZSAudWktdGFibGUtdGZvb3QgPiB0ciA+IHRkIHtcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xufVxufTpob3N0e1xuICA6Om5nLWRlZXBcbi51aS10YWJsZS1yZXNwb25zaXZlIC51aS10YWJsZS10Ym9keSA+IHRyID4gdGQge1xuIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDtcbiBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xuIGJvcmRlcjogMCBub25lICFpbXBvcnRhbnQ7XG4gd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbi13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveCAhaW1wb3J0YW50O1xuLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94ICFpbXBvcnRhbnQ7XG4gYm94LXNpemluZzogYm9yZGVyLWJveCAhaW1wb3J0YW50O1xuIGZsb2F0OiBsZWZ0ICFpbXBvcnRhbnQ7XG4gY2xlYXI6IGxlZnQgIWltcG9ydGFudDtcbn1cbn1cbjpob3N0e1xuICA6Om5nLWRlZXBcbi51aS10YWJsZS1yZXNwb25zaXZlIC51aS10YWJsZS10Ym9keSA+IHRyID4gdGQgLnVpLWNvbHVtbi10aXRsZSB7XG4gcGFkZGluZzogLjRlbSAhaW1wb3J0YW50O1xuIG1pbi13aWR0aDogMzAlICFpbXBvcnRhbnQ7XG4gZGlzcGxheTogaW5saW5lLWJsb2NrICFpbXBvcnRhbnQ7XG4gbWFyZ2luOiAtLjRlbSAxZW0gLS40ZW0gLS40ZW0gIWltcG9ydGFudDtcbiBmb250LXdlaWdodDogYm9sZCAhaW1wb3J0YW50O1xufX19XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4udGFibGVkSGVhZGVye1xuICBib3JkZXI6IDBweCAhaW1wb3J0YW50O1xuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XG59XG5cbjo6bmctZGVlcCAjYWRkRXh0RG9jdW1lbnQgLnVpLWRpYWxvZyAudWktZGlhbG9nLWNvbnRlbnQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBjb2xvcjogIzMzMzMzMztcbiAgYm9yZGVyOiAwcHggc29saWQgI2M4YzhjODtcbiAgcGFkZGluZzogMC41NzFlbSAxZW07XG59XG5cbi8vICAgICBAbWVkaWEgKG1heC13aWR0aDogMTQ0MHB4KSBhbmQgKG1pbi13aWR0aDogMTAyM3B4KXtcbi8vICAgICAuY29sLWxnLTIge1xuLy8gICAgICAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xuLy8gICAgICAgICBmbGV4OiAwIDAgMzMuNjY2NjY3JTtcbi8vICAgICAgICAgbWF4LXdpZHRoOiAxNi42NjY2NjclO1xuLy8gICAgIH1cbi8vICAgfVxuLy8gICBAbWVkaWEgKG1pbi13aWR0aDogMTQ0MHB4KXtcbi8vICAgLmNvbC1sZy0yIHtcbi8vICAgICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XG4vLyAgICAgICBmbGV4OiAwIDAgMzMuNjY2NjY3JTtcbi8vICAgICAgIG1heC13aWR0aDogMTYuNjY2NjY3JTtcbi8vICAgfVxuLy8gfVxuQG1lZGlhIChtYXgtd2lkdGg6IDEwMjRweCkgYW5kIChtaW4td2lkdGg6IDc2OHB4KXtcbi5jb2wtbGctMiB7XG4gICAgLXdlYmtpdC1ib3gtZmxleDogMDtcbiAgICBmbGV4OiAwIDAgMzMuNjY2NjY3JTtcbiAgICBtYXgtd2lkdGg6IDMyLjY2NjY2NyU7XG59XG59XG4vLyBAbWVkaWEgKG1pbi13aWR0aDogOTkycHgpIGFuZCAobWF4LXdpZHRoOiAxMDI0cHgpIHtcbi8vICAgLmNvbC1sZy0yIHtcbi8vICAgLXdlYmtpdC1ib3gtZmxleDogMDtcbi8vICAgZmxleDogMCAwIDMzLjY2NjY2NyU7XG4vLyAgIG1heC13aWR0aDogMzIuNjY2NjY3JTtcbi8vICAgfVxuLy8gICB9XG4vLyAgIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCl7XG4vLyAgICAgLmNvbC1sZy0yLCAuY29sLW1kLTIge1xuLy8gICAgICAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xuLy8gICAgICAgICBmbGV4OiAwIDAgMzMuNjY2NjY3JTtcbi8vICAgICAgICAgbWF4LXdpZHRoOiAyOC42NjY2NjclO1xuLy8gICAgIH1cbi8vICAgICB9XG4udGV4dC1jZW50ZXJ7XG4gIGNvbG9yOiAjMzM3YWI3O1xufVxuLnBvcHVwSGVhZGluZ3tcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLmRyYWctdGV4dHtcbiAgZm9udC1zaXplOiA3MHB4O1xuICBjb2xvcjogIzM2Y2I5NDtcbiAgbWFyZ2luLXRvcDogMTVweDtcbn1cbi5Ecm9wLWZpbGVze1xuICBjb2xvcjogYmxhY2s7XG59XG46aG9zdFxuOjpuZy1kZWVwXG4ubmF2LXRhYnN7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5Njk2OTYgIWltcG9ydGFudDtcbiAgLy8gIGhlaWdodDogNDBweCAhaW1wb3J0YW50O1xufVxuXG4gLy8gQG1lZGlhIChtaW4td2lkdGg6IDEwMjNweCkgYW5kIChtYXgtd2lkdGg6IDE0NDBweCl7XG4gIC8vICAgLmNvbC1sZy0yICB7XG4gIC8vICAgICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XG4gIC8vICAgICAgIGZsZXg6IDAgMCAzMy42NjY2NjclO1xuICAvLyAgICAgICBtYXgtd2lkdGg6IDMyLjY2NjY2NyU7XG4gIC8vICAgfVxuICAvLyAgIH1cbiAgOmhvc3RcbiAgOjpuZy1kZWVwIC5teS1wYWdpbmF0aW9ue1xuICAgIG1hcmdpbi1yaWdodDogNTBweDtcbiAgfVxuIiwiLmZvcm0tY29udHJvbCwgLnNpbmdsZS1saW5lIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcbiAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiA2cHggMTJweDtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNDQ0MgIWltcG9ydGFudDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNDQ0MgIWltcG9ydGFudDtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI0NDQyAhaW1wb3J0YW50O1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzM2Y2M5NSAhaW1wb3J0YW50O1xuICBib3JkZXItcmFkaXVzOiAwcHggIWltcG9ydGFudDtcbn1cblxuLmJ0bi5idG4tcHJpbWFyeSB7XG4gIG1hcmdpbi10b3A6IDIycHg7XG4gIGNvbG9yOiAjZmZmO1xufVxuXG46aG9zdCA6Om5nLWRlZXAgLnVpLXRhYmxlIC51aS10YWJsZS10aGVhZCA+IHRyID4gdGgge1xuICBwYWRkaW5nOiAwLjU3MWVtIDAuODU3ZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjOGM4Yzg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMzN2FiNztcbn1cblxuOmhvc3QgOjpuZy1kZWVwIC51aS1wYWdpbmF0b3Ige1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjRmNGY0O1xuICBib3JkZXI6IDBweCBzb2xpZCAjYzhjOGM4ICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5pbWFnZS11cGxvYWQtd3JhcCB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG4gIGJvcmRlcjogM3B4IGRhc2hlZCAjMUZCMjY0O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5maWxlLXVwbG9hZC1pbnB1dCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdXRsaW5lOiBub25lO1xuICBvcGFjaXR5OiAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5kcmFnLXRleHQge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbjpob3N0IDo6bmctZGVlcC5kcm9wIHtcbiAgbWluLXdpZHRoOiA2LjVlbSAhaW1wb3J0YW50O1xufVxuXG46aG9zdCA6Om5nLWRlZXAgI3B3c2Ryb3Bkb3duIC51aS1kcm9wZG93biB7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMzZjYzk1ICFpbXBvcnRhbnQ7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG46aG9zdCA6Om5nLWRlZXAgI2FkZEV4dERvY3VtZW50IC51aS1kaWFsb2cge1xuICBtYXJnaW4tcmlnaHQ6IDEwMHB4O1xufVxuXG46aG9zdCA6Om5nLWRlZXAgLnVpLWRpYWxvZyAudWktZGlhbG9nLXRpdGxlYmFyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pIHtcbiAgOmhvc3QgOjpuZy1kZWVwICNhZGRFeHREb2N1bWVudCAudWktZGlhbG9nIHtcbiAgICB3aWR0aDogODV2dyAhaW1wb3J0YW50O1xuICAgIHRvcDogNDBweCAhaW1wb3J0YW50O1xuICB9XG59XG4ubGlUaXRsZSB7XG4gIHBhZGRpbmctdG9wOiA4cHg7XG4gIGhlaWdodDogNDBweDtcbiAgYmFja2dyb3VuZDogIzE5YWE4ZCAhaW1wb3J0YW50O1xuICB3aWR0aDogMTgwcHg7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLnBhZFRpdGxlIHtcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi50ZExpbmVzIHtcbiAgYm9yZGVyOiAwcHggIWltcG9ydGFudDtcbn1cblxuLmJ0bi5idG4tcHJpbWFyeSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDcwZW0pIHtcbiAgOmhvc3QgOjpuZy1kZWVwIC5tdi10ZXh0LWNvbnRhaW5lciB7XG4gICAgd2hpdGUtc3BhY2U6IG5vcm1hbCAhaW1wb3J0YW50O1xuICAgIHRleHQtb3ZlcmZsb3c6IGluaXRpYWwgIWltcG9ydGFudDtcbiAgICBvdmVyZmxvdzogYXV0byAhaW1wb3J0YW50O1xuICB9XG5cbiAgOmhvc3QgOjpuZy1kZWVwLnVpLXRhYmxlIHRhYmxlIHtcbiAgICB3aWR0aDogOTklO1xuICB9XG5cbiAgOmhvc3QgOjpuZy1kZWVwIC51aS10YWJsZS1yZXNwb25zaXZlIC51aS10YWJsZS10aGVhZCA+IHRyID4gdGgsXG46aG9zdCAudWktdGFibGUtcmVzcG9uc2l2ZSAudWktdGFibGUtdGZvb3QgPiB0ciA+IHRkIHtcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gIH1cblxuICA6aG9zdCA6Om5nLWRlZXAgLnVpLXRhYmxlLXJlc3BvbnNpdmUgLnVpLXRhYmxlLXRib2R5ID4gdHIgPiB0ZCB7XG4gICAgdGV4dC1hbGlnbjogbGVmdCAhaW1wb3J0YW50O1xuICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyOiAwIG5vbmUgIWltcG9ydGFudDtcbiAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveCAhaW1wb3J0YW50O1xuICAgIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveCAhaW1wb3J0YW50O1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3ggIWltcG9ydGFudDtcbiAgICBmbG9hdDogbGVmdCAhaW1wb3J0YW50O1xuICAgIGNsZWFyOiBsZWZ0ICFpbXBvcnRhbnQ7XG4gIH1cblxuICA6aG9zdCA6Om5nLWRlZXAgLnVpLXRhYmxlLXJlc3BvbnNpdmUgLnVpLXRhYmxlLXRib2R5ID4gdHIgPiB0ZCAudWktY29sdW1uLXRpdGxlIHtcbiAgICBwYWRkaW5nOiAwLjRlbSAhaW1wb3J0YW50O1xuICAgIG1pbi13aWR0aDogMzAlICFpbXBvcnRhbnQ7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrICFpbXBvcnRhbnQ7XG4gICAgbWFyZ2luOiAtMC40ZW0gMWVtIC0wLjRlbSAtMC40ZW0gIWltcG9ydGFudDtcbiAgICBmb250LXdlaWdodDogYm9sZCAhaW1wb3J0YW50O1xuICB9XG59XG4udGFibGVkSGVhZGVyIHtcbiAgYm9yZGVyOiAwcHggIWltcG9ydGFudDtcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xufVxuXG46Om5nLWRlZXAgI2FkZEV4dERvY3VtZW50IC51aS1kaWFsb2cgLnVpLWRpYWxvZy1jb250ZW50IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMzMzMzM7XG4gIGJvcmRlcjogMHB4IHNvbGlkICNjOGM4Yzg7XG4gIHBhZGRpbmc6IDAuNTcxZW0gMWVtO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogMTAyNHB4KSBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgLmNvbC1sZy0yIHtcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xuICAgIGZsZXg6IDAgMCAzMy42NjY2NjclO1xuICAgIG1heC13aWR0aDogMzIuNjY2NjY3JTtcbiAgfVxufVxuLnRleHQtY2VudGVyIHtcbiAgY29sb3I6ICMzMzdhYjc7XG59XG5cbi5wb3B1cEhlYWRpbmcge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5kcmFnLXRleHQge1xuICBmb250LXNpemU6IDcwcHg7XG4gIGNvbG9yOiAjMzZjYjk0O1xuICBtYXJnaW4tdG9wOiAxNXB4O1xufVxuXG4uRHJvcC1maWxlcyB7XG4gIGNvbG9yOiBibGFjaztcbn1cblxuOmhvc3QgOjpuZy1kZWVwIC5uYXYtdGFicyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5Njk2OTYgIWltcG9ydGFudDtcbn1cblxuOmhvc3QgOjpuZy1kZWVwIC5teS1wYWdpbmF0aW9uIHtcbiAgbWFyZ2luLXJpZ2h0OiA1MHB4O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/views/dashboad/ExternalDocUpload/externaldocupload.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/views/dashboad/ExternalDocUpload/externaldocupload.component.ts ***!
  \*********************************************************************************/
/*! exports provided: ExternalDocUploadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExternalDocUploadComponent", function() { return ExternalDocUploadComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dashboad_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dashboad.service */ "./src/app/views/dashboad/dashboad.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _models_extenaldocClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../models/extenaldocClass */ "./src/app/models/extenaldocClass.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_master_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/master.service */ "./src/app/services/master.service.ts");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);










var ExternalDocUploadComponent = /** @class */ (function () {
    function ExternalDocUploadComponent(_data, _router, fb, messageService, masterService, datePipe) {
        this._data = _data;
        this._router = _router;
        this.fb = fb;
        this.messageService = messageService;
        this.masterService = masterService;
        this.datePipe = datePipe;
        this.documentDisplay = false;
        this.checkstatus = [
            new _models_extenaldocClass__WEBPACK_IMPORTED_MODULE_4__["Checkstatus"](1, 'In process'),
            new _models_extenaldocClass__WEBPACK_IMPORTED_MODULE_4__["Checkstatus"](2, 'Completed')
        ];
        this.form = this.fb.group({
            docDetails: this.fb.array([]),
        });
        this.docUpload = this.form.controls.docDetails;
        this.docUpload.push(this.fb.group({
            practice: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            location: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            provider: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            docDesc: '',
            docType: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required),
            addAttachment: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required),
            firstName: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            lastName: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            patientDOB: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            emgAddon: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null)
        }));
    }
    ExternalDocUploadComponent.prototype.ngOnInit = function () {
        this.getTableJson();
        this.getOriginatedPractices();
        this.getOriginatedLocations();
        this.getTreatingProviders();
        this.getDocumentType();
    };
    ExternalDocUploadComponent.prototype.onUpload = function () {
        this.documentDisplay = true;
    };
    ExternalDocUploadComponent.prototype.getOriginatedPractices = function () {
        var _this = this;
        this._data.getOriginPractices().subscribe(function (data) {
            _this.practiceData = data;
        });
    };
    ExternalDocUploadComponent.prototype.getOriginatedLocations = function () {
        var _this = this;
        this._data.getOriginLocations().subscribe(function (data) {
            _this.locationData = data;
        });
    };
    ExternalDocUploadComponent.prototype.getTreatingProviders = function () {
        var _this = this;
        this._data.getTreatProviders().subscribe(function (data) {
            _this.providerData = data;
        });
    };
    ExternalDocUploadComponent.prototype.getDocumentType = function () {
        var _this = this;
        this._data.getDocuments().subscribe(function (data) {
            _this.documentData = data;
        });
    };
    ExternalDocUploadComponent.prototype.getTableJson = function () {
        var _this = this;
        this._data.getDocument().subscribe(function (data) {
            _this.ListOfData = data;
            var listData = _this.ListOfData;
            if (_this.SelectPractice.name != null) {
                _this.ListOfData = [];
                var filterData = lodash__WEBPACK_IMPORTED_MODULE_9__["filter"](listData, function (v) {
                    if (v.originatedpractise === _this.SelectPractice.name) {
                        _this.ListOfData.push(v);
                    }
                });
            }
        });
    };
    ExternalDocUploadComponent.prototype.origisePractice = function (SelectedPractice) {
        this.SelectPractice = SelectedPractice.value;
    };
    ExternalDocUploadComponent.prototype.searchDocuments = function () {
        this.getTableJson();
    };
    ExternalDocUploadComponent.prototype.changestatus = function (emp_data) {
        if (emp_data.status.name !== 'In process') {
            emp_data.status = emp_data.status.name;
            var bindData = 'actionId_' + emp_data.id;
            var formElement = document.getElementById(bindData);
            formElement.style.display = 'none';
        }
        else {
            emp_data.status = emp_data.status.name;
        }
        {
            this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Status Updated Sucessfully' });
        }
        1000;
    };
    ExternalDocUploadComponent.prototype.onSelectFile = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function (event) {
                _this.imagePath = event.target.result;
            };
        }
    };
    ExternalDocUploadComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this.form.value.docDetails[0].addAttachment = this.imagePath;
        if (this.form.value.docDetails[0].docType === 'Select' || this.form.value.docDetails[0].docType == null) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error Message',
                detail: 'Please select Document type'
            });
        }
        else if (this.form.value.docDetails[0].addAttachment === '' || this.form.value.docDetails[0].addAttachment == null) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error Message',
                detail: 'Please Add the Attachment'
            });
        }
        else {
            var incrementId = this.ListOfData.length;
            var req = {
                id: incrementId + 1,
                originatedpractise: this.form.value.docDetails[0].practice.name,
                originatedlocation: this.form.value.docDetails[0].location.Name,
                treatingprovider: this.form.value.docDetails[0].provider.name,
                patientname: this.form.value.docDetails[0].firstName,
                PatientLastName: this.form.value.docDetails[0].lastName,
                patientdob: this.datePipe.transform(this.form.value.docDetails[0].patientDOB, 'MM-dd-yyyy'),
                isemergencyaddon: 'Yes',
                externaldocumenttype: this.form.value.docDetails[0].docType.name,
                documentdescription: this.form.value.docDetails[0].docDesc,
                status: 'Pending',
                createdby: 'Dr K',
                createddate: '01/01/2020',
                mode: 'Mobile',
                addnewattachment: this.form.value.docDetails[0].addAttachment
            };
            localStorage.setItem(this.form.value.docDetails[0].addAttachment, 'addnewattachment');
            this.myItem = localStorage.getItem(this.form.value.docDetails[0].addAttachment);
            this.ListOfData.push(req);
            setTimeout(function () {
                _this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Added Sucessfully' });
            }, 1000);
            this.documentDisplay = false;
            this.form.reset();
            $('#test').val('');
        }
    };
    ExternalDocUploadComponent.prototype.closeDocumentpop = function () {
        this.documentDisplay = false;
    };
    ExternalDocUploadComponent.ctorParameters = function () { return [
        { type: _dashboad_service__WEBPACK_IMPORTED_MODULE_2__["DashboadService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"] },
        { type: primeng_api__WEBPACK_IMPORTED_MODULE_7__["MessageService"] },
        { type: _services_master_service__WEBPACK_IMPORTED_MODULE_6__["MasterService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_8__["DatePipe"] }
    ]; };
    ExternalDocUploadComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-externaldocupload',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./externaldocupload.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboad/ExternalDocUpload/externaldocupload.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./externaldocupload.component.scss */ "./src/app/views/dashboad/ExternalDocUpload/externaldocupload.component.scss")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_dashboad_service__WEBPACK_IMPORTED_MODULE_2__["DashboadService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"],
            primeng_api__WEBPACK_IMPORTED_MODULE_7__["MessageService"],
            _services_master_service__WEBPACK_IMPORTED_MODULE_6__["MasterService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_8__["DatePipe"]])
    ], ExternalDocUploadComponent);
    return ExternalDocUploadComponent;
}());



/***/ }),

/***/ "./src/app/views/dashboad/dashboad.service.ts":
/*!****************************************************!*\
  !*** ./src/app/views/dashboad/dashboad.service.ts ***!
  \****************************************************/
/*! exports provided: DashboadService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboadService", function() { return DashboadService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../app.constant */ "./src/app/app.constant.ts");




var DashboadService = /** @class */ (function () {
    function DashboadService(http) {
        this.http = http;
        this.api_url = _app_constant__WEBPACK_IMPORTED_MODULE_3__["AppConstant"].ENDPOINT_FOR_JSON;
        this.appendpoint = this.api_url;
        this.allProdata = this.appendpoint + _app_constant__WEBPACK_IMPORTED_MODULE_3__["AppConstant"].API_CONFIG.API_URL.PROVIDERDASHBOARD.GETALLPROVIDERS;
    }
    DashboadService.prototype.getDocument = function () {
        return this.http.get('assets/fileupload.json');
    };
    DashboadService.prototype.getOriginPractices = function () {
        return this.http.get('assets/JsonFiles/userModelJson/practices.json');
    };
    DashboadService.prototype.getOriginLocations = function () {
        return this.http.get('assets/JsonFiles/userModelJson/locations.json');
    };
    DashboadService.prototype.getTreatProviders = function () {
        return this.http.get('assets/JsonFiles/TreatingProvider.json');
    };
    DashboadService.prototype.getDocuments = function () {
        return this.http.get('assets/JsonFiles/DocumentType.json');
    };
    // Provider Dashbord Start
    DashboadService.prototype.getyourdrs = function () {
        return this.http.get(this.allProdata);
    };
    // Provider Dashbord End
    DashboadService.prototype.getserprovider = function () {
        return this.http.get('assets/searchprovider.json');
    };
    DashboadService.prototype.getapptmemo = function () {
        return this.http.get('assets/apptmemo.json');
    };
    DashboadService.prototype.gettagmem = function () {
        return this.http.get('assets/tagmember.json');
    };
    DashboadService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    DashboadService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], DashboadService);
    return DashboadService;
}());



/***/ }),

/***/ "./src/app/views/dashboad/dashboard.module.ts":
/*!****************************************************!*\
  !*** ./src/app/views/dashboad/dashboard.module.ts ***!
  \****************************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _dashboard_routing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard.routing */ "./src/app/views/dashboad/dashboard.routing.ts");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/primeng */ "./node_modules/primeng/primeng.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(primeng_primeng__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/toolbar */ "./node_modules/primeng/toolbar.js");
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(primeng_toolbar__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/checkbox */ "./node_modules/primeng/checkbox.js");
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(primeng_checkbox__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/inputtext */ "./node_modules/primeng/inputtext.js");
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_inputtext__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/button */ "./node_modules/primeng/button.js");
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primeng_button__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/dialog */ "./node_modules/primeng/dialog.js");
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(primeng_dialog__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var primeng_fileupload__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/fileupload */ "./node_modules/primeng/fileupload.js");
/* harmony import */ var primeng_fileupload__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(primeng_fileupload__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/paginator */ "./node_modules/primeng/paginator.js");
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(primeng_paginator__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/toast */ "./node_modules/primeng/toast.js");
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(primeng_toast__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/table */ "./node_modules/primeng/table.js");
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(primeng_table__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap_sortable__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-bootstrap/sortable */ "./node_modules/ngx-bootstrap/sortable/fesm5/ngx-bootstrap-sortable.js");
/* harmony import */ var _ExternalDocUpload_ExternalDoc_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ExternalDocUpload/ExternalDoc.module */ "./src/app/views/dashboad/ExternalDocUpload/ExternalDoc.module.ts");
/* harmony import */ var _providerdashboard_ProviderDash_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./providerdashboard/ProviderDash.module */ "./src/app/views/dashboad/providerdashboard/ProviderDash.module.ts");




















var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _dashboard_routing__WEBPACK_IMPORTED_MODULE_3__["DashboardRoutingModule"],
                _ExternalDocUpload_ExternalDoc_module__WEBPACK_IMPORTED_MODULE_17__["ExternalDocUploadModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_4__["DropdownModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_15__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_15__["ReactiveFormsModule"],
                primeng_toolbar__WEBPACK_IMPORTED_MODULE_5__["ToolbarModule"],
                primeng_checkbox__WEBPACK_IMPORTED_MODULE_6__["CheckboxModule"],
                primeng_inputtext__WEBPACK_IMPORTED_MODULE_7__["InputTextModule"],
                primeng_button__WEBPACK_IMPORTED_MODULE_8__["ButtonModule"],
                primeng_dialog__WEBPACK_IMPORTED_MODULE_9__["DialogModule"],
                primeng_paginator__WEBPACK_IMPORTED_MODULE_11__["PaginatorModule"],
                primeng_fileupload__WEBPACK_IMPORTED_MODULE_10__["FileUploadModule"],
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_14__["PaginationModule"].forRoot(),
                primeng_primeng__WEBPACK_IMPORTED_MODULE_4__["CalendarModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_4__["AccordionModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_15__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_15__["ReactiveFormsModule"],
                primeng_toast__WEBPACK_IMPORTED_MODULE_12__["ToastModule"],
                primeng_fileupload__WEBPACK_IMPORTED_MODULE_10__["FileUploadModule"],
                primeng_table__WEBPACK_IMPORTED_MODULE_13__["TableModule"],
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_14__["BsDatepickerModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_14__["BsDropdownModule"],
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_14__["DatepickerModule"].forRoot(),
                ngx_bootstrap_sortable__WEBPACK_IMPORTED_MODULE_16__["SortableModule"].forRoot(),
                _providerdashboard_ProviderDash_module__WEBPACK_IMPORTED_MODULE_18__["ProviderDashboardModule"]
            ],
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"],
                {
                    provide: _angular_common__WEBPACK_IMPORTED_MODULE_2__["LocationStrategy"],
                    useClass: _angular_common__WEBPACK_IMPORTED_MODULE_2__["HashLocationStrategy"]
                }
                // DraggableItemService
            ],
        })
    ], DashboardModule);
    return DashboardModule;
}());



/***/ }),

/***/ "./src/app/views/dashboad/dashboard.routing.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/dashboad/dashboard.routing.ts ***!
  \*****************************************************/
/*! exports provided: DashboardRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardRoutingModule", function() { return DashboardRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var routes = [
    {
        path: 'externaldocumentupload',
        loadChildren: function () { return Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./ExternalDocUpload/ExternalDoc.module */ "./src/app/views/dashboad/ExternalDocUpload/ExternalDoc.module.ts")).then(function (m) { return m.ExternalDocUploadModule; }); }
    },
    {
        path: 'providerDashBoard',
        loadChildren: function () { return Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./providerdashboard/ProviderDash.module */ "./src/app/views/dashboad/providerdashboard/ProviderDash.module.ts")).then(function (m) { return m.ProviderDashboardModule; }); }
    }
];
var DashboardRoutingModule = /** @class */ (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/dashboad/providerdashboard/ProviderDash.module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/views/dashboad/providerdashboard/ProviderDash.module.ts ***!
  \*************************************************************************/
/*! exports provided: ProviderDashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProviderDashboardModule", function() { return ProviderDashboardModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/primeng */ "./node_modules/primeng/primeng.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(primeng_primeng__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/toast */ "./node_modules/primeng/toast.js");
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(primeng_toast__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _providerdashboard_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./providerdashboard.component */ "./src/app/views/dashboad/providerdashboard/providerdashboard.component.ts");
/* harmony import */ var _providerdashboard1_providerdashboard1_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./providerdashboard1/providerdashboard1.component */ "./src/app/views/dashboad/providerdashboard/providerdashboard1/providerdashboard1.component.ts");
/* harmony import */ var ngx_bootstrap_sortable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-bootstrap/sortable */ "./node_modules/ngx-bootstrap/sortable/fesm5/ngx-bootstrap-sortable.js");
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/dialog */ "./node_modules/primeng/dialog.js");
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(primeng_dialog__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/toolbar */ "./node_modules/primeng/toolbar.js");
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(primeng_toolbar__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _ProviderDash_routing_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ProviderDash.routing.module */ "./src/app/views/dashboad/providerdashboard/ProviderDash.routing.module.ts");














var ProviderDashboardModule = /** @class */ (function () {
    function ProviderDashboardModule() {
    }
    ProviderDashboardModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _providerdashboard_component__WEBPACK_IMPORTED_MODULE_8__["ProviderDashboardComponent"],
                _providerdashboard1_providerdashboard1_component__WEBPACK_IMPORTED_MODULE_9__["Providerdashboard1Component"]
            ],
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_4__["HttpModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_5__["DropdownModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_5__["CheckboxModule"],
                primeng_dialog__WEBPACK_IMPORTED_MODULE_11__["DialogModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_5__["PaginatorModule"],
                primeng_toast__WEBPACK_IMPORTED_MODULE_6__["ToastModule"],
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__["BsDatepickerModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__["DatepickerModule"].forRoot(),
                ngx_bootstrap_sortable__WEBPACK_IMPORTED_MODULE_10__["SortableModule"].forRoot(),
                primeng_primeng__WEBPACK_IMPORTED_MODULE_5__["CalendarModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_5__["AccordionModule"],
                primeng_toolbar__WEBPACK_IMPORTED_MODULE_12__["ToolbarModule"],
                _ProviderDash_routing_module__WEBPACK_IMPORTED_MODULE_13__["ProviderDashboardRoutingModule"]
            ],
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"], primeng_primeng__WEBPACK_IMPORTED_MODULE_5__["MessageService"],
                {
                    provide: _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"],
                    useClass: _angular_common__WEBPACK_IMPORTED_MODULE_3__["HashLocationStrategy"]
                }
            ],
        })
    ], ProviderDashboardModule);
    return ProviderDashboardModule;
}());



/***/ }),

/***/ "./src/app/views/dashboad/providerdashboard/ProviderDash.routing.module.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/views/dashboad/providerdashboard/ProviderDash.routing.module.ts ***!
  \*********************************************************************************/
/*! exports provided: ProviderDashboardRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProviderDashboardRoutingModule", function() { return ProviderDashboardRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _providerdashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./providerdashboard.component */ "./src/app/views/dashboad/providerdashboard/providerdashboard.component.ts");




var routes = [
    {
        path: '',
        component: _providerdashboard_component__WEBPACK_IMPORTED_MODULE_3__["ProviderDashboardComponent"],
        data: {
            title: 'Providerdashboard'
        }
    }
];
var ProviderDashboardRoutingModule = /** @class */ (function () {
    function ProviderDashboardRoutingModule() {
    }
    ProviderDashboardRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], ProviderDashboardRoutingModule);
    return ProviderDashboardRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/dashboad/providerdashboard/providerdashboard.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/views/dashboad/providerdashboard/providerdashboard.component.scss ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".row {\n  margin-right: -15px;\n  margin-left: -15px;\n}\n\n@media (min-width: 1200px) {\n  .col-lg-12 {\n    width: 100%;\n  }\n}\n\n@media (min-width: 1200px) {\n  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {\n    float: left;\n  }\n}\n\n.border-bottom {\n  border-bottom: 1px solid #e7eaec !important;\n}\n\n@media (min-width: 992px) {\n  .col-md-3 {\n    width: 25%;\n  }\n}\n\n@media (min-width: 992px) {\n  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {\n    float: left;\n  }\n}\n\n@media (min-width: 992px) {\n  .col-md-2 {\n    width: 16.66666667%;\n  }\n}\n\n@media (min-width: 992px) {\n  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {\n    float: left;\n  }\n}\n\n#txtMemberName.form-control {\n  background-color: #FFFFFF;\n  background-image: none;\n  color: inherit;\n  display: block;\n  padding: 6px 12px;\n  width: 100% !important;\n  font-size: 14px;\n  border-left: 1px solid #CCC !important;\n  border-top: 1px solid #CCC !important;\n  border-right: 1px solid #CCC !important;\n  border-bottom: 2px solid #36cc95 !important;\n  border-radius: 0px !important;\n  height: 0px !important;\n  padding: 0px !important;\n}\n\n.form-control {\n  background-color: #FFFFFF;\n  background-image: none;\n  color: inherit;\n  display: block;\n  padding: 6px 12px;\n  width: 100% !important;\n  font-size: 14px;\n  border-left: 1px solid #CCC !important;\n  border-top: 1px solid #CCC !important;\n  border-right: 1px solid #CCC !important;\n  border-bottom: 2px solid #36cc95 !important;\n  border-radius: 0px !important;\n}\n\n.formcontrol.ui-dropdown {\n  background-color: #FFFFFF;\n  background-image: none;\n  color: inherit;\n  display: block;\n  padding: 6px 12px;\n  width: 100% !important;\n  font-size: 14px;\n  border-left: 1px solid #CCC !important;\n  border-top: 1px solid #CCC !important;\n  border-right: 1px solid #CCC !important;\n  border-bottom: 2px solid #36cc95 !important;\n  border-radius: 0px !important;\n}\n\n.chosen-container-single .chosen-single {\n  position: relative !important;\n  display: block !important;\n  overflow: hidden !important;\n  padding: 5px 12px !important;\n  height: 34px !important;\n  border-left: 1px solid #CCC !important;\n  border-top: 1px solid #CCC !important;\n  border-right: 1px solid #CCC !important;\n  border-bottom: 2px solid #37cb95 !important;\n  background-color: #fff;\n  border-radius: 0px !important;\n  -moz-background-clip: padding-box;\n  -webkit-background-clip: padding-box;\n  background-clip: padding-box;\n  color: #555;\n  text-decoration: none;\n  white-space: nowrap;\n  line-height: 24px;\n}\n\n.chosen-container-single .chosen-single {\n  background: #ffffff;\n  box-shadow: none;\n  box-sizing: border-box;\n  background-color: #FFFFFF;\n  border-bottom: 2px solid #37cb95 !important;\n  background-color: #fff;\n  border-radius: 0px !important;\n  cursor: text;\n  height: auto !important;\n  margin: 0;\n  min-height: 30px;\n  overflow: hidden;\n  padding: 4px 12px;\n  position: relative;\n  width: 100%;\n}\n\n.chosen-container-single .chosen-drop {\n  margin-top: -1px;\n  border-radius: 0 0 4px 4px;\n  background-clip: padding-box;\n}\n\n.chosen-container .chosen-drop {\n  position: absolute;\n  top: 100%;\n  left: -9999px;\n  z-index: 1010;\n  width: 100%;\n  border: 1px solid #aaa;\n  border-top: 0;\n  background: #fff;\n  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);\n}\n\n.chosen-container * {\n  box-sizing: border-box;\n}\n\n.chosen-container-single .chosen-search {\n  position: relative;\n  z-index: 1010;\n  margin: 0;\n  padding: 3px 4px;\n  white-space: nowrap;\n}\n\n.chosen-container .chosen-results {\n  color: #444;\n  position: relative;\n  overflow-x: hidden;\n  overflow-y: auto;\n  margin: 0 4px 4px 0;\n  padding: 0 0 0 4px;\n  max-height: 240px;\n  -webkit-overflow-scrolling: touch;\n}\n\n.chosen-container-single .chosen-single div b {\n  display: block;\n  width: 100%;\n  height: 100%;\n  margin-top: 5px;\n}\n\nb, strong {\n  font-weight: bold;\n}\n\n.chosen-container-single .chosen-single div {\n  position: absolute;\n  top: 0;\n  right: 0;\n  display: block;\n  width: 18px;\n  height: 100%;\n}\n\n:host > > > .ui-dropdown {\n  display: block;\n  position: relative;\n  cursor: pointer;\n  vertical-align: middle;\n  min-width: 12.5em;\n}\n\nbody .ui-dropdown {\n  background: #ffffff;\n  border: 1px solid #a6a6a6;\n  -webkit-transition: border-color 0.2s;\n  transition: border-color 0.2s;\n  border-left: 1px solid #CCC !important;\n  border-top: 1px solid #CCC !important;\n  border-right: 1px solid #CCC !important;\n  border-bottom: 2px solid #36cc95 !important;\n}\n\n.btn-primary {\n  background-color: #848484;\n  border-color: #999999;\n  color: #FFFFFF;\n  box-shadow: 0 8px 7px rgba(0, 0, 0, 0.22);\n}\n\n.btn {\n  display: inline-block;\n  padding: 6px 12px;\n  margin-bottom: 0;\n  font-size: 13px;\n  font-weight: bold;\n  line-height: 1.42857143;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  touch-action: manipulation;\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  background-image: none;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n\n.wrapper-content {\n  padding: 20px 10px 40px;\n  font-family: \"open sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  background-color: white;\n  font-size: 13px;\n  color: #676a6c;\n}\n\n.table-responsive {\n  min-height: 0.01%;\n  overflow-x: auto;\n}\n\n.m-b-sm {\n  margin-bottom: 10px;\n}\n\n.m-t-n-xl {\n  margin-top: -40px;\n}\n\n.ibox-content {\n  clear: both;\n}\n\n.ibox-content {\n  background-color: #ffffff;\n  color: inherit;\n  padding: 15px 20px 20px 20px;\n  -o-border-image: none;\n  -webkit-border-image: none;\n  border-image: none;\n}\n\n.modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  overflow: hidden;\n  -webkit-overflow-scrolling: touch;\n  outline: 0;\n}\n\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 20px;\n}\n\ntable {\n  border-spacing: 0;\n  border-collapse: collapse;\n  background-color: transparent;\n}\n\n.table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {\n  border-top: 1px solid #e7eaec;\n  line-height: 1.42857;\n  padding: 8px;\n  vertical-align: top;\n  width: 5%;\n}\n\n.custompagination {\n  margin: 10px 0;\n}\n\n.pull-right {\n  float: right !important;\n}\n\n.custompagination .pagerInfo {\n  margin-top: -10px;\n}\n\n.label {\n  background-color: #d1dade;\n  color: #5e5e5e;\n  font-family: \"Open Sans\";\n  font-size: 10px;\n  font-weight: 600;\n  padding: 3px 8px;\n  text-shadow: none;\n}\n\n.custompagination ul > li {\n  display: inline;\n}\n\n.custompagination ul > li > select {\n  float: left;\n  height: 30px;\n  line-height: 20px;\n  text-decoration: none;\n  background-color: #ffffff;\n  border: 1px solid #dddddd;\n  border-left-width: 0;\n}\n\n.custompagination ul > li:last-child > a, .custompagination ul > li:last-child > span {\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n  -moz-border-radius-topright: 4px;\n  -moz-border-radius-bottomright: 4px;\n}\n\n.custompagination ul > li > a, .custompagination ul > li > span {\n  float: left;\n  padding: 4px 12px;\n  line-height: 20px;\n  text-decoration: none;\n  background-color: #ffffff;\n  border: 1px solid #dddddd;\n  border-left-width: 0;\n}\n\n.table > caption + thead > tr:first-child > th, .table > colgroup + thead > tr:first-child > th, .table > thead:first-child > tr:first-child > th, .table > caption + thead > tr:first-child > td, .table > colgroup + thead > tr:first-child > td, .table > thead:first-child > tr:first-child > td {\n  border-top: 0;\n}\n\n.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {\n  position: relative;\n  min-height: 1px;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n\n.btn-warning {\n  background-color: #f8ac59;\n  border-color: #f8ac59;\n  color: #FFFFFF;\n}\n\n.btn-sm, .btn-group-sm > .btn {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n\n.table-striped > tbody > tr:nth-of-type(odd) {\n  background-color: #f9f9f9;\n}\n\n.inmodal .modal-body {\n  background: #f8fafb;\n}\n\n.modal-body {\n  padding: 20px 30px 30px 30px;\n}\n\n.modal-body {\n  position: relative;\n  padding: 15px;\n}\n\n@media (min-width: 768px) {\n  .col-sm-3 {\n    width: 25%;\n  }\n}\n\n@media (min-width: 768px) {\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {\n    float: left;\n  }\n}\n\n@media (min-width: 768px) {\n  .col-sm-4 {\n    width: 33.33333333%;\n  }\n}\n\n@media (min-width: 768px) {\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {\n    float: left;\n  }\n}\n\n@media (min-width: 768px) {\n  .col-sm-2 {\n    width: 16.66666667%;\n  }\n}\n\n@media (min-width: 768px) {\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {\n    float: left;\n  }\n}\n\nlabel {\n  display: inline-block;\n  max-width: 100%;\n  margin-bottom: 5px;\n  font-weight: bold;\n}\n\nlabel, .btn, .nav-tabs > li > a, .badge {\n  font-weight: normal !important;\n}\n\n@media (min-width: 992px) {\n  .col-md-12 {\n    width: 100%;\n  }\n}\n\n@media (min-width: 992px) {\n  .col-md-6 {\n    width: 50%;\n  }\n}\n\n.forum-container, .forum-post-container {\n  padding: 30px !important;\n}\n\n.panel-body {\n  padding: 15px;\n}\n\n@media (min-width: 768px) {\n  .col-sm-3 {\n    width: 25%;\n  }\n}\n\n.chosen-container {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n  font-size: 13px;\n  text-align: left;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n      user-select: none;\n}\n\n@media (min-width: 992px) {\n  .col-md-3 {\n    width: 25%;\n  }\n}\n\n@media (min-width: 992px) {\n  .col-md-1 {\n    width: 8.33333333%;\n  }\n}\n\nbutton, html input[type=button], input[type=reset], input[type=submit] {\n  -webkit-appearance: button;\n  cursor: pointer;\n}\n\n.p-l-sm {\n  margin-left: 10px;\n}\n\n.btn-danger {\n  background-color: #ed5565;\n  border-color: #ed5565;\n  color: #FFFFFF;\n}\n\n@media (min-width: 768px) {\n  .col-sm-6 {\n    width: 50%;\n  }\n}\n\ndiv.tagsinput {\n  border: 1px solid #dadada;\n  background: #fff;\n  padding: 5px;\n  width: 100%;\n  overflow-y: auto;\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\ndiv.tagsinput div {\n  display: block;\n  float: left;\n  position: relative;\n}\n\n@media (min-width: 768px) {\n  .col-sm-6 {\n    width: 50%;\n  }\n}\n\n.form-group {\n  margin-bottom: 15px;\n}\n\n@media (min-width: 768px) {\n  .col-sm-4 {\n    width: 33.33333333%;\n  }\n}\n\n@media (min-width: 768px) {\n  .col-sm-8 {\n    width: 66.66666667%;\n  }\n}\n\n@media (min-width: 992px) {\n  .col-md-3 {\n    width: 25%;\n  }\n}\n\n.img-responsive, .thumbnail > img, .thumbnail a > img, .carousel-inner > .item > img, .carousel-inner > .item > a > img {\n  display: block;\n  max-width: 100%;\n  height: auto;\n}\n\n.inmodal .modal-header {\n  padding: 30px 15px;\n  text-align: center;\n}\n\n.modal-header {\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5;\n}\n\nh3, h4, h5 {\n  margin-top: 5px;\n  font-weight: 600;\n}\n\nh3 {\n  font-size: 16px;\n}\n\n.modal-content {\n  -moz-background-clip: padding-box;\n  -webkit-background-clip: padding-box;\n  background-clip: padding-box;\n  background-color: #FFFFFF;\n  border: 1px solid rgba(0, 0, 0, 0);\n  border-radius: 4px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  outline: 0 none;\n  position: relative;\n}\n\nbody .ui-dropdown-panel .ui-dropdown-items .ui-dropdown-item.ui-state-highlight, body .ui-dropdown-panel .ui-dropdown-items .ui-dropdown-item-group.ui-state-highlight {\n  color: #ffffff;\n  background-color: #36cc95;\n}\n\n:host {\n  color: #ffffff;\n  background-color: #36cc95;\n}\n\n.inmodal .modal-header {\n  padding: 30px 15px;\n  text-align: center;\n}\n\n.modal-header {\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5;\n}\n\n.inmodal .modal-body {\n  background: #f8fafb;\n}\n\n.modal-body {\n  padding: 20px 30px 30px 30px;\n}\n\n.modal-body {\n  position: relative;\n  padding: 15px;\n}\n\n@media (min-width: 992px) {\n  .col-md-4 {\n    width: 33.33333333%;\n  }\n}\n\na {\n  color: #337ab7;\n  text-decoration: none;\n}\n\na {\n  cursor: pointer;\n}\n\n.btn-xs, .btn-group-xs > .btn {\n  padding: 1px 5px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n\n.modal-footer {\n  margin-top: 0;\n}\n\n.modal-footer {\n  padding: 15px;\n  text-align: right;\n  border-top: 1px solid #e5e5e5;\n}\n\n.modal-backdrop.in {\n  filter: alpha(opacity=50);\n  opacity: 0.5;\n}\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000;\n}\n\n.form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {\n  background-color: #CCC;\n  opacity: 1;\n}\n\n.modal-size {\n  max-width: 560px;\n}\n\n.ui-dialog-content.ui-widget-content {\n  width: 560px;\n}\n\n:host {\n  width: 560px;\n}\n\ntextarea {\n  margin: 0;\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n  border: 1px solid grey;\n}\n\n.form-group {\n  margin-bottom: 15px;\n}\n\n.icheckbox_square-green {\n  display: inline-block;\n  display: inline;\n  vertical-align: middle;\n  margin: 0;\n  padding: 0;\n  width: 22px;\n  height: 22px;\n  border: none;\n  cursor: pointer;\n}\n\n.modal-footer .btn + .btn {\n  margin-bottom: 0;\n  margin-left: 5px;\n}\n\n.ng-tns-c4-6 {\n  width: 100% !important;\n}\n\n.ng-tns-c4-7 {\n  width: 100% !important;\n}\n\n.ng-tns-c4-19 {\n  width: 100% !important;\n}\n\n.ng-tns-c4-20 {\n  width: 100% !important;\n}\n\n/* panel start */\n\n.panel-heading {\n  padding: 10px 15px;\n  border-bottom: 1px solid transparent;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  padding-left: 0px;\n  padding-bottom: 0px;\n  padding-right: 0px;\n  padding-top: 0px;\n}\n\n.nav > li.active > a {\n  color: #fff !important;\n  font-weight: bold;\n  background: #19aa8d !important;\n  border-left: none;\n}\n\n.margin {\n  margin-top: 25px;\n}\n\n/* panel end */\n\n#style {\n  margin-top: 35px;\n}\n\n#editAppt .ui-dialog {\n  width: 1200px;\n  top: 50px;\n  z-index: 100;\n}\n\n#editAppt .ui-dialog .ui-dialog-content {\n  height: 520px;\n  overflow: auto;\n}\n\n#searchProv .ui-dialog {\n  width: 1000px;\n  top: 50px;\n  z-index: 100;\n}\n\n#searchProv .ui-dialog .ui-dialog-content {\n  height: 520px;\n  overflow: auto;\n}\n\n::ng-deep #editEpisode .ui-dialog {\n  width: 1000px;\n  top: 50px;\n  z-index: 100;\n}\n\n::ng-deep #editEpisode .ui-dialog .ui-dialog-content {\n  height: 350px;\n  overflow: auto;\n}\n\n::ng-deep #caseMangmemo .ui-dialog {\n  width: 600px;\n  top: 50px;\n  z-index: 100;\n}\n\n::ng-deep #caseMangmemo .ui-dialog .ui-dialog-content {\n  height: 200px;\n  overflow: auto;\n}\n\n::ng-deep #addmop .ui-dialog {\n  width: 600px;\n  top: 50px;\n  z-index: 100;\n}\n\n::ng-deep #addmop .ui-dialog .ui-dialog-content {\n  height: 220px;\n  overflow: auto;\n}\n\n::ng-deep #addmemo .ui-dialog {\n  width: 600px;\n  top: 50px;\n  z-index: 100;\n}\n\n::ng-deep #addmemo .ui-dialog .ui-dialog-content {\n  height: 220px;\n  overflow: auto;\n}\n\n::ng-deep #tagmember .ui-dialog {\n  width: 1000px;\n  top: 50px;\n  z-index: 100;\n}\n\n::ng-deep #tagmember .ui-dialog .ui-dialog-content {\n  height: 550px;\n  overflow: auto;\n}\n\n.ui-calendar {\n  position: relative;\n  display: inline-block;\n  width: 100% !important;\n}\n\n.ui-inputgroup .ui-inputtext {\n  padding-left: 0.5em;\n  width: 100% !important;\n}\n\n/* Drop Down List Start*/\n\nbody {\n  padding: 30px;\n  position: relative;\n}\n\n.sortable-item {\n  padding: 6px 12px;\n  margin-bottom: 4px;\n  font-size: 14px;\n  line-height: 1.4em;\n  text-align: center;\n  cursor: -webkit-grab;\n  cursor: grab;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  border-color: #adadad;\n}\n\n.sortable-item-active {\n  background-color: #e6e6e6;\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n}\n\n.sortable-wrapper {\n  min-height: 150px;\n}\n\n#searchSurgeryPopup .ui-dialog {\n  z-index: 1011;\n  left: 400px !important;\n  top: 40px !important;\n  -webkit-transform: none;\n          transform: none;\n  opacity: 1;\n  width: 900px !important;\n}\n\n/* Drop Down List End */\n\n:host ::ng-deep #pwsdropdown .ui-dropdown {\n  background: #ffffff;\n  border: 1px solid #a6a6a6;\n  border-bottom: 2px solid #36cc95 !important;\n  -webkit-transition: border-color 0.2s;\n  transition: border-color 0.2s;\n  border-radius: 0px !important;\n  width: 20px;\n}\n\n::ng-deep body .ui-dropdown-panel .ui-dropdown-items .ui-dropdown-item.ui-state-highlight, body .ui-dropdown-panel .ui-dropdown-items .ui-dropdown-item-group.ui-state-highlight {\n  color: #ffffff;\n  background-color: #00a96b;\n}\n\n#collapse1 {\n  overflow-x: scroll;\n}\n\n.tableDiv {\n  height: auto;\n  margin-bottom: 100px !important;\n}\n\n.liTitle {\n  padding-top: 8px;\n  height: 40px;\n  background: #19aa8d !important;\n  width: 150px;\n}\n\n#margin1 {\n  margin-top: 15px;\n  display: inline-table;\n}\n\n.input-group-addon {\n  background-color: #fff;\n  border: 1px solid #E5E6E7;\n  border-radius: 1px;\n  color: inherit;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 1;\n  padding: 6px 12px;\n  text-align: center;\n  margin-left: 25px !important;\n}\n\n.fav_Filter {\n  width: 90% !important;\n}\n\n.nor_Filter {\n  width: 100% !important;\n}\n\nul#dropdown-basic {\n  left: auto;\n  right: 0;\n  background-color: #848484;\n  color: #FFFFFF;\n}\n\nhr {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  background-color: white;\n}\n\nthead {\n  background-color: #337ab7;\n  color: white;\n}\n\nth.thproviderSort.headerSort.sortIconchange.ng-star-inserted {\n  cursor: pointer;\n  padding-right: 20px;\n}\n\ntr.ng-star-inserted {\n  color: black !important;\n  background-color: white !important;\n}\n\ntd.lnkTratmentEpisode.ng-star-inserted {\n  vertical-align: middle !important;\n  cursor: pointer !important;\n}\n\nspan.badge.badge-warning {\n  font-size: 14px;\n  border-radius: 5px;\n}\n\ni.fa.fa-check-circle {\n  color: #1ab394;\n}\n\nspan.trash.ng-star-inserted {\n  cursor: pointer;\n}\n\ninput#chkIsStatFilePD {\n  zoom: 1.5;\n}\n\n::ng-deep #deletefavpopup .ui-dialog {\n  width: 1000px;\n  top: 20px !important;\n  z-index: 100;\n}\n\n::ng-deep #deletefavpopup .ui-dialog .ui-dialog-content {\n  height: 30px;\n  overflow: auto;\n}\n\n::ng-deep #deletefavpopup .ui-dialog .ui-dialog-titlebar {\n  border: 0px;\n  background-color: white;\n}\n\n::ng-deep #deletefavpopup .ui-dialog .ui-dialog-content {\n  background-color: white;\n  color: #333333;\n  border: 0px;\n  padding: 0.571em 1em;\n}\n\n::ng-deep #deletefavpopup .ui-dialog .ui-dialog-footer {\n  border: 0px;\n  background-color: #ffffff;\n  color: #333333;\n  padding: 0.571em 1em;\n  margin: 0;\n  text-align: right;\n  position: relative;\n  top: -1px;\n}\n\na.btn.btn-small.btn-danger.pull-right {\n  margin-left: 10px;\n  color: white;\n}\n\na.btn.btn-success {\n  color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvZGFzaGJvYWQvcHJvdmlkZXJkYXNoYm9hcmQvRDpcXFN1aml0IFNreUNsaWZmSVQgUHJvamVjdHNcXFByb2plY3QxMSBTaXJcXFlvdXJEcnNcXHRydW5rL3NyY1xcYXBwXFx2aWV3c1xcZGFzaGJvYWRcXHByb3ZpZGVyZGFzaGJvYXJkXFxwcm92aWRlcmRhc2hib2FyZC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvdmlld3MvZGFzaGJvYWQvcHJvdmlkZXJkYXNoYm9hcmQvcHJvdmlkZXJkYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxtQkFBQTtFQUNBLGtCQUFBO0FDREY7O0FER0E7RUFDQTtJQUNJLFdBQUE7RUNBRjtBQUNGOztBREVBO0VBQ0E7SUFDSSxXQUFBO0VDQUY7QUFDRjs7QURHQTtFQUNFLDJDQUFBO0FDREY7O0FESUE7RUFDQTtJQUNJLFVBQUE7RUNERjtBQUNGOztBREdBO0VBQ0E7SUFDSSxXQUFBO0VDREY7QUFDRjs7QURJQTtFQUNBO0lBQ0ksbUJBQUE7RUNGRjtBQUNGOztBREtBO0VBQ0E7SUFDSSxXQUFBO0VDSEY7QUFDRjs7QURNQTtFQUNFLHlCQUFBO0VBQ0Esc0JBQUE7RUFFQSxjQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxlQUFBO0VBQ0Esc0NBQUE7RUFDQSxxQ0FBQTtFQUNBLHVDQUFBO0VBQ0EsMkNBQUE7RUFHQSw2QkFBQTtFQUNDLHNCQUFBO0VBQ0EsdUJBQUE7QUNMSDs7QURRQTtFQUNFLHlCQUFBO0VBQ0Esc0JBQUE7RUFFQSxjQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxlQUFBO0VBQ0Esc0NBQUE7RUFDQSxxQ0FBQTtFQUNBLHVDQUFBO0VBQ0EsMkNBQUE7RUFHQSw2QkFBQTtBQ05GOztBRFNBO0VBQ0cseUJBQUE7RUFDQSxzQkFBQTtFQUVBLGNBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxzQkFBQTtFQUNBLGVBQUE7RUFDQSxzQ0FBQTtFQUNBLHFDQUFBO0VBQ0EsdUNBQUE7RUFDQSwyQ0FBQTtFQUdBLDZCQUFBO0FDUEg7O0FEVUE7RUFDRSw2QkFBQTtFQUNBLHlCQUFBO0VBQ0EsMkJBQUE7RUFDQSw0QkFBQTtFQUNBLHVCQUFBO0VBQ0Esc0NBQUE7RUFDQSxxQ0FBQTtFQUNBLHVDQUFBO0VBQ0EsMkNBQUE7RUFDQSxzQkFBQTtFQUdBLDZCQUFBO0VBQ0EsaUNBQUE7RUFDQSxvQ0FBQTtFQUNBLDRCQUFBO0VBQ0EsV0FBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBQ1BGOztBRFVBO0VBQ0UsbUJBQUE7RUFHQSxnQkFBQTtFQUVBLHNCQUFBO0VBQ0EseUJBQUE7RUFDQSwyQ0FBQTtFQUNBLHNCQUFBO0VBR0EsNkJBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FDUEY7O0FEVUE7RUFDRSxnQkFBQTtFQUNBLDBCQUFBO0VBQ0EsNEJBQUE7QUNQRjs7QURVQTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLHNCQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0VBQ0EseUNBQUE7QUNQRjs7QURVQTtFQUdFLHNCQUFBO0FDUEY7O0FEVUE7RUFDRSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQ1BGOztBRFVBO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGlDQUFBO0FDUEY7O0FEU0E7RUFDRSxjQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0FDTkY7O0FEU0E7RUFDRSxpQkFBQTtBQ05GOztBRFFBO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsUUFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQ0xGOztBRE9BO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLHNCQUFBO0VBQ0EsaUJBQUE7QUNKRjs7QURPQTtFQUNFLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxxQ0FBQTtFQUFBLDZCQUFBO0VBQ0Esc0NBQUE7RUFDQSxxQ0FBQTtFQUNBLHVDQUFBO0VBQ0EsMkNBQUE7QUNKRjs7QURNQTtFQUNFLHlCQUFBO0VBQ0EscUJBQUE7RUFDQSxjQUFBO0VBR0EseUNBQUE7QUNIRjs7QURLQTtFQUNFLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBRUEsMEJBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7RUFDQSxzQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxzQkFBQTtFQUNBLDZCQUFBO0VBQ0Esa0JBQUE7QUNGRjs7QURLQTtFQUNFLHVCQUFBO0VBQ0Esd0VBQUE7RUFDRSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0FDRko7O0FESUE7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0FDREY7O0FER0E7RUFDRSxtQkFBQTtBQ0FGOztBREVBO0VBQ0UsaUJBQUE7QUNDRjs7QURDQTtFQUNFLFdBQUE7QUNFRjs7QURBQTtFQUNFLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLDRCQUFBO0VBR0EscUJBQUE7RUFDQSwwQkFBQTtFQUNBLGtCQUFBO0FDRUY7O0FEQ0E7RUFDRSxlQUFBO0VBQ0EsTUFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQ0FBQTtFQUNBLFVBQUE7QUNFRjs7QURBQTtFQUNFLFdBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUNHRjs7QUREQTtFQUNFLGlCQUFBO0VBQ0EseUJBQUE7RUFDQSw2QkFBQTtBQ0lGOztBREZBO0VBQ0UsNkJBQUE7RUFDQSxvQkFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7QUNLRjs7QURIQTtFQUNFLGNBQUE7QUNNRjs7QURKQTtFQUNFLHVCQUFBO0FDT0Y7O0FETEE7RUFDRSxpQkFBQTtBQ1FGOztBRE5BO0VBQ0UseUJBQUE7RUFDQSxjQUFBO0VBQ0Esd0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FDU0Y7O0FEUEE7RUFDRSxlQUFBO0FDVUY7O0FEUkE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0EscUJBQUE7RUFDQSx5QkFBQTtFQUNBLHlCQUFBO0VBQ0Esb0JBQUE7QUNXRjs7QURUQTtFQUVFLDRCQUFBO0VBRUEsK0JBQUE7RUFDQSxnQ0FBQTtFQUNBLG1DQUFBO0FDWUY7O0FEVkE7RUFDRSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLHFCQUFBO0VBQ0EseUJBQUE7RUFDQSx5QkFBQTtFQUNBLG9CQUFBO0FDYUY7O0FEVkE7RUFDRSxhQUFBO0FDYUY7O0FEWEE7RUFDRSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FDY0Y7O0FEWkE7RUFDRSx5QkFBQTtFQUNBLHFCQUFBO0VBQ0EsY0FBQTtBQ2VGOztBRGJBO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQ2dCRjs7QURkQTtFQUNFLHlCQUFBO0FDaUJGOztBRGRBO0VBQ0UsbUJBQUE7QUNpQkY7O0FEZkE7RUFDRSw0QkFBQTtBQ2tCRjs7QURoQkE7RUFDRSxrQkFBQTtFQUNBLGFBQUE7QUNtQkY7O0FEakJBO0VBQ0E7SUFDSSxVQUFBO0VDb0JGO0FBQ0Y7O0FEakJBO0VBQ0E7SUFDSSxXQUFBO0VDbUJGO0FBQ0Y7O0FEaEJBO0VBQ0E7SUFDSSxtQkFBQTtFQ2tCRjtBQUNGOztBRGZBO0VBQ0E7SUFDSSxXQUFBO0VDaUJGO0FBQ0Y7O0FEZkE7RUFDQTtJQUNJLG1CQUFBO0VDaUJGO0FBQ0Y7O0FEZEE7RUFDQTtJQUNJLFdBQUE7RUNnQkY7QUFDRjs7QURiQTtFQUNFLHFCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUNlRjs7QURiQTtFQUNFLDhCQUFBO0FDZ0JGOztBRGRBO0VBQ0E7SUFDSSxXQUFBO0VDaUJGO0FBQ0Y7O0FEZkE7RUFDQTtJQUNJLFVBQUE7RUNpQkY7QUFDRjs7QURmQTtFQUNFLHdCQUFBO0FDaUJGOztBRGZBO0VBQ0UsYUFBQTtBQ2tCRjs7QURoQkE7RUFDQTtJQUNJLFVBQUE7RUNtQkY7QUFDRjs7QURoQkE7RUFDRSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0Esc0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLHNCQUFBO0VBQ0EscUJBQUE7TUFBQSxpQkFBQTtBQ2tCRjs7QURmQTtFQUNBO0lBQ0ksVUFBQTtFQ2tCRjtBQUNGOztBRGhCQTtFQUNBO0lBQ0ksa0JBQUE7RUNrQkY7QUFDRjs7QURmQTtFQUNFLDBCQUFBO0VBQ0EsZUFBQTtBQ2lCRjs7QURkQTtFQUNFLGlCQUFBO0FDaUJGOztBRGRBO0VBQ0UseUJBQUE7RUFDQSxxQkFBQTtFQUNBLGNBQUE7QUNpQkY7O0FEZEE7RUFDQTtJQUNJLFVBQUE7RUNpQkY7QUFDRjs7QURkQTtFQUNFLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBR0EsMEJBQUE7RUFDQSxzQkFBQTtBQ2dCRjs7QURiQTtFQUNFLGNBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7QUNnQkY7O0FEYkE7RUFDQTtJQUNJLFVBQUE7RUNnQkY7QUFDRjs7QURiQTtFQUNFLG1CQUFBO0FDZUY7O0FEWkE7RUFDQTtJQUNJLG1CQUFBO0VDZUY7QUFDRjs7QURiQTtFQUNBO0lBQ0ksbUJBQUE7RUNlRjtBQUNGOztBRGJBO0VBQ0E7SUFDSSxVQUFBO0VDZUY7QUFDRjs7QURiQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtBQ2VGOztBRGJBO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtBQ2dCRjs7QURiQTtFQUNFLGFBQUE7RUFDQSxnQ0FBQTtBQ2dCRjs7QURkQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQ2lCRjs7QURmQTtFQUNFLGVBQUE7QUNrQkY7O0FEaEJBO0VBQ0UsaUNBQUE7RUFDQSxvQ0FBQTtFQUNBLDRCQUFBO0VBQ0EseUJBQUE7RUFDQSxrQ0FBQTtFQUdBLGtCQUFBO0VBR0Esd0NBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUNtQkY7O0FEZkE7RUFDRSxjQUFBO0VBQ0EseUJBQUE7QUNrQkY7O0FEaEJBO0VBQ0UsY0FBQTtFQUNBLHlCQUFBO0FDbUJGOztBRGhCQTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7QUNtQkY7O0FEakJBO0VBQ0UsYUFBQTtFQUNBLGdDQUFBO0FDb0JGOztBRGpCQTtFQUNFLG1CQUFBO0FDb0JGOztBRGxCQTtFQUNFLDRCQUFBO0FDcUJGOztBRG5CQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtBQ3NCRjs7QURwQkE7RUFDQTtJQUNJLG1CQUFBO0VDdUJGO0FBQ0Y7O0FEckJBO0VBQ0UsY0FBQTtFQUNBLHFCQUFBO0FDdUJGOztBRHBCQTtFQUNFLGVBQUE7QUN1QkY7O0FEcEJBO0VBQ0UsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQ3VCRjs7QURwQkE7RUFDRSxhQUFBO0FDdUJGOztBRHBCQTtFQUNFLGFBQUE7RUFDQSxpQkFBQTtFQUNBLDZCQUFBO0FDdUJGOztBRHJCQTtFQUNFLHlCQUFBO0VBQ0EsWUFBQTtBQ3dCRjs7QURyQkE7RUFDRSxlQUFBO0VBQ0EsTUFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBQ3dCRjs7QUR0QkE7RUFDRSxzQkFBQTtFQUNBLFVBQUE7QUN5QkY7O0FEdEJDO0VBRUUsZ0JBQUE7QUN3Qkg7O0FEckJDO0VBQ0UsWUFBQTtBQ3dCSDs7QUR0QkE7RUFFSSxZQUFBO0FDd0JKOztBRHJCQTtFQUNFLFNBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxzQkFBQTtBQ3dCRjs7QUR0QkE7RUFDRSxtQkFBQTtBQ3lCRjs7QUR2QkE7RUFDRSxxQkFBQTtFQUNBLGVBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtBQzBCRjs7QUR4QkE7RUFDRSxnQkFBQTtFQUNBLGdCQUFBO0FDMkJGOztBRHhCQTtFQUNFLHNCQUFBO0FDMkJGOztBRHhCQTtFQUNFLHNCQUFBO0FDMkJGOztBRHhCQTtFQUNFLHNCQUFBO0FDMkJGOztBRHhCQTtFQUNFLHNCQUFBO0FDMkJGOztBRHhCQSxnQkFBQTs7QUFFQTtFQUNFLGtCQUFBO0VBQ0Esb0NBQUE7RUFDQSwyQkFBQTtFQUNBLDRCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUMwQkY7O0FEdkJBO0VBQ0Usc0JBQUE7RUFDQSxpQkFBQTtFQUNBLDhCQUFBO0VBQ0EsaUJBQUE7QUMwQkY7O0FEeEJBO0VBQ0UsZ0JBQUE7QUMyQkY7O0FEekJBLGNBQUE7O0FBRUE7RUFDRSxnQkFBQTtBQzJCRjs7QURwQkE7RUFDRSxhQUFBO0VBRUEsU0FBQTtFQUNBLFlBQUE7QUNzQkY7O0FEcEJBO0VBQ0UsYUFBQTtFQUNBLGNBQUE7QUN1QkY7O0FEckJBO0VBQ0UsYUFBQTtFQUVBLFNBQUE7RUFDQSxZQUFBO0FDdUJGOztBRHJCQTtFQUNFLGFBQUE7RUFDQSxjQUFBO0FDd0JGOztBRHRCQTtFQUNFLGFBQUE7RUFFQSxTQUFBO0VBQ0EsWUFBQTtBQ3dCRjs7QUR0QkE7RUFDRSxhQUFBO0VBQ0EsY0FBQTtBQ3lCRjs7QUR2QkE7RUFDRSxZQUFBO0VBRUEsU0FBQTtFQUNBLFlBQUE7QUN5QkY7O0FEdkJBO0VBQ0UsYUFBQTtFQUNBLGNBQUE7QUMwQkY7O0FEeEJBO0VBQ0UsWUFBQTtFQUVBLFNBQUE7RUFDQSxZQUFBO0FDMEJGOztBRHhCQTtFQUNFLGFBQUE7RUFDQSxjQUFBO0FDMkJGOztBRHpCQTtFQUNFLFlBQUE7RUFFQSxTQUFBO0VBQ0EsWUFBQTtBQzJCRjs7QUR6QkE7RUFDRSxhQUFBO0VBQ0EsY0FBQTtBQzRCRjs7QUQxQkE7RUFDRSxhQUFBO0VBRUEsU0FBQTtFQUNBLFlBQUE7QUM0QkY7O0FEMUJBO0VBQ0UsYUFBQTtFQUNBLGNBQUE7QUM2QkY7O0FEM0JBO0VBQ0Usa0JBQUE7RUFDQSxxQkFBQTtFQUNBLHNCQUFBO0FDOEJGOztBRDVCQTtFQUNFLG1CQUFBO0VBQ0Esc0JBQUE7QUMrQkY7O0FENUJBLHdCQUFBOztBQUVBO0VBQU0sYUFBQTtFQUFlLGtCQUFBO0FDZ0NyQjs7QUQvQlE7RUFDRixpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQkFBQTtFQUFBLFlBQUE7RUFDQSw2QkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7QUNrQ047O0FEL0JJO0VBQ0UseUJBQUE7RUFDQSxnREFBQTtBQ2tDTjs7QUQvQkk7RUFDRSxpQkFBQTtBQ2tDTjs7QURoQ0k7RUFDQyxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxvQkFBQTtFQUNBLHVCQUFBO1VBQUEsZUFBQTtFQUNBLFVBQUE7RUFDQSx1QkFBQTtBQ21DTDs7QURoQ0EsdUJBQUE7O0FBTUU7RUFDRyxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EsMkNBQUE7RUFDQSxxQ0FBQTtFQUFBLDZCQUFBO0VBQ0EsNkJBQUE7RUFDQSxXQUFBO0FDOEJMOztBRDFCRztFQUNDLGNBQUE7RUFDQSx5QkFBQTtBQzZCSjs7QUR2QkE7RUFDRSxrQkFBQTtBQzBCRjs7QUR2QkE7RUFDRSxZQUFBO0VBQ0EsK0JBQUE7QUMwQkY7O0FEeEJBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsOEJBQUE7RUFDQSxZQUFBO0FDMkJGOztBRHpCQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7QUM0QkE7O0FEMUJBO0VBQ0Usc0JBQUE7RUFDRSx5QkFBQTtFQUdBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsNEJBQUE7QUM2Qko7O0FEMUJBO0VBQ0UscUJBQUE7QUM2QkY7O0FEMUJBO0VBQ0Usc0JBQUE7QUM2QkY7O0FEM0JBO0VBQ0csVUFBQTtFQUNBLFFBQUE7RUFDQSx5QkFBQTtFQUNBLGNBQUE7QUM4Qkg7O0FENUJBO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSx3Q0FBQTtFQUNBLHVCQUFBO0FDK0JGOztBRDdCQTtFQUNFLHlCQUFBO0VBQ0EsWUFBQTtBQ2dDRjs7QUQ5QkE7RUFDRSxlQUFBO0VBQ0EsbUJBQUE7QUNpQ0Y7O0FEL0JBO0VBQ0UsdUJBQUE7RUFDQSxrQ0FBQTtBQ2tDRjs7QURoQ0E7RUFDRSxpQ0FBQTtFQUNBLDBCQUFBO0FDbUNGOztBRGpDQTtFQUNFLGVBQUE7RUFHQSxrQkFBQTtBQ29DRjs7QURsQ0E7RUFDRSxjQUFBO0FDcUNGOztBRG5DQTtFQUNFLGVBQUE7QUNzQ0Y7O0FEcENBO0VBQ0UsU0FBQTtBQ3VDRjs7QURuQ0E7RUFDRSxhQUFBO0VBQ0Esb0JBQUE7RUFDQSxZQUFBO0FDc0NGOztBRHBDQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0FDdUNBOztBRHJDQTtFQUNBLFdBQUE7RUFDQSx1QkFBQTtBQ3dDQTs7QUR0Q0E7RUFDQSx1QkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0Esb0JBQUE7QUN5Q0E7O0FEdkNBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLG9CQUFBO0VBQ0EsU0FBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0FDMENBOztBRHZDQTtFQUNFLGlCQUFBO0VBQ0EsWUFBQTtBQzBDRjs7QUR4Q0E7RUFDRSxZQUFBO0FDMkNGIiwiZmlsZSI6InNyYy9hcHAvdmlld3MvZGFzaGJvYWQvcHJvdmlkZXJkYXNoYm9hcmQvcHJvdmlkZXJkYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLnJvdyB7XG4gIG1hcmdpbi1yaWdodDogLTE1cHg7XG4gIG1hcmdpbi1sZWZ0OiAtMTVweDtcbn1cbkBtZWRpYSAobWluLXdpZHRoOiAxMjAwcHgpe1xuLmNvbC1sZy0xMiB7XG4gICAgd2lkdGg6IDEwMCU7XG59XG59XG5AbWVkaWEgKG1pbi13aWR0aDogMTIwMHB4KXtcbi5jb2wtbGctMSwgLmNvbC1sZy0yLCAuY29sLWxnLTMsIC5jb2wtbGctNCwgLmNvbC1sZy01LCAuY29sLWxnLTYsIC5jb2wtbGctNywgLmNvbC1sZy04LCAuY29sLWxnLTksIC5jb2wtbGctMTAsIC5jb2wtbGctMTEsIC5jb2wtbGctMTIge1xuICAgIGZsb2F0OiBsZWZ0O1xufVxufVxuXG4uYm9yZGVyLWJvdHRvbSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTdlYWVjICFpbXBvcnRhbnQ7XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCl7XG4uY29sLW1kLTMge1xuICAgIHdpZHRoOiAyNSU7XG59XG59XG5AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpe1xuLmNvbC1tZC0xLCAuY29sLW1kLTIsIC5jb2wtbWQtMywgLmNvbC1tZC00LCAuY29sLW1kLTUsIC5jb2wtbWQtNiwgLmNvbC1tZC03LCAuY29sLW1kLTgsIC5jb2wtbWQtOSwgLmNvbC1tZC0xMCwgLmNvbC1tZC0xMSwgLmNvbC1tZC0xMiB7XG4gICAgZmxvYXQ6IGxlZnQ7XG59XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCl7XG4uY29sLW1kLTIge1xuICAgIHdpZHRoOiAxNi42NjY2NjY2NyU7XG59XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCl7XG4uY29sLW1kLTEsIC5jb2wtbWQtMiwgLmNvbC1tZC0zLCAuY29sLW1kLTQsIC5jb2wtbWQtNSwgLmNvbC1tZC02LCAuY29sLW1kLTcsIC5jb2wtbWQtOCwgLmNvbC1tZC05LCAuY29sLW1kLTEwLCAuY29sLW1kLTExLCAuY29sLW1kLTEyIHtcbiAgICBmbG9hdDogbGVmdDtcbn1cbn1cblxuI3R4dE1lbWJlck5hbWUuZm9ybS1jb250cm9sIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcbiAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcblxuICBjb2xvcjogaW5oZXJpdDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6IDZweCAxMnB4O1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI0NDQyAhaW1wb3J0YW50O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI0NDQyAhaW1wb3J0YW50O1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjQ0NDICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMzZjYzk1ICFpbXBvcnRhbnQ7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xuICAgaGVpZ2h0OiAwcHggIWltcG9ydGFudDtcbiAgIHBhZGRpbmc6IDBweCAhaW1wb3J0YW50O1xuXG59XG4uZm9ybS1jb250cm9sIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcbiAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcblxuICBjb2xvcjogaW5oZXJpdDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6IDZweCAxMnB4O1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI0NDQyAhaW1wb3J0YW50O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI0NDQyAhaW1wb3J0YW50O1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjQ0NDICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMzZjYzk1ICFpbXBvcnRhbnQ7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xuXG59XG4uZm9ybWNvbnRyb2wudWktZHJvcGRvd257XG4gICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xuICAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcblxuICAgY29sb3I6IGluaGVyaXQ7XG4gICBkaXNwbGF5OiBibG9jaztcbiAgIHBhZGRpbmc6IDZweCAxMnB4O1xuICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbiAgIGZvbnQtc2l6ZTogMTRweDtcbiAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI0NDQyAhaW1wb3J0YW50O1xuICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNDQ0MgIWltcG9ydGFudDtcbiAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNDQ0MgIWltcG9ydGFudDtcbiAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMzZjYzk1ICFpbXBvcnRhbnQ7XG4gICAtbW96LWJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xuICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAwcHggIWltcG9ydGFudDtcbiAgIGJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xuIH1cblxuLmNob3Nlbi1jb250YWluZXItc2luZ2xlIC5jaG9zZW4tc2luZ2xlIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlICFpbXBvcnRhbnQ7XG4gIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XG4gIG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDtcbiAgcGFkZGluZzogNXB4IDEycHggIWltcG9ydGFudDtcbiAgaGVpZ2h0OiAzNHB4ICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI0NDQyAhaW1wb3J0YW50O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI0NDQyAhaW1wb3J0YW50O1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjQ0NDICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMzdjYjk1ICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xuICAtbW96LWJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG4gIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcbiAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcbiAgY29sb3I6ICM1NTU7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XG59XG5cbi5jaG9zZW4tY29udGFpbmVyLXNpbmdsZSAuY2hvc2VuLXNpbmdsZSB7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIC1tb3otYm94LXNoYWRvdzogbm9uZTtcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBub25lO1xuICBib3gtc2hhZG93OiBub25lO1xuICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMzdjYjk1ICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xuICBjdXJzb3I6IHRleHQ7XG4gIGhlaWdodDogYXV0byAhaW1wb3J0YW50O1xuICBtYXJnaW46IDA7XG4gIG1pbi1oZWlnaHQ6IDMwcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBhZGRpbmc6IDRweCAxMnB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uY2hvc2VuLWNvbnRhaW5lci1zaW5nbGUgLmNob3Nlbi1kcm9wIHtcbiAgbWFyZ2luLXRvcDogLTFweDtcbiAgYm9yZGVyLXJhZGl1czogMCAwIDRweCA0cHg7XG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG59XG5cbi5jaG9zZW4tY29udGFpbmVyIC5jaG9zZW4tZHJvcCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxMDAlO1xuICBsZWZ0OiAtOTk5OXB4O1xuICB6LWluZGV4OiAxMDEwO1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2FhYTtcbiAgYm9yZGVyLXRvcDogMDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm94LXNoYWRvdzogMCA0cHggNXB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi5jaG9zZW4tY29udGFpbmVyICoge1xuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuLmNob3Nlbi1jb250YWluZXItc2luZ2xlIC5jaG9zZW4tc2VhcmNoIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiAxMDEwO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDNweCA0cHg7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi5jaG9zZW4tY29udGFpbmVyIC5jaG9zZW4tcmVzdWx0cyB7XG4gIGNvbG9yOiAjNDQ0O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgbWFyZ2luOiAwIDRweCA0cHggMDtcbiAgcGFkZGluZzogMCAwIDAgNHB4O1xuICBtYXgtaGVpZ2h0OiAyNDBweDtcbiAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xufVxuLmNob3Nlbi1jb250YWluZXItc2luZ2xlIC5jaG9zZW4tc2luZ2xlIGRpdiBiIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1hcmdpbi10b3A6IDVweDtcblxufVxuYiwgc3Ryb25nIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4uY2hvc2VuLWNvbnRhaW5lci1zaW5nbGUgLmNob3Nlbi1zaW5nbGUgZGl2IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDE4cHg7XG4gIGhlaWdodDogMTAwJTtcbn1cbjpob3N0ID4+Pi51aS1kcm9wZG93biB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgbWluLXdpZHRoOiAxMi41ZW07XG59XG5cbmJvZHkgLnVpLWRyb3Bkb3duIHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2E2YTZhNjtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMnM7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI0NDQyAhaW1wb3J0YW50O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI0NDQyAhaW1wb3J0YW50O1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjQ0NDICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMzZjYzk1ICFpbXBvcnRhbnQ7XG59XG4uYnRuLXByaW1hcnkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjODQ4NDg0O1xuICBib3JkZXItY29sb3I6ICM5OTk5OTk7XG4gIGNvbG9yOiAjRkZGRkZGO1xuICAtbW96LWJveC1zaGFkb3c6IDAgOHB4IDdweCByZ2JhKDAsIDAsIDAsIDAuMjIpO1xuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgOHB4IDdweCByZ2JhKDAsIDAsIDAsIDAuMjIpO1xuICBib3gtc2hhZG93OiAwIDhweCA3cHggcmdiYSgwLCAwLCAwLCAwLjIyKTtcbn1cbi5idG4ge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBhZGRpbmc6IDZweCAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAwO1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBsaW5lLWhlaWdodDogMS40Mjg1NzE0MztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAtbXMtdG91Y2gtYWN0aW9uOiBtYW5pcHVsYXRpb247XG4gIHRvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG5cbi53cmFwcGVyLWNvbnRlbnQge1xuICBwYWRkaW5nOiAyMHB4IDEwcHggNDBweDtcbiAgZm9udC1mYW1pbHk6IFwib3BlbiBzYW5zXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgY29sb3I6ICM2NzZhNmM7XG59XG4udGFibGUtcmVzcG9uc2l2ZSB7XG4gIG1pbi1oZWlnaHQ6IC4wMSU7XG4gIG92ZXJmbG93LXg6IGF1dG87XG59XG4ubS1iLXNtIHtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cbi5tLXQtbi14bCB7XG4gIG1hcmdpbi10b3A6IC00MHB4O1xufVxuLmlib3gtY29udGVudCB7XG4gIGNsZWFyOiBib3RoO1xufVxuLmlib3gtY29udGVudCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBwYWRkaW5nOiAxNXB4IDIwcHggMjBweCAyMHB4O1xuXG4gIC1tb3otYm9yZGVyLWltYWdlOiBub25lO1xuICAtby1ib3JkZXItaW1hZ2U6IG5vbmU7XG4gIC13ZWJraXQtYm9yZGVyLWltYWdlOiBub25lO1xuICBib3JkZXItaW1hZ2U6IG5vbmU7XG59XG5cbi5tb2RhbCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICB6LWluZGV4OiAxMDUwO1xuICBkaXNwbGF5OiBub25lO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XG4gIG91dGxpbmU6IDA7XG59XG4udGFibGUge1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxudGFibGUge1xuICBib3JkZXItc3BhY2luZzogMDtcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG4udGFibGUgPiB0aGVhZCA+IHRyID4gdGgsIC50YWJsZSA+IHRib2R5ID4gdHIgPiB0aCwgLnRhYmxlID4gdGZvb3QgPiB0ciA+IHRoLCAudGFibGUgPiB0aGVhZCA+IHRyID4gdGQsIC50YWJsZSA+IHRib2R5ID4gdHIgPiB0ZCwgLnRhYmxlID4gdGZvb3QgPiB0ciA+IHRkIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlN2VhZWM7XG4gIGxpbmUtaGVpZ2h0OiAxLjQyODU3O1xuICBwYWRkaW5nOiA4cHg7XG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gIHdpZHRoOiA1JTtcbn1cbi5jdXN0b21wYWdpbmF0aW9uIHtcbiAgbWFyZ2luOiAxMHB4IDA7XG59XG4ucHVsbC1yaWdodCB7XG4gIGZsb2F0OiByaWdodCAhaW1wb3J0YW50O1xufVxuLmN1c3RvbXBhZ2luYXRpb24gLnBhZ2VySW5mbyB7XG4gIG1hcmdpbi10b3A6IC0xMHB4O1xufVxuLmxhYmVsIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2QxZGFkZTtcbiAgY29sb3I6ICM1ZTVlNWU7XG4gIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJztcbiAgZm9udC1zaXplOiAxMHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBwYWRkaW5nOiAzcHggOHB4O1xuICB0ZXh0LXNoYWRvdzogbm9uZTtcbn1cbi5jdXN0b21wYWdpbmF0aW9uIHVsID4gbGkge1xuICBkaXNwbGF5OiBpbmxpbmU7XG59XG4uY3VzdG9tcGFnaW5hdGlvbiB1bCA+IGxpID4gc2VsZWN0IHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIGhlaWdodDogMzBweDtcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZGRkZDtcbiAgYm9yZGVyLWxlZnQtd2lkdGg6IDA7XG59XG4uY3VzdG9tcGFnaW5hdGlvbiB1bCA+IGxpOmxhc3QtY2hpbGQgPiBhLCAuY3VzdG9tcGFnaW5hdGlvbiB1bCA+IGxpOmxhc3QtY2hpbGQgPiBzcGFuIHtcbiAgLXdlYmtpdC1ib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNHB4O1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNHB4O1xuICAtd2Via2l0LWJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA0cHg7XG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA0cHg7XG4gIC1tb3otYm9yZGVyLXJhZGl1cy10b3ByaWdodDogNHB4O1xuICAtbW96LWJvcmRlci1yYWRpdXMtYm90dG9tcmlnaHQ6IDRweDtcbn1cbi5jdXN0b21wYWdpbmF0aW9uIHVsID4gbGkgPiBhLCAuY3VzdG9tcGFnaW5hdGlvbiB1bCA+IGxpID4gc3BhbiB7XG4gIGZsb2F0OiBsZWZ0O1xuICBwYWRkaW5nOiA0cHggMTJweDtcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZGRkZDtcbiAgYm9yZGVyLWxlZnQtd2lkdGg6IDA7XG59XG5cbi50YWJsZSA+IGNhcHRpb24gKyB0aGVhZCA+IHRyOmZpcnN0LWNoaWxkID4gdGgsIC50YWJsZSA+IGNvbGdyb3VwICsgdGhlYWQgPiB0cjpmaXJzdC1jaGlsZCA+IHRoLCAudGFibGUgPiB0aGVhZDpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkID4gdGgsIC50YWJsZSA+IGNhcHRpb24gKyB0aGVhZCA+IHRyOmZpcnN0LWNoaWxkID4gdGQsIC50YWJsZSA+IGNvbGdyb3VwICsgdGhlYWQgPiB0cjpmaXJzdC1jaGlsZCA+IHRkLCAudGFibGUgPiB0aGVhZDpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkID4gdGQge1xuICBib3JkZXItdG9wOiAwO1xufVxuLmNvbC14cy0xLCAuY29sLXNtLTEsIC5jb2wtbWQtMSwgLmNvbC1sZy0xLCAuY29sLXhzLTIsIC5jb2wtc20tMiwgLmNvbC1tZC0yLCAuY29sLWxnLTIsIC5jb2wteHMtMywgLmNvbC1zbS0zLCAuY29sLW1kLTMsIC5jb2wtbGctMywgLmNvbC14cy00LCAuY29sLXNtLTQsIC5jb2wtbWQtNCwgLmNvbC1sZy00LCAuY29sLXhzLTUsIC5jb2wtc20tNSwgLmNvbC1tZC01LCAuY29sLWxnLTUsIC5jb2wteHMtNiwgLmNvbC1zbS02LCAuY29sLW1kLTYsIC5jb2wtbGctNiwgLmNvbC14cy03LCAuY29sLXNtLTcsIC5jb2wtbWQtNywgLmNvbC1sZy03LCAuY29sLXhzLTgsIC5jb2wtc20tOCwgLmNvbC1tZC04LCAuY29sLWxnLTgsIC5jb2wteHMtOSwgLmNvbC1zbS05LCAuY29sLW1kLTksIC5jb2wtbGctOSwgLmNvbC14cy0xMCwgLmNvbC1zbS0xMCwgLmNvbC1tZC0xMCwgLmNvbC1sZy0xMCwgLmNvbC14cy0xMSwgLmNvbC1zbS0xMSwgLmNvbC1tZC0xMSwgLmNvbC1sZy0xMSwgLmNvbC14cy0xMiwgLmNvbC1zbS0xMiwgLmNvbC1tZC0xMiwgLmNvbC1sZy0xMiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWluLWhlaWdodDogMXB4O1xuICBwYWRkaW5nLWxlZnQ6IDE1cHg7XG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7XG59XG4uYnRuLXdhcm5pbmcge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhhYzU5O1xuICBib3JkZXItY29sb3I6ICNmOGFjNTk7XG4gIGNvbG9yOiAjRkZGRkZGO1xufVxuLmJ0bi1zbSwgLmJ0bi1ncm91cC1zbSA+IC5idG4ge1xuICBwYWRkaW5nOiA1cHggMTBweDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBsaW5lLWhlaWdodDogMS41O1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG59XG4udGFibGUtc3RyaXBlZCA+IHRib2R5ID4gdHI6bnRoLW9mLXR5cGUob2RkKSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XG59XG5cbi5pbm1vZGFsIC5tb2RhbC1ib2R5IHtcbiAgYmFja2dyb3VuZDogI2Y4ZmFmYjtcbn1cbi5tb2RhbC1ib2R5IHtcbiAgcGFkZGluZzogMjBweCAzMHB4IDMwcHggMzBweDtcbn1cbi5tb2RhbC1ib2R5IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiAxNXB4O1xufVxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KXtcbi5jb2wtc20tMyB7XG4gICAgd2lkdGg6IDI1JTtcbn1cbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KXtcbi5jb2wtc20tMSwgLmNvbC1zbS0yLCAuY29sLXNtLTMsIC5jb2wtc20tNCwgLmNvbC1zbS01LCAuY29sLXNtLTYsIC5jb2wtc20tNywgLmNvbC1zbS04LCAuY29sLXNtLTksIC5jb2wtc20tMTAsIC5jb2wtc20tMTEsIC5jb2wtc20tMTIge1xuICAgIGZsb2F0OiBsZWZ0O1xufVxufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpe1xuLmNvbC1zbS00IHtcbiAgICB3aWR0aDogMzMuMzMzMzMzMzMlO1xufVxufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpe1xuLmNvbC1zbS0xLCAuY29sLXNtLTIsIC5jb2wtc20tMywgLmNvbC1zbS00LCAuY29sLXNtLTUsIC5jb2wtc20tNiwgLmNvbC1zbS03LCAuY29sLXNtLTgsIC5jb2wtc20tOSwgLmNvbC1zbS0xMCwgLmNvbC1zbS0xMSwgLmNvbC1zbS0xMiB7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gIH1cbn1cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCl7XG4uY29sLXNtLTIge1xuICAgIHdpZHRoOiAxNi42NjY2NjY2NyU7XG59XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCl7XG4uY29sLXNtLTEsIC5jb2wtc20tMiwgLmNvbC1zbS0zLCAuY29sLXNtLTQsIC5jb2wtc20tNSwgLmNvbC1zbS02LCAuY29sLXNtLTcsIC5jb2wtc20tOCwgLmNvbC1zbS05LCAuY29sLXNtLTEwLCAuY29sLXNtLTExLCAuY29sLXNtLTEyIHtcbiAgICBmbG9hdDogbGVmdDtcbn1cbn1cblxubGFiZWwge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbmxhYmVsLCAuYnRuLCAubmF2LXRhYnMgPiBsaSA+IGEsIC5iYWRnZSB7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcbn1cbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCl7XG4uY29sLW1kLTEyIHtcbiAgICB3aWR0aDogMTAwJTtcbn1cbn1cbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCl7XG4uY29sLW1kLTYge1xuICAgIHdpZHRoOiA1MCU7XG59XG59XG4uZm9ydW0tY29udGFpbmVyLCAuZm9ydW0tcG9zdC1jb250YWluZXIge1xuICBwYWRkaW5nOiAzMHB4ICFpbXBvcnRhbnQ7XG59XG4ucGFuZWwtYm9keSB7XG4gIHBhZGRpbmc6IDE1cHg7XG59XG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpe1xuLmNvbC1zbS0zIHtcbiAgICB3aWR0aDogMjUlO1xufVxufVxuXG4uY2hvc2VuLWNvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBmb250LXNpemU6IDEzcHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpe1xuLmNvbC1tZC0zIHtcbiAgICB3aWR0aDogMjUlO1xufVxufVxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KXtcbi5jb2wtbWQtMSB7XG4gICAgd2lkdGg6IDguMzMzMzMzMzMlO1xufVxufVxuXG5idXR0b24sIGh0bWwgaW5wdXRbdHlwZT1cImJ1dHRvblwiXSwgaW5wdXRbdHlwZT1cInJlc2V0XCJdLCBpbnB1dFt0eXBlPVwic3VibWl0XCJdIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnAtbC1zbSB7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xufVxuXG4uYnRuLWRhbmdlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZDU1NjU7XG4gIGJvcmRlci1jb2xvcjogI2VkNTU2NTtcbiAgY29sb3I6ICNGRkZGRkY7XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCl7XG4uY29sLXNtLTYge1xuICAgIHdpZHRoOiA1MCU7XG59XG59XG5cbmRpdi50YWdzaW5wdXQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGFkYWRhO1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBwYWRkaW5nOiA1cHg7XG4gIHdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgLW1zLWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbmRpdi50YWdzaW5wdXQgZGl2IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZsb2F0OiBsZWZ0O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCl7XG4uY29sLXNtLTYge1xuICAgIHdpZHRoOiA1MCU7XG59XG59XG5cbi5mb3JtLWdyb3VwIHtcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KXtcbi5jb2wtc20tNCB7XG4gICAgd2lkdGg6IDMzLjMzMzMzMzMzJTtcbn1cbn1cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCl7XG4uY29sLXNtLTgge1xuICAgIHdpZHRoOiA2Ni42NjY2NjY2NyU7XG59XG59XG5AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpe1xuLmNvbC1tZC0zIHtcbiAgICB3aWR0aDogMjUlO1xufVxufVxuLmltZy1yZXNwb25zaXZlLCAudGh1bWJuYWlsID4gaW1nLCAudGh1bWJuYWlsIGEgPiBpbWcsIC5jYXJvdXNlbC1pbm5lciA+IC5pdGVtID4gaW1nLCAuY2Fyb3VzZWwtaW5uZXIgPiAuaXRlbSA+IGEgPiBpbWcge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IGF1dG87XG59XG4uaW5tb2RhbCAubW9kYWwtaGVhZGVyIHtcbiAgcGFkZGluZzogMzBweCAxNXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5tb2RhbC1oZWFkZXIge1xuICBwYWRkaW5nOiAxNXB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2U1ZTVlNTtcbn1cbmgzLCBoNCwgaDUge1xuICBtYXJnaW4tdG9wOiA1cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5oMyB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbn1cbi5tb2RhbC1jb250ZW50IHtcbiAgLW1vei1iYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xuICAtd2Via2l0LWJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMCk7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogNHB4O1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAtbW96LWJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMyk7XG4gIC13ZWJraXQtYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgb3V0bGluZTogMCBub25lO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cblxuYm9keSAudWktZHJvcGRvd24tcGFuZWwgLnVpLWRyb3Bkb3duLWl0ZW1zIC51aS1kcm9wZG93bi1pdGVtLnVpLXN0YXRlLWhpZ2hsaWdodCwgYm9keSAudWktZHJvcGRvd24tcGFuZWwgLnVpLWRyb3Bkb3duLWl0ZW1zIC51aS1kcm9wZG93bi1pdGVtLWdyb3VwLnVpLXN0YXRlLWhpZ2hsaWdodCB7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzZjYzk1IDtcbn1cbjpob3N0IHtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzNmNjOTUgO1xuICA7XG59XG4uaW5tb2RhbCAubW9kYWwtaGVhZGVyIHtcbiAgcGFkZGluZzogMzBweCAxNXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4ubW9kYWwtaGVhZGVyIHtcbiAgcGFkZGluZzogMTVweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlNWU1ZTU7XG59XG5cbi5pbm1vZGFsIC5tb2RhbC1ib2R5IHtcbiAgYmFja2dyb3VuZDogI2Y4ZmFmYjtcbn1cbi5tb2RhbC1ib2R5IHtcbiAgcGFkZGluZzogMjBweCAzMHB4IDMwcHggMzBweDtcbn1cbi5tb2RhbC1ib2R5IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiAxNXB4O1xufVxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KXtcbi5jb2wtbWQtNCB7XG4gICAgd2lkdGg6IDMzLjMzMzMzMzMzJTtcbn1cbn1cbmEge1xuICBjb2xvcjogIzMzN2FiNztcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuXG5hIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYnRuLXhzLCAuYnRuLWdyb3VwLXhzID4gLmJ0biB7XG4gIHBhZGRpbmc6IDFweCA1cHg7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xufVxuXG4ubW9kYWwtZm9vdGVyIHtcbiAgbWFyZ2luLXRvcDogMDtcbn1cblxuLm1vZGFsLWZvb3RlciB7XG4gIHBhZGRpbmc6IDE1cHg7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2U1ZTVlNTtcbn1cbi5tb2RhbC1iYWNrZHJvcC5pbiB7XG4gIGZpbHRlcjogYWxwaGEob3BhY2l0eT01MCk7XG4gIG9wYWNpdHk6IC41O1xufVxuXG4ubW9kYWwtYmFja2Ryb3Age1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgei1pbmRleDogMTA0MDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbn1cbi5mb3JtLWNvbnRyb2xbZGlzYWJsZWRdLCAuZm9ybS1jb250cm9sW3JlYWRvbmx5XSwgZmllbGRzZXRbZGlzYWJsZWRdIC5mb3JtLWNvbnRyb2wge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQ0NDO1xuICBvcGFjaXR5OiAxO1xufVxuXG4gLm1vZGFsLXNpemV7XG5cbiAgIG1heC13aWR0aDogNTYwcHg7XG4gfVxuXG4gLnVpLWRpYWxvZy1jb250ZW50LnVpLXdpZGdldC1jb250ZW50IHtcbiAgIHdpZHRoOiA1NjBweDtcbiB9XG46aG9zdCB7XG5cbiAgICB3aWR0aDogNTYwcHg7XG4gIH1cblxudGV4dGFyZWF7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogaW5oZXJpdDtcbiAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyZXk7XG59XG4uZm9ybS1ncm91cCB7XG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG59XG4uaWNoZWNrYm94X3NxdWFyZS1ncmVlbiB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZGlzcGxheTogaW5saW5lO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIHdpZHRoOiAyMnB4O1xuICBoZWlnaHQ6IDIycHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLm1vZGFsLWZvb3RlciAuYnRuICsgLmJ0biB7XG4gIG1hcmdpbi1ib3R0b206IDA7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG5cbi5uZy10bnMtYzQtNntcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuLm5nLXRucy1jNC03e1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xufVxuXG4ubmctdG5zLWM0LTE5e1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xufVxuXG4ubmctdG5zLWM0LTIwe1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xufVxuXG4vKiBwYW5lbCBzdGFydCAqL1xuXG4ucGFuZWwtaGVhZGluZyB7XG4gIHBhZGRpbmc6IDEwcHggMTVweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAzcHg7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzcHg7XG4gIHBhZGRpbmctbGVmdDogMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMHB4O1xuICBwYWRkaW5nLXJpZ2h0OiAwcHg7XG4gIHBhZGRpbmctdG9wOiAwcHg7XG59XG5cbi5uYXYgPiBsaS5hY3RpdmUgPiBhIHtcbiAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGJhY2tncm91bmQ6ICMxOWFhOGQgIWltcG9ydGFudDtcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7XG59XG4ubWFyZ2lue1xuICBtYXJnaW4tdG9wOiAyNXB4O1xufVxuLyogcGFuZWwgZW5kICovXG5cbiNzdHlsZXtcbiAgbWFyZ2luLXRvcDogMzVweDtcbn1cblxuXG5cbi8vIHN1aml0IHN0YXJ0XG5cbiNlZGl0QXBwdCAudWktZGlhbG9nIHtcbiAgd2lkdGg6IDEyMDBweDtcbiAgLy8gbGVmdDogNTAwcHggIWltcG9ydGFudDtcbiAgdG9wOiA1MHB4O1xuICB6LWluZGV4OiAxMDA7XG59XG4jZWRpdEFwcHQgLnVpLWRpYWxvZyAudWktZGlhbG9nLWNvbnRlbnQge1xuICBoZWlnaHQ6IDUyMHB4O1xuICBvdmVyZmxvdzogYXV0bztcbn1cbiNzZWFyY2hQcm92IC51aS1kaWFsb2cge1xuICB3aWR0aDogMTAwMHB4O1xuICAvLyBsZWZ0OiA1MDBweCAhaW1wb3J0YW50O1xuICB0b3A6IDUwcHg7XG4gIHotaW5kZXg6IDEwMDtcbn1cbiNzZWFyY2hQcm92IC51aS1kaWFsb2cgLnVpLWRpYWxvZy1jb250ZW50IHtcbiAgaGVpZ2h0OiA1MjBweDtcbiAgb3ZlcmZsb3c6IGF1dG87XG59XG46Om5nLWRlZXAgI2VkaXRFcGlzb2RlIC51aS1kaWFsb2cge1xuICB3aWR0aDogMTAwMHB4O1xuICAvLyBsZWZ0OiA1MDBweCAhaW1wb3J0YW50O1xuICB0b3A6IDUwcHg7XG4gIHotaW5kZXg6IDEwMDtcbn1cbjo6bmctZGVlcCAjZWRpdEVwaXNvZGUgLnVpLWRpYWxvZyAudWktZGlhbG9nLWNvbnRlbnQge1xuICBoZWlnaHQ6IDM1MHB4O1xuICBvdmVyZmxvdzogYXV0bztcbn1cbjo6bmctZGVlcCAjY2FzZU1hbmdtZW1vIC51aS1kaWFsb2cge1xuICB3aWR0aDogNjAwcHg7XG4gIC8vIGxlZnQ6IDcwMHB4ICFpbXBvcnRhbnQ7XG4gIHRvcDogNTBweDtcbiAgei1pbmRleDogMTAwO1xufVxuOjpuZy1kZWVwICNjYXNlTWFuZ21lbW8gLnVpLWRpYWxvZyAudWktZGlhbG9nLWNvbnRlbnQge1xuICBoZWlnaHQ6IDIwMHB4O1xuICBvdmVyZmxvdzogYXV0bztcbn1cbjo6bmctZGVlcCAjYWRkbW9wIC51aS1kaWFsb2cge1xuICB3aWR0aDogNjAwcHg7XG4gIC8vIGxlZnQ6IDcwMHB4ICFpbXBvcnRhbnQ7XG4gIHRvcDogNTBweDtcbiAgei1pbmRleDogMTAwO1xufVxuOjpuZy1kZWVwICNhZGRtb3AgLnVpLWRpYWxvZyAudWktZGlhbG9nLWNvbnRlbnQge1xuICBoZWlnaHQ6IDIyMHB4O1xuICBvdmVyZmxvdzogYXV0bztcbn1cbjo6bmctZGVlcCAjYWRkbWVtbyAudWktZGlhbG9nIHtcbiAgd2lkdGg6IDYwMHB4O1xuICAvLyBsZWZ0OiA1MDBweCAhaW1wb3J0YW50O1xuICB0b3A6IDUwcHg7XG4gIHotaW5kZXg6IDEwMDtcbn1cbjo6bmctZGVlcCAjYWRkbWVtbyAudWktZGlhbG9nIC51aS1kaWFsb2ctY29udGVudCB7XG4gIGhlaWdodDogMjIwcHg7XG4gIG92ZXJmbG93OiBhdXRvO1xufVxuOjpuZy1kZWVwICN0YWdtZW1iZXIgLnVpLWRpYWxvZyB7XG4gIHdpZHRoOiAxMDAwcHg7XG4gIC8vIGxlZnQ6IDUwMHB4ICFpbXBvcnRhbnQ7XG4gIHRvcDogNTBweDtcbiAgei1pbmRleDogMTAwO1xufVxuOjpuZy1kZWVwICN0YWdtZW1iZXIgLnVpLWRpYWxvZyAudWktZGlhbG9nLWNvbnRlbnQge1xuICBoZWlnaHQ6IDU1MHB4O1xuICBvdmVyZmxvdzogYXV0bztcbn1cbi51aS1jYWxlbmRhciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xufVxuLnVpLWlucHV0Z3JvdXAgLnVpLWlucHV0dGV4dCB7XG4gIHBhZGRpbmctbGVmdDogLjVlbTtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuLyogRHJvcCBEb3duIExpc3QgU3RhcnQqL1xuXG5ib2R5IHtwYWRkaW5nOiAzMHB4OyBwb3NpdGlvbjogcmVsYXRpdmV9XG4gICAgICAgIC5zb3J0YWJsZS1pdGVtIHtcbiAgICAgIHBhZGRpbmc6IDZweCAxMnB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNGVtO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgY3Vyc29yOiBncmFiO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICBib3JkZXItY29sb3I6ICNhZGFkYWQ7XG4gICAgfVxuXG4gICAgLnNvcnRhYmxlLWl0ZW0tYWN0aXZlIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlNmU2ZTY7XG4gICAgICBib3gtc2hhZG93OiBpbnNldCAwIDNweCA1cHggcmdiYSgwLDAsMCwuMTI1KTtcbiAgICB9XG5cbiAgICAuc29ydGFibGUtd3JhcHBlciB7XG4gICAgICBtaW4taGVpZ2h0OiAxNTBweDtcbiAgICB9XG4gICAgI3NlYXJjaFN1cmdlcnlQb3B1cCAudWktZGlhbG9ne1xuXHQgICAgei1pbmRleDogMTAxMTtcblx0ICAgIGxlZnQ6IDQwMHB4ICFpbXBvcnRhbnQ7XG5cdCAgICB0b3A6IDQwcHggIWltcG9ydGFudDtcblx0ICAgIHRyYW5zZm9ybTogbm9uZTtcblx0ICAgIG9wYWNpdHk6IDE7XG5cdCAgICB3aWR0aDogOTAwcHggIWltcG9ydGFudDtcbiAgICB9XG5cbi8qIERyb3AgRG93biBMaXN0IEVuZCAqL1xuXG5cbi8vIERyb3AgRG93biBMaXN0IFN0YXJ0XG5cbjpob3N0eyAvLyBkcm9wZG93biBjb2xvclxuICA6Om5nLWRlZXAgICNwd3Nkcm9wZG93biAudWktZHJvcGRvd24ge1xuICAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICAgICBib3JkZXI6IDFweCBzb2xpZCAjYTZhNmE2O1xuICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzM2Y2M5NSAhaW1wb3J0YW50O1xuICAgICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4ycztcbiAgICAgYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XG4gICAgIHdpZHRoOiAyMHB4O1xuICAgICB9XG4gICB9XG5cbiAgIDo6bmctZGVlcCBib2R5IC51aS1kcm9wZG93bi1wYW5lbCAudWktZHJvcGRvd24taXRlbXMgLnVpLWRyb3Bkb3duLWl0ZW0udWktc3RhdGUtaGlnaGxpZ2h0LCBib2R5IC51aS1kcm9wZG93bi1wYW5lbCAudWktZHJvcGRvd24taXRlbXMgLnVpLWRyb3Bkb3duLWl0ZW0tZ3JvdXAudWktc3RhdGUtaGlnaGxpZ2h0IHtcbiAgICBjb2xvcjogI2ZmZmZmZjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhOTZiO1xufVxuXG4vLyBEcm9wIERvd24gTGlzdCBFbmRcblxuLy8gc3VqaXQgZW5kXG4jY29sbGFwc2Uxe1xuICBvdmVyZmxvdy14OnNjcm9sbDtcbiAgLy8gIGhlaWdodDo0MDBweCAhaW1wb3J0YW50O1xufVxuLnRhYmxlRGl2e1xuICBoZWlnaHQ6IGF1dG87XG4gIG1hcmdpbi1ib3R0b206IDEwMHB4ICFpbXBvcnRhbnQ7XG59XG4ubGlUaXRsZXtcbiAgcGFkZGluZy10b3A6IDhweDtcbiAgaGVpZ2h0OiA0MHB4O1xuICBiYWNrZ3JvdW5kOiAjMTlhYThkICFpbXBvcnRhbnQ7XG4gIHdpZHRoOiAxNTBweDtcbn1cbiNtYXJnaW4xe1xubWFyZ2luLXRvcDogMTVweDtcbmRpc3BsYXk6IGlubGluZS10YWJsZTtcbn1cbi5pbnB1dC1ncm91cC1hZGRvbntcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRTVFNkU3O1xuICAgIC1tb3otYm9yZGVyLXJhZGl1czogMXB4O1xuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDFweDtcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICBsaW5lLWhlaWdodDogMTtcbiAgICBwYWRkaW5nOiA2cHggMTJweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbWFyZ2luLWxlZnQ6IDI1cHggIWltcG9ydGFudDtcbn1cblxuLmZhdl9GaWx0ZXJ7XG4gIHdpZHRoOiA5MCUgIWltcG9ydGFudDtcbn1cblxuLm5vcl9GaWx0ZXJ7XG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG59XG51bCNkcm9wZG93bi1iYXNpYyB7XG4gICBsZWZ0OiBhdXRvO1xuICAgcmlnaHQ6IDA7XG4gICBiYWNrZ3JvdW5kLWNvbG9yOiAjODQ4NDg0O1xuICAgY29sb3I6ICNGRkZGRkY7XG59XG5ociB7XG4gIG1hcmdpbi10b3A6IDFyZW07XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGJvcmRlcjogMDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG50aGVhZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzMzdhYjc7XG4gIGNvbG9yOiB3aGl0ZVxufVxudGgudGhwcm92aWRlclNvcnQuaGVhZGVyU29ydC5zb3J0SWNvbmNoYW5nZS5uZy1zdGFyLWluc2VydGVkIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xufVxudHIubmctc3Rhci1pbnNlcnRlZCB7XG4gIGNvbG9yOiBibGFjayAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xufVxudGQubG5rVHJhdG1lbnRFcGlzb2RlLm5nLXN0YXItaW5zZXJ0ZWQge1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlICFpbXBvcnRhbnQ7XG4gIGN1cnNvcjpwb2ludGVyICFpbXBvcnRhbnQ7XG59XG5zcGFuLmJhZGdlLmJhZGdlLXdhcm5pbmcge1xuICBmb250LXNpemU6IDE0cHg7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogNXB4O1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuaS5mYS5mYS1jaGVjay1jaXJjbGUge1xuICBjb2xvcjogIzFhYjM5NFxufVxuc3Bhbi50cmFzaC5uZy1zdGFyLWluc2VydGVkIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuaW5wdXQjY2hrSXNTdGF0RmlsZVBEIHtcbiAgem9vbToxLjU7XG59XG4vLyAgZGVsZXRlIHBvcHVwIHN0YXJ0XG5cbjo6bmctZGVlcCAjZGVsZXRlZmF2cG9wdXAgLnVpLWRpYWxvZyB7XG4gIHdpZHRoOiAxMDAwcHg7XG4gIHRvcDogMjBweCAhaW1wb3J0YW50O1xuICB6LWluZGV4OiAxMDA7XG59XG46Om5nLWRlZXAgI2RlbGV0ZWZhdnBvcHVwIC51aS1kaWFsb2cgLnVpLWRpYWxvZy1jb250ZW50IHtcbmhlaWdodDogMzBweDtcbm92ZXJmbG93OiBhdXRvO1xufVxuOjpuZy1kZWVwICNkZWxldGVmYXZwb3B1cCAudWktZGlhbG9nIC51aS1kaWFsb2ctdGl0bGViYXIge1xuYm9yZGVyOiAwcHg7XG5iYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cbjo6bmctZGVlcCAjZGVsZXRlZmF2cG9wdXAgLnVpLWRpYWxvZyAudWktZGlhbG9nLWNvbnRlbnQge1xuYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG5jb2xvcjogIzMzMzMzMztcbmJvcmRlcjogMHB4O1xucGFkZGluZzogMC41NzFlbSAxZW07XG59XG46Om5nLWRlZXAgI2RlbGV0ZWZhdnBvcHVwICAudWktZGlhbG9nIC51aS1kaWFsb2ctZm9vdGVyIHtcbmJvcmRlcjogMHB4O1xuYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbmNvbG9yOiAjMzMzMzMzO1xucGFkZGluZzogMC41NzFlbSAxZW07XG5tYXJnaW46IDA7XG50ZXh0LWFsaWduOiByaWdodDtcbnBvc2l0aW9uOiByZWxhdGl2ZTtcbnRvcDogLTFweDtcbn1cblxuYS5idG4uYnRuLXNtYWxsLmJ0bi1kYW5nZXIucHVsbC1yaWdodCB7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICBjb2xvcjogd2hpdGU7XG59XG5hLmJ0bi5idG4tc3VjY2VzcyB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cbi8vIGRlbGV0ZSBwb3B1cGVuZFxuXG4iLCIucm93IHtcbiAgbWFyZ2luLXJpZ2h0OiAtMTVweDtcbiAgbWFyZ2luLWxlZnQ6IC0xNXB4O1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogMTIwMHB4KSB7XG4gIC5jb2wtbGctMTIge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59XG5AbWVkaWEgKG1pbi13aWR0aDogMTIwMHB4KSB7XG4gIC5jb2wtbGctMSwgLmNvbC1sZy0yLCAuY29sLWxnLTMsIC5jb2wtbGctNCwgLmNvbC1sZy01LCAuY29sLWxnLTYsIC5jb2wtbGctNywgLmNvbC1sZy04LCAuY29sLWxnLTksIC5jb2wtbGctMTAsIC5jb2wtbGctMTEsIC5jb2wtbGctMTIge1xuICAgIGZsb2F0OiBsZWZ0O1xuICB9XG59XG4uYm9yZGVyLWJvdHRvbSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTdlYWVjICFpbXBvcnRhbnQ7XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCkge1xuICAuY29sLW1kLTMge1xuICAgIHdpZHRoOiAyNSU7XG4gIH1cbn1cbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCkge1xuICAuY29sLW1kLTEsIC5jb2wtbWQtMiwgLmNvbC1tZC0zLCAuY29sLW1kLTQsIC5jb2wtbWQtNSwgLmNvbC1tZC02LCAuY29sLW1kLTcsIC5jb2wtbWQtOCwgLmNvbC1tZC05LCAuY29sLW1kLTEwLCAuY29sLW1kLTExLCAuY29sLW1kLTEyIHtcbiAgICBmbG9hdDogbGVmdDtcbiAgfVxufVxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XG4gIC5jb2wtbWQtMiB7XG4gICAgd2lkdGg6IDE2LjY2NjY2NjY3JTtcbiAgfVxufVxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XG4gIC5jb2wtbWQtMSwgLmNvbC1tZC0yLCAuY29sLW1kLTMsIC5jb2wtbWQtNCwgLmNvbC1tZC01LCAuY29sLW1kLTYsIC5jb2wtbWQtNywgLmNvbC1tZC04LCAuY29sLW1kLTksIC5jb2wtbWQtMTAsIC5jb2wtbWQtMTEsIC5jb2wtbWQtMTIge1xuICAgIGZsb2F0OiBsZWZ0O1xuICB9XG59XG4jdHh0TWVtYmVyTmFtZS5mb3JtLWNvbnRyb2wge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xuICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xuICBjb2xvcjogaW5oZXJpdDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6IDZweCAxMnB4O1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI0NDQyAhaW1wb3J0YW50O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI0NDQyAhaW1wb3J0YW50O1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjQ0NDICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMzZjYzk1ICFpbXBvcnRhbnQ7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDBweCAhaW1wb3J0YW50O1xuICBwYWRkaW5nOiAwcHggIWltcG9ydGFudDtcbn1cblxuLmZvcm0tY29udHJvbCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBkaXNwbGF5OiBibG9jaztcbiAgcGFkZGluZzogNnB4IDEycHg7XG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjQ0NDICFpbXBvcnRhbnQ7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjQ0NDICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNDQ0MgIWltcG9ydGFudDtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICMzNmNjOTUgIWltcG9ydGFudDtcbiAgLW1vei1ib3JkZXItcmFkaXVzOiAwcHggIWltcG9ydGFudDtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAwcHggIWltcG9ydGFudDtcbiAgYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5mb3JtY29udHJvbC51aS1kcm9wZG93biB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBkaXNwbGF5OiBibG9jaztcbiAgcGFkZGluZzogNnB4IDEycHg7XG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjQ0NDICFpbXBvcnRhbnQ7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjQ0NDICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNDQ0MgIWltcG9ydGFudDtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICMzNmNjOTUgIWltcG9ydGFudDtcbiAgLW1vei1ib3JkZXItcmFkaXVzOiAwcHggIWltcG9ydGFudDtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAwcHggIWltcG9ydGFudDtcbiAgYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5jaG9zZW4tY29udGFpbmVyLXNpbmdsZSAuY2hvc2VuLXNpbmdsZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZSAhaW1wb3J0YW50O1xuICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xuICBvdmVyZmxvdzogaGlkZGVuICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmc6IDVweCAxMnB4ICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogMzRweCAhaW1wb3J0YW50O1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNDQ0MgIWltcG9ydGFudDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNDQ0MgIWltcG9ydGFudDtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI0NDQyAhaW1wb3J0YW50O1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzM3Y2I5NSAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAtbW96LWJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xuICBib3JkZXItcmFkaXVzOiAwcHggIWltcG9ydGFudDtcbiAgLW1vei1iYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xuICAtd2Via2l0LWJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG4gIGNvbG9yOiAjNTU1O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xufVxuXG4uY2hvc2VuLWNvbnRhaW5lci1zaW5nbGUgLmNob3Nlbi1zaW5nbGUge1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICAtbW96LWJveC1zaGFkb3c6IG5vbmU7XG4gIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZTtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzM3Y2I5NSAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAtbW96LWJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xuICBib3JkZXItcmFkaXVzOiAwcHggIWltcG9ydGFudDtcbiAgY3Vyc29yOiB0ZXh0O1xuICBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudDtcbiAgbWFyZ2luOiAwO1xuICBtaW4taGVpZ2h0OiAzMHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nOiA0cHggMTJweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmNob3Nlbi1jb250YWluZXItc2luZ2xlIC5jaG9zZW4tZHJvcCB7XG4gIG1hcmdpbi10b3A6IC0xcHg7XG4gIGJvcmRlci1yYWRpdXM6IDAgMCA0cHggNHB4O1xuICBiYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xufVxuXG4uY2hvc2VuLWNvbnRhaW5lciAuY2hvc2VuLWRyb3Age1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTAwJTtcbiAgbGVmdDogLTk5OTlweDtcbiAgei1pbmRleDogMTAxMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNhYWE7XG4gIGJvcmRlci10b3A6IDA7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDVweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuXG4uY2hvc2VuLWNvbnRhaW5lciAqIHtcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbi5jaG9zZW4tY29udGFpbmVyLXNpbmdsZSAuY2hvc2VuLXNlYXJjaCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogMTAxMDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAzcHggNHB4O1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uY2hvc2VuLWNvbnRhaW5lciAuY2hvc2VuLXJlc3VsdHMge1xuICBjb2xvcjogIzQ0NDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIG1hcmdpbjogMCA0cHggNHB4IDA7XG4gIHBhZGRpbmc6IDAgMCAwIDRweDtcbiAgbWF4LWhlaWdodDogMjQwcHg7XG4gIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcbn1cblxuLmNob3Nlbi1jb250YWluZXItc2luZ2xlIC5jaG9zZW4tc2luZ2xlIGRpdiBiIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1hcmdpbi10b3A6IDVweDtcbn1cblxuYiwgc3Ryb25nIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5jaG9zZW4tY29udGFpbmVyLXNpbmdsZSAuY2hvc2VuLXNpbmdsZSBkaXYge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMThweDtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG46aG9zdCA+ID4gPiAudWktZHJvcGRvd24ge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIG1pbi13aWR0aDogMTIuNWVtO1xufVxuXG5ib2R5IC51aS1kcm9wZG93biB7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNhNmE2YTY7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjJzO1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNDQ0MgIWltcG9ydGFudDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNDQ0MgIWltcG9ydGFudDtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI0NDQyAhaW1wb3J0YW50O1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzM2Y2M5NSAhaW1wb3J0YW50O1xufVxuXG4uYnRuLXByaW1hcnkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjODQ4NDg0O1xuICBib3JkZXItY29sb3I6ICM5OTk5OTk7XG4gIGNvbG9yOiAjRkZGRkZGO1xuICAtbW96LWJveC1zaGFkb3c6IDAgOHB4IDdweCByZ2JhKDAsIDAsIDAsIDAuMjIpO1xuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgOHB4IDdweCByZ2JhKDAsIDAsIDAsIDAuMjIpO1xuICBib3gtc2hhZG93OiAwIDhweCA3cHggcmdiYSgwLCAwLCAwLCAwLjIyKTtcbn1cblxuLmJ0biB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcGFkZGluZzogNnB4IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDA7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGxpbmUtaGVpZ2h0OiAxLjQyODU3MTQzO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIC1tcy10b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjtcbiAgdG91Y2gtYWN0aW9uOiBtYW5pcHVsYXRpb247XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuLndyYXBwZXItY29udGVudCB7XG4gIHBhZGRpbmc6IDIwcHggMTBweCA0MHB4O1xuICBmb250LWZhbWlseTogXCJvcGVuIHNhbnNcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjb2xvcjogIzY3NmE2Yztcbn1cblxuLnRhYmxlLXJlc3BvbnNpdmUge1xuICBtaW4taGVpZ2h0OiAwLjAxJTtcbiAgb3ZlcmZsb3cteDogYXV0bztcbn1cblxuLm0tYi1zbSB7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cbi5tLXQtbi14bCB7XG4gIG1hcmdpbi10b3A6IC00MHB4O1xufVxuXG4uaWJveC1jb250ZW50IHtcbiAgY2xlYXI6IGJvdGg7XG59XG5cbi5pYm94LWNvbnRlbnQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBjb2xvcjogaW5oZXJpdDtcbiAgcGFkZGluZzogMTVweCAyMHB4IDIwcHggMjBweDtcbiAgLW1vei1ib3JkZXItaW1hZ2U6IG5vbmU7XG4gIC1vLWJvcmRlci1pbWFnZTogbm9uZTtcbiAgLXdlYmtpdC1ib3JkZXItaW1hZ2U6IG5vbmU7XG4gIGJvcmRlci1pbWFnZTogbm9uZTtcbn1cblxuLm1vZGFsIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6IDEwNTA7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcbiAgb3V0bGluZTogMDtcbn1cblxuLnRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxudGFibGUge1xuICBib3JkZXItc3BhY2luZzogMDtcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi50YWJsZSA+IHRoZWFkID4gdHIgPiB0aCwgLnRhYmxlID4gdGJvZHkgPiB0ciA+IHRoLCAudGFibGUgPiB0Zm9vdCA+IHRyID4gdGgsIC50YWJsZSA+IHRoZWFkID4gdHIgPiB0ZCwgLnRhYmxlID4gdGJvZHkgPiB0ciA+IHRkLCAudGFibGUgPiB0Zm9vdCA+IHRyID4gdGQge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2U3ZWFlYztcbiAgbGluZS1oZWlnaHQ6IDEuNDI4NTc7XG4gIHBhZGRpbmc6IDhweDtcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgd2lkdGg6IDUlO1xufVxuXG4uY3VzdG9tcGFnaW5hdGlvbiB7XG4gIG1hcmdpbjogMTBweCAwO1xufVxuXG4ucHVsbC1yaWdodCB7XG4gIGZsb2F0OiByaWdodCAhaW1wb3J0YW50O1xufVxuXG4uY3VzdG9tcGFnaW5hdGlvbiAucGFnZXJJbmZvIHtcbiAgbWFyZ2luLXRvcDogLTEwcHg7XG59XG5cbi5sYWJlbCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkMWRhZGU7XG4gIGNvbG9yOiAjNWU1ZTVlO1xuICBmb250LWZhbWlseTogXCJPcGVuIFNhbnNcIjtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBwYWRkaW5nOiAzcHggOHB4O1xuICB0ZXh0LXNoYWRvdzogbm9uZTtcbn1cblxuLmN1c3RvbXBhZ2luYXRpb24gdWwgPiBsaSB7XG4gIGRpc3BsYXk6IGlubGluZTtcbn1cblxuLmN1c3RvbXBhZ2luYXRpb24gdWwgPiBsaSA+IHNlbGVjdCB7XG4gIGZsb2F0OiBsZWZ0O1xuICBoZWlnaHQ6IDMwcHg7XG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGRkZGQ7XG4gIGJvcmRlci1sZWZ0LXdpZHRoOiAwO1xufVxuXG4uY3VzdG9tcGFnaW5hdGlvbiB1bCA+IGxpOmxhc3QtY2hpbGQgPiBhLCAuY3VzdG9tcGFnaW5hdGlvbiB1bCA+IGxpOmxhc3QtY2hpbGQgPiBzcGFuIHtcbiAgLXdlYmtpdC1ib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNHB4O1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNHB4O1xuICAtd2Via2l0LWJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA0cHg7XG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA0cHg7XG4gIC1tb3otYm9yZGVyLXJhZGl1cy10b3ByaWdodDogNHB4O1xuICAtbW96LWJvcmRlci1yYWRpdXMtYm90dG9tcmlnaHQ6IDRweDtcbn1cblxuLmN1c3RvbXBhZ2luYXRpb24gdWwgPiBsaSA+IGEsIC5jdXN0b21wYWdpbmF0aW9uIHVsID4gbGkgPiBzcGFuIHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIHBhZGRpbmc6IDRweCAxMnB4O1xuICBsaW5lLWhlaWdodDogMjBweDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkZGRkO1xuICBib3JkZXItbGVmdC13aWR0aDogMDtcbn1cblxuLnRhYmxlID4gY2FwdGlvbiArIHRoZWFkID4gdHI6Zmlyc3QtY2hpbGQgPiB0aCwgLnRhYmxlID4gY29sZ3JvdXAgKyB0aGVhZCA+IHRyOmZpcnN0LWNoaWxkID4gdGgsIC50YWJsZSA+IHRoZWFkOmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQgPiB0aCwgLnRhYmxlID4gY2FwdGlvbiArIHRoZWFkID4gdHI6Zmlyc3QtY2hpbGQgPiB0ZCwgLnRhYmxlID4gY29sZ3JvdXAgKyB0aGVhZCA+IHRyOmZpcnN0LWNoaWxkID4gdGQsIC50YWJsZSA+IHRoZWFkOmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQgPiB0ZCB7XG4gIGJvcmRlci10b3A6IDA7XG59XG5cbi5jb2wteHMtMSwgLmNvbC1zbS0xLCAuY29sLW1kLTEsIC5jb2wtbGctMSwgLmNvbC14cy0yLCAuY29sLXNtLTIsIC5jb2wtbWQtMiwgLmNvbC1sZy0yLCAuY29sLXhzLTMsIC5jb2wtc20tMywgLmNvbC1tZC0zLCAuY29sLWxnLTMsIC5jb2wteHMtNCwgLmNvbC1zbS00LCAuY29sLW1kLTQsIC5jb2wtbGctNCwgLmNvbC14cy01LCAuY29sLXNtLTUsIC5jb2wtbWQtNSwgLmNvbC1sZy01LCAuY29sLXhzLTYsIC5jb2wtc20tNiwgLmNvbC1tZC02LCAuY29sLWxnLTYsIC5jb2wteHMtNywgLmNvbC1zbS03LCAuY29sLW1kLTcsIC5jb2wtbGctNywgLmNvbC14cy04LCAuY29sLXNtLTgsIC5jb2wtbWQtOCwgLmNvbC1sZy04LCAuY29sLXhzLTksIC5jb2wtc20tOSwgLmNvbC1tZC05LCAuY29sLWxnLTksIC5jb2wteHMtMTAsIC5jb2wtc20tMTAsIC5jb2wtbWQtMTAsIC5jb2wtbGctMTAsIC5jb2wteHMtMTEsIC5jb2wtc20tMTEsIC5jb2wtbWQtMTEsIC5jb2wtbGctMTEsIC5jb2wteHMtMTIsIC5jb2wtc20tMTIsIC5jb2wtbWQtMTIsIC5jb2wtbGctMTIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1pbi1oZWlnaHQ6IDFweDtcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xuICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xufVxuXG4uYnRuLXdhcm5pbmcge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhhYzU5O1xuICBib3JkZXItY29sb3I6ICNmOGFjNTk7XG4gIGNvbG9yOiAjRkZGRkZGO1xufVxuXG4uYnRuLXNtLCAuYnRuLWdyb3VwLXNtID4gLmJ0biB7XG4gIHBhZGRpbmc6IDVweCAxMHB4O1xuICBmb250LXNpemU6IDEycHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbn1cblxuLnRhYmxlLXN0cmlwZWQgPiB0Ym9keSA+IHRyOm50aC1vZi10eXBlKG9kZCkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xufVxuXG4uaW5tb2RhbCAubW9kYWwtYm9keSB7XG4gIGJhY2tncm91bmQ6ICNmOGZhZmI7XG59XG5cbi5tb2RhbC1ib2R5IHtcbiAgcGFkZGluZzogMjBweCAzMHB4IDMwcHggMzBweDtcbn1cblxuLm1vZGFsLWJvZHkge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHBhZGRpbmc6IDE1cHg7XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAuY29sLXNtLTMge1xuICAgIHdpZHRoOiAyNSU7XG4gIH1cbn1cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAuY29sLXNtLTEsIC5jb2wtc20tMiwgLmNvbC1zbS0zLCAuY29sLXNtLTQsIC5jb2wtc20tNSwgLmNvbC1zbS02LCAuY29sLXNtLTcsIC5jb2wtc20tOCwgLmNvbC1zbS05LCAuY29sLXNtLTEwLCAuY29sLXNtLTExLCAuY29sLXNtLTEyIHtcbiAgICBmbG9hdDogbGVmdDtcbiAgfVxufVxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gIC5jb2wtc20tNCB7XG4gICAgd2lkdGg6IDMzLjMzMzMzMzMzJTtcbiAgfVxufVxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gIC5jb2wtc20tMSwgLmNvbC1zbS0yLCAuY29sLXNtLTMsIC5jb2wtc20tNCwgLmNvbC1zbS01LCAuY29sLXNtLTYsIC5jb2wtc20tNywgLmNvbC1zbS04LCAuY29sLXNtLTksIC5jb2wtc20tMTAsIC5jb2wtc20tMTEsIC5jb2wtc20tMTIge1xuICAgIGZsb2F0OiBsZWZ0O1xuICB9XG59XG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgLmNvbC1zbS0yIHtcbiAgICB3aWR0aDogMTYuNjY2NjY2NjclO1xuICB9XG59XG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgLmNvbC1zbS0xLCAuY29sLXNtLTIsIC5jb2wtc20tMywgLmNvbC1zbS00LCAuY29sLXNtLTUsIC5jb2wtc20tNiwgLmNvbC1zbS03LCAuY29sLXNtLTgsIC5jb2wtc20tOSwgLmNvbC1zbS0xMCwgLmNvbC1zbS0xMSwgLmNvbC1zbS0xMiB7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gIH1cbn1cbmxhYmVsIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDVweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbmxhYmVsLCAuYnRuLCAubmF2LXRhYnMgPiBsaSA+IGEsIC5iYWRnZSB7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XG4gIC5jb2wtbWQtMTIge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59XG5AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpIHtcbiAgLmNvbC1tZC02IHtcbiAgICB3aWR0aDogNTAlO1xuICB9XG59XG4uZm9ydW0tY29udGFpbmVyLCAuZm9ydW0tcG9zdC1jb250YWluZXIge1xuICBwYWRkaW5nOiAzMHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5wYW5lbC1ib2R5IHtcbiAgcGFkZGluZzogMTVweDtcbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gIC5jb2wtc20tMyB7XG4gICAgd2lkdGg6IDI1JTtcbiAgfVxufVxuLmNob3Nlbi1jb250YWluZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgZm9udC1zaXplOiAxM3B4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XG4gIC5jb2wtbWQtMyB7XG4gICAgd2lkdGg6IDI1JTtcbiAgfVxufVxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XG4gIC5jb2wtbWQtMSB7XG4gICAgd2lkdGg6IDguMzMzMzMzMzMlO1xuICB9XG59XG5idXR0b24sIGh0bWwgaW5wdXRbdHlwZT1idXR0b25dLCBpbnB1dFt0eXBlPXJlc2V0XSwgaW5wdXRbdHlwZT1zdWJtaXRdIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnAtbC1zbSB7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xufVxuXG4uYnRuLWRhbmdlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZDU1NjU7XG4gIGJvcmRlci1jb2xvcjogI2VkNTU2NTtcbiAgY29sb3I6ICNGRkZGRkY7XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAuY29sLXNtLTYge1xuICAgIHdpZHRoOiA1MCU7XG4gIH1cbn1cbmRpdi50YWdzaW5wdXQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGFkYWRhO1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBwYWRkaW5nOiA1cHg7XG4gIHdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgLW1zLWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbmRpdi50YWdzaW5wdXQgZGl2IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZsb2F0OiBsZWZ0O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAuY29sLXNtLTYge1xuICAgIHdpZHRoOiA1MCU7XG4gIH1cbn1cbi5mb3JtLWdyb3VwIHtcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gIC5jb2wtc20tNCB7XG4gICAgd2lkdGg6IDMzLjMzMzMzMzMzJTtcbiAgfVxufVxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gIC5jb2wtc20tOCB7XG4gICAgd2lkdGg6IDY2LjY2NjY2NjY3JTtcbiAgfVxufVxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XG4gIC5jb2wtbWQtMyB7XG4gICAgd2lkdGg6IDI1JTtcbiAgfVxufVxuLmltZy1yZXNwb25zaXZlLCAudGh1bWJuYWlsID4gaW1nLCAudGh1bWJuYWlsIGEgPiBpbWcsIC5jYXJvdXNlbC1pbm5lciA+IC5pdGVtID4gaW1nLCAuY2Fyb3VzZWwtaW5uZXIgPiAuaXRlbSA+IGEgPiBpbWcge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IGF1dG87XG59XG5cbi5pbm1vZGFsIC5tb2RhbC1oZWFkZXIge1xuICBwYWRkaW5nOiAzMHB4IDE1cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLm1vZGFsLWhlYWRlciB7XG4gIHBhZGRpbmc6IDE1cHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTVlNWU1O1xufVxuXG5oMywgaDQsIGg1IHtcbiAgbWFyZ2luLXRvcDogNXB4O1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG5oMyB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbn1cblxuLm1vZGFsLWNvbnRlbnQge1xuICAtbW96LWJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG4gIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcbiAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwKTtcbiAgLW1vei1ib3JkZXItcmFkaXVzOiA0cHg7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNHB4O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIC1tb3otYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xuICBib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xuICBvdXRsaW5lOiAwIG5vbmU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuYm9keSAudWktZHJvcGRvd24tcGFuZWwgLnVpLWRyb3Bkb3duLWl0ZW1zIC51aS1kcm9wZG93bi1pdGVtLnVpLXN0YXRlLWhpZ2hsaWdodCwgYm9keSAudWktZHJvcGRvd24tcGFuZWwgLnVpLWRyb3Bkb3duLWl0ZW1zIC51aS1kcm9wZG93bi1pdGVtLWdyb3VwLnVpLXN0YXRlLWhpZ2hsaWdodCB7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzZjYzk1O1xufVxuXG46aG9zdCB7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzZjYzk1O1xufVxuXG4uaW5tb2RhbCAubW9kYWwtaGVhZGVyIHtcbiAgcGFkZGluZzogMzBweCAxNXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5tb2RhbC1oZWFkZXIge1xuICBwYWRkaW5nOiAxNXB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2U1ZTVlNTtcbn1cblxuLmlubW9kYWwgLm1vZGFsLWJvZHkge1xuICBiYWNrZ3JvdW5kOiAjZjhmYWZiO1xufVxuXG4ubW9kYWwtYm9keSB7XG4gIHBhZGRpbmc6IDIwcHggMzBweCAzMHB4IDMwcHg7XG59XG5cbi5tb2RhbC1ib2R5IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiAxNXB4O1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpIHtcbiAgLmNvbC1tZC00IHtcbiAgICB3aWR0aDogMzMuMzMzMzMzMzMlO1xuICB9XG59XG5hIHtcbiAgY29sb3I6ICMzMzdhYjc7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxuYSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmJ0bi14cywgLmJ0bi1ncm91cC14cyA+IC5idG4ge1xuICBwYWRkaW5nOiAxcHggNXB4O1xuICBmb250LXNpemU6IDEycHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbn1cblxuLm1vZGFsLWZvb3RlciB7XG4gIG1hcmdpbi10b3A6IDA7XG59XG5cbi5tb2RhbC1mb290ZXIge1xuICBwYWRkaW5nOiAxNXB4O1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlNWU1ZTU7XG59XG5cbi5tb2RhbC1iYWNrZHJvcC5pbiB7XG4gIGZpbHRlcjogYWxwaGEob3BhY2l0eT01MCk7XG4gIG9wYWNpdHk6IDAuNTtcbn1cblxuLm1vZGFsLWJhY2tkcm9wIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6IDEwNDA7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XG59XG5cbi5mb3JtLWNvbnRyb2xbZGlzYWJsZWRdLCAuZm9ybS1jb250cm9sW3JlYWRvbmx5XSwgZmllbGRzZXRbZGlzYWJsZWRdIC5mb3JtLWNvbnRyb2wge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQ0NDO1xuICBvcGFjaXR5OiAxO1xufVxuXG4ubW9kYWwtc2l6ZSB7XG4gIG1heC13aWR0aDogNTYwcHg7XG59XG5cbi51aS1kaWFsb2ctY29udGVudC51aS13aWRnZXQtY29udGVudCB7XG4gIHdpZHRoOiA1NjBweDtcbn1cblxuOmhvc3Qge1xuICB3aWR0aDogNTYwcHg7XG59XG5cbnRleHRhcmVhIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiBpbmhlcml0O1xuICBsaW5lLWhlaWdodDogaW5oZXJpdDtcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JleTtcbn1cblxuLmZvcm0tZ3JvdXAge1xuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xufVxuXG4uaWNoZWNrYm94X3NxdWFyZS1ncmVlbiB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZGlzcGxheTogaW5saW5lO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIHdpZHRoOiAyMnB4O1xuICBoZWlnaHQ6IDIycHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ubW9kYWwtZm9vdGVyIC5idG4gKyAuYnRuIHtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbn1cblxuLm5nLXRucy1jNC02IHtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuLm5nLXRucy1jNC03IHtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuLm5nLXRucy1jNC0xOSB7XG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG59XG5cbi5uZy10bnMtYzQtMjAge1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xufVxuXG4vKiBwYW5lbCBzdGFydCAqL1xuLnBhbmVsLWhlYWRpbmcge1xuICBwYWRkaW5nOiAxMHB4IDE1cHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogM3B4O1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogM3B4O1xuICBwYWRkaW5nLWxlZnQ6IDBweDtcbiAgcGFkZGluZy1ib3R0b206IDBweDtcbiAgcGFkZGluZy1yaWdodDogMHB4O1xuICBwYWRkaW5nLXRvcDogMHB4O1xufVxuXG4ubmF2ID4gbGkuYWN0aXZlID4gYSB7XG4gIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBiYWNrZ3JvdW5kOiAjMTlhYThkICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1sZWZ0OiBub25lO1xufVxuXG4ubWFyZ2luIHtcbiAgbWFyZ2luLXRvcDogMjVweDtcbn1cblxuLyogcGFuZWwgZW5kICovXG4jc3R5bGUge1xuICBtYXJnaW4tdG9wOiAzNXB4O1xufVxuXG4jZWRpdEFwcHQgLnVpLWRpYWxvZyB7XG4gIHdpZHRoOiAxMjAwcHg7XG4gIHRvcDogNTBweDtcbiAgei1pbmRleDogMTAwO1xufVxuXG4jZWRpdEFwcHQgLnVpLWRpYWxvZyAudWktZGlhbG9nLWNvbnRlbnQge1xuICBoZWlnaHQ6IDUyMHB4O1xuICBvdmVyZmxvdzogYXV0bztcbn1cblxuI3NlYXJjaFByb3YgLnVpLWRpYWxvZyB7XG4gIHdpZHRoOiAxMDAwcHg7XG4gIHRvcDogNTBweDtcbiAgei1pbmRleDogMTAwO1xufVxuXG4jc2VhcmNoUHJvdiAudWktZGlhbG9nIC51aS1kaWFsb2ctY29udGVudCB7XG4gIGhlaWdodDogNTIwcHg7XG4gIG92ZXJmbG93OiBhdXRvO1xufVxuXG46Om5nLWRlZXAgI2VkaXRFcGlzb2RlIC51aS1kaWFsb2cge1xuICB3aWR0aDogMTAwMHB4O1xuICB0b3A6IDUwcHg7XG4gIHotaW5kZXg6IDEwMDtcbn1cblxuOjpuZy1kZWVwICNlZGl0RXBpc29kZSAudWktZGlhbG9nIC51aS1kaWFsb2ctY29udGVudCB7XG4gIGhlaWdodDogMzUwcHg7XG4gIG92ZXJmbG93OiBhdXRvO1xufVxuXG46Om5nLWRlZXAgI2Nhc2VNYW5nbWVtbyAudWktZGlhbG9nIHtcbiAgd2lkdGg6IDYwMHB4O1xuICB0b3A6IDUwcHg7XG4gIHotaW5kZXg6IDEwMDtcbn1cblxuOjpuZy1kZWVwICNjYXNlTWFuZ21lbW8gLnVpLWRpYWxvZyAudWktZGlhbG9nLWNvbnRlbnQge1xuICBoZWlnaHQ6IDIwMHB4O1xuICBvdmVyZmxvdzogYXV0bztcbn1cblxuOjpuZy1kZWVwICNhZGRtb3AgLnVpLWRpYWxvZyB7XG4gIHdpZHRoOiA2MDBweDtcbiAgdG9wOiA1MHB4O1xuICB6LWluZGV4OiAxMDA7XG59XG5cbjo6bmctZGVlcCAjYWRkbW9wIC51aS1kaWFsb2cgLnVpLWRpYWxvZy1jb250ZW50IHtcbiAgaGVpZ2h0OiAyMjBweDtcbiAgb3ZlcmZsb3c6IGF1dG87XG59XG5cbjo6bmctZGVlcCAjYWRkbWVtbyAudWktZGlhbG9nIHtcbiAgd2lkdGg6IDYwMHB4O1xuICB0b3A6IDUwcHg7XG4gIHotaW5kZXg6IDEwMDtcbn1cblxuOjpuZy1kZWVwICNhZGRtZW1vIC51aS1kaWFsb2cgLnVpLWRpYWxvZy1jb250ZW50IHtcbiAgaGVpZ2h0OiAyMjBweDtcbiAgb3ZlcmZsb3c6IGF1dG87XG59XG5cbjo6bmctZGVlcCAjdGFnbWVtYmVyIC51aS1kaWFsb2cge1xuICB3aWR0aDogMTAwMHB4O1xuICB0b3A6IDUwcHg7XG4gIHotaW5kZXg6IDEwMDtcbn1cblxuOjpuZy1kZWVwICN0YWdtZW1iZXIgLnVpLWRpYWxvZyAudWktZGlhbG9nLWNvbnRlbnQge1xuICBoZWlnaHQ6IDU1MHB4O1xuICBvdmVyZmxvdzogYXV0bztcbn1cblxuLnVpLWNhbGVuZGFyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG59XG5cbi51aS1pbnB1dGdyb3VwIC51aS1pbnB1dHRleHQge1xuICBwYWRkaW5nLWxlZnQ6IDAuNWVtO1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xufVxuXG4vKiBEcm9wIERvd24gTGlzdCBTdGFydCovXG5ib2R5IHtcbiAgcGFkZGluZzogMzBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uc29ydGFibGUtaXRlbSB7XG4gIHBhZGRpbmc6IDZweCAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbGluZS1oZWlnaHQ6IDEuNGVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGN1cnNvcjogZ3JhYjtcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm9yZGVyLWNvbG9yOiAjYWRhZGFkO1xufVxuXG4uc29ydGFibGUtaXRlbS1hY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTZlNmU2O1xuICBib3gtc2hhZG93OiBpbnNldCAwIDNweCA1cHggcmdiYSgwLCAwLCAwLCAwLjEyNSk7XG59XG5cbi5zb3J0YWJsZS13cmFwcGVyIHtcbiAgbWluLWhlaWdodDogMTUwcHg7XG59XG5cbiNzZWFyY2hTdXJnZXJ5UG9wdXAgLnVpLWRpYWxvZyB7XG4gIHotaW5kZXg6IDEwMTE7XG4gIGxlZnQ6IDQwMHB4ICFpbXBvcnRhbnQ7XG4gIHRvcDogNDBweCAhaW1wb3J0YW50O1xuICB0cmFuc2Zvcm06IG5vbmU7XG4gIG9wYWNpdHk6IDE7XG4gIHdpZHRoOiA5MDBweCAhaW1wb3J0YW50O1xufVxuXG4vKiBEcm9wIERvd24gTGlzdCBFbmQgKi9cbjpob3N0IDo6bmctZGVlcCAjcHdzZHJvcGRvd24gLnVpLWRyb3Bkb3duIHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2E2YTZhNjtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICMzNmNjOTUgIWltcG9ydGFudDtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMnM7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xuICB3aWR0aDogMjBweDtcbn1cblxuOjpuZy1kZWVwIGJvZHkgLnVpLWRyb3Bkb3duLXBhbmVsIC51aS1kcm9wZG93bi1pdGVtcyAudWktZHJvcGRvd24taXRlbS51aS1zdGF0ZS1oaWdobGlnaHQsIGJvZHkgLnVpLWRyb3Bkb3duLXBhbmVsIC51aS1kcm9wZG93bi1pdGVtcyAudWktZHJvcGRvd24taXRlbS1ncm91cC51aS1zdGF0ZS1oaWdobGlnaHQge1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwYTk2Yjtcbn1cblxuI2NvbGxhcHNlMSB7XG4gIG92ZXJmbG93LXg6IHNjcm9sbDtcbn1cblxuLnRhYmxlRGl2IHtcbiAgaGVpZ2h0OiBhdXRvO1xuICBtYXJnaW4tYm90dG9tOiAxMDBweCAhaW1wb3J0YW50O1xufVxuXG4ubGlUaXRsZSB7XG4gIHBhZGRpbmctdG9wOiA4cHg7XG4gIGhlaWdodDogNDBweDtcbiAgYmFja2dyb3VuZDogIzE5YWE4ZCAhaW1wb3J0YW50O1xuICB3aWR0aDogMTUwcHg7XG59XG5cbiNtYXJnaW4xIHtcbiAgbWFyZ2luLXRvcDogMTVweDtcbiAgZGlzcGxheTogaW5saW5lLXRhYmxlO1xufVxuXG4uaW5wdXQtZ3JvdXAtYWRkb24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBib3JkZXI6IDFweCBzb2xpZCAjRTVFNkU3O1xuICAtbW96LWJvcmRlci1yYWRpdXM6IDFweDtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAxcHg7XG4gIGJvcmRlci1yYWRpdXM6IDFweDtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIHBhZGRpbmc6IDZweCAxMnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi1sZWZ0OiAyNXB4ICFpbXBvcnRhbnQ7XG59XG5cbi5mYXZfRmlsdGVyIHtcbiAgd2lkdGg6IDkwJSAhaW1wb3J0YW50O1xufVxuXG4ubm9yX0ZpbHRlciB7XG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG59XG5cbnVsI2Ryb3Bkb3duLWJhc2ljIHtcbiAgbGVmdDogYXV0bztcbiAgcmlnaHQ6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6ICM4NDg0ODQ7XG4gIGNvbG9yOiAjRkZGRkZGO1xufVxuXG5ociB7XG4gIG1hcmdpbi10b3A6IDFyZW07XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGJvcmRlcjogMDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbnRoZWFkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMzN2FiNztcbiAgY29sb3I6IHdoaXRlO1xufVxuXG50aC50aHByb3ZpZGVyU29ydC5oZWFkZXJTb3J0LnNvcnRJY29uY2hhbmdlLm5nLXN0YXItaW5zZXJ0ZWQge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmctcmlnaHQ6IDIwcHg7XG59XG5cbnRyLm5nLXN0YXItaW5zZXJ0ZWQge1xuICBjb2xvcjogYmxhY2sgIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbn1cblxudGQubG5rVHJhdG1lbnRFcGlzb2RlLm5nLXN0YXItaW5zZXJ0ZWQge1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlICFpbXBvcnRhbnQ7XG4gIGN1cnNvcjogcG9pbnRlciAhaW1wb3J0YW50O1xufVxuXG5zcGFuLmJhZGdlLmJhZGdlLXdhcm5pbmcge1xuICBmb250LXNpemU6IDE0cHg7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogNXB4O1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG5pLmZhLmZhLWNoZWNrLWNpcmNsZSB7XG4gIGNvbG9yOiAjMWFiMzk0O1xufVxuXG5zcGFuLnRyYXNoLm5nLXN0YXItaW5zZXJ0ZWQge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbmlucHV0I2Noa0lzU3RhdEZpbGVQRCB7XG4gIHpvb206IDEuNTtcbn1cblxuOjpuZy1kZWVwICNkZWxldGVmYXZwb3B1cCAudWktZGlhbG9nIHtcbiAgd2lkdGg6IDEwMDBweDtcbiAgdG9wOiAyMHB4ICFpbXBvcnRhbnQ7XG4gIHotaW5kZXg6IDEwMDtcbn1cblxuOjpuZy1kZWVwICNkZWxldGVmYXZwb3B1cCAudWktZGlhbG9nIC51aS1kaWFsb2ctY29udGVudCB7XG4gIGhlaWdodDogMzBweDtcbiAgb3ZlcmZsb3c6IGF1dG87XG59XG5cbjo6bmctZGVlcCAjZGVsZXRlZmF2cG9wdXAgLnVpLWRpYWxvZyAudWktZGlhbG9nLXRpdGxlYmFyIHtcbiAgYm9yZGVyOiAwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuXG46Om5nLWRlZXAgI2RlbGV0ZWZhdnBvcHVwIC51aS1kaWFsb2cgLnVpLWRpYWxvZy1jb250ZW50IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGNvbG9yOiAjMzMzMzMzO1xuICBib3JkZXI6IDBweDtcbiAgcGFkZGluZzogMC41NzFlbSAxZW07XG59XG5cbjo6bmctZGVlcCAjZGVsZXRlZmF2cG9wdXAgLnVpLWRpYWxvZyAudWktZGlhbG9nLWZvb3RlciB7XG4gIGJvcmRlcjogMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBjb2xvcjogIzMzMzMzMztcbiAgcGFkZGluZzogMC41NzFlbSAxZW07XG4gIG1hcmdpbjogMDtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOiAtMXB4O1xufVxuXG5hLmJ0bi5idG4tc21hbGwuYnRuLWRhbmdlci5wdWxsLXJpZ2h0IHtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuYS5idG4uYnRuLXN1Y2Nlc3Mge1xuICBjb2xvcjogd2hpdGU7XG59Il19 */");

/***/ }),

/***/ "./src/app/views/dashboad/providerdashboard/providerdashboard.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/views/dashboad/providerdashboard/providerdashboard.component.ts ***!
  \*********************************************************************************/
/*! exports provided: ProviderDashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProviderDashboardComponent", function() { return ProviderDashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _dashboad_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dashboad.service */ "./src/app/views/dashboad/dashboad.service.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _services_appservices_shared_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/appservices/shared.service */ "./src/app/services/appservices/shared.service.ts");
/* harmony import */ var _services_master_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/master.service */ "./src/app/services/master.service.ts");
/* harmony import */ var _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../models/providerdashboard */ "./src/app/models/providerdashboard.ts");




 // interface SelectItem {






var ProviderDashboardComponent = /** @class */ (function () {
    function ProviderDashboardComponent(http, _data, fb, router, messageService, _data1, masterService) {
        this.http = http;
        this._data = _data;
        this.fb = fb;
        this.router = router;
        this.messageService = messageService;
        this._data1 = _data1;
        this.masterService = masterService;
        this.index = -1;
        this.showMemoFeilds = false;
        this.dateTime = new Date();
        this.searchClicked = false;
        this.practiceDRP = false;
        this.ShowTab = false;
        this.selectedColumns = [];
        this.Editapptdisplay = false;
        this.Searchprodisplay = false;
        this.Newepisodedisplay = false;
        this.Casemangdisplay = false;
        this.Addmopdisplay = false;
        this.Memodisplay = false;
        this.apptmemo = [];
        this.appt_memo = '';
        this.who_added = '';
        this.when_added = '';
        this.Tagdisplay = false;
        this.searchtagmember = false;
        this.filterdColoumn = [];
        this.filterdFields = [];
        this.deletePopup = false;
        // Filter Column Boolean
        this.Location = true;
        this.Provider = true;
        this.PatientName = true;
        this.Case = true;
        this.AppointmentFromDate = true;
        this.AuthorizationStatus = true;
        this.MOP = true;
        this.SuperBillStatus = true;
        this.CheckedInTime = true;
        this.AppointmentCreatedFromDate = true;
        this.VerificationStatus = true;
        this.CaseDetails = true;
        this.AppointmentStatus = true;
        this.DictationType = true;
        this.AssessmentStatus = true;
        this.POSLocation = true;
        this.VideoSession = true;
        this.DictationStatus = true;
        this.BillingStatus = true;
        this.AppointmentType = true;
        // Filter Field Boolean
        this.Practicerow = true;
        this.Locationrow = true;
        this.POSPracticerow = true;
        this.POSLocationrow = true;
        this.Providerrow = true;
        this.PatientNamerow = true;
        this.Accountrow = true;
        this.Caserow = true;
        this.AppointmentFromDaterow = true;
        this.AppointmentToDaterow = true;
        this.AppointmentTyperow = true;
        this.AppointmentStatusrow = true;
        this.DictationStatusrow = true;
        this.AssessmentStatusrow = true;
        this.BillingStatusrow = true;
        this.CaseTyperow = true;
        this.DictationTyperow = true;
        this.EpisodeStatusrow = true;
        this.FavouriteFiltersrow = true;
        this.AuthorizationStatusrow = true;
        this.VerificationStatusow = true;
        this.AppCreatedFromDaterow = true;
        this.AppCreatedToDaterow = true;
        this.SuperBillStatusrow = true;
        this.IsStatFilerow = true;
        this.fav_fil = [
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["Favfilter"]('sujit'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["Favfilter"]('vinay'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["Favfilter"]('shivu')
        ];
        this.start_time = [
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["Starttime"]('04:00 AM'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["Starttime"]('04:15 AM'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["Starttime"]('04:30 AM'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["Starttime"]('04:45 AM')
        ];
        this.end_time = [
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["Endtime"]('10:00 PM'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["Endtime"]('10:15 PM'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["Endtime"]('10:30 PM'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["Endtime"]('10:45 PM')
        ];
        this.speciality = [
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["Speciality"]('Spine Care'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["Speciality"]('GN/OBG'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["Speciality"]('Spine Surgery')
        ];
        this.state = [new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["State"]('NY'), new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["State"]('NJ'), new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["State"]('AK')];
        this.mop = [new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["Mop"]('Insurance'), new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["Mop"]('Lien'), new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["Mop"]('Self-Pay')];
        this.your = [];
        this.tableDataLength = '0';
        this.itemFilterFieldsStringsLeft = [];
        this.favoriteFilter = [];
    }
    ProviderDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        var pra = {
            label: 'select',
            value: 1
        };
        var prov = {
            label: 'select',
            value: 1
        };
        this.editapptForm = this.fb.group({
            practice: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](pra, null),
            location: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            pos_practice: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            pos_location: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            provider: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](prov, null),
            patient_name: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            account: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            case: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            appt_from_date: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            appt_to_date: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            appt_type: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            appt_status: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            dic_ststus: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            asse_ststus: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            bill_status: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            case_type: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            dic_type: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            epi_status: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            fav_fil: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            aut_status: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            ver_status: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            app_cre_from_date: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            app_cre_to_date: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            sup_bill_staus: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null)
        });
        this.Searchprovider();
        this.apptmemotable();
        this.tagmemtable();
        this.getPracticedetails();
        this.getLocationdetails();
        this.getPOSPracticedetails();
        this.getPOSLocationdetails();
        this.getProviderdetails();
        this.getApmtTypedetails();
        this.getApmtStatusdetails();
        this.getDicStatusdetails();
        this.getAsstStatusdetails();
        this.getBillStatusdetails();
        this.getCaseTypedetails();
        this.getDicTypedetails();
        this.getEpiStatusdetails();
        this.getAutStatusdetails();
        this.getVerStatusdetails();
        this.getSupBillStatusdetails();
        this.getFavFilterdetails();
        setTimeout(function () {
            _this.getListControls();
        }, 500);
    };
    ProviderDashboardComponent.prototype.getListControls = function () {
        this.itemFilterFieldsStringsLeft = [
            {
                Id: 1,
                visible: true,
                fieldName: 'Practice',
                position: 1,
                type: 'dropdown',
                isVisible: true,
                options: this.practice,
                controlname: 'practice'
            },
            {
                Id: 2,
                visible: true,
                fieldName: 'Location',
                position: 2,
                type: 'dropdown',
                isVisible: true,
                options: this.location,
                controlname: 'location'
            },
            {
                Id: 3,
                visible: true,
                fieldName: 'Provider',
                position: 3,
                type: 'dropdown',
                isVisible: true,
                options: this.provider,
                controlname: 'provider'
            },
            {
                Id: 4,
                visible: true,
                fieldName: 'POS Location',
                position: 4,
                type: 'dropdown',
                isVisible: true,
                options: this.pos_location,
                controlname: 'pos_location'
            },
            {
                Id: 5,
                visible: true,
                fieldName: 'POS Practice',
                position: 5,
                type: 'dropdown',
                isVisible: true,
                options: this.pos_practice,
                controlname: 'pos_practice'
            },
            {
                Id: 6,
                visible: true,
                fieldName: 'Case #',
                position: 6,
                type: 'inputbox',
                isVisible: true,
                controlname: 'case'
            },
            {
                Id: 7,
                visible: true,
                fieldName: 'Account #',
                position: 7,
                type: 'inputbox',
                isVisible: true,
                controlname: 'account'
            },
            {
                Id: 8,
                visible: true,
                fieldName: 'Patient Name',
                position: 8,
                type: 'inputbox',
                isVisible: true,
                controlname: 'patient_name'
            },
            {
                Id: 9,
                visible: true,
                fieldName: 'Dictation Status',
                position: 9,
                type: 'dropdown',
                isVisible: true,
                options: this.dic_ststus,
                controlname: 'dic_ststus'
            },
            {
                Id: 10,
                visible: true,
                fieldName: 'Super Bill Status',
                position: 10,
                type: 'dropdown',
                isVisible: true,
                options: this.sup_bill_staus,
                controlname: 'sup_bill_staus'
            },
            {
                Id: 11,
                visible: true,
                fieldName: 'Billing Status',
                position: 11,
                type: 'dropdown',
                isVisible: true,
                options: this.bill_status,
                controlname: 'bill_status'
            },
            {
                Id: 12,
                visible: true,
                fieldName: 'Dictation Type',
                position: 12,
                type: 'dropdown',
                isVisible: true,
                options: this.dic_type,
                controlname: 'dic_type'
            },
            {
                Id: 13,
                visible: true,
                fieldName: 'Case Type',
                position: 13,
                type: 'dropdown',
                isVisible: true,
                options: this.case_type,
                controlname: 'case_type'
            },
            {
                Id: 14,
                visible: true,
                fieldName: 'Assessment Status',
                position: 14,
                type: 'dropdown',
                isVisible: true,
                options: this.asse_ststus,
                controlname: 'asse_ststus'
            },
            {
                Id: 15,
                visible: true,
                fieldName: 'Apmt Created To Date',
                position: 15,
                type: 'datepicker',
                isVisible: true,
                controlname: 'app_cre_to_date'
            },
            {
                Id: 16,
                visible: true,
                fieldName: 'Appointment Status',
                position: 16,
                type: 'dropdown',
                isVisible: true,
                options: this.appt_status,
                controlname: 'appt_status'
            },
            {
                Id: 17,
                visible: true,
                fieldName: 'Episode Status',
                position: 17,
                type: 'dropdown',
                isVisible: true,
                options: this.epi_status,
                controlname: 'epi_status'
            },
            {
                Id: 18,
                visible: true,
                fieldName: 'Authorization Status',
                position: 18,
                type: 'dropdown',
                isVisible: true,
                options: this.aut_status,
                controlname: 'aut_status'
            },
            {
                Id: 19,
                visible: true,
                fieldName: 'Apmt Created From Date',
                position: 19,
                type: 'datepicker',
                isVisible: true,
                controlname: 'app_cre_from_date'
            },
            {
                Id: 20,
                visible: true,
                fieldName: 'Verification Status',
                position: 20,
                type: 'dropdown',
                isVisible: true,
                options: this.ver_status,
                controlname: 'ver_status'
            },
            {
                Id: 21,
                visible: true,
                fieldName: 'Appointment Type',
                position: 21,
                type: 'dropdown',
                isVisible: true,
                options: this.appt_type,
                controlname: 'appt_type'
            },
            {
                Id: 22,
                visible: true,
                fieldName: 'Appointment To Date',
                position: 22,
                type: 'datepicker',
                isVisible: true,
                controlname: 'appt_to_date'
            },
            {
                Id: 23,
                visible: true,
                fieldName: 'Appointment From Date',
                position: 23,
                type: 'datepicker',
                isVisible: true,
                controlname: 'appt_from_date'
            },
            {
                Id: 24,
                visible: true,
                fieldName: 'Favourite Filters',
                position: 24,
                type: 'dropdown',
                isVisible: true,
                options: this.myFilter,
                controlname: 'fav_fil',
                icon: 'fa fa-trash'
            },
            {
                Id: 25,
                visible: true,
                fieldName: 'Is Stat File',
                position: 25,
                type: 'chekbox',
                isVisible: true,
            }
        ];
    };
    ProviderDashboardComponent.prototype.getyourtable = function () {
        var _this = this;
        this._data.getyourdrs().subscribe(function (data) {
            console.log(data);
            _this.your = data;
            console.log(_this.your);
            if (_this.editapptForm.value.practice == null || _this.editapptForm.value.location == null) {
                var pra = {
                    label: 'select',
                    value: 1
                };
                var prov = {
                    label: 'select',
                    value: 1
                };
            }
            var listData = _this.your;
            _this.your = [];
            var filterData = lodash__WEBPACK_IMPORTED_MODULE_4__["filter"](listData, function (v) {
                if (v.location === _this.editapptForm.value.practice.label || v.provider === _this.editapptForm.value.provider.label) {
                    _this.your.push(v);
                    console.log('list data', _this.your);
                    _this.tableDataLength = _this.your.length;
                }
                if (_this.editapptForm.value.practice.label === 'select' && _this.editapptForm.value.provider.label === 'select') {
                    _this.your.push(v);
                    _this.tableDataLength = _this.your.length;
                }
            });
        });
    };
    ProviderDashboardComponent.prototype.closeEditAppt = function () {
        this.Editapptdisplay = false;
    };
    ProviderDashboardComponent.prototype.searcResult = function ($event) {
        console.log('for', this.editapptForm.value);
        this.index = (this.index <= 0) ? 3 : this.index - 1;
        this.getyourtable();
        this.ShowTab = true;
    };
    ProviderDashboardComponent.prototype.showMemo = function (selectedDate) {
        this.showMemoFeilds = true;
    };
    ProviderDashboardComponent.prototype.Send = function (SelectedPractice) {
        console.log('SelectedPractice', SelectedPractice.value);
        this.SelectPractice = SelectedPractice.value;
    };
    ProviderDashboardComponent.prototype.Change = function () {
        this.practiceDRP = true;
    };
    ProviderDashboardComponent.prototype.clearFilter = function (dropdown) {
        alert('HI');
        dropdown.resetFilter();
    };
    ProviderDashboardComponent.prototype.setColumnsDefaultValue = function () {
        this.selectedColumns = this.practice;
    };
    ProviderDashboardComponent.prototype.Editappt = function (item) {
        this.editData = item;
        this.editapptForm.patchValue({
            appt_type: this.editData.appt_type,
            location: this.editData.location
        });
        console.log(this.editapptForm);
        this.Editapptdisplay = true;
    };
    ProviderDashboardComponent.prototype.SearchProvider = function () {
        this.Searchprodisplay = true;
    };
    ProviderDashboardComponent.prototype.onsearchProvider = function () {
        this.searchClicked = true;
    };
    ProviderDashboardComponent.prototype.closeSearchPro = function () {
        this.Searchprodisplay = false;
    };
    ProviderDashboardComponent.prototype.Searchprovider = function () {
        var _this = this;
        this._data.getserprovider().subscribe(function (data) {
            console.log(data);
            _this.serprovider = data;
            console.log(_this.serprovider);
        });
    };
    ProviderDashboardComponent.prototype.Newepisode = function () {
        this.Newepisodedisplay = true;
    };
    ProviderDashboardComponent.prototype.closeNewEpisode = function () {
        this.Newepisodedisplay = false;
    };
    ProviderDashboardComponent.prototype.Casemang = function () {
        this.Casemangdisplay = true;
    };
    ProviderDashboardComponent.prototype.closeCaseMang = function () {
        this.Casemangdisplay = false;
    };
    ProviderDashboardComponent.prototype.Addmop = function () {
        this.Addmopdisplay = true;
    };
    ProviderDashboardComponent.prototype.closeAddmop = function () {
        this.Addmopdisplay = false;
    };
    ProviderDashboardComponent.prototype.viewSuperBill = function () {
        window.print();
    };
    ProviderDashboardComponent.prototype.moreInfo = function (item) {
    };
    ProviderDashboardComponent.prototype.Apptmemo = function () {
        this.Memodisplay = true;
    };
    ProviderDashboardComponent.prototype.closeMemo = function () {
        this.Memodisplay = false;
    };
    ProviderDashboardComponent.prototype.apptmemotable = function () {
        var _this = this;
        this._data.getapptmemo().subscribe(function (data) {
            _this.apptmemo = data;
            console.log('memodetails', _this.apptmemo);
        });
    };
    ProviderDashboardComponent.prototype.onSaveMemo = function (f) {
        this.apptmemo.push(new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_10__["ApptMemo"](this.appt_memo, this.who_added, this.when_added));
    };
    ProviderDashboardComponent.prototype.memotag = function () {
        this.Tagdisplay = true;
    };
    ProviderDashboardComponent.prototype.closeTagmem = function () {
        this.Tagdisplay = false;
    };
    ProviderDashboardComponent.prototype.tagmemtable = function () {
        var _this = this;
        this._data.gettagmem().subscribe(function (data) {
            console.log(data);
            _this.membertag = data;
            console.log(_this.membertag);
        });
    };
    ProviderDashboardComponent.prototype.ontagmember = function () {
        this.searchtagmember = true;
    };
    ProviderDashboardComponent.prototype.filterColoumn = function ($event) {
        this.filterdColoumn = $event;
        if (this.filterdColoumn.length !== 0) {
            for (var i = 0; i <= this.filterdColoumn.length; i++) {
                if (this.filterdColoumn[i] === 'Location') {
                    this.Location = false;
                }
                else if (this.filterdColoumn[i] === 'Provider') {
                    this.Provider = false;
                }
                else if (this.filterdColoumn[i] === 'Patient Name') {
                    this.PatientName = false;
                }
                else if (this.filterdColoumn[i] === 'Case #') {
                    this.Case = false;
                }
                else if (this.filterdColoumn[i] === 'Appointment From Date') {
                    this.AppointmentFromDate = false;
                }
                else if (this.filterdColoumn[i] === 'Authorization Status') {
                    this.AuthorizationStatus = false;
                }
                else if (this.filterdColoumn[i] === 'MOP') {
                    this.MOP = false;
                }
                else if (this.filterdColoumn[i] === 'Super Bill Status') {
                    this.SuperBillStatus = false;
                }
                else if (this.filterdColoumn[i] === 'Checked In Time') {
                    this.CheckedInTime = false;
                }
                else if (this.filterdColoumn[i] === 'Appointment Created From Date') {
                    this.AppointmentCreatedFromDate = false;
                }
                else if (this.filterdColoumn[i] === 'Verification Status') {
                    this.VerificationStatus = false;
                }
                else if (this.filterdColoumn[i] === 'Case Details') {
                    this.CaseDetails = false;
                }
                else if (this.filterdColoumn[i] === 'Appointment Status') {
                    this.AppointmentStatus = false;
                }
                else if (this.filterdColoumn[i] === 'Dictation Type') {
                    this.DictationType = false;
                }
                else if (this.filterdColoumn[i] === 'Assessment Status') {
                    this.AssessmentStatus = false;
                }
                else if (this.filterdColoumn[i] === 'POS Location') {
                    this.POSLocation = false;
                }
                else if (this.filterdColoumn[i] === 'Video Session') {
                    this.VideoSession = false;
                }
                else if (this.filterdColoumn[i] === 'Dictation Status') {
                    this.DictationStatus = false;
                }
                else if (this.filterdColoumn[i] === 'Billing Status') {
                    this.BillingStatus = false;
                }
                else if (this.filterdColoumn[i] === 'Appointment Type') {
                    this.AppointmentType = false;
                }
            }
        }
        else {
            this.Location = true;
            this.Provider = true;
            this.PatientName = true;
            this.Case = true;
            this.AppointmentFromDate = true;
            this.AuthorizationStatus = true;
            this.MOP = true;
            this.SuperBillStatus = true;
            this.CheckedInTime = true;
            this.AppointmentCreatedFromDate = true;
            this.VerificationStatus = true;
            this.CaseDetails = true;
            this.AppointmentStatus = true;
            this.DictationType = true;
            this.AssessmentStatus = true;
            this.POSLocation = true;
            this.VideoSession = true;
            this.DictationStatus = true;
            this.BillingStatus = true;
            this.AppointmentType = true;
        }
    };
    ProviderDashboardComponent.prototype.filterFields = function ($event) {
        this.itemFilterFieldsStringsLeft = $event;
    };
    ProviderDashboardComponent.prototype.reset = function ($event) {
        this.editapptForm.reset();
    };
    ProviderDashboardComponent.prototype.delete = function (id) {
        var _this = this;
        this.myFilter.splice(id, 1);
        setTimeout(function () {
            _this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'deleted successfully'
            });
        }, 1000);
        console.log(this.myFilter);
        this.deletePopup = false;
    };
    ProviderDashboardComponent.prototype.deletepopup = function () {
        this.deletePopup = true;
    };
    ProviderDashboardComponent.prototype.closeDeletePopup = function () {
        this.deletePopup = false;
    };
    ProviderDashboardComponent.prototype.saveFilter = function (Data) {
        this.itemFilterFieldsStringsLeft = Data;
    };
    ProviderDashboardComponent.prototype.getPracticedetails = function () {
        var _this = this;
        this._data1.getdataPractice().subscribe(function (data) {
            _this.practice = _this.masterService.formatDataforDropdown('Practice', data, 'select', 'Id');
            console.log('test', _this.practice);
        });
    };
    ProviderDashboardComponent.prototype.getLocationdetails = function () {
        var _this = this;
        this._data1.getdataLocation().subscribe(function (data) {
            _this.location = _this.masterService.formatDataforDropdown('Location', data, 'select', 'Id');
            console.log('test', _this.location);
        });
    };
    ProviderDashboardComponent.prototype.getPOSPracticedetails = function () {
        var _this = this;
        this._data1.getdataPosPractice().subscribe(function (data) {
            _this.pos_practice = _this.masterService.formatDataforDropdown('PosPractice', data, 'select', 'Id');
            console.log('test', _this.pos_practice);
        });
    };
    ProviderDashboardComponent.prototype.getPOSLocationdetails = function () {
        var _this = this;
        this._data1.getdataPosLocation().subscribe(function (data) {
            _this.pos_location = _this.masterService.formatDataforDropdown('PosLocation', data, 'select', 'Id');
            console.log('test', _this.pos_location);
        });
    };
    ProviderDashboardComponent.prototype.getProviderdetails = function () {
        var _this = this;
        this._data1.getdataProvider().subscribe(function (data) {
            _this.provider = _this.masterService.formatDataforDropdown('Provider', data, 'select', 'Id');
            console.log('test', _this.provider);
        });
    };
    ProviderDashboardComponent.prototype.getApmtTypedetails = function () {
        var _this = this;
        this._data1.getdataApmttype().subscribe(function (data) {
            _this.appt_type = _this.masterService.formatDataforDropdown('AppmtType', data, 'select', 'Id');
            console.log('test', _this.appt_type);
        });
    };
    ProviderDashboardComponent.prototype.getApmtStatusdetails = function () {
        var _this = this;
        this._data1.getdataApmtstatus().subscribe(function (data) {
            _this.appt_status = _this.masterService.formatDataforDropdown('AppmtStatus', data, 'select', 'Id');
            console.log('test', _this.appt_status);
        });
    };
    ProviderDashboardComponent.prototype.getDicStatusdetails = function () {
        var _this = this;
        this._data1.getdataDicstatus().subscribe(function (data) {
            _this.dic_ststus = _this.masterService.formatDataforDropdown('DicStatus', data, 'select', 'Id');
            console.log('test', _this.dic_ststus);
        });
    };
    ProviderDashboardComponent.prototype.getAsstStatusdetails = function () {
        var _this = this;
        this._data1.getdataAsststatus().subscribe(function (data) {
            _this.asse_ststus = _this.masterService.formatDataforDropdown('AsstStatus', data, 'select', 'Id');
            console.log('test', _this.asse_ststus);
        });
    };
    ProviderDashboardComponent.prototype.getBillStatusdetails = function () {
        var _this = this;
        this._data1.getdataBillstatus().subscribe(function (data) {
            _this.bill_status = _this.masterService.formatDataforDropdown('Billstatus', data, 'select', 'Id');
            console.log('test', _this.bill_status);
        });
    };
    ProviderDashboardComponent.prototype.getCaseTypedetails = function () {
        var _this = this;
        this._data1.getdataCasetype().subscribe(function (data) {
            _this.case_type = _this.masterService.formatDataforDropdown('CaseType', data, 'select', 'Id');
            console.log('test', _this.case_type);
        });
    };
    ProviderDashboardComponent.prototype.getDicTypedetails = function () {
        var _this = this;
        this._data1.getdataDictype().subscribe(function (data) {
            _this.dic_type = _this.masterService.formatDataforDropdown('DicType', data, 'select', 'Id');
            console.log('test', _this.dic_type);
        });
    };
    ProviderDashboardComponent.prototype.getEpiStatusdetails = function () {
        var _this = this;
        this._data1.getdataEpistatus().subscribe(function (data) {
            _this.epi_status = _this.masterService.formatDataforDropdown('EpiStatus', data, 'select', 'Id');
            console.log('test', _this.epi_status);
        });
    };
    ProviderDashboardComponent.prototype.getAutStatusdetails = function () {
        var _this = this;
        this._data1.getdataAutstatus().subscribe(function (data) {
            _this.aut_status = _this.masterService.formatDataforDropdown('AutStatus', data, 'select', 'Id');
            console.log('test', _this.aut_status);
        });
    };
    ProviderDashboardComponent.prototype.getVerStatusdetails = function () {
        var _this = this;
        this._data1.getdataVerstatus().subscribe(function (data) {
            _this.ver_status = _this.masterService.formatDataforDropdown('VerStatus', data, 'select', 'Id');
            console.log('test', _this.ver_status);
        });
    };
    ProviderDashboardComponent.prototype.getSupBillStatusdetails = function () {
        var _this = this;
        this._data1.getdataSuperbillstatus().subscribe(function (data) {
            _this.sup_bill_staus = _this.masterService.formatDataforDropdown('SuperBillStatus', data, 'select', 'Id');
            console.log('test', _this.sup_bill_staus);
        });
    };
    ProviderDashboardComponent.prototype.getFavFilterdetails = function () {
        var _this = this;
        this._data1.getdataFavfil().subscribe(function (data) {
            _this.myFilter = _this.masterService.formatDataforDropdown('FavFil', data, 'select', 'Id');
            console.log('test', _this.myFilter);
        });
    };
    ProviderDashboardComponent.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
        { type: _dashboad_service__WEBPACK_IMPORTED_MODULE_3__["DashboadService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: primeng_api__WEBPACK_IMPORTED_MODULE_7__["MessageService"] },
        { type: _services_appservices_shared_service__WEBPACK_IMPORTED_MODULE_8__["SharedService"] },
        { type: _services_master_service__WEBPACK_IMPORTED_MODULE_9__["MasterService"] }
    ]; };
    ProviderDashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-providerdashboard',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./providerdashboard.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboad/providerdashboard/providerdashboard.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./providerdashboard.component.scss */ "./src/app/views/dashboad/providerdashboard/providerdashboard.component.scss")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _dashboad_service__WEBPACK_IMPORTED_MODULE_3__["DashboadService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            primeng_api__WEBPACK_IMPORTED_MODULE_7__["MessageService"],
            _services_appservices_shared_service__WEBPACK_IMPORTED_MODULE_8__["SharedService"],
            _services_master_service__WEBPACK_IMPORTED_MODULE_9__["MasterService"]])
    ], ProviderDashboardComponent);
    return ProviderDashboardComponent;
}());



/***/ }),

/***/ "./src/app/views/dashboad/providerdashboard/providerdashboard1/providerdashboard1.component.scss":
/*!*******************************************************************************************************!*\
  !*** ./src/app/views/dashboad/providerdashboard/providerdashboard1/providerdashboard1.component.scss ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".btn-primary {\n  background-color: #848484;\n  border-color: #999999;\n  color: #FFFFFF;\n  box-shadow: 0 8px 7px rgba(0, 0, 0, 0.22);\n}\n\n.btn {\n  display: inline-block;\n  padding: 6px 12px;\n  margin-bottom: 0;\n  font-size: 13px;\n  font-weight: bold;\n  line-height: 1.42857143;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  touch-action: manipulation;\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  background-image: none;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n\nlabel, .btn, .nav-tabs > li > a, .badge {\n  font-weight: normal !important;\n}\n\n.modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  overflow: hidden;\n  -webkit-overflow-scrolling: touch;\n  outline: 0;\n}\n\n.form-control, .single-line {\n  background-color: #FFFFFF;\n  background-image: none;\n  /* border: 1px solid #e5e6e7; */\n  color: inherit;\n  display: block;\n  padding: 6px 12px;\n  width: 100% !important;\n  font-size: 14px;\n  border-left: 1px solid #CCC !important;\n  border-top: 1px solid #CCC !important;\n  border-right: 1px solid #CCC !important;\n  border-bottom: 2px solid #36cc95 !important;\n  border-radius: 0px !important;\n}\n\nlabel {\n  display: inline-block;\n  max-width: 100%;\n  margin-bottom: 5px;\n  font-weight: bold;\n}\n\n.btn-success {\n  background-color: #848484;\n  border-color: #999999;\n  color: #FFFFFF;\n  margin-top: 10px;\n  box-shadow: 0 8px 7px rgba(0, 0, 0, 0.22);\n}\n\n.agile-list li.info-element {\n  border-left: 3px solid #1c84c6;\n}\n\n.agile-list li {\n  background: #FAFAFB;\n  border: 1px solid #e7eaec;\n  margin: 0 0 5px 0;\n  padding: 5px;\n  border-radius: 2px;\n}\n\n.modal-header {\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5;\n}\n\n::ng-deep #editFIlter .ui-dialog {\n  width: 600px;\n  top: 20px !important;\n  z-index: 100;\n}\n\n::ng-deep #editFIlter .ui-dialog .ui-dialog-content {\n  height: 100px;\n  overflow: auto;\n}\n\n::ng-deep #editFIlter .ui-dialog .ui-dialog-titlebar {\n  border: 0px;\n  background-color: white;\n}\n\n::ng-deep #editFIlter .ui-dialog .ui-dialog-content {\n  background-color: white;\n  color: #333333;\n  border: 0px;\n  padding: 0.571em 1em;\n}\n\n::ng-deep #editFIlter .ui-dialog .ui-dialog-footer {\n  border: 0px;\n  background-color: #ffffff;\n  color: #333333;\n  padding: 0.571em 1em;\n  margin: 0;\n  text-align: right;\n  position: relative;\n  top: -1px;\n}\n\n@media (min-height: 600px) and (max-height: 700px) {\n  ::ng-deep #displayColum .ui-dialog .ui-dialog-content {\n    height: 400px !important;\n    overflow: auto;\n  }\n}\n\n::ng-deep #displayColum .ui-dialog {\n  width: 600px;\n  top: 20px !important;\n  z-index: 100;\n}\n\n::ng-deep #displayColum .ui-dialog .ui-dialog-content {\n  height: 730px;\n  overflow: auto;\n  background-color: white;\n  color: #333333;\n  border: 0px;\n  padding: 0.571em 1em;\n}\n\n::ng-deep #displayColum .ui-dialog .ui-dialog-titlebar {\n  border: 0px;\n  background-color: white;\n}\n\n::ng-deep #displayColum .ui-dialog .ui-dialog-footer {\n  border: 0px;\n  background-color: #ffffff;\n  color: #333333;\n  padding: 0.571em 1em;\n  margin: 0;\n  text-align: right;\n  position: relative;\n  top: -1px;\n}\n\n@media (min-height: 600px) and (max-height: 700px) {\n  ::ng-deep #filterFields .ui-dialog .ui-dialog-content {\n    height: 400px !important;\n    overflow: auto;\n  }\n}\n\n::ng-deep #filterFields .ui-dialog {\n  width: 600px;\n  top: 20px !important;\n  z-index: 100;\n}\n\n::ng-deep #filterFields .ui-dialog .ui-dialog-content {\n  height: 807px;\n  overflow: auto;\n  background-color: white;\n  color: #333333;\n  border: 0px;\n  padding: 0.571em 1em;\n}\n\n::ng-deep #filterFields .ui-dialog .ui-dialog-titlebar {\n  border: 0px;\n  background-color: white;\n}\n\n::ng-deep #filterFields .ui-dialog .ui-dialog-footer {\n  border: 0px;\n  background-color: #ffffff;\n  color: #333333;\n  padding: 0.571em 1em;\n  margin: 0;\n  text-align: right;\n  position: relative;\n  top: -1px;\n}\n\n.ibox-title {\n  -moz-border-bottom-colors: none;\n  -moz-border-left-colors: none;\n  -moz-border-right-colors: none;\n  -moz-border-top-colors: none;\n  background-color: #ffffff;\n  border-color: #e7eaec;\n  -o-border-image: none;\n  -webkit-border-image: none;\n  border-image: none;\n  border-style: solid solid none;\n  border-width: 4px 0px 0;\n  color: inherit;\n  margin-bottom: 0;\n  padding: 14px 15px 7px;\n  height: 48px;\n}\n\n.ui-calendar {\n  position: relative;\n  display: inline-block;\n  width: 100% !important;\n}\n\n.ui-inputgroup .ui-inputtext {\n  padding-left: 0.5em;\n  width: 100% !important;\n}\n\n/* Drop Down List Start*/\n\nbody {\n  padding: 30px;\n  position: relative;\n}\n\n::ng-deep #unselectedlist .sortable-item {\n  padding: 6px 12px;\n  margin-bottom: 4px;\n  font-size: 14px;\n  line-height: 1.4em;\n  text-align: center;\n  cursor: -webkit-grab;\n  cursor: grab;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  border-color: #adadad;\n  border-left: 3px solid #1c84c6;\n}\n\n::ng-deep #selectedlist .sortable-item {\n  padding: 6px 12px;\n  margin-bottom: 4px;\n  font-size: 14px;\n  line-height: 1.4em;\n  text-align: center;\n  cursor: -webkit-grab;\n  cursor: grab;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  border-color: #adadad;\n  border-left: 3px solid #f8ac59;\n}\n\n.sortable-item-active {\n  background-color: #e6e6e6;\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n}\n\n.sortable-wrapper {\n  min-height: 150px;\n}\n\n#searchSurgeryPopup .ui-dialog {\n  z-index: 1011;\n  left: 400px !important;\n  top: 40px !important;\n  -webkit-transform: none;\n          transform: none;\n  opacity: 1;\n  width: 900px !important;\n}\n\n/* Drop Down List End */\n\nh6 {\n  color: red;\n  text-align: center;\n}\n\nh5 {\n  text-align: center;\n}\n\na.btn.btn-primary.pull-right {\n  margin-left: 10px;\n  color: white;\n}\n\nspan.star {\n  color: red;\n}\n\na.btn.btn-small.btn-danger.pull-right {\n  color: white;\n}\n\na.btn.btn-success {\n  color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvZGFzaGJvYWQvcHJvdmlkZXJkYXNoYm9hcmQvcHJvdmlkZXJkYXNoYm9hcmQxL0Q6XFxTdWppdCBTa3lDbGlmZklUIFByb2plY3RzXFxQcm9qZWN0MTEgU2lyXFxZb3VyRHJzXFx0cnVuay9zcmNcXGFwcFxcdmlld3NcXGRhc2hib2FkXFxwcm92aWRlcmRhc2hib2FyZFxccHJvdmlkZXJkYXNoYm9hcmQxXFxwcm92aWRlcmRhc2hib2FyZDEuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3ZpZXdzL2Rhc2hib2FkL3Byb3ZpZGVyZGFzaGJvYXJkL3Byb3ZpZGVyZGFzaGJvYXJkMS9wcm92aWRlcmRhc2hib2FyZDEuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx5QkFBQTtFQUNBLHFCQUFBO0VBQ0EsY0FBQTtFQUdBLHlDQUFBO0FDQ0Y7O0FEQ0E7RUFDRSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUVBLDBCQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSw2QkFBQTtFQUNBLGtCQUFBO0FDRUY7O0FEQUE7RUFDRSw4QkFBQTtBQ0dGOztBREFBO0VBQ0UsZUFBQTtFQUNBLE1BQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUNBQUE7RUFDQSxVQUFBO0FDR0Y7O0FEU0E7RUFDRSx5QkFBQTtFQUNBLHNCQUFBO0VBQ0EsK0JBQUE7RUFDQSxjQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxlQUFBO0VBQ0Esc0NBQUE7RUFDQSxxQ0FBQTtFQUNBLHVDQUFBO0VBQ0EsMkNBQUE7RUFHQSw2QkFBQTtBQ05GOztBRFFBO0VBQ0UscUJBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQ0xGOztBRE9BO0VBQ0UseUJBQUE7RUFDQSxxQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLHlDQUFBO0FDSkY7O0FETUE7RUFDRSw4QkFBQTtBQ0hGOztBREtBO0VBQ0UsbUJBQUE7RUFDQSx5QkFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtFQUdBLGtCQUFBO0FDRkY7O0FESUE7RUFDRSxhQUFBO0VBQ0EsZ0NBQUE7QUNERjs7QURNQTtFQUNJLFlBQUE7RUFDQSxvQkFBQTtFQUNBLFlBQUE7QUNISjs7QURLQTtFQUNFLGFBQUE7RUFDQSxjQUFBO0FDRkY7O0FESUE7RUFDRSxXQUFBO0VBQ0EsdUJBQUE7QUNERjs7QURHQTtFQUNFLHVCQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtBQ0FGOztBREVBO0VBQ0UsV0FBQTtFQUNBLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLG9CQUFBO0VBQ0EsU0FBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0FDQ0Y7O0FER0E7RUFDRTtJQUNFLHdCQUFBO0lBQ0EsY0FBQTtFQ0FGO0FBQ0Y7O0FERUE7RUFDRSxZQUFBO0VBQ0Esb0JBQUE7RUFDQSxZQUFBO0FDQUY7O0FERUE7RUFDRSxhQUFBO0VBQ0EsY0FBQTtFQUNBLHVCQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtBQ0NGOztBRENBO0VBQ0UsV0FBQTtFQUNBLHVCQUFBO0FDRUY7O0FEQ0E7RUFDRSxXQUFBO0VBQ0EseUJBQUE7RUFDQSxjQUFBO0VBQ0Esb0JBQUE7RUFDQSxTQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7QUNFRjs7QURFQTtFQUNFO0lBQ0Usd0JBQUE7SUFDQSxjQUFBO0VDQ0Y7QUFDRjs7QURDQTtFQUNFLFlBQUE7RUFDQSxvQkFBQTtFQUNBLFlBQUE7QUNDRjs7QURDQTtFQUNFLGFBQUE7RUFDQSxjQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLG9CQUFBO0FDRUY7O0FEQUE7RUFDRSxXQUFBO0VBQ0EsdUJBQUE7QUNHRjs7QUREQTtFQUNFLFdBQUE7RUFDQSx5QkFBQTtFQUNBLGNBQUE7RUFDQSxvQkFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtBQ0lGOztBRERBO0VBQ0UsK0JBQUE7RUFDQSw2QkFBQTtFQUNBLDhCQUFBO0VBQ0EsNEJBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0VBRUEscUJBQUE7RUFDQSwwQkFBQTtFQUNBLGtCQUFBO0VBQ0EsOEJBQUE7RUFDQSx1QkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtBQ0lGOztBREZBO0VBQ0Usa0JBQUE7RUFDQSxxQkFBQTtFQUNBLHNCQUFBO0FDS0Y7O0FESEE7RUFDRSxtQkFBQTtFQUNBLHNCQUFBO0FDTUY7O0FESEEsd0JBQUE7O0FBRU07RUFDRSxhQUFBO0VBQWUsa0JBQUE7QUNNdkI7O0FESE07RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQkFBQTtFQUFBLFlBQUE7RUFDQSw2QkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSw4QkFBQTtBQ01OOztBREpJO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFBQSxZQUFBO0VBQ0EsNkJBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0EsOEJBQUE7QUNPTjs7QURKSTtFQUNFLHlCQUFBO0VBQ0EsZ0RBQUE7QUNPTjs7QURKSTtFQUNFLGlCQUFBO0FDT047O0FETEk7RUFDQyxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxvQkFBQTtFQUNBLHVCQUFBO1VBQUEsZUFBQTtFQUNBLFVBQUE7RUFDQSx1QkFBQTtBQ1FMOztBRExBLHVCQUFBOztBQUdBO0VBQ0UsVUFBQTtFQUNBLGtCQUFBO0FDTUY7O0FESkE7RUFDRSxrQkFBQTtBQ09GOztBRExBO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0FDUUY7O0FETkE7RUFDRSxVQUFBO0FDU0Y7O0FEUEE7RUFDRSxZQUFBO0FDVUY7O0FEUkE7RUFDRSxZQUFBO0FDV0YiLCJmaWxlIjoic3JjL2FwcC92aWV3cy9kYXNoYm9hZC9wcm92aWRlcmRhc2hib2FyZC9wcm92aWRlcmRhc2hib2FyZDEvcHJvdmlkZXJkYXNoYm9hcmQxLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJ0bi1wcmltYXJ5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzg0ODQ4NDtcbiAgYm9yZGVyLWNvbG9yOiAjOTk5OTk5O1xuICBjb2xvcjogI0ZGRkZGRjtcbiAgLW1vei1ib3gtc2hhZG93OiAwIDhweCA3cHggcmdiYSgwLCAwLCAwLCAwLjIyKTtcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDhweCA3cHggcmdiYSgwLCAwLCAwLCAwLjIyKTtcbiAgYm94LXNoYWRvdzogMCA4cHggN3B4IHJnYmEoMCwgMCwgMCwgMC4yMik7XG59XG4uYnRuIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwYWRkaW5nOiA2cHggMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgLW1zLXRvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uO1xuICB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xuICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxubGFiZWwsIC5idG4sIC5uYXYtdGFicyA+IGxpID4gYSwgLmJhZGdlIHtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xufVxuXG4ubW9kYWwge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgei1pbmRleDogMTA1MDtcbiAgZGlzcGxheTogbm9uZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xuICBvdXRsaW5lOiAwO1xufVxuLy8gQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KXtcblxuXG4vLyAubW9kYWwtZGlhbG9nIHtcbi8vICAgICB3aWR0aDogNjAwcHg7XG4vLyAgICAgbWFyZ2luOiAzMHB4IGF1dG87XG5cbi8vIH1cbi8vIH1cblxuLmZvcm0tY29udHJvbCwgLnNpbmdsZS1saW5lIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcbiAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcbiAgLyogYm9yZGVyOiAxcHggc29saWQgI2U1ZTZlNzsgKi9cbiAgY29sb3I6IGluaGVyaXQ7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiA2cHggMTJweDtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNDQ0MgIWltcG9ydGFudDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNDQ0MgIWltcG9ydGFudDtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI0NDQyAhaW1wb3J0YW50O1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzM2Y2M5NSAhaW1wb3J0YW50O1xuICAtbW96LWJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xuICBib3JkZXItcmFkaXVzOiAwcHggIWltcG9ydGFudDtcbn1cbmxhYmVsIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDVweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4uYnRuLXN1Y2Nlc3Mge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjODQ4NDg0O1xuICBib3JkZXItY29sb3I6ICM5OTk5OTk7XG4gIGNvbG9yOiAjRkZGRkZGO1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBib3gtc2hhZG93OiAwIDhweCA3cHggcmdiYSgwLCAwLCAwLCAwLjIyKTtcbn1cbi5hZ2lsZS1saXN0IGxpLmluZm8tZWxlbWVudCB7XG4gIGJvcmRlci1sZWZ0OiAzcHggc29saWQgIzFjODRjNjtcbn1cbi5hZ2lsZS1saXN0IGxpIHtcbiAgYmFja2dyb3VuZDogI0ZBRkFGQjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2U3ZWFlYztcbiAgbWFyZ2luOiAwIDAgNXB4IDA7XG4gIHBhZGRpbmc6IDVweDtcbiAgLW1vei1ib3JkZXItcmFkaXVzOiAycHg7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMnB4O1xuICBib3JkZXItcmFkaXVzOiAycHg7XG59XG4ubW9kYWwtaGVhZGVyIHtcbiAgcGFkZGluZzogMTVweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlNWU1ZTU7XG59XG5cbi8vIHN1aml0IHN0YXJ0XG5cbjo6bmctZGVlcCAjZWRpdEZJbHRlciAudWktZGlhbG9nIHtcbiAgICB3aWR0aDogNjAwcHg7XG4gICAgdG9wOiAyMHB4ICFpbXBvcnRhbnQ7XG4gICAgei1pbmRleDogMTAwO1xufVxuOjpuZy1kZWVwICNlZGl0RklsdGVyIC51aS1kaWFsb2cgLnVpLWRpYWxvZy1jb250ZW50IHtcbiAgaGVpZ2h0OiAxMDBweDtcbiAgb3ZlcmZsb3c6IGF1dG87XG59XG46Om5nLWRlZXAgI2VkaXRGSWx0ZXIgLnVpLWRpYWxvZyAudWktZGlhbG9nLXRpdGxlYmFyIHtcbiAgYm9yZGVyOiAwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuOjpuZy1kZWVwICNlZGl0RklsdGVyIC51aS1kaWFsb2cgLnVpLWRpYWxvZy1jb250ZW50IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGNvbG9yOiAjMzMzMzMzO1xuICBib3JkZXI6IDBweDtcbiAgcGFkZGluZzogMC41NzFlbSAxZW07XG59XG46Om5nLWRlZXAgI2VkaXRGSWx0ZXIgIC51aS1kaWFsb2cgLnVpLWRpYWxvZy1mb290ZXIge1xuICBib3JkZXI6IDBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMzMzMzM7XG4gIHBhZGRpbmc6IDAuNTcxZW0gMWVtO1xuICBtYXJnaW46IDA7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRvcDogLTFweDtcbn1cblxuLy9cbkBtZWRpYSAobWluLWhlaWdodDo2MDBweCkgYW5kIChtYXgtaGVpZ2h0OjcwMHB4KXtcbiAgOjpuZy1kZWVwICNkaXNwbGF5Q29sdW0gLnVpLWRpYWxvZyAudWktZGlhbG9nLWNvbnRlbnQge1xuICAgIGhlaWdodDogNDAwcHggIWltcG9ydGFudDtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgfVxufVxuOjpuZy1kZWVwICNkaXNwbGF5Q29sdW0gLnVpLWRpYWxvZyB7XG4gIHdpZHRoOiA2MDBweDtcbiAgdG9wOiAyMHB4ICFpbXBvcnRhbnQ7XG4gIHotaW5kZXg6IDEwMDtcbn1cbjo6bmctZGVlcCAjZGlzcGxheUNvbHVtIC51aS1kaWFsb2cgLnVpLWRpYWxvZy1jb250ZW50IHtcbiAgaGVpZ2h0OiA3MzBweDtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBjb2xvcjogIzMzMzMzMztcbiAgYm9yZGVyOiAwcHg7XG4gIHBhZGRpbmc6IDAuNTcxZW0gMWVtO1xufVxuOjpuZy1kZWVwICNkaXNwbGF5Q29sdW0gLnVpLWRpYWxvZyAudWktZGlhbG9nLXRpdGxlYmFyIHtcbiAgYm9yZGVyOiAwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuXG46Om5nLWRlZXAgI2Rpc3BsYXlDb2x1bSAgLnVpLWRpYWxvZyAudWktZGlhbG9nLWZvb3RlciB7XG4gIGJvcmRlcjogMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBjb2xvcjogIzMzMzMzMztcbiAgcGFkZGluZzogMC41NzFlbSAxZW07XG4gIG1hcmdpbjogMDtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOiAtMXB4O1xufVxuXG4vL1xuQG1lZGlhIChtaW4taGVpZ2h0OjYwMHB4KSBhbmQgKG1heC1oZWlnaHQ6NzAwcHgpe1xuICA6Om5nLWRlZXAgI2ZpbHRlckZpZWxkcyAudWktZGlhbG9nIC51aS1kaWFsb2ctY29udGVudCB7XG4gICAgaGVpZ2h0OiA0MDBweCAhaW1wb3J0YW50O1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICB9XG59XG46Om5nLWRlZXAgI2ZpbHRlckZpZWxkcyAudWktZGlhbG9nIHtcbiAgd2lkdGg6IDYwMHB4O1xuICB0b3A6IDIwcHggIWltcG9ydGFudDtcbiAgei1pbmRleDogMTAwO1xufVxuOjpuZy1kZWVwICNmaWx0ZXJGaWVsZHMgLnVpLWRpYWxvZyAudWktZGlhbG9nLWNvbnRlbnQge1xuICBoZWlnaHQ6IDgwN3B4O1xuICBvdmVyZmxvdzogYXV0bztcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGNvbG9yOiAjMzMzMzMzO1xuICBib3JkZXI6IDBweDtcbiAgcGFkZGluZzogMC41NzFlbSAxZW07XG59XG46Om5nLWRlZXAgI2ZpbHRlckZpZWxkcyAudWktZGlhbG9nIC51aS1kaWFsb2ctdGl0bGViYXIge1xuICBib3JkZXI6IDBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG46Om5nLWRlZXAgI2ZpbHRlckZpZWxkcyAgLnVpLWRpYWxvZyAudWktZGlhbG9nLWZvb3RlciB7XG4gIGJvcmRlcjogMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBjb2xvcjogIzMzMzMzMztcbiAgcGFkZGluZzogMC41NzFlbSAxZW07XG4gIG1hcmdpbjogMDtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOiAtMXB4O1xufVxuXG4uaWJveC10aXRsZSB7XG4gIC1tb3otYm9yZGVyLWJvdHRvbS1jb2xvcnM6IG5vbmU7XG4gIC1tb3otYm9yZGVyLWxlZnQtY29sb3JzOiBub25lO1xuICAtbW96LWJvcmRlci1yaWdodC1jb2xvcnM6IG5vbmU7XG4gIC1tb3otYm9yZGVyLXRvcC1jb2xvcnM6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIGJvcmRlci1jb2xvcjogI2U3ZWFlYztcbiAgLW1vei1ib3JkZXItaW1hZ2U6IG5vbmU7XG4gIC1vLWJvcmRlci1pbWFnZTogbm9uZTtcbiAgLXdlYmtpdC1ib3JkZXItaW1hZ2U6IG5vbmU7XG4gIGJvcmRlci1pbWFnZTogbm9uZTtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZCBzb2xpZCBub25lO1xuICBib3JkZXItd2lkdGg6IDRweCAwcHggMDtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIG1hcmdpbi1ib3R0b206IDA7XG4gIHBhZGRpbmc6IDE0cHggMTVweCA3cHg7XG4gIGhlaWdodDogNDhweDtcbn1cbi51aS1jYWxlbmRhciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xufVxuLnVpLWlucHV0Z3JvdXAgLnVpLWlucHV0dGV4dCB7XG4gIHBhZGRpbmctbGVmdDogLjVlbTtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuLyogRHJvcCBEb3duIExpc3QgU3RhcnQqL1xuXG4gICAgICBib2R5IHtcbiAgICAgICAgcGFkZGluZzogMzBweDsgcG9zaXRpb246IHJlbGF0aXZlXG4gICAgICB9XG5cbiAgICAgIDo6bmctZGVlcCAjdW5zZWxlY3RlZGxpc3QgLnNvcnRhYmxlLWl0ZW0ge1xuICAgICAgcGFkZGluZzogNnB4IDEycHggO1xuICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNGVtO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgY3Vyc29yOiBncmFiO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICBib3JkZXItY29sb3I6ICNhZGFkYWQ7XG4gICAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkICMxYzg0YzY7XG4gICAgfVxuICAgIDo6bmctZGVlcCAjc2VsZWN0ZWRsaXN0IC5zb3J0YWJsZS1pdGVtIHtcbiAgICAgIHBhZGRpbmc6IDZweCAxMnB4IDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDRweDtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjRlbTtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGN1cnNvcjogZ3JhYjtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgYm9yZGVyLWNvbG9yOiAjYWRhZGFkO1xuICAgICAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCAjZjhhYzU5O1xuICAgIH1cblxuICAgIC5zb3J0YWJsZS1pdGVtLWFjdGl2ZSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTZlNmU2O1xuICAgICAgYm94LXNoYWRvdzogaW5zZXQgMCAzcHggNXB4IHJnYmEoMCwwLDAsLjEyNSk7XG4gICAgfVxuXG4gICAgLnNvcnRhYmxlLXdyYXBwZXIge1xuICAgICAgbWluLWhlaWdodDogMTUwcHg7XG4gICAgfVxuICAgICNzZWFyY2hTdXJnZXJ5UG9wdXAgLnVpLWRpYWxvZ3tcblx0ICAgIHotaW5kZXg6IDEwMTE7XG5cdCAgICBsZWZ0OiA0MDBweCAhaW1wb3J0YW50O1xuXHQgICAgdG9wOiA0MHB4ICFpbXBvcnRhbnQ7XG5cdCAgICB0cmFuc2Zvcm06IG5vbmU7XG5cdCAgICBvcGFjaXR5OiAxO1xuXHQgICAgd2lkdGg6IDkwMHB4ICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4vKiBEcm9wIERvd24gTGlzdCBFbmQgKi9cblxuLy8gc3VqaXQgZW5kXG5oNiB7XG4gIGNvbG9yOiByZWQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbmg1IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyOztcbn1cbmEuYnRuLmJ0bi1wcmltYXJ5LnB1bGwtcmlnaHQge1xuICBtYXJnaW4tbGVmdDogMTBweDtcbiAgY29sb3I6IHdoaXRlO1xufVxuc3Bhbi5zdGFyIHtcbiAgY29sb3I6IHJlZDtcbn1cbmEuYnRuLmJ0bi1zbWFsbC5idG4tZGFuZ2VyLnB1bGwtcmlnaHQge1xuICBjb2xvcjogd2hpdGU7XG59XG5hLmJ0bi5idG4tc3VjY2VzcyB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuIiwiLmJ0bi1wcmltYXJ5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzg0ODQ4NDtcbiAgYm9yZGVyLWNvbG9yOiAjOTk5OTk5O1xuICBjb2xvcjogI0ZGRkZGRjtcbiAgLW1vei1ib3gtc2hhZG93OiAwIDhweCA3cHggcmdiYSgwLCAwLCAwLCAwLjIyKTtcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDhweCA3cHggcmdiYSgwLCAwLCAwLCAwLjIyKTtcbiAgYm94LXNoYWRvdzogMCA4cHggN3B4IHJnYmEoMCwgMCwgMCwgMC4yMik7XG59XG5cbi5idG4ge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBhZGRpbmc6IDZweCAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAwO1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBsaW5lLWhlaWdodDogMS40Mjg1NzE0MztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAtbXMtdG91Y2gtYWN0aW9uOiBtYW5pcHVsYXRpb247XG4gIHRvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG5cbmxhYmVsLCAuYnRuLCAubmF2LXRhYnMgPiBsaSA+IGEsIC5iYWRnZSB7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcbn1cblxuLm1vZGFsIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6IDEwNTA7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcbiAgb3V0bGluZTogMDtcbn1cblxuLmZvcm0tY29udHJvbCwgLnNpbmdsZS1saW5lIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcbiAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcbiAgLyogYm9yZGVyOiAxcHggc29saWQgI2U1ZTZlNzsgKi9cbiAgY29sb3I6IGluaGVyaXQ7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiA2cHggMTJweDtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNDQ0MgIWltcG9ydGFudDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNDQ0MgIWltcG9ydGFudDtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI0NDQyAhaW1wb3J0YW50O1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzM2Y2M5NSAhaW1wb3J0YW50O1xuICAtbW96LWJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xuICBib3JkZXItcmFkaXVzOiAwcHggIWltcG9ydGFudDtcbn1cblxubGFiZWwge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmJ0bi1zdWNjZXNzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzg0ODQ4NDtcbiAgYm9yZGVyLWNvbG9yOiAjOTk5OTk5O1xuICBjb2xvcjogI0ZGRkZGRjtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgYm94LXNoYWRvdzogMCA4cHggN3B4IHJnYmEoMCwgMCwgMCwgMC4yMik7XG59XG5cbi5hZ2lsZS1saXN0IGxpLmluZm8tZWxlbWVudCB7XG4gIGJvcmRlci1sZWZ0OiAzcHggc29saWQgIzFjODRjNjtcbn1cblxuLmFnaWxlLWxpc3QgbGkge1xuICBiYWNrZ3JvdW5kOiAjRkFGQUZCO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZTdlYWVjO1xuICBtYXJnaW46IDAgMCA1cHggMDtcbiAgcGFkZGluZzogNXB4O1xuICAtbW96LWJvcmRlci1yYWRpdXM6IDJweDtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAycHg7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbn1cblxuLm1vZGFsLWhlYWRlciB7XG4gIHBhZGRpbmc6IDE1cHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTVlNWU1O1xufVxuXG46Om5nLWRlZXAgI2VkaXRGSWx0ZXIgLnVpLWRpYWxvZyB7XG4gIHdpZHRoOiA2MDBweDtcbiAgdG9wOiAyMHB4ICFpbXBvcnRhbnQ7XG4gIHotaW5kZXg6IDEwMDtcbn1cblxuOjpuZy1kZWVwICNlZGl0RklsdGVyIC51aS1kaWFsb2cgLnVpLWRpYWxvZy1jb250ZW50IHtcbiAgaGVpZ2h0OiAxMDBweDtcbiAgb3ZlcmZsb3c6IGF1dG87XG59XG5cbjo6bmctZGVlcCAjZWRpdEZJbHRlciAudWktZGlhbG9nIC51aS1kaWFsb2ctdGl0bGViYXIge1xuICBib3JkZXI6IDBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbjo6bmctZGVlcCAjZWRpdEZJbHRlciAudWktZGlhbG9nIC51aS1kaWFsb2ctY29udGVudCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBjb2xvcjogIzMzMzMzMztcbiAgYm9yZGVyOiAwcHg7XG4gIHBhZGRpbmc6IDAuNTcxZW0gMWVtO1xufVxuXG46Om5nLWRlZXAgI2VkaXRGSWx0ZXIgLnVpLWRpYWxvZyAudWktZGlhbG9nLWZvb3RlciB7XG4gIGJvcmRlcjogMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBjb2xvcjogIzMzMzMzMztcbiAgcGFkZGluZzogMC41NzFlbSAxZW07XG4gIG1hcmdpbjogMDtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOiAtMXB4O1xufVxuXG5AbWVkaWEgKG1pbi1oZWlnaHQ6IDYwMHB4KSBhbmQgKG1heC1oZWlnaHQ6IDcwMHB4KSB7XG4gIDo6bmctZGVlcCAjZGlzcGxheUNvbHVtIC51aS1kaWFsb2cgLnVpLWRpYWxvZy1jb250ZW50IHtcbiAgICBoZWlnaHQ6IDQwMHB4ICFpbXBvcnRhbnQ7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gIH1cbn1cbjo6bmctZGVlcCAjZGlzcGxheUNvbHVtIC51aS1kaWFsb2cge1xuICB3aWR0aDogNjAwcHg7XG4gIHRvcDogMjBweCAhaW1wb3J0YW50O1xuICB6LWluZGV4OiAxMDA7XG59XG5cbjo6bmctZGVlcCAjZGlzcGxheUNvbHVtIC51aS1kaWFsb2cgLnVpLWRpYWxvZy1jb250ZW50IHtcbiAgaGVpZ2h0OiA3MzBweDtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBjb2xvcjogIzMzMzMzMztcbiAgYm9yZGVyOiAwcHg7XG4gIHBhZGRpbmc6IDAuNTcxZW0gMWVtO1xufVxuXG46Om5nLWRlZXAgI2Rpc3BsYXlDb2x1bSAudWktZGlhbG9nIC51aS1kaWFsb2ctdGl0bGViYXIge1xuICBib3JkZXI6IDBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbjo6bmctZGVlcCAjZGlzcGxheUNvbHVtIC51aS1kaWFsb2cgLnVpLWRpYWxvZy1mb290ZXIge1xuICBib3JkZXI6IDBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMzMzMzM7XG4gIHBhZGRpbmc6IDAuNTcxZW0gMWVtO1xuICBtYXJnaW46IDA7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRvcDogLTFweDtcbn1cblxuQG1lZGlhIChtaW4taGVpZ2h0OiA2MDBweCkgYW5kIChtYXgtaGVpZ2h0OiA3MDBweCkge1xuICA6Om5nLWRlZXAgI2ZpbHRlckZpZWxkcyAudWktZGlhbG9nIC51aS1kaWFsb2ctY29udGVudCB7XG4gICAgaGVpZ2h0OiA0MDBweCAhaW1wb3J0YW50O1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICB9XG59XG46Om5nLWRlZXAgI2ZpbHRlckZpZWxkcyAudWktZGlhbG9nIHtcbiAgd2lkdGg6IDYwMHB4O1xuICB0b3A6IDIwcHggIWltcG9ydGFudDtcbiAgei1pbmRleDogMTAwO1xufVxuXG46Om5nLWRlZXAgI2ZpbHRlckZpZWxkcyAudWktZGlhbG9nIC51aS1kaWFsb2ctY29udGVudCB7XG4gIGhlaWdodDogODA3cHg7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgY29sb3I6ICMzMzMzMzM7XG4gIGJvcmRlcjogMHB4O1xuICBwYWRkaW5nOiAwLjU3MWVtIDFlbTtcbn1cblxuOjpuZy1kZWVwICNmaWx0ZXJGaWVsZHMgLnVpLWRpYWxvZyAudWktZGlhbG9nLXRpdGxlYmFyIHtcbiAgYm9yZGVyOiAwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuXG46Om5nLWRlZXAgI2ZpbHRlckZpZWxkcyAudWktZGlhbG9nIC51aS1kaWFsb2ctZm9vdGVyIHtcbiAgYm9yZGVyOiAwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzMzMzMzO1xuICBwYWRkaW5nOiAwLjU3MWVtIDFlbTtcbiAgbWFyZ2luOiAwO1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0b3A6IC0xcHg7XG59XG5cbi5pYm94LXRpdGxlIHtcbiAgLW1vei1ib3JkZXItYm90dG9tLWNvbG9yczogbm9uZTtcbiAgLW1vei1ib3JkZXItbGVmdC1jb2xvcnM6IG5vbmU7XG4gIC1tb3otYm9yZGVyLXJpZ2h0LWNvbG9yczogbm9uZTtcbiAgLW1vei1ib3JkZXItdG9wLWNvbG9yczogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgYm9yZGVyLWNvbG9yOiAjZTdlYWVjO1xuICAtbW96LWJvcmRlci1pbWFnZTogbm9uZTtcbiAgLW8tYm9yZGVyLWltYWdlOiBub25lO1xuICAtd2Via2l0LWJvcmRlci1pbWFnZTogbm9uZTtcbiAgYm9yZGVyLWltYWdlOiBub25lO1xuICBib3JkZXItc3R5bGU6IHNvbGlkIHNvbGlkIG5vbmU7XG4gIGJvcmRlci13aWR0aDogNHB4IDBweCAwO1xuICBjb2xvcjogaW5oZXJpdDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbiAgcGFkZGluZzogMTRweCAxNXB4IDdweDtcbiAgaGVpZ2h0OiA0OHB4O1xufVxuXG4udWktY2FsZW5kYXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuLnVpLWlucHV0Z3JvdXAgLnVpLWlucHV0dGV4dCB7XG4gIHBhZGRpbmctbGVmdDogMC41ZW07XG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG59XG5cbi8qIERyb3AgRG93biBMaXN0IFN0YXJ0Ki9cbmJvZHkge1xuICBwYWRkaW5nOiAzMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbjo6bmctZGVlcCAjdW5zZWxlY3RlZGxpc3QgLnNvcnRhYmxlLWl0ZW0ge1xuICBwYWRkaW5nOiA2cHggMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjRlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjdXJzb3I6IGdyYWI7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJvcmRlci1jb2xvcjogI2FkYWRhZDtcbiAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCAjMWM4NGM2O1xufVxuXG46Om5nLWRlZXAgI3NlbGVjdGVkbGlzdCAuc29ydGFibGUtaXRlbSB7XG4gIHBhZGRpbmc6IDZweCAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbGluZS1oZWlnaHQ6IDEuNGVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGN1cnNvcjogZ3JhYjtcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm9yZGVyLWNvbG9yOiAjYWRhZGFkO1xuICBib3JkZXItbGVmdDogM3B4IHNvbGlkICNmOGFjNTk7XG59XG5cbi5zb3J0YWJsZS1pdGVtLWFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlNmU2ZTY7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgM3B4IDVweCByZ2JhKDAsIDAsIDAsIDAuMTI1KTtcbn1cblxuLnNvcnRhYmxlLXdyYXBwZXIge1xuICBtaW4taGVpZ2h0OiAxNTBweDtcbn1cblxuI3NlYXJjaFN1cmdlcnlQb3B1cCAudWktZGlhbG9nIHtcbiAgei1pbmRleDogMTAxMTtcbiAgbGVmdDogNDAwcHggIWltcG9ydGFudDtcbiAgdG9wOiA0MHB4ICFpbXBvcnRhbnQ7XG4gIHRyYW5zZm9ybTogbm9uZTtcbiAgb3BhY2l0eTogMTtcbiAgd2lkdGg6IDkwMHB4ICFpbXBvcnRhbnQ7XG59XG5cbi8qIERyb3AgRG93biBMaXN0IEVuZCAqL1xuaDYge1xuICBjb2xvcjogcmVkO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmg1IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG5hLmJ0bi5idG4tcHJpbWFyeS5wdWxsLXJpZ2h0IHtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuc3Bhbi5zdGFyIHtcbiAgY29sb3I6IHJlZDtcbn1cblxuYS5idG4uYnRuLXNtYWxsLmJ0bi1kYW5nZXIucHVsbC1yaWdodCB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuYS5idG4uYnRuLXN1Y2Nlc3Mge1xuICBjb2xvcjogd2hpdGU7XG59Il19 */");

/***/ }),

/***/ "./src/app/views/dashboad/providerdashboard/providerdashboard1/providerdashboard1.component.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/app/views/dashboad/providerdashboard/providerdashboard1/providerdashboard1.component.ts ***!
  \*****************************************************************************************************/
/*! exports provided: Providerdashboard1Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Providerdashboard1Component", function() { return Providerdashboard1Component; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_appservices_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../services/appservices/shared.service */ "./src/app/services/appservices/shared.service.ts");
/* harmony import */ var _services_master_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../services/master.service */ "./src/app/services/master.service.ts");
/* harmony import */ var _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../models/providerdashboard */ "./src/app/models/providerdashboard.ts");







var Providerdashboard1Component = /** @class */ (function () {
    function Providerdashboard1Component(messageService, fb, _data1, masterService) {
        this.messageService = messageService;
        this.fb = fb;
        this._data1 = _data1;
        this.masterService = masterService;
        this.saveEditFilter = false;
        this.editDisplayColumns = false;
        this.editFilterFields = false;
        this.Location = true;
        this.Provider = true;
        this.PatientName = true;
        this.Case = true;
        this.AppointmentFromDate = true;
        this.AuthorizationStatus = true;
        this.MOP = true;
        this.SuperBillStatus = true;
        this.CheckedInTime = true;
        this.AppointmentCreatedFromDate = true;
        this.VerificationStatus = true;
        this.CaseDetails = true;
        this.AppointmentStatus = true;
        this.DictationType = true;
        this.AssessmentStatus = true;
        this.POSLocation = true;
        this.VideoSession = true;
        this.DictationStatus = true;
        this.BillingStatus = true;
        this.AppointmentType = true;
        this.myFilter1 = [];
        this.searcResult = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.filterColumns = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.filterFields = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.reset = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.saveFilter = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.itemDisplayColumnsStringsLeft = [
            'Appointment From Date',
            'Authorization Status',
            'Case #',
            'MOP',
            'Super Bill Status',
            'Checked In Time',
            'Patient Name',
            'Appointment Created From Date',
            'Provider',
            'Verification Status',
            'Location',
            'Case Details',
            'Appointment Status',
            'Dictation Type',
            'Assessment Status',
            'POS Location',
            'Video Session',
            'Dictation Status',
            'Billing Status',
            'Appointment Type'
        ];
        this.itemDisplayColumnsStringsRight = [];
        this.fav_fil = [
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["Favfilter"]('sujit'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["Favfilter"]('vinay'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["Favfilter"]('shivu')
        ];
        this.start_time = [
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["Starttime"]('04:00 AM'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["Starttime"]('04:15 AM'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["Starttime"]('04:30 AM'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["Starttime"]('04:45 AM')
        ];
        this.end_time = [
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["Endtime"]('10:00 PM'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["Endtime"]('10:15 PM'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["Endtime"]('10:30 PM'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["Endtime"]('10:45 PM')
        ];
        this.speciality = [
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["Speciality"]('Spine Care'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["Speciality"]('GN/OBG'),
            new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["Speciality"]('Spine Surgery')
        ];
        this.state = [new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["State"]('NY'), new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["State"]('NJ'), new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["State"]('AK')];
        this.mop = [new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["Mop"]('Insurance'), new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["Mop"]('Lien'), new _models_providerdashboard__WEBPACK_IMPORTED_MODULE_6__["Mop"]('Self-Pay')];
        this.itemFilterFieldsStringsLeft = [];
        this.itemFilterFieldsStringsRight = [];
    }
    Providerdashboard1Component.prototype.ngOnInit = function () {
        var _this = this;
        this.favoritename = this.fb.group({
            fname: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required)
        });
        this.getPracticedetails();
        this.getLocationdetails();
        this.getPOSPracticedetails();
        this.getPOSLocationdetails();
        this.getProviderdetails();
        this.getApmtTypedetails();
        this.getApmtStatusdetails();
        this.getDicStatusdetails();
        this.getAsstStatusdetails();
        this.getBillStatusdetails();
        this.getCaseTypedetails();
        this.getDicTypedetails();
        this.getEpiStatusdetails();
        this.getAutStatusdetails();
        this.getVerStatusdetails();
        this.getSupBillStatusdetails();
        this.getFavFilterdetails();
        setTimeout(function () {
            _this.getListControls();
        }, 500);
    };
    Providerdashboard1Component.prototype.getListControls = function () {
        this.itemFilterFieldsStringsLeft = [
            {
                Id: 1,
                visible: true,
                fieldName: 'Practice',
                position: 1,
                type: 'dropdown',
                isVisible: true,
                options: this.practice,
                controlname: 'practice'
            },
            {
                Id: 2,
                visible: true,
                fieldName: 'Location',
                position: 2,
                type: 'dropdown',
                isVisible: true,
                options: this.location,
                controlname: 'location'
            },
            {
                Id: 3,
                visible: true,
                fieldName: 'Provider',
                position: 3,
                type: 'dropdown',
                isVisible: true,
                options: this.provider,
                controlname: 'provider'
            },
            {
                Id: 4,
                visible: true,
                fieldName: 'POS Location',
                position: 4,
                type: 'dropdown',
                isVisible: true,
                options: this.pos_location,
                controlname: 'pos_location'
            },
            {
                Id: 5,
                visible: true,
                fieldName: 'POS Practice',
                position: 5,
                type: 'dropdown',
                isVisible: true,
                options: this.pos_practice,
                controlname: 'pos_practice'
            },
            {
                Id: 6,
                visible: true,
                fieldName: 'Case #',
                position: 6,
                type: 'inputbox',
                isVisible: true,
                controlname: 'case'
            },
            {
                Id: 7,
                visible: true,
                fieldName: 'Account #',
                position: 7,
                type: 'inputbox',
                isVisible: true,
                controlname: 'account'
            },
            {
                Id: 8,
                visible: true,
                fieldName: 'Patient Name',
                position: 8,
                type: 'inputbox',
                isVisible: true,
                controlname: 'patient_name'
            },
            {
                Id: 9,
                visible: true,
                fieldName: 'Dictation Status',
                position: 9,
                type: 'dropdown',
                isVisible: true,
                options: this.dic_ststus,
                controlname: 'dic_ststus'
            },
            {
                Id: 10,
                visible: true,
                fieldName: 'Super Bill Status',
                position: 10,
                type: 'dropdown',
                isVisible: true,
                options: this.sup_bill_staus,
                controlname: 'sup_bill_staus'
            },
            {
                Id: 11,
                visible: true,
                fieldName: 'Billing Status',
                position: 11,
                type: 'dropdown',
                isVisible: true,
                options: this.bill_status,
                controlname: 'bill_status'
            },
            {
                Id: 12,
                visible: true,
                fieldName: 'Dictation Type',
                position: 12,
                type: 'dropdown',
                isVisible: true,
                options: this.dic_type,
                controlname: 'dic_type'
            },
            {
                Id: 13,
                visible: true,
                fieldName: 'Case Type',
                position: 13,
                type: 'dropdown',
                isVisible: true,
                options: this.case_type,
                controlname: 'case_type'
            },
            {
                Id: 14,
                visible: true,
                fieldName: 'Assessment Status',
                position: 14,
                type: 'dropdown',
                isVisible: true,
                options: this.asse_ststus,
                controlname: 'asse_ststus'
            },
            {
                Id: 15,
                visible: true,
                fieldName: 'Apmt Created To Date',
                position: 15,
                type: 'datepicker',
                isVisible: true,
                controlname: 'app_cre_to_date'
            },
            {
                Id: 16,
                visible: true,
                fieldName: 'Appointment Status',
                position: 16,
                type: 'dropdown',
                isVisible: true,
                options: this.appt_status,
                controlname: 'appt_status'
            },
            {
                Id: 17,
                visible: true,
                fieldName: 'Episode Status',
                position: 17,
                type: 'dropdown',
                isVisible: true,
                options: this.epi_status,
                controlname: 'epi_status'
            },
            {
                Id: 18,
                visible: true,
                fieldName: 'Authorization Status',
                position: 18,
                type: 'dropdown',
                isVisible: true,
                options: this.aut_status,
                controlname: 'aut_status'
            },
            {
                Id: 19,
                visible: true,
                fieldName: 'Apmt Created From Date',
                position: 19,
                type: 'datepicker',
                isVisible: true,
                controlname: 'app_cre_from_date'
            },
            {
                Id: 20,
                visible: true,
                fieldName: 'Verification Status',
                position: 20,
                type: 'dropdown',
                isVisible: true,
                options: this.ver_status,
                controlname: 'ver_status'
            },
            {
                Id: 21,
                visible: true,
                fieldName: 'Appointment Type',
                position: 21,
                type: 'dropdown',
                isVisible: true,
                options: this.appt_type,
                controlname: 'appt_type'
            },
            {
                Id: 22,
                visible: true,
                fieldName: 'Appointment To Date',
                position: 22,
                type: 'datepicker',
                isVisible: true,
                controlname: 'appt_to_date'
            },
            {
                Id: 23,
                visible: true,
                fieldName: 'Appointment From Date',
                position: 23,
                type: 'datepicker',
                isVisible: true,
                controlname: 'appt_from_date'
            },
            {
                Id: 24,
                visible: true,
                fieldName: 'Favourite Filters',
                position: 24,
                type: 'dropdown',
                isVisible: true,
                options: this.myFilter,
                controlname: 'fav_fil',
                icon: 'fa fa-trash'
            },
            {
                Id: 25,
                visible: true,
                fieldName: 'Is Stat File',
                position: 25,
                type: 'chekbox',
                isVisible: true,
            }
        ];
    };
    Providerdashboard1Component.prototype.saveeditfilter = function () {
        this.saveEditFilter = true;
    };
    Providerdashboard1Component.prototype.editdisplaycolumns = function () {
        this.editDisplayColumns = true;
    };
    Providerdashboard1Component.prototype.editfilterfields = function () {
        this.editFilterFields = true;
    };
    Providerdashboard1Component.prototype.closeDisplayColum = function () {
        this.editDisplayColumns = false;
    };
    Providerdashboard1Component.prototype.closeSaveEditFilter = function () {
        this.saveEditFilter = false;
    };
    Providerdashboard1Component.prototype.closeEditFilterFields = function () {
        this.editFilterFields = false;
    };
    Providerdashboard1Component.prototype.printPage = function () {
        window.print();
    };
    Providerdashboard1Component.prototype.Search = function () {
        this.searcResult.emit('HI');
    };
    Providerdashboard1Component.prototype.onSave = function () {
        this.filterColumns.emit(this.itemDisplayColumnsStringsRight);
        this.closeEditFilterFields();
        this.editDisplayColumns = false;
    };
    Providerdashboard1Component.prototype.onSave1 = function () {
        this.filterFields.emit(this.itemFilterFieldsStringsLeft);
        this.editFilterFields = false;
    };
    Providerdashboard1Component.prototype.clear = function () {
        this.reset.emit('hi');
    };
    Providerdashboard1Component.prototype.onSavefilter = function () {
        if (this.favoritename.value.fname === '') {
            this.messageService.add({
                severity: 'error',
                summary: 'Warning',
                detail: 'Select Fname'
            });
            return;
        }
        else {
            var ItemLength = this.myFilter.length + 1;
            var favoritename1 = {
                label: this.favoritename.value.fname,
                value: ItemLength
            };
            this.myFilter.push(favoritename1);
            this.messageService.add({
                severity: 'success',
                summary: 'Added',
                detail: 'Successfully Created'
            });
            this.saveFilter.emit(this.itemFilterFieldsStringsLeft);
            this.saveEditFilter = false;
            this.favoritename.reset();
        }
    };
    Providerdashboard1Component.prototype.getPracticedetails = function () {
        var _this = this;
        this._data1.getdataPractice().subscribe(function (data) {
            _this.practice = _this.masterService.formatDataforDropdown('Practice', data, 'select', 'Id');
            console.log('test', _this.practice);
        });
    };
    Providerdashboard1Component.prototype.getLocationdetails = function () {
        var _this = this;
        this._data1.getdataLocation().subscribe(function (data) {
            _this.location = _this.masterService.formatDataforDropdown('Location', data, 'select', 'Id');
            console.log('test', _this.location);
        });
    };
    Providerdashboard1Component.prototype.getPOSPracticedetails = function () {
        var _this = this;
        this._data1.getdataPosPractice().subscribe(function (data) {
            _this.pos_practice = _this.masterService.formatDataforDropdown('PosPractice', data, 'select', 'Id');
            console.log('test', _this.pos_practice);
        });
    };
    Providerdashboard1Component.prototype.getPOSLocationdetails = function () {
        var _this = this;
        this._data1.getdataPosLocation().subscribe(function (data) {
            _this.pos_location = _this.masterService.formatDataforDropdown('PosLocation', data, 'select', 'Id');
            console.log('test', _this.pos_location);
        });
    };
    Providerdashboard1Component.prototype.getProviderdetails = function () {
        var _this = this;
        this._data1.getdataProvider().subscribe(function (data) {
            _this.provider = _this.masterService.formatDataforDropdown('Provider', data, 'select', 'Id');
            console.log('test', _this.provider);
        });
    };
    Providerdashboard1Component.prototype.getApmtTypedetails = function () {
        var _this = this;
        this._data1.getdataApmttype().subscribe(function (data) {
            _this.appt_type = _this.masterService.formatDataforDropdown('AppmtType', data, 'select', 'Id');
            console.log('test', _this.appt_type);
        });
    };
    Providerdashboard1Component.prototype.getApmtStatusdetails = function () {
        var _this = this;
        this._data1.getdataApmtstatus().subscribe(function (data) {
            _this.appt_status = _this.masterService.formatDataforDropdown('AppmtStatus', data, 'select', 'Id');
            console.log('test', _this.appt_status);
        });
    };
    Providerdashboard1Component.prototype.getDicStatusdetails = function () {
        var _this = this;
        this._data1.getdataDicstatus().subscribe(function (data) {
            _this.dic_ststus = _this.masterService.formatDataforDropdown('DicStatus', data, 'select', 'Id');
            console.log('test', _this.dic_ststus);
        });
    };
    Providerdashboard1Component.prototype.getAsstStatusdetails = function () {
        var _this = this;
        this._data1.getdataAsststatus().subscribe(function (data) {
            _this.asse_ststus = _this.masterService.formatDataforDropdown('AsstStatus', data, 'select', 'Id');
            console.log('test', _this.asse_ststus);
        });
    };
    Providerdashboard1Component.prototype.getBillStatusdetails = function () {
        var _this = this;
        this._data1.getdataBillstatus().subscribe(function (data) {
            _this.bill_status = _this.masterService.formatDataforDropdown('Billstatus', data, 'select', 'Id');
            console.log('test', _this.bill_status);
        });
    };
    Providerdashboard1Component.prototype.getCaseTypedetails = function () {
        var _this = this;
        this._data1.getdataCasetype().subscribe(function (data) {
            _this.case_type = _this.masterService.formatDataforDropdown('CaseType', data, 'select', 'Id');
            console.log('test', _this.case_type);
        });
    };
    Providerdashboard1Component.prototype.getDicTypedetails = function () {
        var _this = this;
        this._data1.getdataDictype().subscribe(function (data) {
            _this.dic_type = _this.masterService.formatDataforDropdown('DicType', data, 'select', 'Id');
            console.log('test', _this.dic_type);
        });
    };
    Providerdashboard1Component.prototype.getEpiStatusdetails = function () {
        var _this = this;
        this._data1.getdataEpistatus().subscribe(function (data) {
            _this.epi_status = _this.masterService.formatDataforDropdown('EpiStatus', data, 'select', 'Id');
            console.log('test', _this.epi_status);
        });
    };
    Providerdashboard1Component.prototype.getAutStatusdetails = function () {
        var _this = this;
        this._data1.getdataAutstatus().subscribe(function (data) {
            _this.aut_status = _this.masterService.formatDataforDropdown('AutStatus', data, 'select', 'Id');
            console.log('test', _this.aut_status);
        });
    };
    Providerdashboard1Component.prototype.getVerStatusdetails = function () {
        var _this = this;
        this._data1.getdataVerstatus().subscribe(function (data) {
            _this.ver_status = _this.masterService.formatDataforDropdown('VerStatus', data, 'select', 'Id');
            console.log('test', _this.ver_status);
        });
    };
    Providerdashboard1Component.prototype.getSupBillStatusdetails = function () {
        var _this = this;
        this._data1.getdataSuperbillstatus().subscribe(function (data) {
            _this.sup_bill_staus = _this.masterService.formatDataforDropdown('SuperBillStatus', data, 'select', 'Id');
            console.log('test', _this.sup_bill_staus);
        });
    };
    Providerdashboard1Component.prototype.getFavFilterdetails = function () {
        var _this = this;
        this._data1.getdataFavfil().subscribe(function (data) {
            _this.myFilter = _this.masterService.formatDataforDropdown('FavFil', data, 'select', 'Id');
            console.log('test', _this.myFilter);
        });
    };
    Providerdashboard1Component.ctorParameters = function () { return [
        { type: primeng_api__WEBPACK_IMPORTED_MODULE_2__["MessageService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: _services_appservices_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] },
        { type: _services_master_service__WEBPACK_IMPORTED_MODULE_5__["MasterService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], Providerdashboard1Component.prototype, "searcResult", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], Providerdashboard1Component.prototype, "filterColumns", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], Providerdashboard1Component.prototype, "filterFields", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], Providerdashboard1Component.prototype, "reset", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], Providerdashboard1Component.prototype, "saveFilter", void 0);
    Providerdashboard1Component = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-providerdashboard1',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./providerdashboard1.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboad/providerdashboard/providerdashboard1/providerdashboard1.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./providerdashboard1.component.scss */ "./src/app/views/dashboad/providerdashboard/providerdashboard1/providerdashboard1.component.scss")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [primeng_api__WEBPACK_IMPORTED_MODULE_2__["MessageService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _services_appservices_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"],
            _services_master_service__WEBPACK_IMPORTED_MODULE_5__["MasterService"]])
    ], Providerdashboard1Component);
    return Providerdashboard1Component;
}());



/***/ })

}]);
//# sourceMappingURL=views-dashboad-dashboard-module.js.map