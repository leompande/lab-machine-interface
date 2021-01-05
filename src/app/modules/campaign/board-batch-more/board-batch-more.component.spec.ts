import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardBatchMoreComponent } from './board-batch-more.component';

describe('BoardBatchMoreComponent', () => {
  let component: BoardBatchMoreComponent;
  let fixture: ComponentFixture<BoardBatchMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardBatchMoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardBatchMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
