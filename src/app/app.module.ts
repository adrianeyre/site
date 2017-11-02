import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule, Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { CommonModule } from '@angular/common';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { ModalComponent } from './core/components/modal.component';
import { FormModalComponent } from './core/components/form.modal.component';
import { LoginComponent } from './core/components/login.component';
import { RegisterComponent } from './core/components/register.component';
import { StatusComponent } from './core/components/status.component';
import { LogoutComponent } from './core/components/logout.component';
import { MainMenuComponent } from './main-menu/components/main-menu.component';
import { QuizComponent } from './quiz/components/quiz.component';
import { QuestionsComponent } from './questions/components/questions.component';
import { HomeComponent } from './core/components/home.component';
import { AppComponent } from './app.component';

import { AuthService } from './core/services/auth.service';
import { EnsureAuthenticated } from './core/services/ensure-authenticated.service';
import { LoginRedirect } from './core/services/login-redirect.service';
import { StateChange } from './core/services/stateChange.service';

import { Config } from './core/config/config';
import { Forms } from './core/config/forms';
import { Menu } from './core/config/menu';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StatusComponent,
    LogoutComponent,
    MainMenuComponent,
    QuizComponent,
    ModalComponent,
    FormModalComponent,
    QuestionsComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    Ng4LoadingSpinnerModule,
    BootstrapModalModule.forRoot({container:document.body}),
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'quiz',
        component: QuizComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginRedirect]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LoginRedirect]
      },
      {
        path: 'status',
        component: StatusComponent,
        canActivate: [EnsureAuthenticated]
      },
      {
        path: 'logout',
        component: LogoutComponent
      }
    ])
  ],
  providers: [
    AuthService,
    EnsureAuthenticated,
    LoginRedirect,
    StateChange,
    Config,
    Forms,
    Menu,
  ],
  entryComponents: [
    ModalComponent,
    FormModalComponent,
    LogoutComponent
  ],
  bootstrap: [
    AppComponent,
  ]
})

export class AppModule { }
