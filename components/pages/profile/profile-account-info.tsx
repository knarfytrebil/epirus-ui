import * as React from 'react';
import { MOBILE_GREY_TEXT } from '../../../style-config';
import { defined } from '../../../utils';
import { IUserProfile } from '../../../models';
import { ICON } from '../../svg';

export interface IProfileAccountInfoProps {
  userProfile: IUserProfile;
}

export function ProfileAccountInfo(props: IProfileAccountInfoProps) {
  const { userProfile } = props;
  return (
    <>
      <style jsx>{`
        div.ProfileAccountInfo {
          display: flex;
          align-items: center;
          flex-direction: row;
          width: 100%;
          margin-top: 48px;
        }
        div.avatar {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin-right: 18px;
        }
        div.details {
          width: calc(100% - 58px);
        }
        div.details div.name {
          font-size: 16px;
          line-height: 20px;
        }
        div.details div.email {
          font-size: 14px;
          line-height: 16px;
          color: ${MOBILE_GREY_TEXT};
        }
      `}</style>
      <div className="ProfileAccountInfo">
        <div className="avatar">{ICON.AvatarLarge}</div>
        <div className="details">
          <div className="name">{defined(userProfile) ? userProfile.name : 'Guest'}</div>
          <div className="email">
            {defined(userProfile) ? userProfile.email : 'You are not logged in.'}
          </div>
        </div>
      </div>
    </>
  );
}
