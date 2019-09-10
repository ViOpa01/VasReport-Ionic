import { TestBed } from '@angular/core/testing';

import { SockectService } from './sockect.service';

describe('SockectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SockectService = TestBed.get(SockectService);
    expect(service).toBeTruthy();
  });
});
