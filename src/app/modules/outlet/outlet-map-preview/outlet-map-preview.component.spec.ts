import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletMapPreviewComponent } from './outlet-map-preview.component';

describe('OutletMapPreviewComponent', () => {
  let component: OutletMapPreviewComponent;
  let fixture: ComponentFixture<OutletMapPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutletMapPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletMapPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
