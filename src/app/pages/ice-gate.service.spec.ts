import { TestBed } from '@angular/core/testing';

import { IceGateService } from './ice-gate.service';

describe('IceGateService', () => {
  let service: IceGateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IceGateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
