import { Component, OnInit } from '@angular/core';
import IAcompanhamento from 'src/app/interfaces/IAcompanhamento';
import { AcompanhamentoService } from 'src/app/services/acompanhamento.service';
import { AlunoService } from 'src/app/services/aluno.service';
import { PedagogoService } from 'src/app/services/pedagogo.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  alunosCadastrados: number = 0;
  pedagogosCadastrados: number = 0;
  acompanhamentosCadastrados: number = 0;
  acompanhamentosConcluidos: number = 0;
  acompanhamentosProximos: IAcompanhamento[] = [];

  constructor(
    private alunoService: AlunoService,
    private pedagogoService: PedagogoService,
    private acompanhamentoService: AcompanhamentoService
  ) {}

  async ngOnInit() {
    this.alunosCadastrados = await this.alunoService.obterQuantidadeAlunos();
    this.pedagogosCadastrados =
      await this.pedagogoService.obterQuantidadePedagogos();
    this.acompanhamentosCadastrados =
      await this.acompanhamentoService.obterQuantidadeAcompanhamentos();
    this.acompanhamentosConcluidos =
      await this.acompanhamentoService.obterPorcentagemConcluida();
    this.acompanhamentosProximos =
      await this.acompanhamentoService.obterAcompanhamentosProximos();
  }
}
