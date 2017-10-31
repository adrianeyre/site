import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface ModalComponent {
  title: string;
  message: string;
  okButton: boolean;
  cancelButton: boolean;
}

@Component({  
    selector: 'modal',
    styleUrls: ['../styles/modal.less'],
    templateUrl: '../views/standard.modal.html',
})

export class ModalComponent extends DialogComponent<ModalComponent, boolean> implements ModalComponent {
  title: string;
  message: string;
  okButton: boolean;
  cancelButton: boolean;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  confirm() {
    this.result = true;
    this.close();
  }
}