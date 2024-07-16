import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1ScoreComponent } from './f1-score.component';

describe('F1ScoreComponent', () => {
  let component: F1ScoreComponent;
  let fixture: ComponentFixture<F1ScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F1ScoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(F1ScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
