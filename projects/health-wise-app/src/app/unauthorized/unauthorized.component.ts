import { Component, OnInit } from '@angular/core';
import { AuthServiceX } from '../core/auth-service.component';

@Component({
  selector: 'hwa-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  constructor(public authX: AuthServiceX) {
  }

  ngOnInit(): void {
  }
}
