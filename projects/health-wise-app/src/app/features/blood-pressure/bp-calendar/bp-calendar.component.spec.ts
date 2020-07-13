import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpCalendarComponent } from './bp-calendar.component';

describe('BpCalendarComponent', () => {
  let component: BpCalendarComponent;
  let fixture: ComponentFixture<BpCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
