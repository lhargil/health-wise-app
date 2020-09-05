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
  show = false;
  open = false;

  constructor(public authX: AuthServiceX) { }

  toggle() {
    this.show = !this.show;
    setTimeout(() => {
      this.open = !this.open;
    }, 100);
  }

  ngOnInit(): void {
  }
}
