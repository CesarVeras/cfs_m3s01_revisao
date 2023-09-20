import { Injectable } from '@angular/core';
import { PedagogoService } from '../services/pedagogo.service';
import { lastValueFrom } from 'rxjs';
import IPedagogo from '../interfaces/IPedagogo';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private pedagogoLogado: IPedagogo | undefined;

  constructor(private pedagogoService: PedagogoService) {}

  async login(email: string, senha: string) {
    const pedagogos: IPedagogo[] = await this.pedagogoService.obterPedagogos();
    for (const pedagogo of pedagogos) {
      const emailCorreto = pedagogo.email == email;
      const senhaCorreta = pedagogo.senha == senha;
      if (emailCorreto && senhaCorreta) {
        this.pedagogoLogado = pedagogo;
        return;
      }
    }

    throw new Error('Credenciais inválidas!');
  }

  logout() {
    this.pedagogoLogado = undefined;
  }

  obterNomePedagogoLogado() {
    return this.pedagogoLogado?.nome;
  }
}
