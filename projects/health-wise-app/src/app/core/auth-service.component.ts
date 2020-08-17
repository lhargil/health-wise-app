import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { CoreModule } from './core.module';
import { Constants } from '../constants';
import { Subject } from 'rxjs';

@Injectable({ providedIn: CoreModule })
export class AuthService {
  private _userManager: UserManager;
  private _user: User;

  private _loginChangedSubject = new Subject<boolean>();
  loginChanged$ = this._loginChangedSubject.asObservable();
  constructor() {
    const stsSettings = {
      authority: Constants.stsAuthority,
      client_id: Constants.clientId,
      redirect_uri: `${Constants.clientRoot}signin-callback`,
      scope: 'opendid profile health-wise-api',
      response_type: 'code',
      // post_logout_redirect_uri: `${Constants.clientRoot}signout-callback`,
      metadata: {
        issuer: `${Constants.stsAuthority}`,
        authorization_endpoint: `${Constants.stsAuthority}authorize`,
        jwks_uri: `${Constants.stsAuthority}.well-known/jwks.json`,
        token_endpoint: `${Constants.stsAuthority}oauth/token`,
        userinfo_endpoint: `${Constants.stsAuthority}userinfo`,
        end_session_endpoint: `${Constants.stsAuthority}v2/logout?client_id=${
          Constants.clientId
        }&returnTo=${encodeURI(Constants.clientRoot)}signout-callback`,
      },
    };
    this._userManager = new UserManager(stsSettings);
  }

  login() {
    return this._userManager.signinRedirect();
  }

  isLoggedIn(): Promise<boolean> {
    return this._userManager.getUser().then((user: User) => {
      const userCurrent = !!user && !user.expired;

      if (this._user !== user) {
        this._loginChangedSubject.next(userCurrent);
      }
      this._user = user;
      return userCurrent;
    });
  }

  completeLogin() {
    return this._userManager.signinRedirectCallback().then((user) => {
      this._user = user;
      this._loginChangedSubject.next(!!user && !user.expired);
      return user;
    });
  }

  logout() {
    this._userManager.signoutRedirect();
  }

  completeLogout() {
    return this._userManager.signoutRedirectCallback();
  }
}
