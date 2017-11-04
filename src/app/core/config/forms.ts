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
    }

}
