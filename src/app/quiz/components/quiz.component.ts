import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from '../../core/components/modal.component';
import { DialogService } from "ng2-bootstrap-modal";
import { AuthService } from '../../core/services/auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import * as _ from "lodash";

@Component({
  selector: 'app',
  templateUrl: '../views/quiz.component.html',
  styleUrls: ['../styles/quiz.component.less'],
})
export class QuizComponent {

  loaded = false
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
        options: {
          maxLength: 30,
        },
      },
      {
        key: 'question4',
        className: 'col-md-6',
        type: 'checkbox',
        question: {
          id: 4,
          text: 'Pick an option 1 or 2 or 3',
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
        options: {},
      },
      {
        key: 'question5',
        className: 'col-md-12',
        type: 'textarea',
        question: {
          id: 10,
          text: 'This is question one with some HTML link in. Click here for <a href="http://www.bbc.co.uk">BBC</a>',
        },
        options: {
            rows: '10',
            cols: '50',
            minLength: 1,
            maxLength: 30,
            placeholder: 'Enter some text'
        },
      }
    ]
  };

  constructor(
    private dialogService: DialogService,
    private auth: AuthService,
    private spinnerService: Ng4LoadingSpinnerService,
  ) {}

  ngOnInit() {
    this.spinnerService.show();
    this.auth.get('quiz')
    .then((data) => {
      if (data.json().status === 'success') {
        this.quizFields = data.json().data;
        this.loaded = true;
        this.spinnerService.hide();
      }
    })
    .catch((err) => {
      this.quizFields = this.quizData;
      this.loaded = true;
      this.spinnerService.hide();
    });
  }

  onSubmit(answers) {
    console.log(answers);
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