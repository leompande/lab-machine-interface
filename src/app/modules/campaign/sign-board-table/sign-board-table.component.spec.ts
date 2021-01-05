import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignBoardTableComponent } from './sign-board-table.component';

describe('SignBoardTableComponent', () => {
  let component: SignBoardTableComponent;
  let fixture: ComponentFixture<SignBoardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignBoardTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignBoardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
