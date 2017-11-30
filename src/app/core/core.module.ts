import { CategoriaService } from './../categorias/categoria.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';

import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { ErrorHandelerService } from './error-handeler.service';

@NgModule({
  imports: [
    CommonModule,

    ToastyModule,
    ConfirmDialogModule,
  ],
  declarations: [
    NavbarComponent
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
    { provide: LOCALE_ID, useValue: 'pt-BR'},
    CategoriaService
  ]
})
export class CoreModule { }
