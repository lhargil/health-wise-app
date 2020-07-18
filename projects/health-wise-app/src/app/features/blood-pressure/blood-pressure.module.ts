import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BloodPressureRoutingModule } from './blood-pressure-routing.module';
import { BloodPressureComponent } from './blood-pressure.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BloodPressureFormShellComponent } from './blood-pressure-form/blood-pressure-form-shell.component';
import { BloodPressureFormComponent } from './blood-pressure-form/blood-pressure-form.component';
import { SharedModule } from '../../shared/shared.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BpCalendarComponent } from './bp-calendar/bp-calendar.component';

@NgModule({
  declarations: [
    BloodPressureComponent,
    BloodPressureFormShellComponent,
    BloodPressureFormComponent,
    BpCalendarComponent,
  ],
  imports: [
    CommonModule,
    BloodPressureRoutingModule,
    NgApexchartsModule,
    SharedModule,
  ],
})
export class BloodPressureModule { }
