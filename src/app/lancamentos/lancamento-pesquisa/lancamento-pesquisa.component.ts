import { LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {

  descricao: string;
  dataVencimentoFinal: Date;
  dataVencimentoInicial: Date;
  lancamentos = [];

  constructor(private lancamentoService: LancamentoService) {}

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicial: this.dataVencimentoInicial,
      dataVencimentoFinal: this.dataVencimentoFinal
    };
    this.lancamentoService.pesquisar(filtro).then(lancamentos => this.lancamentos = lancamentos);
  }

}
