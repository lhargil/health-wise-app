import { Person } from '.';

export interface PersonBloodPressure {
  person: Person;
  bloodPressureReading: BloodPressureReading;
}

export interface BloodPressureReading {
  id: string;
  systole: number;
  diastole: number;
  heartRate: number;
  personId: string;
  dateTaken: string;
}
