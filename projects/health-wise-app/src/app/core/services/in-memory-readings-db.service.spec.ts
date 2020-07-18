import { TestBed } from '@angular/core/testing';

import { InMemoryReadingsDbService } from './in-memory-readings-db.service';

describe('InMemoryReadingsDbService', () => {
  let service: InMemoryReadingsDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryReadingsDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
