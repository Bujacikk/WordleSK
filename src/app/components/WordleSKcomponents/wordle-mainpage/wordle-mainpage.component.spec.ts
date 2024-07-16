import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordleMainpageComponent } from './wordle-mainpage.component';

describe('WordleMainpageComponent', () => {
  let component: WordleMainpageComponent;
  let fixture: ComponentFixture<WordleMainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordleMainpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordleMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
