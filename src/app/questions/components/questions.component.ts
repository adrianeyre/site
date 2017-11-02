import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import * as _ from "lodash";

export interface QuestionsComponent {
  dataFields: any;
}

@Component({
  selector: 'questions',
  templateUrl: '../views/questions.component.html',
  styleUrls: ['../styles/questions.component.less']
})
export class QuestionsComponent implements OnInit {
  @Input() dataFields: any;
  @Output() update = new EventEmitter();

  form;
  answers = [];

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({});
    this.dataFields.fields.forEach((element, index) => {
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
          answer: {},
        }
      )
    })
  }

  submit(answers) {
    this.update.emit(answers)
  }

}
