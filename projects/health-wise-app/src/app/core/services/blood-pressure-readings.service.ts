import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BloodPressureReading } from '../models';
import { Observable, Subject } from 'rxjs';
import { environment } from 'projects/health-wise-app/src/environments/environment';

@Injectable({
  providedIn: CoreModule
})
export class BloodPressureReadingsService {
  private apiUrl = `${environment.healthWiseUrl}/api/people`;
  constructor(private httpClient: HttpClient) { }

  getReadings(): Observable<BloodPressureReading[]> {
    return this.httpClient.get<BloodPressureReading[]>(`${this.apiUrl}/`);
  }

  addReading(bloodPressureReading: BloodPressureReading) {
    const headers = new HttpHeaders({
      'content-type': 'application/json'
    });
    return this.httpClient.post(this.apiUrl, bloodPressureReading, { headers });
  }

  editReading(id: string, bloodPressureReading: BloodPressureReading) {
    const headers = new HttpHeaders({
      'content-type': 'application/json'
    });
    return this.httpClient.put(`${this.apiUrl}/${id}`, bloodPressureReading, { headers });
  }

  deleteReading(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
