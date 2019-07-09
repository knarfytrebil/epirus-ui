import * as React from 'react';
import { defined } from '../../../../utils';
import { ESyncStatus } from '../../../../models';
import { INDICATOR_COLOR_LOOKUP } from '../../../../data';
import { HI_BLUE, LO_PURPLE, MOBILE_GREY_TEXT, MOBILE_TEXT } from '../../../../style-config';

export interface IAccountInfoStatus {
  status: ESyncStatus;
}

export function AccountInfoStatus(props: IAccountInfoStatus) {
  const { status } = props;
  return (
    <>
      <style jsx>{`
        div.AccountInfoStatus {
          margin-top: 24px;
          width: 100%;
        }
        div.line {
          width: 100%;
          height: 2px;
          background-color: ${INDICATOR_COLOR_LOOKUP[ESyncStatus[status]] || HI_BLUE};
        }
        div.status-info {
          width: 100%;
          padding-top: 12px;
          font-size: 12px;
          line-height: 16px;
        }
        div.status-info span:first-child {
          color: ${MOBILE_GREY_TEXT};
        }
        div.status-info span:last-child {
          color: ${MOBILE_TEXT};
        }
      `}</style>
      <div className="AccountInfoStatus">
        <div className="line" />
        {defined(status) ? (
          <div className="status-info">
            <span>{`Status: `}</span>
            <span>{ESyncStatus[status]}</span>
          </div>
        ) : (
          <div className="status-info">
            <span>Loading Status...</span>
          </div>
        )}
      </div>
    </>
  );
}
