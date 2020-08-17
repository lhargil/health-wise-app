import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback.component';

const routes: Routes = [
  {
    path: ':id/blood-pressure',
    loadChildren: () =>
      import('./features/blood-pressure/blood-pressure.module').then(
        (m) => m.BloodPressureModule
      ),
  },
  {
    path: ':id/dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'signin-callback',
    component: SigninRedirectCallbackComponent,
  },
  {
    path: 'signout-callback',
    component: SignoutRedirectCallbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
