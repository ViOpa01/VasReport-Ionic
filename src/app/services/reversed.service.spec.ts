import { TestBed } from '@angular/core/testing';

import { ReversedService } from './reversed.service';

describe('ReversedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReversedService = TestBed.get(ReversedService);
    expect(service).toBeTruthy();
  });
});
