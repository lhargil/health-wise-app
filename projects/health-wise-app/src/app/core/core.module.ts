import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassicLayoutModule } from './layout/classic-layout/classic-layout.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [BrowserModule, RouterModule],
  exports: [BrowserModule, RouterModule],
})
export class CoreModule {}
