import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { ButtonModule } from 'primeng/components/button/button';

import { CategoriaPesquisaComponent } from './categoria-pesquisa/categoria-pesquisa.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,

    SharedModule
  ],
  declarations: [
    CategoriaPesquisaComponent,
    CategoriaCadastroComponent
  ],
  exports: [
    CategoriaPesquisaComponent,
    CategoriaCadastroComponent
  ]
})
export class CategoriasModule { }
