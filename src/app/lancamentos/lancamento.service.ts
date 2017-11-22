import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment/';

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicial: Date;
  dataVencimentoFinal: Date;
}

@Injectable()
export class LancamentoService {

  apiUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new  URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5pc3RyYWRvckBsdWl6bW9uZXkuY29tLmJyOmFkbWlu');

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicial) {
      params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicial).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFinal) {
      params.set('dataVencimentoAte', moment(filtro.dataVencimentoFinal).format('YYYY-MM-DD'));
    }


    return this.http.get(`${this.apiUrl}?resumo`, { headers, search: params })
          .toPromise()
          .then(response => response.json().content);
  }
}
