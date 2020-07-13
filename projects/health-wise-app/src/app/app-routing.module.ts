import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
