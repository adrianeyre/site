import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';

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

  form = new FormGroup({});
  resultsPage: boolean;
  elements = [];

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const elementValue = (element, index, type) => {
      const cloneArray = type === 'answer' ? _.clone(_.get(element, 'results.answered', '')) : _.clone(element.results.correct)
      switch (element.type) {
        case 'text':
        case 'number':
        case 'email':
        case 'password':
        case 'textarea':
        case 'radio':
          return cloneArray;
        case 'checkbox':
          let result = {};
          _.forEach(element.answers, el => {
            result[el.id] = _.get(cloneArray, [el.id], false);
          });
          return result;
      }
      return '';
    }

    this.resultsPage = _.get(this.dataFields, 'results', false);
    this.elements = this.resultsPage ? ['result','answer'] : ['answer'];

    this.dataFields.fields.forEach((element, index) => {
      _.forEach(this.elements, type => {
        const elementName = type == 'answer' ? element.key : `answer-${element.key}`;

        if (element.type === 'checkbox') {
          this.form.controls[elementName] = this.fb.group(elementValue(element, index, type));
        }

        if (element.type !== 'checkbox') {
          const value = _.get(element, 'results.answered') ? elementValue(element, index, type) : ''

          this.form.controls[elementName] = new FormControl({value, disabled: this.resultsPage},
            Validators.compose([
              Validators.required,
              Validators.min(_.get(element, 'options.min', null)),
              Validators.max(_.get(element, 'options.max', null)),
              Validators.minLength(_.get(element, 'options.minLength', null)),
              Validators.maxLength(_.get(element, 'options.maxLength', null)),
              Validators.pattern(_.get(element, 'options.pattern', null)),
            ])
          );
        }
      })
      // console.log(this);
    })
  }

  selectElement(type, element) {
    return type === 'result' ? `answer-${element.key}` : element.key
  }

  resultValidation(item, form) {
    if (item.type !== 'checkbox') {
      return form.controls[this.selectElement('answer', item)].value === form.controls[this.selectElement('result', item)].value;
    }

    let correctResult = {};
    _.forEach(form.controls[this.selectElement('answer', item)].controls, (element, id) => {
      correctResult[id] = element.value;
    })

    let answeredResult = {};
    _.forEach(form.controls[this.selectElement('result', item)].controls, (element, id) => {
      answeredResult[id] = element.value;
    })

    return _.isEqual(correctResult, answeredResult);
  }

  submit(form) {
    this.update.emit(form)
  }

}
