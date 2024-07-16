import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1DescriptionComponent } from './f1-description.component';

describe('F1DescriptionComponent', () => {
  let component: F1DescriptionComponent;
  let fixture: ComponentFixture<F1DescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F1DescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(F1DescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
