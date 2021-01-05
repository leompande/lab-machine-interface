import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignBoardContainerComponent } from './sign-board-container.component';

describe('SignBoardContainerComponent', () => {
  let component: SignBoardContainerComponent;
  let fixture: ComponentFixture<SignBoardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignBoardContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignBoardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
