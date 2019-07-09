import * as React from 'react';
import { MOBILE_SMALL_WIDTH } from '../../../style-config';
import { AccountInfoMetadataRegistryLink } from '../../app-shell/header-desktop/right-content/account-info-metadata-registry';

export function ProfileMetadata() {
  const isMetadataRegistryLink = process.env.ENABLE_PAID_FEATURES === 'enabled';
  if (isMetadataRegistryLink) {
    return (
      <>
        <style jsx>{`
          div.ProfileMetadata {
            position: relative;
            width: calc(100% + 48px);
            left: 0;
            margin-top: 28px;
          }
          @media (max-width: ${MOBILE_SMALL_WIDTH}px) {
            div.ProfileMetadata {
              width: calc(100% + 40px);
            }
          }
        `}</style>
        <div className="ProfileMetadata">
          <AccountInfoMetadataRegistryLink />
        </div>
      </>
    );
  } else {
    return null;
  }
}
