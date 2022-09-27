import { TestBed } from '@angular/core/testing';

import { SalvarClienteService } from './salvar-cliente.service';

describe('SalvarClienteService', () => {
  let service: SalvarClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalvarClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
