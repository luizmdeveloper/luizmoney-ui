import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { PessoaFiltro } from './../pessoa.service';
import { PessoaService } from '../pessoa.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandelerService } from './../../core/error-handeler.service';
import { ToastyService } from 'ng2-toasty';
import { OauthService } from '../../seguranca/oauth.service';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit  {

  totalRegistro = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') grid;

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandeler: ErrorHandelerService,
    private confirmation: ConfirmationService,
    private title: Title,
    private auth: OauthService
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa pessoa');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
    .then(resultado => {
        this.pessoas = resultado.pessoas;
        this.totalRegistro = resultado.total;
      })
      .catch(error => this.errorHandeler.handele(error));
  }

  paginar(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExcluir(pessoa: any) {
    this.confirmation.confirm({
      message: 'Deseja realmente excluir essa pessoa? ',
      accept: () => this.excluir(pessoa)
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo).then(() => {
      this.atualizarGrid();
      this.toasty.success('Pessoa excluída com sucesso!');
    })
    .catch(error => this.errorHandeler.handele(error));
  }

  alterarStatus(pessoa: any) {
    this.pessoaService.atualizarStatus(pessoa).then(() => this.atualizarGrid());
  }

  atualizarGrid() {
    if (this.grid.first === 0) {
      this.pesquisar();
    }else {
      this.grid.first = 0;
    }
  }

}
