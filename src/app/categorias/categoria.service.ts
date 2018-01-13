import { AuthHttp } from 'angular2-jwt';

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

  constructor(private http: AuthHttp,
              private toasty: ToastyService,
              private erroHandeler: ErrorHandelerService) { }

  pesquisar(filtro: CategoriaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.apiUrl}`, { search : params })
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
    return this.http.get(`${this.apiUrl}`)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: any): Promise<void> {
    return this.http.delete(`${this.apiUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
  }

  cadastrar(categoria: Categoria): Promise<Categoria> {
    return this.http.post(`${this.apiUrl}`, JSON.stringify(categoria))
            .toPromise()
            .then(response => response.json());
  }

  buscarPorCodigo(categoria: Categoria): Promise<Categoria> {
    return this.http.get(`${this.apiUrl}/${categoria.codigo}`)
          .toPromise()
          .then(response => response.json() as Categoria);
  }

  atualizar(categoria: Categoria): Promise<Categoria> {
    return this.http.put(`${this.apiUrl}/${categoria.codigo}`, JSON.stringify(categoria))
          .toPromise()
          .then(response => {
            const categoriaAlterada = response.json() as Categoria;

            return categoriaAlterada;
          });

  }

}
