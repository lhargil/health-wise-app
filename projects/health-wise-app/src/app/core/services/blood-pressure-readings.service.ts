import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BloodPressureReading } from '../models';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: CoreModule
})
export class BloodPressureReadingsService {
  private apiUrl = '/api/readings';
  constructor(private httpClient: HttpClient) { }

  getReadings(): Observable<BloodPressureReading[]> {
    return this.httpClient.get<BloodPressureReading[]>(this.apiUrl);
  }

  addReading(bloodPressureReading: BloodPressureReading) {
    const headers = new HttpHeaders({
      'content-type': 'application/json'
    });
    return this.httpClient.post(this.apiUrl, bloodPressureReading, { headers });
  }
}
