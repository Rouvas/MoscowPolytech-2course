import { TestBed } from '@angular/core/testing';

import { SrvService } from './srv.service';

describe('SrvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SrvService = TestBed.get(SrvService);
    expect(service).toBeTruthy();
  });
});
