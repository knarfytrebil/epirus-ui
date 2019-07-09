import * as React from 'react';
import { ESyncStatus, IUserProfile } from '../../../models';
import { Authentication } from '../../auth';
import { ProfileAccountInfo } from './profile-account-info';
import { ProfileStatus } from './profile-status';
import { ProfileMetadata } from './profile-metadata';
import { ProfileLogout } from './profile-logout';
let auth = null;

export interface IProfileProps {
  status: ESyncStatus;
  userProfile: IUserProfile;
}

export function Profile(props: IProfileProps) {
  const { status, userProfile } = props;
  React.useEffect(() => {
    auth = new Authentication();
  }, []);
  return (
    <>
      <style jsx>{`
        div.ProfileOverview {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 100%;
          height: 100%;
        }
      `}</style>
      <div className="ProfileOverview">
        <ProfileAccountInfo userProfile={userProfile} />
        <ProfileStatus status={status} />
        <ProfileMetadata />
        <ProfileLogout />
      </div>
    </>
  );
}
