import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartWrapperComponent } from './chart-wrapper.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [ChartWrapperComponent],
  imports: [CommonModule, NgApexchartsModule],
  exports: [ChartWrapperComponent],
})
export class ChartWrapperModule {}
