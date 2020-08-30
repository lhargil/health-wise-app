import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SidebarLayoutModule } from './core/layout/sidebar-layout/sidebar-layout.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlideInModule } from './shared/slide-in/slide-in.module';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './shared/loader/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SigninRedirectCallbackComponent,
    PageNotFoundComponent,
    HomeComponent,
    AdminComponent,
    UnauthorizedComponent,
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    SidebarLayoutModule,
    SlideInModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
