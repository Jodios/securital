import { TestBed } from '@angular/core/testing';

import { TypingDNAService } from './typing-dna.service';

describe('TypingDNAService', () => {
  let service: TypingDNAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypingDNAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
