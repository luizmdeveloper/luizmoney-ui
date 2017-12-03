import { Lancamento } from './../core/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment/';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicial: Date;
  dataVencimentoFinal: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  apiUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new  URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5pc3RyYWRvckBsdWl6bW9uZXkuY29tLmJyOmFkbWlu');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

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
          .then(
            response => {
              const resultadoJson = response.json();
              const lancamentos = response.json().content;

              const resultado = {
                lancamentos,
                total: resultadoJson.totalElements
              };

              return resultado;
            });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5pc3RyYWRvckBsdWl6bW9uZXkuY29tLmJyOmFkbWlu');

    return this.http.delete(`${this.apiUrl}/${codigo}`, { headers })
        .toPromise()
        .then(() => null);
  }

  cadastrar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5pc3RyYWRvckBsdWl6bW9uZXkuY29tLmJyOmFkbWlu');
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.apiUrl}`, JSON.stringify(lancamento), {headers})
        .toPromise()
        .then(response => response.json());
  }
}
