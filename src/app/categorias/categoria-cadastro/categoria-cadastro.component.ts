import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  constructor(private categoriaService: CategoriaService,
              private errorHandelerService: ErrorHandelerService,
              private toasty: ToastyService) { }

  ngOnInit() {}

  salvar(form: FormControl) {
    this.categoriaService.cadastrar(this.categoria).then(() => {
      form.reset();
      this.toasty.success('Categoria cadastrar com sucesso!');
      this.categoria = new Categoria();
    })
    .catch(erro => this.errorHandelerService.handele(erro));
  }

}
