import { TestBed } from '@angular/core/testing';

import { SalvarFilmeService } from './salvar-filme.service';

describe('SalvarFilmeService', () => {
  let service: SalvarFilmeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalvarFilmeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
