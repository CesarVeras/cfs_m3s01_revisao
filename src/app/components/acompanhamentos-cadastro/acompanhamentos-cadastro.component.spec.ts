import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanhamentosCadastroComponent } from './acompanhamentos-cadastro.component';

describe('AcompanhamentosCadastroComponent', () => {
  let component: AcompanhamentosCadastroComponent;
  let fixture: ComponentFixture<AcompanhamentosCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcompanhamentosCadastroComponent]
    });
    fixture = TestBed.createComponent(AcompanhamentosCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
