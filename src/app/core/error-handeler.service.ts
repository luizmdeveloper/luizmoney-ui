import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { NotAuthenticated } from '../seguranca/money-http';

@Injectable()
export class ErrorHandelerService {

  constructor(
    private toasty: ToastyService,
    private router: Router
  ) { }

  handele(erro: any) {
    let msg: string;

    if (typeof erro === 'string') {
      msg = erro;
    } else if (erro instanceof NotAuthenticated) {
      msg = 'Sua sessão expirou';
      this.router.navigate(['/login']);
    } else if (erro instanceof Response && erro.status >= 400 && erro.status <= 499) {
      let erros;
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      if (erro.status === 403) {
        msg = 'Usuário não tem permissão!';
      }

      try {
        erros = erro.json();
        msg = erros[0].mensagemUsuario;
      } catch (e) {
        console.log('Ocorreu um erro', e);
      }
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', erro);
    }

    this.toasty.error(msg);
  }
}
