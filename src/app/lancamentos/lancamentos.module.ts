import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DataTableModule } from 'primeng/components/datatable/datatable';

import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoGridComponent } from './lancamento-grid/lancamento-grid.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    DataTableModule,
    TooltipModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,

    CurrencyMaskModule
  ],
  declarations: [
    LancamentoCadastroComponent,
    LancamentoGridComponent,
    LancamentoPesquisaComponent
  ],
  exports: [
    LancamentoCadastroComponent,
    LancamentoPesquisaComponent
  ]
})
export class LancamentosModule { }
