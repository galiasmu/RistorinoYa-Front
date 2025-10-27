import { TestBed } from '@angular/core/testing';

import { Monetization } from './monetization';

describe('Monetization', () => {
  let service: Monetization;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Monetization);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
