import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { BloodPressureReading } from '../models';

export class InMemoryReadingsDbService implements InMemoryDbService {
  createDb() {
    const readings = [
      {
        id: 'a',
        systole: 120,
        diastole: 81,
        heartRate: 88,
        dateAdded: new Date('03 Jul 2020').toISOString(),
      },
      {
        id: 'b',
        systole: 119,
        diastole: 80,
        heartRate: 79,
        dateAdded: new Date('04 Jul 2020').toISOString(),
      },
      {
        id: 'c',
        systole: 119,
        diastole: 80,
        heartRate: 80,
        dateAdded: new Date('05 Jul 2020').toISOString(),
      },
    ] as BloodPressureReading[];
    return { readings };
  }
}
