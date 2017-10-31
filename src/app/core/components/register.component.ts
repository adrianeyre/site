import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'register',
  templateUrl: '../views/register.component.html',
  styleUrls: ['../styles/core.component.less']
})

export class RegisterComponent {
  user: User = new User();

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  onRegister(): void {
    this.auth.register(this.user)
    .then((user) => {
      localStorage.setItem('token', user.json().auth_token);
      this.router.navigateByUrl('/status');
    })
    .catch((err) => {
      console.log(err);
    });
  }

}
