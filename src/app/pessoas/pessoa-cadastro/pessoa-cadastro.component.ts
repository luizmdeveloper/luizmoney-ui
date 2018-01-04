import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
              private title: Title ) { }

  ngOnInit() {
    this.title.setTitle('Nova pessoa');

    if (this.routers.snapshot.params['codigo']) {
      this.acao = 'Editar';
      this.carregarPessoa(this.routers.snapshot.params['codigo']);
    }
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPessoa(codigo)
    .then(pessoa => {
      this.pessoa = pessoa;
      this.atualizarTitulo();
    })
    .catch(erro => this.errorHandelerService.handele(erro));
  }

  salvar(form: FormControl) {
    this.pessoaService.cadastrar(this.pessoa).then(() => {
      form.reset();
      this.toasty.success('Pessoa cadastrada com sucesso!');
      this.pessoa = new Pessoa();
    })
    .catch(erro => this.errorHandelerService.handele(erro));
  }

  atualizarTitulo() {
    this.title.setTitle(`Edição pessoa: ${this.pessoa.nome}`);
  }
}
