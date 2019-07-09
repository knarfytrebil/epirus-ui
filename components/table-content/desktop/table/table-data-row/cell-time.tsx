import * as React from 'react';
import { TEXT_GREY } from '../../../../../data';
import { formatDateDiffFromNow, formatIsoToToolTipDate } from '../../../../../utils';
import { ROW_HEIGHT } from './index';
import { ToolTipCell } from './cell-tool-tip';
import { ToolTip } from '../../../../tool-tip';

export interface ICellTimeProps {
  children: string;
}

export function CellTime(props: ICellTimeProps) {
  return (
    <>
      <style jsx>{`
        div.CellTime {
          position: relative;
          height: ${ROW_HEIGHT - 3}px;
          width: 100%;
        }
        span.diff-time {
          font-size: 12px;
          line-height: 14px;
          color: ${TEXT_GREY};
          cursor: pointer;
        }
      `}</style>
      <div className="CellTime">
        <ToolTipCell
          toolTipContent={
            <ToolTip style={{ marginTop: 12 }}>{formatIsoToToolTipDate(props.children)}</ToolTip>
          }
        >
          <span className="diff-time">{formatDateDiffFromNow(props.children)}</span>
        </ToolTipCell>
      </div>
    </>
  );
}
