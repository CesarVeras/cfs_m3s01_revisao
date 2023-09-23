import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import IAcompanhamentos from 'src/app/interfaces/IAcompanhamentos';
import IAluno from 'src/app/interfaces/IAluno';
import IPedagogo from 'src/app/interfaces/IPedagogo';
import { AcompanhamentoService } from 'src/app/services/acompanhamento.service';
import { AlunoService } from 'src/app/services/aluno.service';
import { PedagogoService } from 'src/app/services/pedagogo.service';

@Component({
  selector: 'app-acompanhamentos-cadastro',
  templateUrl: './acompanhamentos-cadastro.component.html',
  styleUrls: ['./acompanhamentos-cadastro.component.css'],
})
export class AcompanhamentosCadastroComponent implements OnInit {
  cadastroForm: FormGroup;
  alunos: IAluno[] = [];
  pedagogos: IPedagogo[] = [];

  constructor(
    private router: Router,
    private acompanhamentoService: AcompanhamentoService,
    private alunoService: AlunoService,
    private pedagogoService: PedagogoService
  ) {
    this.cadastroForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      aluno: new FormControl(-1, [Validators.required]),
      pedagogo: new FormControl(-1, [Validators.required]),
      data: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      finalizado: new FormControl(false, [Validators.required]),
    });
  }
  async ngOnInit() {
    this.alunos = await this.alunoService.obterAlunos();
    this.pedagogos = await this.pedagogoService.obterPedagogos();
  }

  async onSubmit() {
    const acompanhamento: IAcompanhamentos = {
      titulo: this.cadastroForm.get('titulo')?.value,
      aluno: this.cadastroForm.get('aluno')?.value,
      pedagogo: this.cadastroForm.get('pedagogo')?.value,
      data: this.formatarData(this.cadastroForm.get('data')?.value),
      descricao: this.cadastroForm.get('descricao')?.value,
      finalizado: this.cadastroForm.get('finalizado')?.value,
    };
    await this.acompanhamentoService.cadastrarAcompanhamento(acompanhamento);
    this.router.navigate(['/labschool/acompanhamentos']);
  }

  private formatarData(data: string) {
    const dataSub = data.split('-');
    return `${dataSub[2]}/${dataSub[1]}/${dataSub[0]}`;
  }
}
