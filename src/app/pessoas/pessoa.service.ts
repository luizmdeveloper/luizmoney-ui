import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ToastyService } from 'ng2-toasty';
import { ErrorHandelerService } from '../core/error-handeler.service';
import { Pessoa } from '../core/model';

export class PessoaFiltro {
  nome: String;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  urlPessoa = 'http://localhost:8080/pessoas';

  constructor(private http: AuthHttp,
              private toasty: ToastyService,
              private errorHandeler: ErrorHandelerService) {}

  pesquisar(filtro): Promise<any> {
    const params = new URLSearchParams();
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(this.urlPessoa, { search : params })
      .toPromise()
      .then( response => {
        const responseJson = response.json();
        const pessoas = response.json().content;
        const resultado = {
          pessoas,
          total : responseJson.totalElements
        };
        return resultado;
      });
  }

  buscarPessoa(codigo: number): Promise<Pessoa> {
    return this.http.get(`${this.urlPessoa}/${codigo}`)
          .toPromise()
          .then(response => response.json() as Pessoa);
  }

  buscarTodos(): Promise<any> {
    return this.http.get(this.urlPessoa)
        .toPromise()
        .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.urlPessoa}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  atualizarStatus(pessoa: any): Promise<void> {
    return this.http.put(`${this.urlPessoa}/${pessoa.codigo}/ativo`, !pessoa.ativo)
          .toPromise()
          .then(response => {
            this.toasty.success(!pessoa.ativo ? 'Pessoa ativada com sucessso' : 'Pessoa desativada com sucesso!');
          })
          .catch(error => this.errorHandeler.handele(error));
  }

  cadastrar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(`${this.urlPessoa}`, JSON.stringify(pessoa))
          .toPromise()
          .then(response => response.json() as Pessoa);
  }

}
