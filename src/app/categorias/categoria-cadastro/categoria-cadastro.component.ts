import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  codigoCategoria = 0;

  constructor(private categoriaService: CategoriaService,
              private errorHandelerService: ErrorHandelerService,
              private toasty: ToastyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.params['codigo']) {
      this.codigoCategoria = this.route.snapshot.params['codigo'];
      this.acao = 'Editar';
      this.carregarCategoria(this.codigoCategoria);
    }
  }

  salvar(form: FormControl) {
    if (this.codigoCategoria) {
      this.categoriaService.atualizar(this.codigoCategoria, this.categoria)
          .then(() => {
            form.reset();
            this.toasty.success('Categoria atualizada com sucesso!');
            this.categoria = new Categoria();
          })
          .catch(erro => this.errorHandelerService.handele(erro));
    }else {
      this.categoriaService.cadastrar(this.categoria).then(() => {
        form.reset();
        this.toasty.success('Categoria cadastrar com sucesso!');
        this.categoria = new Categoria();
      })
      .catch(erro => this.errorHandelerService.handele(erro));
    }
  }

  carregarCategoria(codigo: any) {
    this.categoriaService.buscarPorCodigo(codigo)
      .then(resultado => this.categoria = resultado)
      .catch(erro => this.errorHandelerService.handele(erro));
  }

}
