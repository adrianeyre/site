import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

import { Config } from '../../core/config/config';
import { Menu } from '../../core/config/menu';

@Component({
  selector: 'main-menu',
  templateUrl: '../views/main-menu.component.html',
  styleUrls: ['../styles/main-menu.component.css']
})
export class MainMenuComponent {

  constructor(
    private config: Config,
    private menu: Menu
  ) {}

}
