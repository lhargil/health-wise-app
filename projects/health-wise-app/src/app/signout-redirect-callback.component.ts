import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceX } from './core/auth-service.component';
import { Router } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';

@Component({
  selector: 'hwa-signout-redirect',
  templateUrl: './signout-redirect-callback.component.html',
})
export class SignoutRedirectCallbackComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  constructor(private authService: AuthServiceX, private router: Router) {}

  ngOnInit() {
    this.sub = from(this.authService.completeLogout())
      .pipe(
        delay(1500),
        switchMap(_ => this.router.navigate(['/'], { replaceUrl: true }))
      ).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
