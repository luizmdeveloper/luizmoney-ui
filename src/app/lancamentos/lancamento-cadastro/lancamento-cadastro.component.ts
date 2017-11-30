import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandelerService } from './../../core/error-handeler.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private erroHandeler: ErrorHandelerService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    this.categoriaService.buscar()
      .then(response => {
        this.categorias = response.map(chave => ({ label: chave.nome, value: chave.codigo }));
      })
      .catch(error => this.erroHandeler.handeler(error));
  }

  carregarPessoas() {
    this.pessoaService.buscarTodos()
      .then(response => {
        this.pessoas = response.map(chave => ({label: chave.nome, value: chave.codigo}));
      })
      .catch(error => this.erroHandeler.handeler(error));
  }

}
