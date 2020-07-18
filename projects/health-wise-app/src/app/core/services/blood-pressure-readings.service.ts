import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { HttpClient } from '@angular/common/http';
import { BloodPressureReading } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: CoreModule
})
export class BloodPressureReadingsService {
  private apiUrl = '/api/readings';
  constructor(private httpClient: HttpClient) { }

  getReadings(): Observable<BloodPressureReading[]> {
    return this.httpClient.get<BloodPressureReading[]>(this.apiUrl);
  }
}
