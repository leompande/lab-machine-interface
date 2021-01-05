import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSignBoardComponent } from './add-edit-sign-board.component';

describe('AddEditSignBoardComponent', () => {
  let component: AddEditSignBoardComponent;
  let fixture: ComponentFixture<AddEditSignBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSignBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSignBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
