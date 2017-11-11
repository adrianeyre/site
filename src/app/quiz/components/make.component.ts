import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from '../../core/components/modal.component';
import { DialogService } from "ng2-bootstrap-modal";
import { AuthService } from '../../core/services/auth.service';
import { Forms } from '../../core/config/forms';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import * as _ from "lodash";

@Component({
  selector: 'app',
  templateUrl: '../views/make.component.html',
  styleUrls: ['../styles/quiz.component.less'],
})
export class MakeQuizComponent {

  loaded = false
  answers = {};
  quizFields = {
    fields: []
  }

  constructor(
    private dialogService: DialogService,
    private auth: AuthService,
    private forms: Forms,
    // private spinnerService: Ng4LoadingSpinnerService,
  ) {}

  ngOnInit() {
    this.quizFields = _.clone(this.forms.createQuiz);
    console.log(this.quizFields);
    _.forEach(this.quizFields.fields, element => {
      this.answers[element.key] = {
        id: null,
      }
    })

    this.loaded = true;
  }

  onSubmit(form) {
    _.forEach(form.controls, (element, id) => {
      _.set(this.answers, [id], element.value);
    })
  }

  showModal() {
    let disposable = this.dialogService.addDialog(ModalComponent, {
      title:'quiz.modal.title',
      message:'quiz.modal.body',
      okButton: true,
      cancelButton: true,
    })
  }
}