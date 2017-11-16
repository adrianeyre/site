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
                    label: 'core.login.email',
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
                    label: 'core.login.domain',
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
                    label: 'core.login.password',
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
                label: 'Title of quiz',
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
                label: 'Start date',
              },
              options: {},
            },
            {
              key: 'endDate',
              className: 'col-md-6',
              type: 'date',
              question: {
                id: 1,
                label: 'Start date',
              },
              options: {},
            },
            {
              key: 'class',
              className: 'col-md-12',
              type: 'select',
              question: {
                id: 1,
                label: 'Select Class groups',
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
                label: 'Select Students',
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
                label: 'Class 4',
              },
              {
                id: '5',
                label: 'Class 5',
              },
              {
                id: '1',
                label: 'Class 1',
              },
              {
                id: '2',
                label: 'Class 2',
              },
            ],
            students: [
              {
                id: '1',
                label: 'pupil 1 (in class 1 & 4)',
                class: ['1', '4'],
              },
              {
                id: '2',
                label: 'pupil 2 (in class 1 & 2)',
                class: ['1', '2'],
              },
              {
                id: '3',
                label: 'pupil 3 (in class 4 & 5)',
                class: ['4', '5'],
              },
              {
                id: '4',
                label: 'pupil 4 (in class 1 - 3 & 5)',
                class: ['1', '2', '3', '5'],
              },
            ],
        }
    };
}
