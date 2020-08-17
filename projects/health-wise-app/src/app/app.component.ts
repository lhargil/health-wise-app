import { Component } from '@angular/core';
import { AuthService } from './core/auth-service.component';

@Component({
  selector: 'hwa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'health-wise-app';
  show: boolean = false;
  open = false;
  isLoggedIn = false;
  constructor(private authService: AuthService) {
    this.authService.loginChanged$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
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
}
