import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { ObservableStore } from '@codewithdan/observable-store';
import { HealthStore } from '../state';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BloodPressureReading } from '../models';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { environment } from 'projects/health-wise-app/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HealthService extends ObservableStore<HealthStore> {
  private bloodPressureUrl = `${environment.healthWiseUrl}/api/people`;
  constructor(private http: HttpClient) {
    super({ trackStateHistory: true });
  }
  private fetchBloodPressureReadings() {
    return this.http
      .get<BloodPressureReading[]>(
        `${this.bloodPressureUrl}/${environment.testUser}/bloodpressurereadings`
      )
      .pipe(
        map((bloodPressureReadings: BloodPressureReading[]) => {
          this.setState(
            { bloodPressureReadings },
            HealthStoreActions.GetBloodPressureReadings
          );
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
    return this.getBloodPressureReadings().pipe(
      map((bloodPressureReadings) => {
        const filteredReadings = bloodPressureReadings.filter(
          (bloodPressureReading: BloodPressureReading) =>
            bloodPressureReading.id === id
        );
        const reading =
          filteredReadings && filteredReadings.length
            ? filteredReadings[0]
            : null;
        this.setState(
          { bloodPressureReading: reading },
          HealthStoreActions.GetBloodPressureReading
        );
        return reading;
      }),
      catchError(this.handleError)
    );
  }

  addBloodPressureReading(bloodPressureReading: BloodPressureReading) {
    return this.http
      .post(
        `${this.bloodPressureUrl}/${environment.testUser}/bloodpressurereadings`,
        bloodPressureReading,
        {
          headers: new HttpHeaders({ 'content-type': 'application/json' }),
        }
      )
      .pipe(
        switchMap((_) => this.fetchBloodPressureReadings()),
        catchError(this.handleError)
      );
  }

  updateBloodPressureReading(bloodPressureReading: BloodPressureReading) {
    return this.http
      .put(
        `${this.bloodPressureUrl}/${environment.testUser}/bloodpressurereadings/${bloodPressureReading.id}`,
        bloodPressureReading,
        { headers: new HttpHeaders({ 'content-type': 'application/json' }) }
      )
      .pipe(
        switchMap((_) => {
          this.setState(
            { bloodPressureReading },
            HealthStoreActions.EditBloodPressureReading
          );
          return this.fetchBloodPressureReadings();
        }),
        catchError(this.handleError)
      );
  }

  deleteBloodPressureReading(bloodPressureReading: BloodPressureReading) {
    return this.http
      .delete(
        `${this.bloodPressureUrl}/${environment.testUser}/bloodpressurereadings/${bloodPressureReading.id}`
      )
      .pipe(
        switchMap((_) => {
          const bloodPressureReadings = this.deleteLocalBloodPressureReading(
            bloodPressureReading.id
          );
          this.setState(
            { bloodPressureReadings, bloodPressureReading: null },
            HealthStoreActions.DeleteBloodPressureReading
          );
          return this.fetchBloodPressureReadings();
        }),
        catchError(this.handleError)
      );
  }

  private deleteLocalBloodPressureReading(id: string) {
    const bloodPressureReadings = this.getState().bloodPressureReadings;
    for (let i = bloodPressureReadings.length - 1; i--; ) {
      if (bloodPressureReadings[i].id === id) {
        bloodPressureReadings.splice(i, 1);
        break;
      }
    }
    return bloodPressureReadings;
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
  EditBloodPressureReading = 'edit_blood_pressure_reading',
  DeleteBloodPressureReading = 'delete_blood_pressure_reading',
}
