import * as React from 'react';
import { HOVER_PURPLE_TEXT, LIGHT_PURPLE_TEXT } from '../../../data';

export interface ICheckboxFilterControlsProps {
  onOkClick(): void;
  onResetClick(): void;
}

export function CheckboxFilterControls(props: ICheckboxFilterControlsProps) {
  const { onOkClick, onResetClick } = props;

  return (
    <>
      <style jsx>{`
        div.CheckboxFilterOptions {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-top: 1px solid #eff1f5;
        }
        div.CheckboxFilterOptions button {
          color: ${LIGHT_PURPLE_TEXT};
          font-size: 14px;
          line-height: 22px;
        }
        div.CheckboxFilterOptions button {
          padding: 12px 16px 13px;
          cursor: pointer;
        }
        div.CheckboxFilterOptions button:hover {
          color: ${HOVER_PURPLE_TEXT};
          text-decoration: underline;
        }
      `}</style>
      <div className="CheckboxFilterOptions">
        <button onClick={onOkClick}>Ok</button>
        <button onClick={onResetClick}>Reset</button>
      </div>
    </>
  );
}
