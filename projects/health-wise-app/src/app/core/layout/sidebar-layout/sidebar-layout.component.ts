import { Component, OnInit } from '@angular/core';
import { environment } from 'projects/health-wise-app/src/environments/environment';
import { AuthServiceX } from '../../auth-service.component';

@Component({
  selector: 'hwa-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss']
})
export class SidebarLayoutComponent implements OnInit {
  open = false;

  constructor(private authX: AuthServiceX) { }

  ngOnInit(): void {
  }

  toggle() {
    this.open = !this.open;
  }

  signout() {
    this.authX.logout();
  }
}
