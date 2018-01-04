import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';
import { CategoriaPesquisaComponent } from './categoria-pesquisa/categoria-pesquisa.component';

const routes: Routes = [
  { path: 'categorias', component: CategoriaPesquisaComponent },
  { path: 'categorias/nova', component: CategoriaCadastroComponent },
  { path: 'categorias/:codigo', component: CategoriaCadastroComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class CategoriasRoutingModule { }
