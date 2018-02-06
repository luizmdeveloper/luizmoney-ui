import { CategoriaService } from './../categorias/categoria.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';

import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { ErrorHandelerService } from './error-handeler.service';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { OauthService } from './../seguranca/oauth.service';
import { JwtHelper } from 'angular2-jwt';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ToastyModule,
    ConfirmDialogModule,
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent,

    ToastyModule,
    ConfirmDialogModule,
  ],
  providers: [
    ErrorHandelerService,
    LancamentoService,
    PessoaService,
    ConfirmationService,
    Title,
    OauthService,

    JwtHelper,

    { provide: LOCALE_ID, useValue: 'pt-BR'},
    CategoriaService
  ]
})
export class CoreModule { }
