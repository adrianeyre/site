import { Injectable  } from '@angular/core';

@Injectable()
export class Forms {
    login: any = {
        fields: [
            {
                key: 'email',
                className: 'col-md-12',
                type: 'email',
                question: {
                    text: 'core.login.email',
                },
                options: {
                    minLength: 1,
                    maxLength: 30,
                    pattern: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'
                },
            },
            {
                key: 'domain',
                className: 'col-md-12',
                type: 'text',
                question: {
                    text: 'core.login.domain',
                },
                options: {
                    minLength: 1,
                    maxLength: 30,
                },
            },
            {
                key: 'password',
                className: 'col-md-12',
                type: 'password',
                question: {
                    text: 'core.login.password',
                },
                options: {
                    minLength: 1,
                    maxLength: 30,
                },
            },
        ],
    };
    createQuiz: any = {
        fields: [
            {
              key: 'title',
              className: 'col-md-12',
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
              key: 'startDate',
              className: 'col-md-6',
              type: 'date',
              question: {
                id: 1,
                text: 'Start date',
              },
              options: {},
            },
            {
              key: 'endDate',
              className: 'col-md-6',
              type: 'date',
              question: {
                id: 1,
                text: 'Start date',
              },
              options: {},
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
        }
    };
}
