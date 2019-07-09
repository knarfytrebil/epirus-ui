import * as React from 'react';
import Link from 'next/link';
import { CustomHead, NoScript, ICON } from '../../components';
import { GLOBAL_STYLES } from '../../components/app-shell/styles';
import { FONT_WEIGHT_TITLE, LIGHT_PURPLE_TEXT } from '../../style-config';

function CreatingEnvironment() {
  return (
    <>
      {GLOBAL_STYLES}
      <CustomHead />
      <NoScript />
      <style jsx>{`
        div.creating-environment {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          width: 100%;
          height: 100%;
        }
        div.icon-left {
          margin-right: 140px;
        }
        div.cog {
          animation-name: rotation;
          animation-duration: 11s;
          animation-timing-function: ease;
          animation-iteration-count: infinite;
          transform-origin: 50% 50%;
        }
        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          12.5% {
            transform: rotate(45deg);
          }
          25% {
            transform: rotate(90deg);
          }
          37.5% {
            transform: rotate(135deg);
          }
          50% {
            transform: rotate(180deg);
          }
          62.5% {
            transform: rotate(225deg);
          }
          75% {
            transform: rotate(270deg);
          }
          87.5% {
            transform: rotate(315deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        div.text-right {
        }
        h2 {
          font-size: 36px;
          line-height: 44px;
          font-weight: ${FONT_WEIGHT_TITLE};
        }
        p {
          font-size: 20px;
          line-height: 24px;
          margin: 12px 0 26px;
          color: #9999aa;
        }
        a.link {
          font-size: 12px;
          line-height: 16px;
          color: ${LIGHT_PURPLE_TEXT};
        }
      `}</style>
      <div className="creating-environment">
        <div className="icon-left">
          <div className="cog">{ICON.Cog}</div>
        </div>
        <div className="text-right">
          <h2>Your environment is being created</h2>
          <p>Give us a few minutes</p>
          <Link href="https://www.web3labs.com">
            <a className="link" target="_blank">
              Epirus Platform — web3labs.com
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CreatingEnvironment;
