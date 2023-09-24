import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import IAluno from '../interfaces/IAluno';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
	
  alunos: IAluno[] = [];

  constructor(private httpClient: HttpClient) {}

  async obterAlunos() {
    this.alunos = await lastValueFrom(
      this.httpClient.get<IAluno[]>('http://localhost:3000/alunos')
    );
    return this.alunos;
  }

  filtrarAlunos(filtro: string, alunos: IAluno[]) {
    const alunosFiltrados = alunos.filter((aluno) =>
      aluno.nome.toLowerCase().includes(filtro.toLowerCase())
    );
    return alunosFiltrados;
  }

  async obterQuantidadeAlunos() {
    if (this.alunos.length === 0) {
      await this.obterAlunos();
    }
    return this.alunos.length;
  }

	async cadastrarAluno(aluno: IAluno) {
		try {
      await lastValueFrom(
        this.httpClient.post('http://localhost:3000/alunos', aluno)
      );
    } catch (e) {
      console.error(e);
    }
	}
}
