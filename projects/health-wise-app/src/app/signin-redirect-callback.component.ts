import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceX } from './core/auth-service.component';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { tap, switchMap } from 'rxjs/operators';
import { Subscription, from } from 'rxjs';

@Component({
  selector: 'hwa-signin-callback',
  templateUrl: './signin-redirect-callback.component.html',
})
export class SigninRedirectCallbackComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  constructor(private authX: AuthServiceX, private router: Router) {}

  ngOnInit() {
    this.sub = from(this.authX.completeLogin())
      .pipe(
        switchMap(_ => this.router.navigate(['admin/dashboard'], { replaceUrl: true }))
      ).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
