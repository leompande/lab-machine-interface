import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignboardMoreComponent } from './signboard-more.component';

describe('SignboardMoreComponent', () => {
  let component: SignboardMoreComponent;
  let fixture: ComponentFixture<SignboardMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignboardMoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignboardMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
