import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, from } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap, map, mergeMap } from 'rxjs/operators';
import { AuthServiceX } from '../auth-service.component';
import { off } from 'process';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authX: AuthServiceX, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    return from(this.authX.isLoggedIn())
      .pipe(
        map((loggedIn: boolean) => {
          if (loggedIn) {
            return true;
          } else {
            return this.router.parseUrl('/unauthorized');
          }
        })
      );
  }
}
