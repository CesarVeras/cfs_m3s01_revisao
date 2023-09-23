import { Component } from '@angular/core';
import IAcompanhamentos from 'src/app/interfaces/IAcompanhamentos';
import { AcompanhamentoService } from 'src/app/services/acompanhamento.service';

@Component({
  selector: 'app-acompanhamentos',
  templateUrl: './acompanhamentos.component.html',
  styleUrls: ['./acompanhamentos.component.css'],
})
export class AcompanhamentosComponent {
	acompanhamentos: IAcompanhamentos[] | undefined;
  acompanhamentosVisiveis: IAcompanhamentos[] | undefined;
	paginas: number[] = [];
  paginaAtual: number = 0;
  quantidadePorPagina: number = 10;

  
  constructor(private acompanhamentoService: AcompanhamentoService) {}

  async ngOnInit() {
    this.acompanhamentos = await this.acompanhamentoService.obterAcompanhamentos();	
    this.acompanhamentosVisiveis = await this.atualizarAcompanhamentos(0);	

		const qnt = Math.ceil(this.acompanhamentos.length / this.quantidadePorPagina);
		this.paginas = Array(qnt).fill(1).map((x,i)=>i);
		console.log(this.paginas);
  }

  async atualizarAcompanhamentos(pagina?: number, quantidade?: number) {
    pagina = pagina || 0;
    quantidade = quantidade || 10;
    this.acompanhamentosVisiveis = await this.acompanhamentoService.obterAcompanhamentosPaginados(pagina, quantidade);
		return this.acompanhamentosVisiveis;
  }

  onInputChange(e: any) {
    this.acompanhamentosVisiveis = this.acompanhamentoService.filtrarAcompanhamentos(
      e.target.value,
      this.acompanhamentos || []
    );
  }
}
