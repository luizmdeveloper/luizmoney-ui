import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { OauthService } from './oauth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: OauthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    console.log(next.data.roles && !this.auth.temAlgumaPermissao(next.data.roles));

    if (next.data.roles && !this.auth.temAlgumaPermissao(next.data.roles)) {
      this.router.navigate(['nao-autorizado']);
      return false;
    }

    return true;
  }
}
