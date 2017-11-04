import { Component } from '@angular/core';
import { StateChange } from './core/services/stateChange.service';
import { Config } from './core/config/config';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./core/styles/core.component.less']
})

export class AppComponent {
  constructor(
    // private stateChange: StateChange,
    // private config: Config,
    // private translate: TranslateService,
  ) {
    // translate.setDefaultLang('en-gb');
  }

  // switchLanguage(language: string) {
  //   this.translate.use(language);
  // }

}
