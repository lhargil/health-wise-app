import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'hwa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'health-wise-app';
  show = false;
  open = false;
  isLoggedIn = false;
  constructor(public authService: AuthService) {}

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
}
