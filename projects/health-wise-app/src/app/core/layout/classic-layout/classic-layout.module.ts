import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassicLayoutComponent } from './classic-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ClassicLayoutComponent],
  imports: [CommonModule, RouterModule],
  exports: [ClassicLayoutComponent],
})
export class ClassicLayoutModule {}
