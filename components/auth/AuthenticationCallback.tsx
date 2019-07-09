import * as React from 'react';
import { withRouter } from 'next/router';
import { RouterProps } from 'next-server/router';
import Oidc from 'oidc-client';
import Link from 'next/link';
import { LoadingSpinner } from '../placeholders';
import { useAsyncEffect } from '../../utils';
import { LO_PURPLE, TEXT_GREY } from '../../data';

export interface IAuthenticationCallbackProps {
  router: RouterProps;
}

function AuthenticationCallback(props: IAuthenticationCallbackProps) {
  useAsyncEffect(async () => {
    const mgr = new Oidc.UserManager({
      loadUserInfo: true,
      filterProtocolClaims: true,
    });
    mgr.signinRedirectCallback().then(() => {
      props.router.replace((props.router.query.url as string) || '/');
    });
  }, []);

  return (
    <>
      <style jsx>{`
        div.Authenticating {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 100%;
          height: calc(100% - 100px);
          padding: 50px 0;
        }
        div.title {
          display: flex;
          align-items: center;
          flex-direction: row;
          font-size: 22px;
          line-height: 22px;
          color: ${TEXT_GREY};
        }
        span {
          margin-right: 12px;
        }
        a.cancel {
          margin-top: 28px;
          color: ${LO_PURPLE};
        }
      `}</style>
      <div className="Authenticating">
        <div className="title">
          <span>Authenticating...</span>
          <LoadingSpinner style={{ width: 26, height: 26 }} />
        </div>
        <Link href="/">
          <a className="cancel">Cancel</a>
        </Link>
      </div>
    </>
  );
}

export default withRouter(AuthenticationCallback);
