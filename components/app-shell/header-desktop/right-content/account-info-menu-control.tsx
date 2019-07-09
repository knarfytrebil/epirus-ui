import * as React from 'react';
import { WHITE } from '../../../../data';
import { IUserProfile } from '../../../../models';
import { AccountInfoControl } from './account-info-control';
import { RouterProps } from 'next-server/router';
import { AccountInfoMenu } from './account-info-menu';

export interface IAccountInfoMenuControlProps {
  router: RouterProps;
  userProfile: IUserProfile;
}

export function AccountInfoMenuControl(props: IAccountInfoMenuControlProps) {
  const { userProfile, router } = props;
  const [isOpen, setOpen] = React.useState(null);
  const handleWindowClick = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  const handleChange = () => {
    setOpen(!isOpen);
  };
  return (
    <>
      <style jsx>{`
        div.AccountInfoMenuControl {
          display: flex;
          flex-direction: row;
          align-items: center;
          color: ${WHITE};
        }
        div.dropdown {
          position: relative;
          top: 0;
          left: 0;
          z-index: 3;
        }
      `}</style>
      <div className="AccountInfoMenuControl" onClick={(e) => e.stopPropagation()}>
        <div className="dropdown">
          <AccountInfoControl
            isOpen={isOpen}
            name={userProfile && userProfile.given_name}
            onClick={handleChange}
          />
          {isOpen && <AccountInfoMenu userProfile={userProfile} />}
        </div>
      </div>
    </>
  );
}
