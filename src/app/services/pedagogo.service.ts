import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IPedagogo from '../interfaces/IPedagogo';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedagogoService {
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
}
