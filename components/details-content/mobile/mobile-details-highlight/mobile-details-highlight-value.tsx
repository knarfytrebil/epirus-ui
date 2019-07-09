import * as React from 'react';
import { WHITE } from '../../../../data';
import { TextTruncate } from '../../../text-truncate';
import { EDetailsHighlightUnitType } from '../../../../models';

function unitWidthLookUp(type: EDetailsHighlightUnitType): number {
  switch (type) {
    default:
      return 0;
    case EDetailsHighlightUnitType.Eth:
      return 48;
  }
}

export interface IMobileDetailsHighlightValueProps {
  value: string;
  unit?: EDetailsHighlightUnitType;
  isTooltip?: boolean;
}

export function MobileDetailsHighlightValue(props: IMobileDetailsHighlightValueProps) {
  const { value, unit, isTooltip } = props;
  return (
    <>
      <style jsx>{`
        div.MobileDetailsHighlightValue {
          display: flex;
          flex-direction: row;
          white-space: pre-wrap;
          margin-top: 20px;
          width: 100%;
          cursor: ${isTooltip ? 'pointer' : 'default'};
        }
        div.value,
        div.unit {
          color: ${WHITE};
          font-size: 24px;
          line-height: 28px;
        }
        div.value {
          max-width: calc(100% - ${unitWidthLookUp(unit)}px);
        }
        div.unit {
          display: flex;
          justify-content: flex-end;
          flex-direction: row;
          width: ${unitWidthLookUp(unit)}px;
        }
      `}</style>
      <div className="MobileDetailsHighlightValue">
        <div className="value">
          <TextTruncate isToolTipDisabled>{value}</TextTruncate>
        </div>
        {unit ? (
          <>
            <span> </span>
            <div className="unit">{unit}</div>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
