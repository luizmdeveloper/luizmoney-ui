import { Title } from '@angular/platform-browser';
import { ErrorHandelerService } from './../../core/error-handeler.service';
import { Component, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { CategoriaService, CategoriaFiltro } from './../categoria.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
@Component({
  selector: 'app-categoria-pesquisa',
  templateUrl: './categoria-pesquisa.component.html',
  styleUrls: ['./categoria-pesquisa.component.css']
})
export class CategoriaPesquisaComponent implements OnInit {

  categorias = [];
  filtro = new CategoriaFiltro();
  totalRegistro = 0;
  @ViewChild('tabela') grid;

  constructor(private categoriaService: CategoriaService,
              private erroHandeler: ErrorHandelerService,
              private toasty: ToastyService,
              private confirm: ConfirmationService,
              private title: Title) { }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.categoriaService.pesquisar(this.filtro).then(resultado => {
      this.totalRegistro = resultado.total;
      this.categorias = resultado.categorias;
    });
  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de categorias');
  }

  paginar(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmacaoExcluir(categoria: any) {
    this.confirm.confirm({
      message : 'Deseja excluir essa categoria ?',
      accept: () => this.excluir(categoria)
    });
  }

  excluir(categoria: any) {
    this.categoriaService.excluir(categoria.codigo).then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      }else {
        this.grid.first = 0;
      }
      this.toasty.success('Categoria excluída com sucesso!');
    })
    .catch(erro => this.erroHandeler.handele(erro));
  }
}
