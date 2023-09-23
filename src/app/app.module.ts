import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutenticacaoLayoutComponent } from './layouts/autenticacao-layout/autenticacao-layout.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/shared/header/header.component';
import { AlunosComponent } from './components/alunos/alunos.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { NaoAutorizadoComponent } from './components/nao-autorizado/nao-autorizado.component';
import { NaoEncontradoComponent } from './components/nao-encontrado/nao-encontrado.component';
import { AcompanhamentosComponent } from './components/acompanhamentos/acompanhamentos.component';
import { InicioComponent } from './components/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AutenticacaoLayoutComponent,
    CadastroComponent,
    HeaderComponent,
    AlunosComponent,
    BaseLayoutComponent,
    NaoAutorizadoComponent,
    NaoEncontradoComponent,
    AcompanhamentosComponent,
    InicioComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
    HttpClientModule,
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}
