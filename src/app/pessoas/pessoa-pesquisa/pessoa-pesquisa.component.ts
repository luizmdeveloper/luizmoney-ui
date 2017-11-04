import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent  {

  pessoas = [
    {nome: 'Luiz Mário', cidade : 'Salgueiro', uf : 'PE', ativo: true},
    {nome: 'Lucas Matheus', cidade : 'Salgueiro', uf : 'PE', ativo: false},
    {nome: 'Socorro Barros', cidade : 'Juazeiro', uf : 'BA', ativo: false},
    {nome: 'Dioneide Marina', cidade : 'Juazeiro do norte', uf : 'CE', ativo: false},
    {nome: 'Davi Tavares', cidade : 'Tabira', uf : 'PE', ativo: false},
    {nome: 'Bruno Ferreira', cidade : 'Salgueiro', uf : 'PE', ativo: true},
    {nome: 'Valério Bezerra', cidade : 'Petrolina', uf : 'PE', ativo: true},
    {nome: 'Pablo Cordeiro', cidade : 'Juazeiro', uf : 'BA', ativo: true},
  ];

}
