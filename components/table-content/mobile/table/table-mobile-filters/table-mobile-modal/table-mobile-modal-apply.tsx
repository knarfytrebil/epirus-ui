import * as React from 'react';
import { HEADER_ICON_PURPLE, HI_BLUE, WHITE } from '../../../../../../style-config';

export interface ITableMobileModalApplyProps {
  onClick(): void;
}

export function TableMobileModalApply(props: ITableMobileModalApplyProps) {
  return (
    <>
      <style jsx>{`
        button.apply {
          margin-top: 18px;
          padding: 12px 0;
          width: 100%;
          background-color: ${HI_BLUE};
          border-radius: 4px;
          font-size: 14px;
          line-height: 16px;
          color: ${WHITE};
          cursor: pointer;
        }
        button.apply:active {
          background-color: ${HEADER_ICON_PURPLE};
        }
      `}</style>
      <button className="apply" onClick={props.onClick}>
        Apply
      </button>
    </>
  );
}
