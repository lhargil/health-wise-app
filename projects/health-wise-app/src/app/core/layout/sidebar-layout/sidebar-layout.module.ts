import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarLayoutComponent } from './sidebar-layout.component';
import { RouterModule } from '@angular/router';
import { ProfileModule } from '../../../shared/profile/profile.module';

@NgModule({
  declarations: [SidebarLayoutComponent],
  imports: [CommonModule, RouterModule, ProfileModule],
  exports: [SidebarLayoutComponent],
})
export class SidebarLayoutModule {}
