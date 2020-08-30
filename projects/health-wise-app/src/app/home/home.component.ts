import { Component, OnInit } from '@angular/core';
import { AuthServiceX } from '../core/auth-service.component';
import { tap } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'hwa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn$ = from(this.authX.isLoggedIn());
  constructor(public authX: AuthServiceX) { }

  ngOnInit(): void {
  }
}
