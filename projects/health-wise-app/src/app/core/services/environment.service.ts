import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { environment } from 'projects/health-wise-app/src/environments/environment';

@Injectable({
  providedIn: CoreModule,
})
export class EnvironmentService {
  constructor() {}

  get(key: string) {
    return (environment as any)[key];
  }
}
