import * as React from 'react';
import AppShell from '../../components/app-shell';
import { StatusConnect, Profile } from '../../components';

function ProfilePage() {
  return (
    <AppShell
      render={({ userProfile }) => (
        <StatusConnect
          render={({ status }) => <Profile status={status} userProfile={userProfile} />}
        />
      )}
    />
  );
}

export default ProfilePage;
