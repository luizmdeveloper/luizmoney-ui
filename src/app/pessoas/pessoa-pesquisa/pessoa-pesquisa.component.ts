import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { PessoaFiltro } from './../pessoa.service';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit  {

  totalRegistro = 0;
  filtro = new PessoaFiltro();
  pessoas = [];

  constructor(private pessoaService: PessoaService) {}

  ngOnInit() {}

  pesquisar(pagina = 0) {
    this.pessoaService.pesquisar(this.filtro)
    .then(resultado => {
        this.pessoas = resultado.pessoas;
        this.totalRegistro = resultado.total;
      });
  }

  paginar(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
