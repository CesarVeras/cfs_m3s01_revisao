import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import IAcompanhamentos from '../interfaces/IAcompanhamentos';

@Injectable({
  providedIn: 'root'
})
export class AcompanhamentoService {

  constructor(private httpClient: HttpClient) {}

  async obterAcompanhamentos(page: number, amount: number) {
    const start = page * amount;
    const end = start + amount;
    const acompanhamentos = await lastValueFrom(
      this.httpClient.get<IAcompanhamentos[]>('http://localhost:3000/acompanhamentos')
    );
    return acompanhamentos.slice(start, end);
  }

  filtrarAcompanhamentos(filtro: string, acompanhamentos: IAcompanhamentos[]) {
    const acompanhamentosFiltrados = acompanhamentos.filter((acom) =>
      acom.titulo.toLowerCase().includes(filtro.toLowerCase())
    );
    return acompanhamentosFiltrados;
  }
}
