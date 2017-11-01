import { Injectable  } from '@angular/core';

@Injectable()
export class Forms {
    login: any = {
        fields: [
            {
                className: 'col-md-12',
                type: 'email',
                question: {
                id: 'email',
                text: 'core.login.email',
                },
                options: {
                minLength: 1,
                maxLength: 30,
                pattern: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'
                },
            },
            {
                className: 'col-md-12',
                type: 'text',
                question: {
                id: 'domain',
                text: 'core.login.domain',
                },
                options: {
                minLength: 1,
                maxLength: 30,
                },
            },
            {
                className: 'col-md-12',
                type: 'password',
                question: {
                id: 'password',
                text: 'core.login.password',
                },
                options: {
                minLength: 1,
                maxLength: 30,
                },
            },
        ],
    }

}
