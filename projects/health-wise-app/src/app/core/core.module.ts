import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassicLayoutModule } from './layout/classic-layout/classic-layout.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [BrowserModule, RouterModule],
  exports: [BrowserModule, RouterModule, BrowserAnimationsModule],
})
export class CoreModule {}
