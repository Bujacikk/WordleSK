import { TestBed } from '@angular/core/testing';

import { WordEditingService } from './word-editing.service';

describe('WordEditingService', () => {
  let service: WordEditingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordEditingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
