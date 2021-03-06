import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { FormModalComponent } from '../../core/components/form.modal.component';
import { DialogService } from "ng2-bootstrap-modal";

import * as _ from "lodash";

@Component({
  selector: 'login',
  template: '',
  styleUrls: ['../styles/core.component.less']
})

export class LoginComponent {
  user: User = new User();

  constructor(
    private router: Router,
    private auth: AuthService,
    private dialogService: DialogService,
  ) {}

  isActive(){
    return true;
  }

  ngAfterContentInit() {
    setTimeout(()=>{
      let disposable = this.dialogService.addDialog(FormModalComponent, {
        title: 'core.login.title',
        okButton: false,
        cancelButton: false,
        form: 'login',
      })
      .subscribe((result)=>{
        if(result) {
          _.set(this.user, 'email', _.get(result, 'controls.email.value'));
          _.set(this.user, 'password', _.get(result, 'controls.password.value'));
          this.auth.login(this.user)
          .then((user) => {
            localStorage.setItem('token', user.json().auth_token);
            this.router.navigateByUrl('/status');
          })
          .catch((err) => {
            console.log(err);
          });
        }
      });
    });
  }

}
