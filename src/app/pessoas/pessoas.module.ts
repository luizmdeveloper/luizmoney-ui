import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';

import { SharedModule } from './../shared/shared.module';
import { PessoasRoutingModule } from './pessoas-routing.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    ButtonModule,
    InputTextModule,
    DataTableModule,
    InputMaskModule,
    TooltipModule,

    SharedModule,

    PessoasRoutingModule
  ],
  declarations: [
    PessoaCadastroComponent,
    PessoaPesquisaComponent
  ],
  exports: []
})
export class PessoasModule { }
