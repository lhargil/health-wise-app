import { Component, OnInit } from '@angular/core';
import { AuthServiceX } from './core/auth-service.component';
import { Router } from '@angular/router';

@Component({
  selector: 'hwa-signout-redirect',
  template: `<div></div>`,
})
export class SignoutRedirectCallbackComponent implements OnInit {
  constructor(private authService: AuthServiceX, private router: Router) {}

  ngOnInit() {
    this.authService.completeLogout().then((_) => {
      this.router.navigate(['/'], { replaceUrl: true });
    });
  }
}
