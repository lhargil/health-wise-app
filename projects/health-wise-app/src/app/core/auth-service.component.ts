import { Injectable, Inject } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { CoreModule } from './core.module';
import { Constants } from '../constants';
import { Subject } from 'rxjs';
import { IAuthConfig } from '../../environments/ienvironment';
import { AUTH_CONFIG } from './tokens';

@Injectable({ providedIn: CoreModule })
export class AuthServiceX {
  private userManager: UserManager;
  private user: User;

  private loginChangedSubject = new Subject<boolean>();
  loginChanged$ = this.loginChangedSubject.asObservable();
  constructor(@Inject(AUTH_CONFIG) readonly authConfig: IAuthConfig) {
    const stsSettings = {
      authority: authConfig.stsAuthority,
      client_id: authConfig.clientId,
      redirect_uri: `${authConfig.clientRoot}signin-callback`,
      scope: 'opendid profile health-wise-api',
      response_type: 'code',
      metadata: {
        issuer: `${authConfig.stsAuthority}`,
        authorization_endpoint: `${authConfig.stsAuthority}authorize`,
        jwks_uri: `${authConfig.stsAuthority}.well-known/jwks.json`,
        token_endpoint: `${authConfig.stsAuthority}oauth/token`,
        userinfo_endpoint: `${authConfig.stsAuthority}userinfo`,
        end_session_endpoint: `${authConfig.stsAuthority}v2/logout?client_id=${
          authConfig.clientId
        }&returnTo=${encodeURI(authConfig.clientRoot)}signout-callback`,
      },
    };
    this.userManager = new UserManager(stsSettings);
  }

  login() {
    return this.userManager.signinRedirect();
  }

  isLoggedIn(): Promise<boolean> {
    return this.userManager.getUser().then((user: User) => {
      const userCurrent = !!user && !user.expired;

      if (this.user !== user) {
        this.loginChangedSubject.next(userCurrent);
      }
      this.user = user;
      return userCurrent;
    });
  }

  completeLogin() {
    return this.userManager.signinRedirectCallback().then((user) => {
      this.user = user;
      this.loginChangedSubject.next(!!user && !user.expired);
      return user;
    });
  }

  logout() {
    this.userManager.signoutRedirect();
  }

  completeLogout() {
    return this.userManager.signoutRedirectCallback();
  }
}
