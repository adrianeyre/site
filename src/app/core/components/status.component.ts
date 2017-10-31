import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Config } from '../../core/config/config';

@Component({
  selector: 'status',
  templateUrl: '../views/status.component.html',
  styleUrls: ['../styles/core.component.less']
})

export class StatusComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private auth: AuthService,
    private config: Config
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.auth.ensureAuthenticated(token)
      .then((user) => {
        if (user.json().status === 'success') {
          this.isLoggedIn = true;
          this.config.user.email = user.json().data.email;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

}
