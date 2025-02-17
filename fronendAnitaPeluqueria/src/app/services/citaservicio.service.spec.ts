import { TestBed } from '@angular/core/testing';

import { CitaservicioService } from './citaservicio.service';

describe('CitaservicioService', () => {
  let service: CitaservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitaservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
