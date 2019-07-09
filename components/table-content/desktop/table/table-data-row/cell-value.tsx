import * as React from 'react';
import { ROW_HEIGHT } from './index';
import { ToolTipCellCopy } from './cell-tool-tip-copy';
import { defined } from '../../../../../utils';
import { TextTruncate } from '../../../../text-truncate';

export enum ECellUnitType {
  Eth = 'ETH',
}

function unitWidthLookUp(type: ECellUnitType): number {
  switch (type) {
    default:
      return 0;
    case ECellUnitType.Eth:
      return 28;
  }
}

export interface ICellValueProps {
  contentToCopy: string;
  children: string;
  unit?: ECellUnitType;
}

export function CellValue(props: ICellValueProps) {
  const { contentToCopy, children, unit } = props;

  return (
    <>
      <style jsx>{`
        div.CellValue {
          position: relative;
          height: ${ROW_HEIGHT - 3}px;
          width: 100%;
        }
        div.cell {
          display: flex;
          flex-direction: row;
          position: relative;
          top: 2px;
          max-width: 100px;
          line-height: 19px;
          cursor: pointer;
        }
        div.value,
        div.unit {
          font-size: 12px;
          color: #4e4e4e;
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
      <div className="CellValue">
        <ToolTipCellCopy contentToCopy={contentToCopy}>
          <div className="cell">
            <div className="value">
              <TextTruncate isToolTipDisabled>{children}</TextTruncate>
            </div>
            {defined(unit) && <div className="unit">{` ${unit}`}</div>}
          </div>
        </ToolTipCellCopy>
      </div>
    </>
  );
}
