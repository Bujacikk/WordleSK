import { TestBed } from '@angular/core/testing';

import { BoxPaintingService } from './box-painting.service';

describe('BoxPaintingService', () => {
  let service: BoxPaintingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoxPaintingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
