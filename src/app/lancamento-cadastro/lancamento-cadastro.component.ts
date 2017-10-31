import { Component } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent  {

  tipos = [
    {label : 'Receita', value : 'RECEITA'},
    {label : 'Despesa', value : 'DESPESA'}
  ];

  categorias = [
    {label : 'Lazer', value : '1'},
    {label : 'Alimentação', value : '2'}
  ];

  pessoas = [
    {label : 'João Manoel', value : '1'},
    {label : 'Valério Bezerra', value : '2'},
    {label : 'Pablo cordeiro', value : '1'}
  ];

  constructor() { }

}
