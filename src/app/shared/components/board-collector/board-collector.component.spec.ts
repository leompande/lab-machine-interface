import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCollectorComponent } from './board-collector.component';

describe('BoardCollectorComponent', () => {
  let component: BoardCollectorComponent;
  let fixture: ComponentFixture<BoardCollectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardCollectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
