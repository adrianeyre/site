import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: '../views/logout.component.html',
  styleUrls: ['../styles/core.component.less']
})

export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.removeItem('token');
  }

}
