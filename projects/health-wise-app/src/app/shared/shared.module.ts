import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideInModule } from './slide-in/slide-in.module';
import { ContentHostModule } from './directives/content-host/content-host.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartWrapperModule } from './chart-wrapper/chart-wrapper.module';
import { CalendarWrapperModule } from './calendar-wrapper/calendar-wrapper.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    SlideInModule,
    ContentHostModule,
    ReactiveFormsModule,
    ChartWrapperModule,
    CalendarWrapperModule
  ],
})
export class SharedModule { }
