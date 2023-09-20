import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servies/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  nomeUsuario: string | undefined = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.nomeUsuario = this.authService.obterNomePedagogoLogado();
  }

  deslogar() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
