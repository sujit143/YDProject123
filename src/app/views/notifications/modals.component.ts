import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'modals.component.html'
})
export class ModalsComponent {
  @ViewChild('myModal', {static: true}) public myModal: ModalDirective;
  @ViewChild('largeModal', {static: true}) public largeModal: ModalDirective;
  @ViewChild('smallModal', {static: true}) public smallModal: ModalDirective;
  @ViewChild('primaryModal', {static: true}) public primaryModal: ModalDirective;
  @ViewChild('successModal', {static: true}) public successModal: ModalDirective;
  @ViewChild('warningModal', {static: true}) public warningModal: ModalDirective;
  @ViewChild('dangerModal', {static: true}) public dangerModal: ModalDirective;
  @ViewChild('infoModal', {static: true}) public infoModal: ModalDirective;
}
