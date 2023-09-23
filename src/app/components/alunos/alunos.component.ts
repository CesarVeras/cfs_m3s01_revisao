import { Component, OnInit } from '@angular/core';
import IAluno from 'src/app/interfaces/IAluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css'],
})
export class AlunosComponent implements OnInit {
  alunos?: IAluno[] = [];
  alunosVisiveis?: IAluno[] = [];
	paginas: number[] = [];
  paginaAtual: number = 0;
  quantidadePorPagina: number = 10;

  constructor(private alunoService: AlunoService) {}

  async ngOnInit() {
    this.alunos = await this.alunoService.obterAlunos();
    await this.atualizarAlunos(this.paginaAtual);
		
		const qnt = Math.ceil(this.alunos.length / this.quantidadePorPagina);
		this.paginas = Array(qnt).fill(1).map((x,i)=>i);
  }

  async atualizarAlunos(pagina?: number) {
    this.paginaAtual = pagina || 0;
		const start = this.paginaAtual * this.quantidadePorPagina;
    const end = start + this.quantidadePorPagina;
		this.alunosVisiveis = this.alunos?.slice(start, end);
    return this.alunosVisiveis;
  }

  onInputChange(e: any) {
    this.alunosVisiveis = this.alunoService.filtrarAlunos(
      e.target.value,
      this.alunos || []
    );
  }
}
// 1:16:06
