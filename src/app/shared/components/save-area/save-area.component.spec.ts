import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveAreaComponent } from './save-area.component';

describe('SaveAreaComponent', () => {
  let component: SaveAreaComponent;
  let fixture: ComponentFixture<SaveAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
