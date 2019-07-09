import * as React from 'react';
import Link from 'next/link';
import {
  CustomHead,
  NoScript,
  ICON,
  Authentication,
  LoadingSpinner,
  ELoadingSpinnerType,
  GLOBAL_STYLES,
} from '../../components';
import {
  DESKTOP_WIDTH,
  FONT_MOBILE_FAMILY,
  HEADER_ICON_PURPLE,
  HI_BLUE,
  LIGHT_PURPLE_TEXT,
  LO_PURPLE,
  MOBILE_TEXT,
  WHITE,
} from '../../style-config';
import { defined } from '../../utils';
const REDIRECTING_TEXT = 'Redirecting';

function LogIn() {
  const [authClass, setAuthClass] = React.useState(null);
  const [authStatus, setAuthStatus] = React.useState('Log In');
  React.useEffect(() => {
    setAuthClass(new Authentication());
  }, []);
  return (
    <>
      {GLOBAL_STYLES}
      <CustomHead />
      <NoScript />
      <style jsx>{`
        div.log-in {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          width: 100%;
          height: 100vh;
          background-color: #fff;
          font-family: ${FONT_MOBILE_FAMILY};
        }
        div.hand-wave-desktop {
          display: block;
          margin-right: 114px;
        }
        div.hand-wave-mobile {
          display: none;
        }
        div.text {
        }
        a.link {
          font-size: 12px;
          line-height: 16px;
          color: ${LIGHT_PURPLE_TEXT};
        }
        h2 {
          font-size: 42px;
          line-height: 44px;
          margin-top: 8px;
          color: ${MOBILE_TEXT};
          font-weight: 700;
        }
        button {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          line-height: 16px;
          text-align: center;
          white-space: nowrap;
          padding: 8px 0;
          width: 160px;
          margin-top: 38px;
          transition: background-color 200ms;
        }
        button div.icon {
          margin-left: 8px;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.log-in {
            height: 100vh;
            flex-direction: column;
          }
          div.hand-wave-desktop {
            display: none;
          }
          div.hand-wave-mobile {
            display: block;
          }
          div.text {
            display: flex;
            margin-top: 72px;
            flex-direction: column;
            align-items: center;
          }
          h2 {
            font-size: 34px;
            line-height: 44px;
          }
        }
      `}</style>
      <div className="log-in">
        <div className="hand-wave-desktop">{ICON.HandWaveDesktop}</div>
        <div className="hand-wave-mobile">{ICON.HandWaveMobile}</div>
        <div className="text">
          <Link href="https://www.web3labs.com">
            <a className="link" target="_blank">
              Epirus Platform — web3labs.com
            </a>
          </Link>
          <h2>Welcome Back</h2>
          <button
            className="--blue-square"
            disabled={!defined(authClass)}
            onClick={() => {
              if (defined(authClass)) {
                setAuthStatus(REDIRECTING_TEXT);
                authClass.login();
              }
            }}
          >
            {authStatus}
            {authStatus === REDIRECTING_TEXT && (
              <div className="icon">
                <LoadingSpinner
                  style={{ width: 14, height: 14 }}
                  type={ELoadingSpinnerType.White}
                />
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default LogIn;
