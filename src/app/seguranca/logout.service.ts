import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import { OauthService } from './oauth.service';
import { Router } from '@angular/router';

@Injectable()
export class LogoutService {

  urlToken = 'http://localhost:8080/tokens/revoke';

  constructor(
    private auth: AuthHttp,
    private authService: OauthService
  ) { }

  logout() {
    return this.auth.delete(this.urlToken, {withCredentials: true})
    .toPromise()
    .then(() => {
      this.authService.removerAccessToken();
    });
  }

}
