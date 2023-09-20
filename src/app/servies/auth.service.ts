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
      if (emailCorreto && senhaCorreta) {
        localStorage.setItem('usuario', JSON.stringify(pedagogo));
        return;
      }
    }

    throw new Error('Credenciais inválidas!');
  }

  logout() {
    localStorage.removeItem('usuario');
  }

  isLogado() {
    const pedagogoLogado = localStorage.getItem('usuario');
    return pedagogoLogado !== null;
  }

  obterNomePedagogoLogado() {
    const pedagogoString = localStorage.getItem('usuario');
    if (pedagogoString === null) return;
    const pedagogoLogado = <IPedagogo>JSON.parse(pedagogoString);
    return pedagogoLogado?.nome;
  }
}
