import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignBoardComponent } from './sign-board.component';

describe('SignBoardComponent', () => {
  let component: SignBoardComponent;
  let fixture: ComponentFixture<SignBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
