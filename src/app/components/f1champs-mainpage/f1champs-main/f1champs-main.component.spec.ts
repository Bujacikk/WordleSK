import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1champsMainComponent } from './f1champs-main.component';

describe('F1champsMainComponent', () => {
  let component: F1champsMainComponent;
  let fixture: ComponentFixture<F1champsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F1champsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(F1champsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
