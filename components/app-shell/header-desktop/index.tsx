import * as React from 'react';
import { HEADER_HEIGHT, HI_BLUE, MIN_CONTENT_WIDTH, WHITE } from '../../../data';
import { HeaderDesktopRightContent, IAccountInfoMenuControlProps } from './right-content';
import Link from 'next/link';
import { ICON } from '../../svg';

export type IHeaderDesktopProps = IAccountInfoMenuControlProps;

export function HeaderDesktop(props: IHeaderDesktopProps) {
  return (
    <>
      <style jsx>{`
        header {
          height: ${HEADER_HEIGHT}px;
          width: 100%;
          background-color: ${HI_BLUE};
        }
        h1 {
          line-height: 24px;
          font-size: 20px;
          font-weight: 500;
          color: ${WHITE};
          letter-spacing: 7px;
        }
        div.container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          width: calc(100% - 62px);
          padding: 0 30px 0 32px;
          margin-right: auto;
          margin-left: auto;
        }
        @media (min-width: ${MIN_CONTENT_WIDTH}px) {
          div.container {
            width: ${MIN_CONTENT_WIDTH - 112}px;
          }
        }
      `}</style>
      <header>
        <div className="container">
          <Link href="/">
            <a className="logo">{ICON.Logo}</a>
          </Link>
          <HeaderDesktopRightContent {...props} />
        </div>
      </header>
    </>
  );
}

export * from './right-content';
