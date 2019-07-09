import * as React from 'react';
import { HI_BLUE, MOBILE_GREY_TEXT, MOBILE_TEXT } from '../../../style-config';
import { defined } from '../../../utils';
import { ESyncStatus } from '../../../models';
import { LoadingSpinner } from '../../placeholders';
import { Authentication } from '../../auth';
import { INDICATOR_COLOR_LOOKUP } from '../../../data';
let auth = null;

export interface IProfileStatusProps {
  status: ESyncStatus;
}

export function ProfileStatus(props: IProfileStatusProps) {
  const { status } = props;
  React.useEffect(() => {
    auth = new Authentication();
  }, []);
  return (
    <>
      <style jsx>{`
        div.ProfileStatus {
          margin-top: 24px;
          width: 100%;
        }
        div.line-status {
          width: 100%;
          height: 2px;
          background-color: ${INDICATOR_COLOR_LOOKUP[ESyncStatus[status]] || HI_BLUE};
        }
        div.status-info {
          width: 100%;
          padding-top: 12px;
          font-size: 14px;
          line-height: 16px;
        }
        div.status-info span:first-child {
          color: ${MOBILE_GREY_TEXT};
        }
        div.status-info span:last-child {
          color: ${MOBILE_TEXT};
        }
      `}</style>
      <div className="ProfileStatus">
        <div className="line-status" />
        {defined(status) ? (
          <>
            <div className="status-info">
              <span>{`Status: `}</span>
              <span>{ESyncStatus[status]}</span>
            </div>
          </>
        ) : (
          <>
            <LoadingSpinner style={{ width: 10, height: 10 }} />
            Loading...
          </>
        )}
      </div>
    </>
  );
}
