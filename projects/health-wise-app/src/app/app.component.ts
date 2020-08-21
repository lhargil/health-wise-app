import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { AuthServiceX } from './core/auth-service.component';

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
  constructor(private authX: AuthServiceX) {}

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

  login() {
    this.authX.login();
  }

  logout() {
    this.authX.logout();
  }
}
