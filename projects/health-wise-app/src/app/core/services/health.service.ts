import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { ObservableStore } from '@codewithdan/observable-store';
import { HealthStore } from '../state';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BloodPressureReading } from '../models';
import { map, catchError, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: CoreModule
})
export class HealthService extends ObservableStore<HealthStore> {
  private bloodPressureUrl = 'api/bp-readings';
  constructor(private http: HttpClient) {
    super({ trackStateHistory: true });
  }
  private fetchBloodPressureReadings() {
    return this.http.get<BloodPressureReading[]>(this.bloodPressureUrl)
      .pipe(
        map((bloodPressureReadings: BloodPressureReading[]) => {
          this.setState({ bloodPressureReadings }, HealthStoreActions.GetBloodPressureReadings);
          return bloodPressureReadings;
        }),
        catchError(this.handleError)
      );
  }

  getBloodPressureReadings() {
    const state = this.getState();
    // pull from store cache
    if (state && state.bloodPressureReadings) {
      return of(state.bloodPressureReadings);
    }
    // doesn't exist in store so fetch from server
    else {
      return this.fetchBloodPressureReadings();
    }
  }

  getBloodPressureReading(id: string) {
    return this.getBloodPressureReadings()
      .pipe(
        map(readings => {
          let filteredReadings = readings.filter(reading => reading.id === id);
          let reading = (filteredReadings && filteredReadings.length) ? filteredReadings[0] : undefined;
          this.setState({ bloodPressureReading: reading }, HealthStoreActions.GetBloodPressureReading);
          return reading;
        })
      );
  }

  addBloodPressureReading(bloodPressureReading: BloodPressureReading) {
    return this.http.post(this.bloodPressureUrl, bloodPressureReading, {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    })
      .pipe(
        switchMap(_ => this.fetchBloodPressureReadings()),
        catchError(this.handleError)
      );
  }

  updateBloodPressureReading(bloodPressureReading: BloodPressureReading) {
    return this.http.put(`${this.bloodPressureUrl}/${bloodPressureReading.id}`, bloodPressureReading, { headers: new HttpHeaders({ 'content-type': 'application/json' }) })
      .pipe(
        switchMap(_ => {
          this.setState(
            { bloodPressureReading },
            HealthStoreActions.EditBloodPressureReading
          );
          return this.fetchBloodPressureReadings();
        })
      );
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
    }
    return throwError(error || 'Server error');
  }
}

export enum HealthStoreActions {
  Initialize = 'init_state',
  GetBloodPressureReadings = 'get_blood_pressure_readings',
  GetBloodPressureReading = 'get_blood_pressure_reading',
  EditBloodPressureReading = 'edit_blood_pressure_reading'
}
