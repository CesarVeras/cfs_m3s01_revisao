import { Injectable } from '@angular/core';
import { PedagogoService } from '../services/pedagogo.service';
import { lastValueFrom } from 'rxjs';
import IPedagogo from '../interfaces/IPedagogo';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private pedagogoService: PedagogoService) {}

  async login(email: string, senha: string) {
    const pedagogos: IPedagogo[] = await this.pedagogoService.obterPedagogos();
    for (const pedagogo of pedagogos) {
      const emailCorreto = pedagogo.email == email;
      const senhaCorreta = pedagogo.senha == senha;
      if (emailCorreto && senhaCorreta) return;
    }

    throw new Error('Credenciais inválidas!');
  }
}
