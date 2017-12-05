import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandelerService } from './../../core/error-handeler.service';
import { LancamentoService } from '../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ToastyService } from 'ng2-toasty';

import { Lancamento } from './../../core/model';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit  {

  tipos = [
    {label : 'Receita', value : 'RECEITA'},
    {label : 'Despesa', value : 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();
  acao = 'Novo';

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private erroHandeler: ErrorHandelerService,
    private routers: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.routers.snapshot.params['codigo']) {
      this.acao = 'Editar';
    }
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    this.categoriaService.buscar()
      .then(response => {
        this.categorias = response.map(chave => ({ label: chave.nome, value: chave.codigo }));
      })
      .catch(error => this.erroHandeler.handele(error));
  }

  carregarPessoas() {
    this.pessoaService.buscarTodos()
      .then(response => {
        this.pessoas = response.map(chave => ({label: chave.nome, value: chave.codigo}));
      })
      .catch(error => this.erroHandeler.handele(error));
  }

  salvar(form: FormControl) {
    this.lancamentoService.cadastrar(this.lancamento).then(() => {
      form.reset();
      this.toasty.success('Lançamento salvo com sucesso!');
      this.lancamento = new Lancamento();
    })
    .catch(erro => this.erroHandeler.handele(erro));
  }

}
