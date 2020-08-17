import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SidebarLayoutModule } from './core/layout/sidebar-layout/sidebar-layout.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlideInModule } from './shared/slide-in/slide-in.module';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback.component';

@NgModule({
  declarations: [AppComponent, SigninRedirectCallbackComponent],
  imports: [CoreModule, AppRoutingModule, SidebarLayoutModule, SlideInModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
