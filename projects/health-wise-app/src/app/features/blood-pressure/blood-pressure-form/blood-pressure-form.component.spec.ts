import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodPressureFormComponent } from './blood-pressure-form.component';

describe('BloodPressureFormComponent', () => {
  let component: BloodPressureFormComponent;
  let fixture: ComponentFixture<BloodPressureFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodPressureFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodPressureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
