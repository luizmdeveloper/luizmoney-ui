import { ErrorHandelerService } from './../error-handeler.service';
import { LogoutService } from './../../seguranca/logout.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OauthService } from '../../seguranca/oauth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;

  constructor(
    public auth: OauthService,
    private logoutService: LogoutService,
    private router: Router,
    private errorHandeler: ErrorHandelerService
  ) { }

  ngOnInit() {}

  logout() {
    this.logoutService.logout()
    .then(() => {
      this.router.navigate(['/login']);
    })
    .catch(erro => this.errorHandeler.handele(erro));
  }

}
