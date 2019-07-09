import * as React from 'react';
import { ACTIVE_BUTTON_GREY, API_AUTHORITY, HOVER_BUTTON_GREY } from '../../../../data';
import { MOBILE_TEXT } from '../../../../style-config';
import { Authentication } from '../../../auth';

export function AccountInfoLogoutButton() {
  const [auth, setAuth] = React.useState(null);
  React.useEffect(() => {
    setAuth(new Authentication());
  }, []);
  if (API_AUTHORITY && auth) {
    return (
      <>
        <style jsx>{`
          div.AccountInfoLogoutButton {
            display: flex;
            align-items: center;
            position: relative;
            width: 100%;
            height: 64px;
          }
          button {
            padding: 8px 16px;
            color: ${MOBILE_TEXT};
            line-height: 16px;
            font-size: 14px;
            text-align: left;
            white-space: nowrap;
            height: 32px;
            width: 100%;
          }
          button:hover {
            background-color: ${HOVER_BUTTON_GREY};
          }
          button:active {
            background-color: ${ACTIVE_BUTTON_GREY};
          }
        `}</style>
        <div className="AccountInfoLogoutButton">
          <button onClick={() => auth.logout()}>Log out</button>
        </div>
      </>
    );
  } else {
    return null;
  }
}
