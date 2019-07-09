import * as React from 'react';
import { ICON } from '../../../../svg';

export interface IMobileAdditionalDetailsButtonProps {
  isAdditionalDetailsOpen: boolean;
  onClick(): void;
}

export function MobileAdditionalDetailsButton(props: IMobileAdditionalDetailsButtonProps) {
  const { isAdditionalDetailsOpen, onClick } = props;
  return (
    <>
      <style jsx>{`
        button.MobileAdditionalDetailsButton {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        span.text {
          font-size: 12px;
          line-height: 16px;
          margin-right: 5px;
        }
      `}</style>
      <button onClick={onClick} className="MobileAdditionalDetailsButton">
        <span className="text">Additional Details</span>
        {isAdditionalDetailsOpen ? ICON.ChevronUp : ICON.ChevronDown}
      </button>
    </>
  );
}
