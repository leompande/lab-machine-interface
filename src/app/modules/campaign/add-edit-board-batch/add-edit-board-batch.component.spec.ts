import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBoardBatchComponent } from './add-edit-board-batch.component';

describe('AddEditBoardBatchComponent', () => {
  let component: AddEditBoardBatchComponent;
  let fixture: ComponentFixture<AddEditBoardBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBoardBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBoardBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
