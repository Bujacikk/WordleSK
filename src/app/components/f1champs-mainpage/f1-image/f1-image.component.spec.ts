import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1ImageComponent } from './f1-image.component';

describe('F1ImageComponent', () => {
  let component: F1ImageComponent;
  let fixture: ComponentFixture<F1ImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F1ImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(F1ImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
