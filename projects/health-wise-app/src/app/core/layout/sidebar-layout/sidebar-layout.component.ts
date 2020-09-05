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
  show = false;

  constructor(public authX: AuthServiceX) { }

  ngOnInit(): void {
  }

  toggle() {
    this.show = !this.show;
    setTimeout(() => {
      this.open = !this.open;
    }, 100);
  }

  hide() {
    this.open = false;
    setTimeout(() => {
      this.show = false;
    }, 500);
  }

  signout() {
    this.authX.logout();
  }
}
