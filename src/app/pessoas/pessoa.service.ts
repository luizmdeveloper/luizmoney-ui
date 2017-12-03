import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

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

  constructor(private http: Http,
              private toasty: ToastyService,
              private errorHandeler: ErrorHandelerService) {}

  pesquisar(filtro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5pc3RyYWRvckBsdWl6bW9uZXkuY29tLmJyOmFkbWlu');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(this.urlPessoa, { headers, search : params })
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

  buscarTodos(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5pc3RyYWRvckBsdWl6bW9uZXkuY29tLmJyOmFkbWlu');

    return this.http.get(this.urlPessoa, { headers })
        .toPromise()
        .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5pc3RyYWRvckBsdWl6bW9uZXkuY29tLmJyOmFkbWlu');

    return this.http.delete(`${this.urlPessoa}/${codigo}`, {headers})
      .toPromise()
      .then(() => null);
  }

  atualizarStatus(pessoa: any): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5pc3RyYWRvckBsdWl6bW9uZXkuY29tLmJyOmFkbWlu');
    headers.append('Content-type', 'application/json');

    return this.http.put(`${this.urlPessoa}/${pessoa.codigo}/ativo`, !pessoa.ativo , { headers })
          .toPromise()
          .then(response => {
            this.toasty.success(!pessoa.ativo ? 'Pessoa ativada com sucessso' : 'Pessoa desativada com sucesso!');
          })
          .catch(error => this.errorHandeler.handele(error));
  }

  cadastrar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5pc3RyYWRvckBsdWl6bW9uZXkuY29tLmJyOmFkbWlu');
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.urlPessoa}`, JSON.stringify(pessoa), {headers})
          .toPromise()
          .then(response => response.json());
  }

}
