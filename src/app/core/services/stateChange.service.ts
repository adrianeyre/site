import * as _ from "lodash";

import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Config } from '../config/config';
import { Menu } from '../config/menu';

@Injectable()
export class StateChange {

  constructor(
    private router: Router,
    private config: Config,
    private menu: Menu
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        config.state.url = event.url;

        _.each(menu.menuList, (item, i) => {
          const expresion = new RegExp(item.visability);

          if (expresion.test(event.url)) {
            config.state.menu = item.key;
            config.state.menuID = item.key;
          }
        });
      }
    });
  }

}
