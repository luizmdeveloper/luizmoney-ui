import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { JwtHelper } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OauthService {

  oathUrl = 'http://localhost:8080/oauth/token';
  payLoad;

  constructor(
    private http: Http,
    private jwtHelper: JwtHelper,
  ) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers =  new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oathUrl, body, { headers })
            .toPromise()
            .then(response => {
              console.log(response);

              this.armazenarToken(response.json().access_token);
            })
            .catch(erro => {
              console.log(erro);
            });
  }

  armazenarToken(token: string) {
    this.payLoad = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }
}
