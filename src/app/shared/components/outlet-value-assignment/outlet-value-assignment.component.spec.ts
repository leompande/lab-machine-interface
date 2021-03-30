import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletValueAssignmentComponent } from './outlet-value-assignment.component';

describe('OutletValueAssignmentComponent', () => {
  let component: OutletValueAssignmentComponent;
  let fixture: ComponentFixture<OutletValueAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutletValueAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletValueAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
