import { Component, OnInit } from '@angular/core';
import IAluno from 'src/app/interfaces/IAluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css'],
})
export class AlunosComponent implements OnInit {
  alunos?: IAluno[];
  alunosVisiveis?: IAluno[];

  constructor(private alunoService: AlunoService) {}

  async ngOnInit() {
    this.alunosVisiveis = this.alunos = await this.alunoService.obterAlunos(0, 20);	
  }

  async atualizarAlunos(pagina?: number, quantidade?: number) {
    pagina = pagina || 0;
    quantidade = quantidade || 20;
    this.alunosVisiveis = this.alunos = await this.alunoService.obterAlunos(pagina, quantidade);
  }

  onInputChange(e: any) {
    this.alunosVisiveis = this.alunoService.filtrarAlunos(
      e.target.value,
      this.alunos || []
    );
  }
}
// 1:16:06