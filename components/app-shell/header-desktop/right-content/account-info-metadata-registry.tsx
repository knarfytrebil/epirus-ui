import * as React from 'react';
import Link from 'next/link';
import { ACTIVE_BUTTON_GREY, HOVER_BUTTON_GREY } from '../../../../data';
import { MOBILE_GREY_TEXT, MOBILE_TEXT, TABLET_WIDTH } from '../../../../style-config';

export function AccountInfoMetadataRegistryLink() {
  return (
    <>
      <style jsx>{`
        a.AccountInfoMetadataRegistryLink {
          display: block;
          position: relative;
          padding: 8px 16px;
          margin: 8px 0 16px;
          width: calc(100% - 32px);
          height: 16px;
          color: ${MOBILE_TEXT};
          line-height: 16px;
          font-size: 14px;
          text-align: left;
          white-space: nowrap;
        }
        div.organisationTitle {
          font-size: 10px;
          line-height: 14px;
          color: ${MOBILE_GREY_TEXT};
          padding-left: 16px;
        }
        a.AccountInfoMetadataRegistryLink:hover {
          background-color: ${HOVER_BUTTON_GREY};
        }
        a.AccountInfoMetadataRegistryLink:active {
          background-color: ${ACTIVE_BUTTON_GREY};
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          a.AccountInfoMetadataRegistryLink:hover {
            background-color: ${ACTIVE_BUTTON_GREY};
          }
          div.organisationTitle {
            font-size: 10px;
            line-height: 14px;
            color: ${MOBILE_GREY_TEXT};
            padding-left: 24px;
          }
          a.AccountInfoMetadataRegistryLink {
            padding: 8px 24px;
            margin: 8px 0 16px;
            width: calc(100% - 48px);
          }
        }
      `}</style>
      <div className="organisationTitle">My Organisation</div>
      <Link href="/metadata">
        <a className="AccountInfoMetadataRegistryLink">Metadata Registry</a>
      </Link>
    </>
  );
}
