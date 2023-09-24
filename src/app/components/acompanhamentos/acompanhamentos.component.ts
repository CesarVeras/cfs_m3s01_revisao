import { Component } from '@angular/core';
import { Router } from '@angular/router';
import IAcompanhamento from 'src/app/interfaces/IAcompanhamento';
import { AcompanhamentoService } from 'src/app/services/acompanhamento.service';

@Component({
  selector: 'app-acompanhamentos',
  templateUrl: './acompanhamentos.component.html',
  styleUrls: ['./acompanhamentos.component.css'],
})
export class AcompanhamentosComponent {
  acompanhamentos: IAcompanhamento[] | undefined;
  acompanhamentosVisiveis: IAcompanhamento[] | undefined;
  paginas: number[] = [];
  paginaAtual: number = 0;
  quantidadePorPagina: number = 10;

  constructor(
    private router: Router,
    private acompanhamentoService: AcompanhamentoService
  ) {}

  async ngOnInit() {
    this.acompanhamentos =
      await this.acompanhamentoService.obterAcompanhamentos();
    this.acompanhamentosVisiveis = await this.atualizarAcompanhamentos(0);

    const qnt = Math.ceil(
      this.acompanhamentos.length / this.quantidadePorPagina
    );
    this.paginas = Array(qnt)
      .fill(1)
      .map((x, i) => i);
    console.log(this.paginas);
  }

  async atualizarAcompanhamentos(pagina?: number, quantidade?: number) {
    pagina = pagina || 0;
    quantidade = quantidade || 10;
    this.acompanhamentosVisiveis =
      await this.acompanhamentoService.obterAcompanhamentosPaginados(
        pagina,
        quantidade
      );
    return this.acompanhamentosVisiveis;
  }

  onInputChange(e: any) {
    this.acompanhamentosVisiveis =
      this.acompanhamentoService.filtrarAcompanhamentos(
        e.target.value,
        this.acompanhamentos || []
      );
  }

  editar(acompanhamento: IAcompanhamento) {
    this.router.navigate(['labschool/acompanhamentos-cadastro'], {
      queryParams: { id: acompanhamento.id },
    });
  }
}
