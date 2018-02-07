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

    if (this.auth.isAccessTokenInvalido) {
      return this.auth.obterNovoAccessToken()
        .then(() => {
          if (this.auth.isAccessTokenInvalido()) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        });
    } else if (next.data.roles && !this.auth.temAlgumaPermissao(next.data.roles)) {
      this.router.navigate(['nao-autorizado']);
      return false;
    }

    return true;
  }
}
