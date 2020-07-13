import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BloodPressureRoutingModule } from './blood-pressure-routing.module';
import { BloodPressureComponent } from './blood-pressure.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BloodPressureFormShellComponent } from './blood-pressure-form/blood-pressure-form-shell.component';
import { BloodPressureFormComponent } from './blood-pressure-form/blood-pressure-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    BloodPressureComponent,
    BloodPressureFormShellComponent,
    BloodPressureFormComponent,
  ],
  imports: [
    CommonModule,
    BloodPressureRoutingModule,
    NgApexchartsModule,
    SharedModule,
  ],
})
export class BloodPressureModule {}
