import { TestBed } from '@angular/core/testing';

import { BloodPressureReadingsService } from './blood-pressure-readings.service';

describe('BloodPressureReadingsService', () => {
  let service: BloodPressureReadingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodPressureReadingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
