import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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

  constructor(private errorHandelerService: ErrorHandelerService,
              private pessoaService: PessoaService,
              private toasty: ToastyService) { }

  ngOnInit() {}

  salvar(form: FormControl) {
    this.pessoaService.cadastrar(this.pessoa).then(() => {
      form.reset();
      this.toasty.success('Pessoa cadastrada com sucesso!');
      this.pessoa = new Pessoa();
    })
    .catch(erro => this.errorHandelerService.handele(erro));
  }
}
