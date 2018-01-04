import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CategoriasModule } from './categorias/categorias.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { CoreModule } from './core/core.module';

import { ToastyModule, providers } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { CategoriaPesquisaComponent } from './categorias/categoria-pesquisa/categoria-pesquisa.component';
import { CategoriaCadastroComponent } from './categorias/categoria-cadastro/categoria-cadastro.component';
import { LancamentoPesquisaComponent } from './lancamentos/lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoaPesquisaComponent } from './pessoas/pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
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
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(routes),

    LancamentosModule,
    PessoasModule,
    CoreModule,
    CategoriasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
