import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SidebarLayoutModule } from './core/layout/sidebar-layout/sidebar-layout.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, SharedModule, AppRoutingModule, SidebarLayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
