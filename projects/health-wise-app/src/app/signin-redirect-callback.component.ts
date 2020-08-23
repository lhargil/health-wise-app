import { Component, OnInit } from '@angular/core';
import { AuthServiceX } from './core/auth-service.component';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'hwa-signin-callback',
  template: '<div><h1>Signing you in...</h1></div>',
})
export class SigninRedirectCallbackComponent implements OnInit {
  constructor(private authX: AuthServiceX, private router: Router) {}

  ngOnInit() {
    this.authX.completeLogin().then((user) => {
      this.router.navigate(['admin/dashboard'], { replaceUrl: true });
    });
    // this.authService.isAuthenticated$
    //   .pipe(tap((_) => this.router.navigate(['admin/dashboard'])))
    //   .subscribe();
  }
}
