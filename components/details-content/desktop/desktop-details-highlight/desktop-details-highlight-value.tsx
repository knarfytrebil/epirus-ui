import * as React from 'react';
import { FONT_WEIGHT_LIGHT, WHITE } from '../../../../data';
import { TextTruncate } from '../../../text-truncate';
import { EDetailsHighlightUnitType } from '../../../../models';

function unitWidthLookUp(type: EDetailsHighlightUnitType): number {
  switch (type) {
    default:
      return 0;
    case EDetailsHighlightUnitType.Eth:
      return 141;
  }
}

export interface IDesktopDetailsHighlightValueProps {
  value: string;
  unit?: EDetailsHighlightUnitType;
  isTooltip?: boolean;
}

export function DesktopDetailsHighlightValue(props: IDesktopDetailsHighlightValueProps) {
  const { value, unit, isTooltip } = props;
  return (
    <>
      <style jsx>{`
        div.DesktopDetailsHighlightValue {
          display: flex;
          flex-direction: row;
          margin-top: 24px;
          width: 100%;
          cursor: ${isTooltip ? 'pointer' : 'default'};
        }
        div.value,
        div.unit {
          color: ${WHITE};
          font-size: 62px;
          font-weight: ${FONT_WEIGHT_LIGHT};
          line-height: 74px;
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
      <div className="DesktopDetailsHighlightValue">
        <div className="value">
          <TextTruncate isToolTipDisabled>{value}</TextTruncate>
        </div>
        {unit ? <div className="unit">{` ${unit}`}</div> : ''}
      </div>
    </>
  );
}
