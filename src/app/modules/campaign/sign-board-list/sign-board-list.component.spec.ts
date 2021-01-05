import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignBoardListComponent } from './sign-board-list.component';

describe('SignBoardListComponent', () => {
  let component: SignBoardListComponent;
  let fixture: ComponentFixture<SignBoardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignBoardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignBoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
