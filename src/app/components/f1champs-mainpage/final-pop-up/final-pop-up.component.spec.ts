import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalPopUpComponent } from './final-pop-up.component';

describe('FinalPopUpComponent', () => {
  let component: FinalPopUpComponent;
  let fixture: ComponentFixture<FinalPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
