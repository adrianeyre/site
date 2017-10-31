import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Config } from '../../core/config/config';

@Component({
  selector: 'login',
  templateUrl: '../views/login.component.html',
  styleUrls: ['../styles/core.component.less']
})

export class LoginComponent {
  user: User = new User();

  constructor(
    private router: Router,
    private auth: AuthService,
    private config: Config
  ) {}

  onLogin(): void {
    this.auth.login(this.user)
    .then((user) => {
      localStorage.setItem('token', user.json().auth_token);
      this.router.navigateByUrl('/status');
    })
    .catch((err) => {
      console.log(err);
    });
  }

}
