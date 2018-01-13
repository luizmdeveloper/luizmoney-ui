import { Lancamento } from './../core/model';
import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment/';
import { AuthHttp } from 'angular2-jwt';

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

  constructor(private http: AuthHttp) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new  URLSearchParams();
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

    return this.http.get(`${this.apiUrl}?resumo`, { search: params })
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
    return this.http.delete(`${this.apiUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
  }

  cadastrar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post(`${this.apiUrl}`, JSON.stringify(lancamento))
        .toPromise()
        .then(response => response.json());
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put(`${this.apiUrl}/${lancamento.codigo}`, JSON.stringify(lancamento))
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response.json() as Lancamento;

        this.converterStringParaData([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  buscarPorCodigio(codigo: number): Promise<Lancamento> {
    return this.http.get(`${this.apiUrl}/${codigo}`).toPromise()
    .then(response => {
      const lancamento = response.json() as Lancamento;

      this.converterStringParaData([lancamento]);

      return lancamento;
    });
  }

  converterStringParaData(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }
}
