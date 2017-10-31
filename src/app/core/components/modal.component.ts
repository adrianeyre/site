import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface ModalComponent {
  title:string;
  message:string;
  okButton: boolean;
  cancelButton: boolean;
}

@Component({  
    selector: 'modal',
    styleUrls: ['../styles/modal.less'],
    template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title" translate="{{ title }}"></h4>
                   </div>
                   <div class="modal-body">
                     <p translate="{{ message }}"></p>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="confirm()" *ngIf="okButton" translate="modal.okButton"></button>
                     <button type="button" class="btn btn-default" (click)="close()" *ngIf="cancelButton" translate="modal.cancelButton"></button>
                   </div>
                 </div>
              </div>`
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