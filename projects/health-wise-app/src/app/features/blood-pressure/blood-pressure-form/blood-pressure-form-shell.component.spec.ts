import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodPressureFormShellComponent } from './blood-pressure-form-shell.component';

describe('BloodPressureFormShellComponent', () => {
  let component: BloodPressureFormShellComponent;
  let fixture: ComponentFixture<BloodPressureFormShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodPressureFormShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodPressureFormShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
