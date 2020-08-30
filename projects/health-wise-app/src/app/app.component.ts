import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { AuthServiceX } from './core/auth-service.component';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { LoaderService } from './shared/loader/loader.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'hwa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'health-wise-app';
  show = false;
  open = false;
  isLoggedIn = false;
  constructor(private authX: AuthServiceX, private router: Router, public loaderService: LoaderService) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(
          event =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError,
        ),
      )
      .subscribe(event => {
        // If it's the start of navigation, `add()` a loading indicator
        if (event instanceof NavigationStart) {
          this.loaderService.show();
          return;
        }

        // Else navigation has ended, so `remove()` a loading indicator
        this.loaderService.hide();
      });
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

  login() {
    this.authX.login();
  }

  logout() {
    this.authX.logout();
  }
}
