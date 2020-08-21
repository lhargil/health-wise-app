import { Injectable, Inject } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { CoreModule } from './core.module';
import { Constants } from '../constants';
import { Subject } from 'rxjs';
import { IAuthConfig } from '../../environments/ienvironment';
import { AUTH_CONFIG } from './tokens';

@Injectable({ providedIn: 'root' })
export class AuthServiceX {
  private userManager: UserManager;
  private user: User;

  private loginChangedSubject = new Subject<boolean>();
  loginChanged$ = this.loginChangedSubject.asObservable();
  constructor(@Inject(AUTH_CONFIG) readonly authConfig: IAuthConfig) {
    const stsSettings = {
      authority: `https://${authConfig.stsAuthority}/`,
      client_id: authConfig.clientId,
      redirect_uri: `${authConfig.clientRoot}/signin-callback`,
      scope: `openid profile ${authConfig.audience}`,
      response_type: 'code',
      metadata: {
        issuer: `https://${authConfig.stsAuthority}/`,
        authorization_endpoint: `https://${authConfig.stsAuthority}/authorize?audience=${authConfig.audience}`,
        jwks_uri: `https://${authConfig.stsAuthority}/.well-known/jwks.json`,
        token_endpoint: `https://${authConfig.stsAuthority}/oauth/token`,
        userinfo_endpoint: `https://${authConfig.stsAuthority}/userinfo`,
        end_session_endpoint: `https://${
          authConfig.stsAuthority
        }/v2/logout?client_id=${authConfig.clientId}&returnTo=${encodeURI(
          authConfig.clientRoot
        )}/signout-callback`,
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

  getAccessToken() {
    return this.userManager.getUser().then((user) => {
      if (!!user && !user.expired) {
        return user.access_token;
      } else {
        return null;
      }
    });
  }
}
