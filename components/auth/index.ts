import Oidc from 'oidc-client';
import { API_AUTHORITY } from '../../data';

export class Authentication {
  mgr;
  constructor() {
    const postLogoutRedirectUri = `${window.location.origin}/log-in`;

    let redirectUri;
    if (window.location.href === postLogoutRedirectUri) {
      redirectUri = `${window.location.origin}/authenticating`;
    } else {
      redirectUri = `${window.location.origin}/authenticating?url=${window.location.href}`;
    }

    const CONFIG = {
      authority: API_AUTHORITY,
      client_id: 'explorer',
      post_logout_redirect_uri: postLogoutRedirectUri,

      // these two will be done dynamically from the buttons clicked, but are
      // needed if you want to use the silent_renew
      response_type: 'id_token',
      scope: 'openid profile email',

      // this will toggle if profile endpoint is used
      loadUserInfo: true,

      // silent renew will get a new access_token via an iframe
      // just prior to the old access_token expiring (60 seconds prior)
      silent_redirectUri: `${window.location.origin}/silent-redirect`,
      redirect_uri: redirectUri,
      automaticSilentRenew: true,

      // will revoke (reference) access tokens at logout time
      revokeAccessTokenOnSignout: true,

      // this will allow all the OIDC protocol claims to be visible in the window. normally a client app
      // wouldn't care about them or want them taking up space
      filterProtocolClaims: false,
    };
    Oidc.Log.logger = window.console;
    Oidc.Log.level = Oidc.Log.ERROR;

    this.mgr = new Oidc.UserManager(CONFIG);
  }

  login() {
    this.mgr.signinRedirect({ state: window.location.href });
  }

  logout() {
    this.mgr.signoutRedirect();
  }

  getUser = async () => await this.mgr.getUser();
}

export * from './AuthenticationCallback';
export * from './AuthenticationSilent';
