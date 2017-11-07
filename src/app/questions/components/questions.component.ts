import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';

import * as _ from "lodash";

export interface QuestionsComponent {
  dataFields: any;
}

@Component({
  selector: 'questions',
  templateUrl: '../views/questions.component.html',
  styleUrls: ['../styles/questions.component.less', '../../core/styles/core.component.less']
})
export class QuestionsComponent implements OnInit {
  @Input() dataFields: any;
  @Output() update = new EventEmitter();

  form = new FormGroup({});
  resultsPage: boolean;
  elements = [];
  selectedItems = [];

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const elementValue = (element, index, type) => {
      const cloneArray = type === 'answer' ? _.clone(_.get(element, 'results.answered', '')) : _.clone(element.results.correct)
      let result = {};
      switch (element.type) {
        case 'text':
        case 'number':
        case 'email':
        case 'password':
        case 'textarea':
        case 'radio':
          return cloneArray;
        case 'select':
          _.set(element, 'options.from', []);
          _.set(element, 'options.to', []);
          _.forEach(this.dataFields.lookups[element.key], el => {
            const data = _.clone(el);
            data.enabled = true;
            result[el.id] = false;
            element.options.from.push(_.clone(data));
            data.enabled = false;
            element.options.to.push(_.clone(data));
          });
          return result;
        case 'checkbox':
          _.forEach(element.answers, el => {
            result[el.toString()] = _.get(cloneArray, [el.id], false);
          });
          return result;
      }
      return '';
    }

    this.resultsPage = _.get(this.dataFields, 'results', false);
    this.elements = this.resultsPage ? ['result','answer'] : ['answer'];

    this.dataFields.fields.forEach((element, index) => {
      _.forEach(this.elements, type => {
        const elementName = this.selectElement(type, element);

        if (element.type === 'checkbox') {
          this.form.controls[elementName] = this.fb.group(elementValue(element, index, type));
        }

        if (element.type === 'select') {
          this.form.controls[elementName] = this.fb.group(elementValue(element, index, type));
        }

        if (element.type !== 'checkbox' && element.type !== 'select') {
          const value = _.get(element, 'results.answered') ? elementValue(element, index, type) : ''

          this.form.controls[elementName] = new FormControl({value, disabled: this.resultsPage},
            Validators.compose([
              Validators.required,
              Validators.min(_.get(element, 'options.min', null)),
              Validators.max(_.get(element, 'options.max', null)),
              Validators.minLength(_.get(element, 'options.minLength', 1)),
              Validators.maxLength(_.get(element, 'options.maxLength', 255)),
              Validators.pattern(_.get(element, 'options.pattern', null)),
            ])
          );
        }
      })
      element.correct = this.resultsPage ? this.resultValidation(element, this.form) : false;
      element.minimize = !_.clone(element.correct);
    })
    this.dataFields.fields.forEach(element => {
      if (_.get(element, 'options.relationship')) {
        this.checkRelationship(element)
      }
    })
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

  checkIdValid(item, form) {
    if (item.type === 'select') {
      return _.filter(item.options.to, e => e.enabled).length > 0;
    }

    if (item.type !== 'checkbox') {
      return form.controls[this.selectElement('answer', item)].valid;
    }

    const correctAnswers = _.filter(form.controls[this.selectElement('answer', item)].controls, element => element.value).length;
    const amountOfElements = _.filter(form.controls[this.selectElement('answer', item)].controls).length;
    const minValue = _.get(item, 'options.min', 1);
    const maxValue = _.get(item, 'options.max', amountOfElements);

    return correctAnswers >= minValue && correctAnswers <= maxValue;
  }

  moveItem(item, direction = null) {
    if (direction !== null) {
      this.selectedItems = [];
      if (direction) {
      _.forEach(item.options.from, (e, index) => {
        if ((!e.enabled && !direction) || (e.enabled && direction)) {
          e.enabled = !direction;
          item.options.to[index].enabled = direction;
          this.form.controls[item.key].value[e.id] = direction;
        }
      });
      } else {
        _.forEach(item.options.to, (e, index) => {
          if ((e.enabled && !direction) || (!e.enabled && direction)) {
            e.enabled = direction;
            item.options.from[index].enabled = !direction;
            this.form.controls[item.key].value[e.id] = direction;
          }
        });
      }
    }
    _.forEach(this.selectedItems, e => {
      _.find(item.options.from, el => el.id === e.value).enabled = !_.find(item.options.from, el => el.id === e.value).enabled;
      _.find(item.options.to, el => el.id === e.value).enabled = !_.find(item.options.to, el => el.id === e.value).enabled;
      this.form.controls[item.key].value[e.value] = !this.form.controls[item.key].value[e.value];
    });

    if (_.get(item, 'options.relationship')) {
      this.checkRelationship(item)
    }
  }

  checkRelationship(item) {
    const filter = [];
    _.filter(this.form.controls[item.key].value, (value, id) => {
      if (value) {
        filter.push(id)
      }
    });
  
    const relationshipItem = _.find(this.dataFields.fields, field => field.key === item.options.relationship);
    _.forEach(relationshipItem.options.from, (i, key) => {
      i.enabled = _.intersection(filter, i[item.key]).length > 0;
      relationshipItem.options.to[key].enabled = false;
      this.form.controls[relationshipItem.key].value[i.id] = false;
    })
  }

  selectUpdate(element) {
    this.selectedItems = _.filter(element, i => i.selected);
  }

  selectElement = (type, element) => type === 'result' ? `answer-${element.key}` : element.key;

  changeState = element => element.minimize = !element.minimize;

  submit = form => this.update.emit(form);

}
