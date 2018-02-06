import { AuthGuard } from './../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';
import { CategoriaPesquisaComponent } from './categoria-pesquisa/categoria-pesquisa.component';

const routes: Routes = [
  {
    path: 'categorias',
    component: CategoriaPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIA'] }
  },
  {
    path: 'categorias/nova',
    component: CategoriaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CATEGORIA'] }
  },
  {
    path: 'categorias/:codigo',
    component: CategoriaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CATEGORIA'] }
  },
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
