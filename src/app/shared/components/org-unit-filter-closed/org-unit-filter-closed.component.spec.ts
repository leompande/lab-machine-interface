import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgUnitFilterClosedComponent } from './org-unit-filter-closed.component';

describe('OrgUnitFilterClosedComponent', () => {
  let component: OrgUnitFilterClosedComponent;
  let fixture: ComponentFixture<OrgUnitFilterClosedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgUnitFilterClosedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgUnitFilterClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
