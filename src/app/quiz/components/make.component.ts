import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from '../../core/components/modal.component';
import { DialogService } from "ng2-bootstrap-modal";
import { AuthService } from '../../core/services/auth.service';
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

  quizData = {
    fields: [
      {
        key: 'title',
        className: 'col-md-6',
        type: 'text',
        question: {
          id: 1,
          text: 'Title of quiz',
        },
        options: {
          minLength: 1,
          maxLength: 30,
        },
      },
      {
        key: 'class',
        className: 'col-md-12',
        type: 'select',
        question: {
          id: 1,
          text: 'Select Class groups',
        },
        options: {
          min: 1,
          max: 30,
          relationship: 'students',
        },
      },
      {
        key: 'students',
        className: 'col-md-12',
        type: 'select',
        question: {
          id: 1,
          text: 'Select Students',
        },
        options: {
          min: 1,
          max: 30,
        },
      },
    ],
    lookups: {
      class: [
        {
          id: '4',
          text: 'Class 4',
        },
        {
          id: '5',
          text: 'Class 5',
        },
        {
          id: '1',
          text: 'Class 1',
        },
        {
          id: '2',
          text: 'Class 2',
        },
      ],
      students: [
        {
          id: '1',
          text: 'pupil 1 (in class 1 & 4)',
          class: ['1', '4'],
        },
        {
          id: '2',
          text: 'pupil 2 (in class 1 & 2)',
          class: ['1', '2'],
        },
        {
          id: '3',
          text: 'pupil 3 (in class 4 & 5)',
          class: ['4', '5'],
        },
        {
          id: '4',
          text: 'pupil 4 (in class 1 - 3 & 5)',
          class: ['1', '2', '3', '5'],
        },
      ],
    },
  };

  constructor(
    private dialogService: DialogService,
    private auth: AuthService,
    // private spinnerService: Ng4LoadingSpinnerService,
  ) {}

  ngOnInit() {
    const dataSetup = data => {
      this.quizFields = data;
      _.forEach(this.quizFields.fields, element => {
        this.answers[element.key] = {
          id: null,
        }
      })

      this.loaded = true;
      // this.spinnerService.hide();
    }

    // this.spinnerService.show();
    this.auth.get('make')
    .then((data) => {
      if (data.json().status === 'success') {
        dataSetup(data.json().data)
      }
    })
    .catch((err) => {
      dataSetup(this.quizData);
    });
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