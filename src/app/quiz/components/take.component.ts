import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from '../../core/components/modal.component';
import { DialogService } from "ng2-bootstrap-modal";
import { AuthService } from '../../core/services/auth.service';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import * as _ from "lodash";

@Component({
  selector: 'app',
  templateUrl: '../views/take.component.html',
  styleUrls: ['../styles/quiz.component.less'],
})
export class TakeQuizComponent {

  loaded = false
  answers = {};
  quizFields = {
    fields: []
  }

  quizData = {
    fields: [
      {
        key: 'question1',
        className: 'col-md-6',
        type: 'number',
        question: {
          id: 1,
          text: 'Enter a number between 1 and 10',
        },
        options: {
          min: 1,
          max: 10,
        },
      },
      {
        key: 'question2',
        className: 'col-md-6',
        type: 'text',
        question: {
          id: 2,
          text: 'Enter a 5 to 10 characters',
        },
        options: {
          placeholder: 'text',
          minLength: 5,
          maxLength: 10,
        },
      },
      {
        key: 'question3',
        className: 'col-md-6',
        type: 'radio',
        question: {
          id: 3,
          text: 'Pick an option 1-3',
        },
        answers: [
          {
            id: 1,
            text: 'Option 1',
          },
          {
            id: 2,
            text: 'Option 2',
          },
          {
            id: 3,
            text: 'Option 3',
          },
        ],
        options: {},
      },
      {
        key: 'question4',
        className: 'col-md-6',
        type: 'checkbox',
        question: {
          id: 4,
          text: 'Pick an option 2 options',
        },
        answers: [
          {
            id: 4,
            text: 'Option 4',
          },
          {
            id: 5,
            text: 'Option 5',
          },
          {
            id: 6,
            text: 'Option 6',
          },
        ],
        options: {
          min: 2,
          max: 2,
        },
      },
      {
        key: 'question5',
        className: 'col-md-12',
        type: 'textarea',
        question: {
          id: 10,
          text: 'This is question one with some HTML link in. Click here for <a href="http://www.bbc.co.uk" target="_blank">BBC</a>',
        },
        options: {
            rows: '10',
            cols: '50',
            placeholder: 'Enter some text'
        },
      }
    ]
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
          question: {
            id: element.question.id,
          },
          answer: {
            id: null,
          },
        }
      })

      this.loaded = true;
      // this.spinnerService.hide();
    }

    // this.spinnerService.show();
    this.auth.get('questions')
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
      _.set(this.answers[id], 'answer.id', element.value);
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