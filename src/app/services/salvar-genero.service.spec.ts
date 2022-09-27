import { TestBed } from '@angular/core/testing';

import { SalvarGeneroService } from './salvar-genero.service';

describe('SalvarGeneroService', () => {
  let service: SalvarGeneroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalvarGeneroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
