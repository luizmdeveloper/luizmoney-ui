import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import { OauthService } from './oauth.service';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';

@Injectable()
export class LogoutService {

  urlToken: string;

  constructor(
    private auth: AuthHttp,
    private authService: OauthService
  ) {
    this.urlToken = `${environment.apiUrl}/tokens/revoke`;
  }

  logout() {
    return this.auth.delete(this.urlToken, {withCredentials: true})
    .toPromise()
    .then(() => {
      this.authService.removerAccessToken();
    });
  }

}
