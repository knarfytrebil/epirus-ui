import * as React from 'react';
import { NoScript } from '../../app-shell/no-script';
import { CustomHead, GLOBAL_STYLES } from '../../app-shell';
import {
  FONT_MOBILE_FAMILY,
  MOBILE_SMALL_WIDTH,
  MOBILE_TEXT,
  TABLET_WIDTH,
  WHITE,
} from '../../../style-config';
import { ICON } from '../..';
import { NotFound404Info } from './not-found-404-info';

export function NotFound404() {
  return (
    <>
      {GLOBAL_STYLES}
      <CustomHead />
      <NoScript />
      <style jsx>{`
        div.NotFound404 {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          width: 100%;
          height: 100vh;
          font-family: ${FONT_MOBILE_FAMILY};
          background-color: ${WHITE};
          color: ${MOBILE_TEXT};
        }
        div.icon-desktop {
          display: block;
        }
        div.icon-mobile {
          display: none;
        }
        div.icon-mobile-small {
          display: none;
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          div.NotFound404 {
            flex-direction: column-reverse;
            text-align: center;
          }
          div.icon-desktop {
            display: none;
          }
          div.icon-mobile {
            display: block;
          }
          div.icon-mobile-small {
            display: none;
          }
        }
        @media (max-width: ${MOBILE_SMALL_WIDTH}px) {
          div.icon-desktop {
            display: none;
          }
          div.icon-mobile {
            display: none;
          }
          div.icon-mobile-small {
            display: block;
          }
        }
      `}</style>
      <div className="NotFound404">
        <NotFound404Info />
        <div className="icon-desktop">{ICON.BrokenEther}</div>
        <div className="icon-mobile">{ICON.BrokenEtherSmall}</div>
        <div className="icon-mobile-small">{ICON.BrokenEtherExtraSmall}</div>
      </div>
    </>
  );
}
