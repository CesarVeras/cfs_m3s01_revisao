import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import IAluno from 'src/app/interfaces/IAluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-alunos-cadastro',
  templateUrl: './alunos-cadastro.component.html',
  styleUrls: ['./alunos-cadastro.component.css'],
})
export class AlunosCadastroComponent {
  cadastroForm: FormGroup;

  constructor(private router: Router, private alunoService: AlunoService) {
    this.cadastroForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{11}$'),
      ]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{11}$'),
      ]),
      dataNascimento: new FormControl('', [Validators.required]),
      nota: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
    });
  }

  async onSubmit() {
    const aluno: IAluno = {
      nome: this.cadastroForm.get('nome')?.value,
      telefone: this.cadastroForm.get('telefone')?.value,
      cpf: this.cadastroForm.get('cpf')?.value,
      dataNascimento: this.formatarData(this.cadastroForm.get('dataNascimento')?.value),
      nota: this.cadastroForm.get('nota')?.value,
    };
    await this.alunoService.cadastrarAluno(aluno);
    this.router.navigate(['/labschool/alunos']);
  }

  private formatarData(data: string) {
    const dataSub = data.split('-');
    return `${dataSub[2]}/${dataSub[1]}/${dataSub[0]}`;
  }
}
