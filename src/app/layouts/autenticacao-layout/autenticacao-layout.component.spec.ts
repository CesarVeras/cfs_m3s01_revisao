import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticacaoLayoutComponent } from './autenticacao-layout.component';

describe('AutenticacaoLayoutComponent', () => {
  let component: AutenticacaoLayoutComponent;
  let fixture: ComponentFixture<AutenticacaoLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutenticacaoLayoutComponent]
    });
    fixture = TestBed.createComponent(AutenticacaoLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
