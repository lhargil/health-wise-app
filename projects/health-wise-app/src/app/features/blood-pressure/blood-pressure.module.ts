import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BloodPressureRoutingModule } from './blood-pressure-routing.module';
import { BloodPressureComponent } from './blood-pressure.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [BloodPressureComponent],
  imports: [CommonModule, BloodPressureRoutingModule, NgApexchartsModule],
})
export class BloodPressureModule {}
