import { Injectable  } from '@angular/core';

@Injectable()
export class Config {
  state: any = {
      url: '/',
      menu: 'home',
      menuID: 0,
  }

  user: any = {};
}
