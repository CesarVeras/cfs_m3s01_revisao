import { TestBed } from '@angular/core/testing';

import { PedagogoService } from './pedagogo.service';

describe('PedagogoService', () => {
  let service: PedagogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedagogoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
