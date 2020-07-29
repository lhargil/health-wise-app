import { InMemoryDbService } from 'angular-in-memory-web-api';
import { BloodPressureReading } from '../models';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryReadingsDbService implements InMemoryDbService {
  createDb() {
    const people = [
      {
        id: '26C4A402-C6CD-42A9-8B8E-8FCF5F60C16E',
        lastname: 'gil',
        firstname: 'lhar',
        fullname: 'lhar gil',
      }
    ];
    const readings = [
      {
        id: uuidv4(),
        systole: 120,
        diastole: 81,
        heartRate: 88,
        personId: '26C4A402-C6CD-42A9-8B8E-8FCF5F60C16E',
        dateAdded: new Date('2020-07-03T00:00:00Z').toISOString(),
      },
      {
        id: uuidv4(),
        systole: 119,
        diastole: 80,
        heartRate: 79,
        personId: '26C4A402-C6CD-42A9-8B8E-8FCF5F60C16E',
        dateAdded: new Date('2020-07-04T00:00:00Z').toISOString(),
      },
      {
        id: uuidv4(),
        systole: 119,
        diastole: 80,
        heartRate: 80,
        personId: '77E0CA71-8683-414E-B7D2-91BAA23E4253',
        dateAdded: new Date('2020-07-05T00:00:00Z').toISOString(),
      },
    ] as BloodPressureReading[];

    return {
      'bp-readings': readings,
      people
    };
  }
}
