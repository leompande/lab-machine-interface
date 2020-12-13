import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneSidedMultiSelectComponent } from './one-sided-multi-select.component';

describe('OneSidedMultiSelectComponent', () => {
  let component: OneSidedMultiSelectComponent;
  let fixture: ComponentFixture<OneSidedMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneSidedMultiSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneSidedMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
