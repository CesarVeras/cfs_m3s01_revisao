import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import IAcompanhamento from 'src/app/interfaces/IAcompanhamento';
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
  acompanhamento: IAcompanhamento | undefined;
  acompanhamentoId: number = 0;

  constructor(
    private route: ActivatedRoute,
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
    const params = await firstValueFrom(this.route.queryParams);

    if (params['id']) {
      this.acompanhamentoId = params['id'];
      this.acompanhamento =
        await this.acompanhamentoService.obterAcompanhamentoPorId(
          this.acompanhamentoId
        );
      this.cadastroForm.setValue({
        titulo: this.acompanhamento.titulo,
        aluno: this.acompanhamento.aluno,
        pedagogo: this.acompanhamento.pedagogo,
        data: this.formatarDataParaInput(this.acompanhamento.data),
        descricao: this.acompanhamento.descricao,
        finalizado: this.acompanhamento.finalizado,
      });
    }
  }

  async onSubmit() {
    const acompanhamento: IAcompanhamento = {
      titulo: this.cadastroForm.get('titulo')?.value,
      aluno: this.cadastroForm.get('aluno')?.value,
      pedagogo: this.cadastroForm.get('pedagogo')?.value,
      data: this.formatarData(this.cadastroForm.get('data')?.value),
      descricao: this.cadastroForm.get('descricao')?.value,
      finalizado: this.cadastroForm.get('finalizado')?.value,
    };
		if (this.acompanhamentoId) {
			acompanhamento.id = this.acompanhamentoId;
			await this.acompanhamentoService.atualizarAcompanhamento(acompanhamento);
		} else {
			await this.acompanhamentoService.cadastrarAcompanhamento(acompanhamento);
		}
    this.router.navigate(['/labschool/acompanhamentos']);
  }

  private formatarData(data: string) {
    const dataSub = data.split('-');
    return `${dataSub[2]}/${dataSub[1]}/${dataSub[0]}`;
  }

  private formatarDataParaInput(data: string) {
    const dataSub = data.split('/');
    return `${dataSub[2]}-${dataSub[1]}-${dataSub[0]}`;
  }
}
