import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth-service.component';
import { Router } from '@angular/router';

@Component({
  selector: 'hwa-signout-redirect',
  template: `<div></div>`,
})
export class SignoutRedirectCallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.completeLogout().then((_) => {
      this.router.navigate(['/'], { replaceUrl: true });
    });
  }
}
