import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface FormModalComponent {
  title: string;
  message: string;
  okButton: boolean;
  cancelButton: boolean;
}

@Component({  
    selector: 'modal',
    styleUrls: ['../styles/modal.less'],
    templateUrl: '../views/form.modal.html',
})

export class FormModalComponent extends DialogComponent<FormModalComponent, boolean> implements FormModalComponent {
  title: string;
  message: string;
  okButton: boolean;
  cancelButton: boolean;

  constructor(
    dialogService: DialogService
  ) {
    super(dialogService);
  }

  confirm() {
    this.result = true;
    this.close();
  }
}