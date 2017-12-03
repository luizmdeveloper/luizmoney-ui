import { Categoria } from './../core/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { ErrorHandelerService } from './../core/error-handeler.service';
import { ToastyService } from 'ng2-toasty';

import 'rxjs/add/operator/toPromise';

export class CategoriaFiltro {
  nome: string;
  pagina: number;
  itensPorPagina = 5;
}

@Injectable()
export class CategoriaService {

  apiUrl = 'http://localhost:8080/categorias';

  constructor(private http: Http,
              private toasty: ToastyService,
              private erroHandeler: ErrorHandelerService) { }

  pesquisar(filtro: CategoriaFiltro): Promise<any> {
    const headers = new Headers();
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    headers.append('Authorization', 'Basic YWRtaW5pc3RyYWRvckBsdWl6bW9uZXkuY29tLmJyOmFkbWlu');

    return this.http.get(`${this.apiUrl}`, { headers, search : params })
      .toPromise()
      .then(response => {
          const categorias = response.json().content;
          const totalElements = response.json().totalElements;
          const resultado = {
            categorias: categorias,
            total: totalElements
          };
          return resultado;
      })
      .catch(error => this.erroHandeler.handele(error));
  }

  buscar(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5pc3RyYWRvckBsdWl6bW9uZXkuY29tLmJyOmFkbWlu');

    return this.http.get(`${this.apiUrl}`, { headers })
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: any): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5pc3RyYWRvckBsdWl6bW9uZXkuY29tLmJyOmFkbWlu');

    return this.http.delete(`${this.apiUrl}/${codigo}`, { headers })
        .toPromise()
        .then(() => null);
  }

  cadastrar(categoria: Categoria): Promise<Categoria> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5pc3RyYWRvckBsdWl6bW9uZXkuY29tLmJyOmFkbWlu');
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.apiUrl}`, JSON.stringify(categoria), { headers })
            .toPromise()
            .then(response => response.json());
  }

}
