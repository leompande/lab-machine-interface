import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignBoardMoreComponent } from './sign-board-more.component';

describe('SignBoardMoreComponent', () => {
  let component: SignBoardMoreComponent;
  let fixture: ComponentFixture<SignBoardMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignBoardMoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignBoardMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
