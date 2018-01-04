import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './pessoas/pessoa-pesquisa/pessoa-pesquisa.component';
import { CategoriaPesquisaComponent } from './categorias/categoria-pesquisa/categoria-pesquisa.component';
import { CategoriaCadastroComponent } from './categorias/categoria-cadastro/categoria-cadastro.component';
import { LancamentoPesquisaComponent } from './lancamentos/lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [
  { path: '', redirectTo: 'categorias', pathMatch: 'full' },
  { path: 'categorias', component: CategoriaPesquisaComponent },
  { path: 'categorias/nova', component: CategoriaCadastroComponent },
  { path: 'categorias/:codigo', component: CategoriaCadastroComponent },
  { path: 'lancamentos', component: LancamentoPesquisaComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent },
  { path: 'pessoas', component: PessoaPesquisaComponent },
  { path: 'pessoas/nova', component: PessoaCadastroComponent },
  { path: 'pessoas/:codigo', component: PessoaCadastroComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
