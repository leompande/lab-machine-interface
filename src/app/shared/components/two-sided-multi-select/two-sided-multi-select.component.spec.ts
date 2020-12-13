import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoSidedMultiSelectComponent } from './two-sided-multi-select.component';

describe('TwoSidedMultiSelectComponent', () => {
  let component: TwoSidedMultiSelectComponent;
  let fixture: ComponentFixture<TwoSidedMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoSidedMultiSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoSidedMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
