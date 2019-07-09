import * as React from 'react';
import { DESKTOP_WIDTH, MOBILE_GREY_TEXT, MOBILE_TEXT } from '../../../style-config';
import { DropdownControl } from '../../inputs/dropdown-control';
import { IDropdownOption } from '../../../models';

export interface IRowsSelecterProps {
  value: number;
  onChange(selectedOption: IDropdownOption): void;
}

export function RowsSelecter(props: IRowsSelecterProps) {
  const { value, onChange } = props;
  return (
    <>
      <style jsx>{`
        div.RowsSelecter {
          display: flex;
          flex-direction: row;
          align-items: center;
          color: inherit;
          font-size: 14px;
          line-height: 22px;
        }
        span.text {
          margin-right: 22px;
        }
        div.dropdownWrapper {
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-right: 29px;
          height: 22px;
          width: 24px;
          cursor: pointer;
          z-index: 2;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.RowsSelecter {
            line-height: 16px;
            color: ${MOBILE_TEXT};
          }
          span.text {
            margin-right: 12px;
          }
          div.dropdownWrapper {
            height: 16px;
          }
        }
      `}</style>
      <div className="RowsSelecter">
        <span className="text">Rows per page:</span>
        <div className="dropdownWrapper">
          <DropdownControl
            options={['10', '25', '50']}
            value={value.toString()}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
}
