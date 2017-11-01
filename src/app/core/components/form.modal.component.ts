import { Component } from '@angular/core';
import { Forms } from '../../core/config/forms';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface FormModalComponent {
  title: string;
  okButton: boolean;
  cancelButton: boolean;
  form: string;
}

@Component({  
    selector: 'modal',
    styleUrls: ['../styles/modal.less'],
    templateUrl: '../views/form.modal.html',
})

export class FormModalComponent extends DialogComponent<FormModalComponent, boolean> implements FormModalComponent {
  title: string;
  okButton: boolean;
  cancelButton: boolean;
  form: string;
  formData = {};

  constructor(
    dialogService: DialogService,
    private forms: Forms,
  ) {
    super(dialogService);
  }

  ngOnInit() {
    this.formData = this.forms[this.form];
  }

  onSubmit(answers) {
    this.result = answers;
    this.close();
  }

}
