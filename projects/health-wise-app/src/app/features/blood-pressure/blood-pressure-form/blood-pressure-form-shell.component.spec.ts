import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BloodPressureFormShellComponent } from './blood-pressure-form-shell.component';

describe('BloodPressureFormShellComponent', () => {
  let component: BloodPressureFormShellComponent;
  let fixture: ComponentFixture<BloodPressureFormShellComponent>;

  beforeEach(waitForAsync(() => {
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
