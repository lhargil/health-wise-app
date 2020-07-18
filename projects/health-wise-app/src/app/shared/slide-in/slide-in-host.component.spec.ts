import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideInHostComponent } from './slide-in-host.component';

describe('SlideInHostComponent', () => {
  let component: SlideInHostComponent;
  let fixture: ComponentFixture<SlideInHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideInHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideInHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
