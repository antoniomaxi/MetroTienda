import { TestBed, inject } from '@angular/core/testing';

import { BdService } from './bd.service';

describe('BdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BdService]
    });
  });

  it('should be created', inject([BdService], (service: BdService) => {
    expect(service).toBeTruthy();
  }));
});
