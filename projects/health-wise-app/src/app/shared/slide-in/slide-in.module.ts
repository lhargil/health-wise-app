import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideInComponent } from './slide-in.component';
import { SlideInHostComponent } from './slide-in-host.component';
import { ContentHostModule } from '../directives/content-host/content-host.module';

@NgModule({
  declarations: [SlideInComponent, SlideInHostComponent],
  imports: [CommonModule, ContentHostModule],
  exports: [SlideInComponent, SlideInHostComponent],
})
export class SlideInModule {}
