import { BloodPressureReading } from '../models';

export interface HealthStore {
  bloodPressureReadings: BloodPressureReading[];
  bloodPressureReading: BloodPressureReading | null;
}
