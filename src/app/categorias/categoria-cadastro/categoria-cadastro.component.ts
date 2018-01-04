import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ErrorHandelerService } from './../../core/error-handeler.service';
import { CategoriaService } from '../categoria.service';
import { ToastyService } from 'ng2-toasty';

import { Categoria } from '../../core/model';

@Component({
  selector: 'app-categoria-cadastro',
  templateUrl: './categoria-cadastro.component.html',
  styleUrls: ['./categoria-cadastro.component.css']
})
export class CategoriaCadastroComponent implements OnInit {

  categoria = new Categoria();
  acao = 'Nova';

  constructor(private categoriaService: CategoriaService,
              private errorHandelerService: ErrorHandelerService,
              private toasty: ToastyService,
              private route: ActivatedRoute,
              private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Nova categoria');
    if (this.getEdicao()) {
      this.categoria.codigo = this.route.snapshot.params['codigo'];
      this.acao = 'Editar';
      this.carregarCategoria(this.categoria);
    }
  }

  getEdicao(): boolean {
    return this.route.snapshot.params['codigo'];
  }

  salvar(form: FormControl) {
    if (this.categoria.codigo) {
      this.atualizar();
    }else {
      this.cadastrar(form);
    }
  }

  carregarCategoria(categoria: Categoria) {
    this.categoriaService.buscarPorCodigo(categoria)
      .then(resultado => {
        this.categoria = resultado;
        this.atualizarTitulo();
      })
      .catch(erro => this.errorHandelerService.handele(erro));
  }

  atualizar() {
    this.categoriaService.atualizar(this.categoria).then(categoria => {
        this.categoria = categoria;
        this.toasty.success('Categoria atualizada com sucesso!');
        this.atualizarTitulo();
      })
      .catch(erro => this.errorHandelerService.handele(erro));
  }

  cadastrar(form: FormControl) {
    this.categoriaService.cadastrar(this.categoria).then(() => {
        form.reset();
        this.toasty.success('Categoria cadastrar com sucesso!');
        this.categoria = new Categoria();
    })
    .catch(erro => this.errorHandelerService.handele(erro));
  }

  atualizarTitulo() {
    this.title.setTitle(`Edição de categoria: ${this.categoria.nome}`);
  }
}
