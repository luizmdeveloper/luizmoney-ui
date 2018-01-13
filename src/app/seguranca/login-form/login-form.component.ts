import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { OauthService } from './../oauth.service';
import { ErrorHandelerService } from './../../core/error-handeler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private title: Title,
    private oauth: OauthService,
    private errorHandeler: ErrorHandelerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Login');
  }

  login(usuario: string, senha: string) {
    this.oauth.login(usuario, senha)
      .then(() => {
        this.router.navigate(['/categorias']);
      })
      .catch(erro => this.errorHandeler.handele(erro));
  }

}
