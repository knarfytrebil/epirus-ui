import * as React from 'react';
import { LIGHT_PURPLE_TEXT } from '../../../../../../style-config';

export interface ITableMobileModalResetProps {
  onClick(): void;
}

export function TableMobileModalReset(props: ITableMobileModalResetProps) {
  return (
    <>
      <style jsx>{`
        div.reset {
          margin-top: 68px;
          text-align: left;
        }
        div.reset button {
          font-size: 14px;
          line-height: 16px;
          cursor: pointer;
        }
      `}</style>
      <div className="reset">
        <button className="--text-link" onClick={props.onClick}>
          Reset
        </button>
      </div>
    </>
  );
}
