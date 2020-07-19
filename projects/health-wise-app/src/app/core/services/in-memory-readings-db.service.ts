import { InMemoryDbService } from 'angular-in-memory-web-api';
import { BloodPressureReading } from '../models';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryReadingsDbService implements InMemoryDbService {
  createDb() {
    const readings = [
      {
        id: uuidv4(),
        systole: 120,
        diastole: 81,
        heartRate: 88,
        dateAdded: new Date('2020-07-03T00:00:00Z').toISOString(),
      },
      {
        id: uuidv4(),
        systole: 119,
        diastole: 80,
        heartRate: 79,
        dateAdded: new Date('2020-07-04T00:00:00Z').toISOString(),
      },
      {
        id: uuidv4(),
        systole: 119,
        diastole: 80,
        heartRate: 80,
        dateAdded: new Date('2020-07-05T00:00:00Z').toISOString(),
      },
    ] as BloodPressureReading[];
    return { readings };
  }
}
