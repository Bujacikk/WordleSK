import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1ChoicesComponent } from './f1-choices.component';

describe('F1ChoicesComponent', () => {
  let component: F1ChoicesComponent;
  let fixture: ComponentFixture<F1ChoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F1ChoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(F1ChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
