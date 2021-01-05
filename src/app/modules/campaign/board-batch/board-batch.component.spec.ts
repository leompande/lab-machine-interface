import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardBatchComponent } from './board-batch.component';

describe('BoardBatchComponent', () => {
  let component: BoardBatchComponent;
  let fixture: ComponentFixture<BoardBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
