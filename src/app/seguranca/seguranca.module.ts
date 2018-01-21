import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import { providers } from 'ng2-toasty';
import { MoneyHttp } from './money-http';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';

import { LoginFormComponent } from './login-form/login-form.component';

import { SegurancaRoutingModule } from './seguranca-routing.modules';
import { OauthService } from './oauth.service';

export function authHttpServiceFactory(auth: OauthService, http: Http, options: RequestOptions) {
  const httpConfig = new AuthConfig({
    globalHeaders: [{'content-Type' : 'application/json'}]
  });

  return new MoneyHttp(auth, httpConfig, http, options);
}


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  declarations: [
    LoginFormComponent
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [OauthService, Http, RequestOptions ]
    }
  ]
})
export class SegurancaModule { }
