import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { concatMap, mergeMap, catchError } from 'rxjs/operators';
import { AuthServiceX } from '../auth-service.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthServiceX) {}

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

        return next.handle(authReq).toPromise();
      })
    );
  }
}
