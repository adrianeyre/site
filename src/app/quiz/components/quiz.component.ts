import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from '../../core/components/modal.component';
import { DialogService } from "ng2-bootstrap-modal";

import * as _ from "lodash";

@Component({
  selector: 'app',
  templateUrl: '../views/quiz.component.html',
  styleUrls: ['../styles/quiz.component.less'],
})
export class QuizComponent {
  quizFields = {
    fields: [
      {
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
        className: 'col-md-12',
        type: 'textarea',
        question: {
          id: 10,
          text: 'This is question one with some HTML link in. Click here for <a href="http://www.bbc.co.uk">BBC</a>',
        },
        options: {
            rows: '10',
            cols: '50',
            placeholder: 'Enter email'
        },
      }
    ]
  };

  constructor(private dialogService:DialogService) {}

  answers = [];
  form;

  ngOnInit() {
    this.form = new FormGroup({});
    this.quizFields.fields.forEach((element, index) => {
      // Create unique name for Form Element
      const repeatValue = Math.floor((index + 1) / 26);
      const leftValue = (index + 1) % 26;
      const questionID = 'a'.repeat(repeatValue) + String.fromCharCode(97 + leftValue);

      this.form.controls[questionID] = new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(_.get(element, 'options.min', null)),
        Validators.max(_.get(element, 'options.max', null)),
        Validators.minLength(_.get(element, 'options.minLength', null)),
        Validators.maxLength(_.get(element, 'options.maxLength', null)),
        Validators.pattern(_.get(element, 'options.pattern', null)),
      ]));
      _.set(element, 'id', questionID);
      this.answers.push(
        {
          question: {
            id: element.question.id,
          },
          answer: {
            // id: null,
            // result: null,
          },
        }
      )
    });
  }

  submit(answers) {
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