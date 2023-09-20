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

  
  constructor(private acompanhamentoService: AcompanhamentoService) {}

  async ngOnInit() {
    this.acompanhamentosVisiveis = this.acompanhamentos = await this.acompanhamentoService.obterAcompanhamentos(0, 10);	
  }

  async atualizarAcompanhamentos(pagina?: number, quantidade?: number) {
    pagina = pagina || 0;
    quantidade = quantidade || 10;
    this.acompanhamentosVisiveis = this.acompanhamentos = await this.acompanhamentoService.obterAcompanhamentos(pagina, quantidade);
  }

  onInputChange(e: any) {
    this.acompanhamentosVisiveis = this.acompanhamentoService.filtrarAcompanhamentos(
      e.target.value,
      this.acompanhamentos || []
    );
  }
}
