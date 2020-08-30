import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthServiceX } from '../auth-service.component';
import { STATUS_CODES } from 'http';
import { STATUS_CODE_INFO } from 'angular-in-memory-web-api';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthServiceX, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // return this.authService.getTokenSilently$().pipe(
    //   mergeMap((token) => {
    //     const tokenReq = request.clone({
    //       setHeaders: { Authorization: `Bearer ${token}` },
    //     });
    //     return next.handle(tokenReq);
    //   }),
    //   catchError((err) => throwError(err))
    // );

    return from(
      this.authService.getAccessToken().then((token) => {
        const authReq = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });

        return next.handle(authReq)
          .pipe(
            tap((_: any) => {}, (error: HttpErrorResponse) => {
              if (error && (error.status == STATUS_CODE_INFO[401].code || error.status == STATUS_CODE_INFO[403].code)) {
                this.router.navigate(['/unauthorized']);
              }
            })
          )
          .toPromise();
      })
    );
  }
}
