import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import IAcompanhamentos from '../interfaces/IAcompanhamentos';

@Injectable({
  providedIn: 'root',
})
export class AcompanhamentoService {
  acompanhamentos: IAcompanhamentos[] = [];

  constructor(private httpClient: HttpClient) {}

  async obterAcompanhamentos() {
    this.acompanhamentos = await lastValueFrom(
      this.httpClient.get<IAcompanhamentos[]>(
        'http://localhost:3000/acompanhamentos'
      )
    );
		return this.acompanhamentos;
  }

  async obterAcompanhamentosPaginados(page: number, amount: number) {
    if (this.acompanhamentos.length === 0) {
      await this.obterAcompanhamentos();
    }
    const start = page * amount;
    const end = start + amount;
    return this.acompanhamentos.slice(start, end);
  }

  filtrarAcompanhamentos(filtro: string, acompanhamentos: IAcompanhamentos[]) {
    const acompanhamentosFiltrados = acompanhamentos.filter((acom) =>
      acom.titulo.toLowerCase().includes(filtro.toLowerCase())
    );
    return acompanhamentosFiltrados;
  }

  async obterQuantidadeAcompanhamentos() {
    if (this.acompanhamentos.length === 0) {
      await this.obterAcompanhamentos();
    }
    return this.acompanhamentos.length;
  }

  async obterPorcentagemConcluida() {
    if (this.acompanhamentos.length === 0) {
      await this.obterAcompanhamentos();
    }
    let qntConcluida = 0;
    this.acompanhamentos.forEach((acom) => {
      if (acom.finalizado) qntConcluida++;
    });
    return Math.floor((qntConcluida / this.acompanhamentos.length) * 100);
  }

  obterAcompanhamentosProximos() {
    const acompanhamentos =  this.acompanhamentos.filter((a) => {
			const dataFormatada = this.formatarData(a.data);
			return dataFormatada.getTime() >= Date.now()
		});
		return acompanhamentos.sort((a1, a2) => {
			const dataFormatada1 = this.formatarData(a1.data);
			const dataFormatada2 = this.formatarData(a2.data);
			return dataFormatada1.getTime() - dataFormatada2.getTime();
		})
  }

	private formatarData(data: Date) {
		const dataString = data.toString().split('/');
		return new Date(+dataString[2], +dataString[1] - 1, +dataString[0]);
	}
}
