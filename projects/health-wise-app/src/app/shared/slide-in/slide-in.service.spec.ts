import { TestBed } from '@angular/core/testing';

import { SlideInService } from './slide-in.service';

describe('SlideInService', () => {
  let service: SlideInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlideInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
