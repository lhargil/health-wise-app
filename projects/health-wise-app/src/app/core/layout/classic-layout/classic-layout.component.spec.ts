import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClassicLayoutComponent } from './classic-layout.component';

describe('ClassicLayoutComponent', () => {
  let component: ClassicLayoutComponent;
  let fixture: ComponentFixture<ClassicLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassicLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassicLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
