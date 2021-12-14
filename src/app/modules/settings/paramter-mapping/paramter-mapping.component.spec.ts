import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamterMappingComponent } from './paramter-mapping.component';

describe('ParamterMappingComponent', () => {
  let component: ParamterMappingComponent;
  let fixture: ComponentFixture<ParamterMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamterMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamterMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
