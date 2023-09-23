import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IPedagogo from '../interfaces/IPedagogo';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedagogoService {

	pedagogos: IPedagogo[] = [];

  constructor(private httpClient: HttpClient) {}

  async cadastrarPedagogo(pedagogo: IPedagogo) {
    try {
      await lastValueFrom(
        this.httpClient.post('http://localhost:3000/pedagogos', pedagogo)
      );
    } catch (e) {
      console.error(e);
    }
  }

  async obterPedagogos() {
		this.pedagogos = await lastValueFrom(
      this.httpClient.get<IPedagogo[]>('http://localhost:3000/pedagogos')
    );
    return this.pedagogos;
  }

  async obterQuantidadePedagogos() {
    if (this.pedagogos.length === 0) {
			await this.obterPedagogos();
		}
    return this.pedagogos.length;
  }
}
