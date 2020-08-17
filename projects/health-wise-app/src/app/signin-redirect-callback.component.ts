import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth-service.component';
import { Router } from '@angular/router';

@Component({
  selector: 'hwa-signin-callback',
  template: '<div></div>',
})
export class SigninRedirectCallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.completeLogin().then((_) => {
      this.router.navigate(['/'], { replaceUrl: true });
    });
  }
}
