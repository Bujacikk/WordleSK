import { TestBed } from '@angular/core/testing';

import { QuizGameloopService } from './quiz-gameloop.service';

describe('QuizGameloopService', () => {
  let service: QuizGameloopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizGameloopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
