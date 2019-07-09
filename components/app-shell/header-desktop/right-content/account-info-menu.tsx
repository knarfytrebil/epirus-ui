import * as React from 'react';
import { AccountInfoStatus } from './account-info-status';
import { StatusConnect } from '../../..';
import { BUTTON_GREY } from '../../../../style-config';
import { AccountInfoLogoutButton } from './account-info-logout-button';
import { AccountInfoMetadataRegistryLink } from './account-info-metadata-registry';
import { AccountInfoTitle } from './account-info-title';
import { IUserProfile } from '../../../../models';

export interface IAccountInfoMenuProps {
  userProfile: IUserProfile;
}

export function AccountInfoMenu(props: IAccountInfoMenuProps) {
  const isMetadataRegistryLink = process.env.ENABLE_PAID_FEATURES === 'enabled';
  return (
    <>
      <style jsx>{`
        div.AccountInfoMenu {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          min-width: 240px;
          background-color: #fff;
          box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.05), 0 0 8px 0 rgba(0, 0, 0, 0.05);
          list-style: none;
        }
        div.top {
          padding: 24px 16px ${isMetadataRegistryLink ? 28 : 32}px;
        }
        div.line {
          width: 100%;
          height: 1px;
          background-color: ${BUTTON_GREY};
        }
      `}</style>
      <div className="AccountInfoMenu">
        <div className="top">
          <AccountInfoTitle userProfile={props.userProfile} />
          <StatusConnect render={({ status }) => <AccountInfoStatus status={status} />} />
        </div>
        {isMetadataRegistryLink && <AccountInfoMetadataRegistryLink />}
        <div className="line" />
        <AccountInfoLogoutButton />
      </div>
    </>
  );
}
