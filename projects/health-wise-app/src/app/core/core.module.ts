import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassicLayoutModule } from './layout/classic-layout/classic-layout.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryReadingsDbService } from './services/in-memory-readings-db.service'

@NgModule({
  declarations: [],
  imports: [BrowserModule, RouterModule, HttpClientModule, !environment.production ?
    HttpClientInMemoryWebApiModule.forRoot(InMemoryReadingsDbService, { delay: 100 }) : []],
  exports: [RouterModule],
})
export class CoreModule { }
