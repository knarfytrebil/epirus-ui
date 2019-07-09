import * as React from 'react';
import { MOBILE_GREY_TEXT, MOBILE_TEXT } from '../../../../style-config';
import { defined } from '../../../../utils';
import { IUserProfile } from '../../../../models';

export interface IAccountInfoTitleProps {
  userProfile: IUserProfile;
}

export function AccountInfoTitle(props: IAccountInfoTitleProps) {
  const { userProfile } = props;
  return (
    <>
      <style jsx>{`
        div.AccountInfoTitle {
          width: 100%;
        }
        div.name {
          font-size: 16px;
          line-height: 20px;
          color: ${MOBILE_TEXT};
        }
        div.email {
          font-size: 14px;
          line-height: 16px;
          color: ${MOBILE_GREY_TEXT};
          margin-top: 4px;
        }
      `}</style>
      <div className="AccountInfoTitle">
        <div className="name">{defined(userProfile) ? userProfile.name : 'Guest'}</div>
        <div className="email">
          {defined(userProfile) ? userProfile.email : 'You are not logged in.'}
        </div>
      </div>
    </>
  );
}
