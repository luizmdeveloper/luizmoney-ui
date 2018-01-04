import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ErrorHandelerService } from './../../core/error-handeler.service';
import { PessoaService } from '../pessoa.service';
import { ToastyService } from 'ng2-toasty';

import { Pessoa } from './../../core/model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  acao = 'Nova';

  constructor(private errorHandelerService: ErrorHandelerService,
              private pessoaService: PessoaService,
              private toasty: ToastyService,
              private routers: ActivatedRoute,
              private router: Router,
              private title: Title ) { }

  ngOnInit() {
    this.title.setTitle('Nova pessoa');

    if (this.getEditando()) {
      this.acao = 'Editar';
      this.carregarPessoa(this.routers.snapshot.params['codigo']);
    }
  }

  getEditando(): Boolean {
    return this.routers.snapshot.params['codigo'];
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPessoa(codigo)
    .then(pessoa => {
      this.pessoa = pessoa;
      this.atualizarTitulo();
    })
    .catch(erro => this.errorHandelerService.handele(erro));
  }

  salvar() {
    if (this.getEditando()) {
      this.atualizar();
    } else {
      this.cadastar();
    }
  }

  cadastar() {
    this.pessoaService.cadastrar(this.pessoa)
    .then(pessoaSalva => {
      this.router.navigate([`/pessoas`, pessoaSalva.codigo]);
    })
    .catch(erro => this.errorHandelerService.handele(erro));
  }

  atualizar() {
    this.pessoaService.cadastrar(this.pessoa)
    .then(pessoaSalva => {
      this.pessoa = pessoaSalva;
      this.toasty.success('Pessoa alterado com sucesso!');
      this.atualizarTitulo();
    })
    .catch(erro => this.errorHandelerService.handele(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo']);
  }

  atualizarTitulo() {
    this.title.setTitle(`Edição pessoa: ${this.pessoa.nome}`);
  }
}
