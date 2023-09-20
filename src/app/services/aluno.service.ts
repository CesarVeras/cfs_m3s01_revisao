import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import IAluno from '../interfaces/IAluno';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  constructor(private httpClient: HttpClient) {}

  async obterAlunos(page: number, amount: number) {
    const start = page * amount;
    const end = start + amount;
    const alunos = await lastValueFrom(
      this.httpClient.get<IAluno[]>('http://localhost:3000/alunos')
    );
    return alunos.slice(start, end);
  }

  filtrarAlunos(filtro: string, alunos: IAluno[]) {
    const alunosFiltrados = alunos.filter((aluno) =>
      aluno.nome.toLowerCase().includes(filtro.toLowerCase())
    );
    return alunosFiltrados;
  }
}
