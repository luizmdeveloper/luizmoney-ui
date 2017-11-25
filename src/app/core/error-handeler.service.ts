import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandelerService {

  constructor(private toasty: ToastyService) { }

  handeler(erroHandeler: any) {
    let msg: string;

    if (typeof erroHandeler === 'string') {
      msg = erroHandeler;
    }else {
      msg = 'Algum erro aconteceu ao processar requisição. Aguarde e tente novamente mais tarde';
    }

    console.log('Ocorreu um erro', erroHandeler);
    this.toasty.error(msg);
  }

}
