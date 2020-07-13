import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarLayoutComponent } from './sidebar-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarLayoutComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarLayoutComponent],
})
export class SidebarLayoutModule {}
