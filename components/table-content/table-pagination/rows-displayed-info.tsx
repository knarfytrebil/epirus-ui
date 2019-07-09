import * as React from 'react';
import { formatWithCommas } from '../../../utils';
import { DESKTOP_WIDTH, GREY, MOBILE_TEXT } from '../../../style-config';

export interface IRowsDisplayedInfoProps {
  isArrows: boolean;
  min: number;
  max: number;
  totalRows: number;
}

export function RowsDisplayedInfo(props: IRowsDisplayedInfoProps) {
  const { isArrows, min, max, totalRows } = props;
  return (
    <>
      <style jsx>{`
        div.RowsDisplayedInfo {
          color: ${GREY};
          font-size: 14px;
          line-height: 22px;
          margin-right: ${isArrows ? 64 : 0}px;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.RowsDisplayedInfo {
            margin-right: ${isArrows ? 43 : 12}px;
            color: ${MOBILE_TEXT};
            line-height: 16px;
          }
        }
      `}</style>
      <div className="RowsDisplayedInfo">{`${formatWithCommas(min, 0)}-${formatWithCommas(
        Math.min(totalRows, max),
        0,
      )} of ${formatWithCommas(totalRows, 0)}`}</div>
    </>
  );
}
