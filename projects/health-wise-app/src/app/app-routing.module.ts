import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'blood-pressure',
    loadChildren: () =>
      import('./features/blood-pressure/blood-pressure.module').then(
        (m) => m.BloodPressureModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
