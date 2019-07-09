import * as React from 'react';
import SearchBar from '../../../search-bar/index';
import { AccountInfo } from './account-info';
import { IAccountInfoMenuControlProps } from './account-info-menu-control';

export type IHeaderDesktopRightContentProps = IAccountInfoMenuControlProps;

export function HeaderDesktopRightContent(props: IHeaderDesktopRightContentProps) {
  return (
    <>
      <style jsx>{`
        div.HeaderDesktopRightContent {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
          width: 642px;
        }
        div.search-bar {
          height: 40px;
          width: 388px;
          margin-right: 36px;
        }
      `}</style>
      <div className="HeaderDesktopRightContent">
        <div className="search-bar">
          <SearchBar isHeader />
        </div>
        <AccountInfo {...props} />
      </div>
    </>
  );
}

export * from './account-info';
export * from './account-info-menu-control';
export * from './account-info-status';
