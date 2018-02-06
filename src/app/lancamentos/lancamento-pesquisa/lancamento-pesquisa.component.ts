import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';

import { ToastyService } from 'ng2-toasty';
import { ErrorHandelerService } from './../../core/error-handeler.service';
import { LancamentoService } from '../lancamento.service';
import { LancamentoFiltro } from './../lancamento.service';
import { OauthService } from '../../seguranca/oauth.service';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {

  totalRegistro = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') gird;

  constructor(
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private confirm: ConfirmationService,
    private errorHandeler: ErrorHandelerService,
    private title: Title,
    private auth: OauthService
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de lançamentos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro).then(
      resultado => {
        this.totalRegistro = resultado.total;
        this.lancamentos = resultado.lancamentos;
      })
      .catch(erro => this.errorHandeler.handele(erro));
  }

  paginar(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmacaoExcluir(lancamento) {
    this.confirm.confirm({
      message: 'Deseja realmente excluir o lançamento ?',
      accept: () => this.excluir(lancamento)
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo).then(() => {
      if (this.gird.first === 0) {
        this.pesquisar();
      }else {
        this.gird.first = 0;
      }
      this.toasty.success('Lancçamento excluído com sucesso !');
    })
    .catch(erro => this.errorHandeler.handele(erro));
  }

}
