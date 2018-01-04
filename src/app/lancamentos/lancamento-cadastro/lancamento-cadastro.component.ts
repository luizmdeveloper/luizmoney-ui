import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    private routers: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Novo lançamento');

    if (this.getEdicao()) {
      this.acao = 'Editar';
      this.carregarLancamento(this.routers.snapshot.params['codigo']);
    }

    this.carregarCategorias();
    this.carregarPessoas();

  }

  getEdicao() {
    return Boolean(this.routers.snapshot.params['codigo']);
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
    if (this.getEdicao()) {
      this.atualizar();
    } else {
      this.cadastrar();
    }
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigio(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.atualizarTitulo();
      })
      .catch(erro => this.erroHandeler.handele(erro));
  }

  cadastrar() {
    this.lancamentoService.cadastrar(this.lancamento).then(lancamentoSalvo => {
      this.toasty.success('Lançamento salvo com sucesso!');
      this.router.navigate(['/lancamentos', lancamentoSalvo.codigo]);
    })
    .catch(erro => this.erroHandeler.handele(erro));
  }

  atualizar() {
    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
      this.lancamento = lancamento;

      this.toasty.success('Lançamento alterado com sucesso!');
      this.atualizarTitulo();
    })
    .catch(erro => this.erroHandeler.handele(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTitulo() {
    this.title.setTitle(`Edição do lançamento: ${this.lancamento.descricao}`);
  }

}
