import { TestBed } from '@angular/core/testing';

import { ForeingService } from './foreing.service';

describe('ForeingService', () => {
  let service: ForeingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForeingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
