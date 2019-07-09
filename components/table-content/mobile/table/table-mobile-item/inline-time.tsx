import * as React from 'react';
import { formatDateDiffFromNow, formatIsoToToolTipDate } from '../../../../../utils';
import { ToolTip, ToolTipInline } from '../../../../tool-tip';
import { TextTruncate } from '../../../../text-truncate';

export interface IInlineTimeProps {
  children: string;
}

export function InlineTime(props: IInlineTimeProps) {
  return (
    <>
      <style jsx>{`
        div.InlineTime {
          position: relative;
          cursor: pointer;
        }
      `}</style>
      <div className="InlineTime">
        <ToolTipInline toolTipContent={<ToolTip>{formatIsoToToolTipDate(props.children)}</ToolTip>}>
          <TextTruncate>{formatDateDiffFromNow(props.children)}</TextTruncate>
        </ToolTipInline>
      </div>
    </>
  );
}
