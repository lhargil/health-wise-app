import { Component, OnInit } from '@angular/core';
import { environment } from 'projects/health-wise-app/src/environments/environment';

@Component({
  selector: 'hwa-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss']
})
export class SidebarLayoutComponent implements OnInit {
  testUser = environment.testUser;
  constructor() { }

  ngOnInit(): void {
  }

}
