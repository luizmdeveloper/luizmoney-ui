import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { LancamentosRoutingModule } from './lancamentos-routing.modules';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';

import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    DataTableModule,
    TooltipModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,

    SharedModule,

    CurrencyMaskModule,

    LancamentosRoutingModule
  ],
  declarations: [
    LancamentoCadastroComponent,
    LancamentoPesquisaComponent
  ],
  exports: []
})
export class LancamentosModule { }
