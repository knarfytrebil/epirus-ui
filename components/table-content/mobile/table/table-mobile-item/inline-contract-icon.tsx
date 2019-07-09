import * as React from 'react';
import { LIGHT_PURPLE_BUTTON, LIGHT_PURPLE_TEXT } from '../../../../../data';
import { ICON } from '../../../../svg';

export function InlineContractIcon() {
  return (
    <>
      <style jsx>{`
        div.InlineContractIcon {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${LIGHT_PURPLE_BUTTON};
          color: ${LIGHT_PURPLE_TEXT};
          height: 18px;
          width: 18px;
          border-radius: 9px;
        }
      `}</style>
      <div className="InlineContractIcon">{ICON.ContractSmallIcon}</div>
    </>
  );
}
