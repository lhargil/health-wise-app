import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'blood-pressure',
        loadChildren: () =>
          import('./features/blood-pressure/blood-pressure.module').then(
            (m) => m.BloodPressureModule
          ),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'signin-callback',
    component: SigninRedirectCallbackComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signout-callback',
    component: SignoutRedirectCallbackComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
