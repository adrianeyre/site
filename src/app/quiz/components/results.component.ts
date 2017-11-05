import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from '../../core/components/modal.component';
import { DialogService } from "ng2-bootstrap-modal";
import { AuthService } from '../../core/services/auth.service';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import * as _ from "lodash";

@Component({
  selector: 'app',
  templateUrl: '../views/results.component.html',
  styleUrls: ['../styles/quiz.component.less'],
})
export class ResultsComponent {

  loaded = false
  quizFields = {
    fields: []
  }

  quizData = {
    results: true,
    fields: [
      {
        key: 'question1',
        className: 'col-md-12',
        type: 'number',
        question: {
          id: 1,
          text: 'Enter a number between 1 and 10',
        },
        options: {
          min: 1,
          max: 10,
        },
        results: {
          correct: 4,
          answered: 4,
          explanation: 'This should equal 4 because I say so!',
        },
      },
      {
        key: 'question2',
        className: 'col-md-12',
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
        results: {
          correct: 'abcdefg',
          answered: 'abcdef',
        },
      },
      {
        key: 'question3',
        className: 'col-md-12',
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
        results: {
          correct: '1',
          answered: '3',
          explanation: 'This should be Option 1 any other option is just silly!',
        },
      },
      {
        key: 'question4',
        className: 'col-md-12',
        type: 'checkbox',
        question: {
          id: 4,
          text: 'Pick 2 options',
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
        results: {
          correct: {
            5: true,
            6: true,
          },
          answered: {
            6: true,
          },
        },
        options: {},
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
            minLength: 1,
            maxLength: 30,
            placeholder: 'Enter email'
        },
        results: {
          correct: 'test',
          answered: 'test',
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
    // this.spinnerService.show();
    this.auth.get('results')
    .then((data) => {
      if (data.json().status === 'success') {
        this.quizFields = data.json().data;
        this.loaded = true;
        // this.spinnerService.hide();
      }
    })
    .catch((err) => {
      this.quizFields = this.quizData;
      this.loaded = true;
      // this.spinnerService.hide();
    });
  }

  onSubmit(form) {
    console.log(form);
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