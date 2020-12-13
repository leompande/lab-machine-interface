import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationContainerComponent } from './organisation-container.component';

describe('OrganisationContainerComponent', () => {
  let component: OrganisationContainerComponent;
  let fixture: ComponentFixture<OrganisationContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
