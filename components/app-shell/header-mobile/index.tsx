import * as React from 'react';
import * as classNames from 'classnames';
import { MIN_CONTENT_WIDTH } from '../../../data';
import Link from 'next/link';
import { FONT_WEIGHT_TITLE, MOBILE_SMALL_WIDTH } from '../../../style-config';
import SearchBar from '../../search-bar/index';

export interface IHeaderMobileProps {
  isDetails: boolean;
  pageName: string;
}

function resolveDetailsTitle(pageName) {
  switch (pageName) {
    case 'Metadata':
      return 'Metadata Details';
    case 'Contracts':
      return 'Contract Details';
    case 'Blocks':
      return 'Block Details';
    case 'Tokens':
      return 'Token Details';
    case 'Transactions':
      return 'Transaction Details';
    case 'Accounts':
      return 'Account Details';
    default:
      return pageName;
  }
}

export function HeaderMobile(props: IHeaderMobileProps) {
  const { isDetails, pageName } = props;
  return (
    <>
      <style jsx>{`
        header {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 24px;
        }
        div.container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-top: 26px;
          width: 100%;
        }
        a.logo,
        div.logo {
          width: 40px;
          height: 40px;
          color: inherit;
        }
        h1.title {
          font-size: 24px;
          line-height: 28px;
          font-weight: ${FONT_WEIGHT_TITLE};
        }
        h1.title.isDetails {
          font-size: 16px;
          line-height: 20px;
        }
        div.logo.--placeholder {
          opacity: 0;
        }
        a.logo img {
          width: 100%;
          height: 100%;
        }
        div.search-bar {
          margin-top: 26px;
          height: 32px;
          width: 100%;
          border-radius: 4px;
          overflow: hidden;
        }
        @media (min-width: ${MIN_CONTENT_WIDTH}px) {
          div.container {
            width: ${MIN_CONTENT_WIDTH - 112}px;
          }
        }
        @media (max-width: ${MOBILE_SMALL_WIDTH}px) {
          header {
            padding: 0 20px;
          }
        }
      `}</style>
      <header>
        <div className="container">
          <Link href="/">
            <a className="logo">
              <img src="/static/favicon.jpg" alt="Epirus Logo" />
            </a>
          </Link>
          <h1 className={classNames('title', { isDetails: isDetails })}>
            {isDetails ? resolveDetailsTitle(pageName) : pageName}
          </h1>
          <div className="logo --placeholder" />
        </div>
        <div className="search-bar">
          <SearchBar />
        </div>
      </header>
    </>
  );
}
