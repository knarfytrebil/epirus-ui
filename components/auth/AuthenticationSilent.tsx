import * as React from 'react';
import Oidc from 'oidc-client';
import { useAsyncEffect } from '../../utils';

export function AuthenticationSilent() {
  useAsyncEffect(async () => {
    new Oidc.UserManager({}).signinSilentCallback().catch(console.log);
  }, []);

  return null;
}
