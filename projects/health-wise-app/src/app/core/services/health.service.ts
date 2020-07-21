import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { ObservableStore } from '@codewithdan/observable-store';
import { HealthStore } from '../state';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BloodPressureReading } from '../models';
import { map, catchError, tap } from 'rxjs/operators';

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

  // getCustomer(id: number) {
  //   return this.getCustomers()
  //     .pipe(
  //       map(custs => {
  //         let filteredCustomers = custs.filter(cust => cust.id === id);
  //         let customer = (filteredCustomers && filteredCustomers.length) ? filteredCustomers[0] : null;
  //         this.setState({ customer }, CustomersStoreActions.GetCustomer);
  //         return customer;
  //       })
  //     );
  // }

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
  GetBloodPressureReading = 'get_blood_pressure_reading'
}
